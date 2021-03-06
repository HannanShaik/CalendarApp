import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import moment from 'moment';

/* Abstract Components */
import DatePicker from './components/DatePicker';
import Header from './components/Header';
import Calendar from './components/Calendar';
import Spinner from './components/Spinner';
import { styles } from './styles';

/* Helper Methods */
import { enumerateDaysBetweenDates, showAlert } from './utils';
import { fetchConfig, applyDates } from './api-client';

class App extends Component {

    constructor(props) {
        super(props);
        //set initial state for the component
        this.INITIAL_STATE = {
            moveInDate: '',
            moveOutDate: '',
            moveInButtonDisabled: false,
            moveOutButtonDisabled: true,
            loading: false
        };
        this.state = this.INITIAL_STATE;

        //Bind Methods
        this.onMoveInDateSelection = this.onMoveInDateSelection.bind(this);
        this.onMoveOutDateSelection = this.onMoveOutDateSelection.bind(this);
        this.isInBlockPeriod = this.isInBlockPeriod.bind(this);
        this.applyDates = this.applyDates.bind(this);
    }

    componentWillMount() {
        //Fetch the calendar configuration from dummy API
        this.setState({ loading: true });
        fetchConfig().then((res) => {
            //make sure the minimum move in date is greater than today.
            if (new Date(res.minimum_move_in) < new Date()) {
                res.minimum_move_in = moment().add(1, 'days').format('YYYY-MM-DD');
            }

            this.setState({
                minStartDate: res.minimum_move_in,
                minimumDuration: res.minimum_duration,
                blockPeriods: res.blocked_periods,
                loading: false
            });
        }).catch((e) => console.error(e));
    }

    /**
     * On selection of move-in date
     * @param {*} date 
     */
    onMoveInDateSelection(date) {
        this.setState({
            moveInDate: date,
            moveOutButtonDisabled: false
        });
    }

    /**
     * On selection of move out date.
     * @param {*} date 
     */
    onMoveOutDateSelection(date) {
        const { moveInDate, minimumDuration } = this.state;
        if (moment(date).diff(moment(moveInDate), 'days') + 1 < minimumDuration) {
            showAlert('Minimum Dates are not met!',
                `Minimum ${minimumDuration} should be selected`);
            return;
        }
        this.setState({
            moveOutDate: date,
            moveInButtonDisabled: true,
            moveOutButtonDisabled: true
        });
    }

    /**
     * After the move-in and move-out are selected. This calls the API to post the details. 
     * As of now, this is calling a function which returns empty object.
     */
    applyDates() {
        const { moveInDate, moveOutDate } = this.state;
        if (!moveInDate || !moveOutDate) {
            return showAlert('Error', 'Please select the dates');
        }

        applyDates({ moveInDate, moveOutDate });
        showAlert('Successfully booked the dates!');
        this.setState(this.INITIAL_STATE);
    }

    /**
     * Highlight the selected dates
     * @param {*} start start date
     * @param {*} end end date
     */
    markDays(startDate, endDate) {
        if (this.isInBlockPeriod(startDate) || this.isInBlockPeriod(endDate)) {
            showAlert('Dates are blocked!', 'You cannot choose these dates.');
            return;
        }

        const start = moment(startDate);
        const end = moment(endDate);
        const dates = enumerateDaysBetweenDates(start, end);

        const markedDays = {};
        for (const date of dates) {
            if (this.isInBlockPeriod(date)) {
                showAlert('Dates are blocked!', 'You cannot choose these dates.');
                return;
            }
            markedDays[date] = [{ selected: true, color: '#ffd749' }];
        }
        markedDays[start.format('YYYY-MM-DD')] = [{ startingDay: true, color: '#ffd749' }];
        markedDays[end.format('YYYY-MM-DD')] = [{ endingDay: true, color: '#ffd749' }];

        return markedDays;
    }

    /**
     * Check if the given date falls within any of the blocked period.
     * @param {*} date 
     */
    isInBlockPeriod(date) {
        for (const blockPeriod of this.state.blockPeriods) {
            const startDate = moment(blockPeriod.start);
            const endDate = moment(blockPeriod.end);
            const checkDate = moment(date);
            if (date && checkDate.isBetween(startDate, endDate, 'days', true)) {
                return true;
            }
        }
    }

    renderProgressView() {
        return (
            <Spinner size="large" />
        );
    }

    render() {
        const { containerStyle, datePickersStyle, applyButtonStyle } = styles;
        const { minStartDate, moveInDate, moveOutDate,
            moveInButtonDisabled, moveOutButtonDisabled, loading } = this.state;

        return (
            <View style={containerStyle}>
                <Header title="Calendar" onPress={() => this.setState(this.INITIAL_STATE)} />
                <View style={datePickersStyle}>
                    <DatePicker
                        title="Move In"
                        minDate={minStartDate}
                        date={moveInDate}
                        onDateChange={this.onMoveInDateSelection}
                        disabled={moveInButtonDisabled}
                        customStyles={{
                            style: {
                                borderTopLeftRadius: 30,
                                borderBottomLeftRadius: 30
                            }
                        }}
                    />
                    <DatePicker
                        title="Move Out"
                        minDate={moment(moveInDate).add(1, 'days').format('YYYY-MM-DD')}
                        date={moveOutDate}
                        onDateChange={this.onMoveOutDateSelection}
                        disabled={moveOutButtonDisabled}
                        customStyles={{
                            style: {
                                borderTopRightRadius: 30,
                                borderBottomRightRadius: 30
                            }
                        }}
                    />
                </View>
                {
                    /**
                     * Show Progress Indicator when the API call is in progress.
                     */
                    loading ?
                        this.renderProgressView() :
                        <Calendar
                            startDate={new Date(minStartDate)}
                            markedDates={this.markDays(moveInDate, moveOutDate)}
                        />
                }
                <TouchableOpacity style={applyButtonStyle} onPress={this.applyDates}>
                    <Text> Apply Dates </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default App;
