import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, Button } from 'react-native';
import Style from '../../utilies/AppStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utilies/AppColors';

const Dashboard = (props) => {

    const [token, setToken] = useState('');


    const getDataFromAsync = useCallback(async () => {
        const dataFromAsync = await AsyncStorage.getItem('Token');
        if (dataFromAsync != null) {
            const data = await JSON.parse(dataFromAsync);
            setToken(data.token);
        } else {

        }
    }, [setToken]);


    useEffect(() => {
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

export const screenOptions = (navData) => {
    return {
        headerTitle: 'Overview',
        headerRight: () => (
            <MaterialIcons onPress={() => { navData.navigation.navigate('Dashboard Test') }} name='settings' size={26} color={Colors.white} />
        ),

    }
}

export default Dashboard;