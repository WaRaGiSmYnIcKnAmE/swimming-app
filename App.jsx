import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Platform,
    PermissionsAndroid,
    Alert,
} from 'react-native';
import FilterOption from './src/components/FilterOption';
import ApplyButton from './src/components/ApplyButton';
import NormativeTable from './src/components/NormativeTable';
import RNFS from 'react-native-fs';
import * as XLSX from 'xlsx';

const App = () => {
    const [type, setType] = useState('');
    const [gender, setGender] = useState('');
    const [swimPoolOptions, setSwimPoolOptions] = useState([]);
    const [selectedPoolSwim, setSelectedPoolSwim] = useState('');
    const [normatives, setNormatives] = useState([]);
    const [filteredNormatives, setFilteredNormatives] = useState([]);

    // Функция для запроса разрешений на Android
    const requestStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Доступ к хранилищу',
                    message:
                        'Приложению нужен доступ к файлам для загрузки нормативов.',
                    buttonNeutral: 'Спросить позже',
                    buttonNegative: 'Отмена',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                // Запрос разрешения на Android перед доступом к файлу
                if (Platform.OS === 'android') {
                    const hasPermission = await requestStoragePermission();
                    if (!hasPermission) {
                        Alert.alert('Ошибка', 'Доступ к файлам отклонен');
                        return;
                    }
                }

                const path =
                    Platform.OS === 'ios'
                        ? `${RNFS.MainBundlePath}/data.xlsx`
                        : `${RNFS.ExternalDirectoryPath}/data.xlsx`;

                // Вывод списка файлов для отладки
                const directoryPath =
                    Platform.OS === 'ios'
                        ? RNFS.MainBundlePath
                        : RNFS.ExternalDirectoryPath;
                const files = await RNFS.readDir(directoryPath);
                console.log(
                    'Список файлов в каталоге:',
                    files.map((file) => file.name)
                );

                // Чтение файла
                const fileData = await RNFS.readFile(path, 'base64');
                const binary = atob(fileData);
                const workbook = XLSX.read(binary, { type: 'binary' });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const data = XLSX.utils.sheet_to_json(sheet);

                const normativesData = data.map((row) => ({
                    type: row['Тип'],
                    gender: row['Пол'],
                    distance: `${row['Дистанция']}м`,
                    poolLength: `${row['Длина бассейна']}м`,
                    time: row['Нормативное время'],
                }));

                setNormatives(normativesData);

                const types = [
                    ...new Set(normativesData.map((item) => item.type)),
                ];
                const genders = [
                    ...new Set(normativesData.map((item) => item.gender)),
                ];
                const swimOptions = [
                    ...new Set(
                        normativesData.map(
                            (item) =>
                                `Заплыв: ${item.distance} (${item.poolLength})`
                        )
                    ),
                ];

                setType(types[0] || '');
                setGender(genders[0] || '');
                setSwimPoolOptions(swimOptions);
                setSelectedPoolSwim(swimOptions[0] || '');
            } catch (error) {
                console.error('Ошибка чтения файла:', error);
            }
        };

        loadData();
    }, []);

    const applyFilters = () => {
        const [distance, poolLength] = selectedPoolSwim.match(/\d+/g);
        const filtered = normatives.filter(
            (item) =>
                item.type === type &&
                item.gender === gender &&
                item.distance === `${distance}м` &&
                item.poolLength === `${poolLength}м`
        );
        setFilteredNormatives(filtered);
    };

    return (
        <View style={styles.container}>
            <View style={styles.filterRow}>
                <FilterOption
                    label='Type'
                    value={type}
                    onChange={setType}
                    options={swimPoolOptions}
                />
                <FilterOption
                    label='Gender'
                    value={gender}
                    onChange={setGender}
                    options={['Male', 'Female']}
                />
            </View>

            <View style={styles.filterRow}>
                <FilterOption
                    label='Swim & Pool'
                    value={selectedPoolSwim}
                    onChange={setSelectedPoolSwim}
                    options={swimPoolOptions}
                />
            </View>

            <ApplyButton onPress={applyFilters} />
            <NormativeTable data={filteredNormatives} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
});

export default App;
