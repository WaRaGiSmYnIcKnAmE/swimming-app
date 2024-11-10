import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FilterOption = ({ label, value, onChange, options }) => {
    const handlePrevious = () => {
        const currentIndex = options.indexOf(value);
        const newIndex =
            currentIndex > 0 ? currentIndex - 1 : options.length - 1;
        onChange(options[newIndex]);
    };

    const handleNext = () => {
        const currentIndex = options.indexOf(value);
        const newIndex =
            currentIndex < options.length - 1 ? currentIndex + 1 : 0;
        onChange(options[newIndex]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.filterControls}>
                <TouchableOpacity onPress={handlePrevious}>
                    <Text style={styles.arrow}>&lt;</Text>
                </TouchableOpacity>
                <Text style={styles.value}>{value}</Text>
                <TouchableOpacity onPress={handleNext}>
                    <Text style={styles.arrow}>&gt;</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 4,
    },
    filterControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrow: {
        fontSize: 18,
        color: '#333',
        paddingHorizontal: 8,
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
});

export default FilterOption;
