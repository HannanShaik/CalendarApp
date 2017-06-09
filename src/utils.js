import { Alert } from 'react-native';

export const enumerateDaysBetweenDates = (startDate, endDate) => {
    const dates = [];

    const currDate = startDate.clone().startOf('day');
    const lastDate = endDate.clone().startOf('day');

    while (currDate.add(1, 'days').diff(lastDate) < 0) {
        dates.push(currDate.clone().format('YYYY-MM-DD'));
    }

    return dates;
};

export const showAlert = (title, message) => {
    setTimeout(() => {
        Alert.alert(
            title,
            message,
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: true }
        );
    }, 500);
};
