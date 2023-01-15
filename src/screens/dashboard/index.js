import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import Style from '../../utilies/AppStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utilies/AppColors';
import * as actions from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';

import firebase from "../../utilies/firebaseConfig";

const Dashboard = (props) => {

    const user = firebase.auth().currentUser;

    const [token, setToken] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const [location, setLocation] = useState(null);
    const [companiesData, setCompaniesData] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (errorMsg) {
            Alert.alert('Dashboard', errorMsg);
        }
    }, [errorMsg]);

    const getDataFromAsync = useCallback(async () => {
        const dataFromAsync = await AsyncStorage.getItem('Account');

        if (dataFromAsync != null) {
            const data = await JSON.parse(dataFromAsync);
            setToken(data.token);
        }

    }, [setToken]);

    useEffect(() => {
        getDataFromAsync();
    }, [getDataFromAsync]);

    useEffect(() => {
        if (token !== '' && token !== undefined) {
            const action = actions.getMyData(token);
            dispatch(action);
        }
    }, [token]);

    //find location
    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            // if (token && location) {
            //     const action = await actions.getAllCompaniesByLocation(token, location);

            //     try {
            //         dispatch(action);
            //     } catch (error) {
            //         setErrorMsg(error.message)
            //         throw new Error(errorMsg)
            //     }
            // }

        })();
    }, []);

    useEffect(() => {
        get_all_products();
    }, [location]);
    const get_all_products = useCallback(async => {
        if (location !== null) {
            try {
                const action = actions.get_all_products(location);
                dispatch(action);
            } catch (error) {
                console.log(error.message);
            }
        }
    })

    return (
        <View style={Style.container}>
            <Text>
                {user.email}
            </Text>

            {/* <View style={{ width: '100%', backgroundColor: '#DFE0E0', padding: 10, marginTop: 10, borderRadius: 20, marginBottom: 15 }}>
                <Text style={{ textAlign: 'center' }}>
                    HII
                </Text>
            </View> */}
            <Button onPress={() => { firebase.auth().signOut() }} title='Logout' />

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