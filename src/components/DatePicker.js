import React from 'react';
import DatePicker from 'react-native-datepicker';

const MyDatePicker = ({ title, minDate, date, onDateChange, disabled, customStyles }) => {
    return (
        <DatePicker
            style={{ width: 170 }}
            date={date}
            mode="date"
            placeholder={title}
            showIcon={false}
            format="YYYY-MM-DD"
            minDate={minDate}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateInput: [{
                    backgroundColor: '#ffba54'
                }, customStyles.style],
                placeholderText: {
                    color: '#000'
                },
            }}
            onDateChange={(changedDate) => onDateChange(changedDate)}
            disabled={disabled}
        />
    );
};

export default MyDatePicker;
