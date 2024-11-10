import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const NormativeTable = ({ data }) => {
    return (
        <ScrollView horizontal>
            <View style={styles.table}>
                {/* Заголовки таблицы */}
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.headerCell]}>
                        Тип
                    </Text>
                    <Text style={[styles.tableCell, styles.headerCell]}>
                        Пол
                    </Text>
                    <Text style={[styles.tableCell, styles.headerCell]}>
                        Дистанция
                    </Text>
                    <Text style={[styles.tableCell, styles.headerCell]}>
                        Длина бассейна
                    </Text>
                    <Text style={[styles.tableCell, styles.headerCell]}>
                        Время
                    </Text>
                </View>

                {/* Строки с данными */}
                {data.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{item.type}</Text>
                        <Text style={styles.tableCell}>{item.gender}</Text>
                        <Text style={styles.tableCell}>{item.distance}</Text>
                        <Text style={styles.tableCell}>{item.poolLength}</Text>
                        <Text style={styles.tableCell}>{item.time}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    table: {
        marginTop: 16,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCell: {
        padding: 8,
        minWidth: 100, // Минимальная ширина для горизонтальной прокрутки
        borderWidth: 1,
        borderColor: '#ccc',
    },
    headerCell: {
        fontWeight: 'bold',
        backgroundColor: '#f0f0f0',
    },
});

export default NormativeTable;
