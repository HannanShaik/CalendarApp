import React from 'react';
import { CalendarList } from 'react-native-calendars';

const Calendar = ({ startDate, markedDates }) => {
    return (
        <CalendarList
            current={startDate}
            minDate={startDate}
            markedDates={markedDates}
            markingType={'interactive'}
            pastScrollRange={0}
            futureScrollRange={50}
            scrollEnabled
        />
    );
};

export default Calendar;
