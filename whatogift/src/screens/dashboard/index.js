import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, Button } from 'react-native';
import Style from '../../utilies/AppStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = (props) => {

    const [token, setToken] = useState('');


    const getDataFromAsync = useCallback(async () => {
        console.log('2');
        const dataFromAsync = await AsyncStorage.getItem('Token');
        if (dataFromAsync != null) {
            console.log('3');
            const data = await JSON.parse(dataFromAsync);
            setToken(data.token);
        } else {

        }
    }, [setToken]);


    useEffect(() => {
        console.log('1');
        getDataFromAsync();
    }, [getDataFromAsync]);

    console.log(token);

    return (
        <View style={Style.container}>
            <Text>
                Dashboard
            </Text>
            <Button onPress={() => { props.navigation.navigate('Dashboard Test') }} title='Go to Test'></Button>
        </View>
    );
}

export default Dashboard;