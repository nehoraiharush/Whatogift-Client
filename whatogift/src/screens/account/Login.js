import react, { useEffect, useState } from "react";
import { View, Text, Alert } from 'react-native';
import Style from '../../utilies/AppStyle.js';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import Color from '../../utilies/AppColors.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actions from '../../../store/actions';
import { useDispatch } from 'react-redux';

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (errorMsg) {
            Alert.alert('Login', errorMsg);
        }
    }, [errorMsg]);

    const login = async () => {
        setLoading(true);
        if (email != '' && password != '') {
            const action = actions.login(email, password);
            try {
                dispatch(action);
                setLoading(false);
            } catch (error) {
                setErrorMsg(error);
            }

        } else {
            setErrorMsg('Email and Password are required');
            setLoading(false);
        }
    }

    return (

        <View style={Style.container}>

            <Text style={{ fontSize: 25, marginBottom: 30, fontWeight: '700' }}>Login</Text>

            <TextInput
                value={email} onChangeText={text => { setEmail(text) }}
                label="Email"
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                right={<TextInput.Icon icon="email" />}
            />
            <TextInput
                value={password} onChangeText={text => { setPassword(text) }}
                label="Password"
                keyboardType="default"
                secureTextEntry
                right={<TextInput.Icon icon="eye" />}
            />


            {
                isLoading ? (<ActivityIndicator style={{ marginTop: 20 }} color={Color.ocean} size="large" />) : (<Button style={{ marginTop: 30 }} icon="send" mode="contained" onPress={login}>LOGIN</Button>)
            }

            <View style={{ alignItems: 'center' }}>
                <Text style={{ marginTop: 20 }} onPress={() => props.navigation.navigate('Register')}>Dont have an account? press here</Text>
            </View>

        </View >
    )
}

export default Login;