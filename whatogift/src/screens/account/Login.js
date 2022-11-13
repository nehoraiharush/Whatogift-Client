import react, { useEffect, useState } from "react";
import { View, Text, Alert } from 'react-native';
import Style from '../../utilies/AppStyle.js';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import Color from '../../utilies/AppColors.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        if (errorMsg) {
            Alert.alert('Login', errorMsg);
        }
    }, [errorMsg]);

    const login = async () => {
        setLoading(true);
        if (email != '' && password != '') {
            try {
                const url = 'http://10.70.3.187:3001/api/account/login'
                const response = await fetch(url, {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                });

                const data = await response.json();
                if (data.status) {

                    AsyncStorage.setItem('Token', JSON.stringify({
                        token: data.token
                    }));

                    // const overView_url = 'http://10.70.3.187:3001/api/account/getOverView';
                    // const overView_res = await fetch(overView_url, {
                    //     method: 'get',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //         'Authorization': `Bearer ${data.token}`
                    //     }
                    // });

                    // const overView_data = await overView_res.json();
                    // setErrorMsg(overView_data.message);
                    setLoading(false);
                } else {
                    setLoading(false);
                    setErrorMsg(data.message);
                }

            } catch (error) {
                setLoading(false);
                setErrorMsg(error.message);
            }
        } else {
            setLoading(false);
            setErrorMsg('All input required');
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
        </View>
    )
}

export default Login;