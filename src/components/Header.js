import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = ({ title, onPress }) => {
    return (
        <View style={styles.container}>
            <Text>{title}</Text>
            <TouchableOpacity style={styles.clearButton} onPress={onPress}>
                <Text> Clear </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = new StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 1
    },
    clearButton: {
        position: 'absolute',
        right: 10,
        top: 30
    }
});

export default Header;
