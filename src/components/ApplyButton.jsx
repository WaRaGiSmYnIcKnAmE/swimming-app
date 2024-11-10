import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ApplyButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 16,
        paddingVertical: 12,
        backgroundColor: '#4CAF50',
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ApplyButton;
