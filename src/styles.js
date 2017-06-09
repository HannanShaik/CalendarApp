import { StyleSheet, Dimensions } from 'react-native';

export const styles = new StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    datePickersStyle: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    applyButtonStyle: {
        position: 'absolute',
        padding: 20,
        bottom: 20,
        borderRadius: 30,
        backgroundColor: '#ffba54',
        left: (Dimensions.get('window').width / 2) - 50,
    }
});
