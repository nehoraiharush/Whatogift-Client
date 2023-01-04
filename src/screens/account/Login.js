import react, { useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import Style from '../../utilies/AppStyle.js';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import Color from '../../utilies/AppColors.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actions from '../../../store/actions';
import { useDispatch } from 'react-redux';

import firebase from "../../utilies/firebaseConfig";

const Login = (props) => {

    const [loginView, setLoginView] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [isLoading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (errorMsg && loginView) {
            Alert.alert('Login', errorMsg);
        } else if (errorMsg && !loginView) {
            Alert.alert('Signup', errorMsg);
        }
    }, [errorMsg]);

    const login = async () => {

        setLoading(true);
        if (email != '' && password != '') {

            try {

                const action = await actions.login(email, password);
                dispatch(action);
                const user = await firebase.auth().signInWithEmailAndPassword(email, password);

                setLoading(false);
            } catch (error) {
                setErrorMsg(error.message);
                setLoading(false);
            }

        } else {
            setErrorMsg('Email and Password are required');
            setLoading(false);
        }
        setErrorMsg(null);
    }
    const signup = async () => {

        setLoading(true);
        if (email != '' && password != '' && firstName != '' && lastName != '') {
            try {
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
                const action = await actions.signup(email, password, firstName, lastName, user.user.uid);
                dispatch(action);
                setLoading(false);
            } catch (error) {
                setErrorMsg(error.message);
                setLoading(false);
            }

        } else {
            setErrorMsg('Email and Password are required');
            setLoading(false);
        }
        setErrorMsg(null);
    }

    return (

        <View style={Style.container}>

            {
                loginView ?
                    (
                        <View>
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
                            <TouchableOpacity style={{ alignItems: 'center', width: '100%' }} onPress={() => setLoginView(false)}>
                                <Text style={{ marginTop: 20 }}>Dont have an account? Press here</Text>
                            </TouchableOpacity>
                        </View>
                    ) :
                    (
                        <View>
                            <Text style={{ fontSize: 25, marginBottom: 30, fontWeight: '700' }}>Signup</Text>

                            <TextInput
                                value={firstName} onChangeText={text => { setFirstName(text) }}
                                label="First Name"
                                placeholder="First Name"
                                keyboardType="default"
                                autoCapitalize="none"
                                right={<TextInput.Icon icon="account" />}
                            />
                            <TextInput
                                value={lastName} onChangeText={text => { setLastName(text) }}
                                label="Last Name"
                                placeholder="Last Name"
                                keyboardType="default"
                                autoCapitalize="none"
                                right={<TextInput.Icon icon="account" />}
                            />
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
                                isLoading ? (<ActivityIndicator style={{ marginTop: 20 }} color={Color.ocean} size="large" />) : (<Button style={{ marginTop: 30 }} icon="send" mode="contained" onPress={signup}>SIGN UP</Button>)
                            }

                            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => setLoginView(true)}>
                                <Text style={{ marginTop: 20 }}>Back to Login</Text>
                            </TouchableOpacity>
                        </View>
                    )
            }

        </View >
    )
}



export default Login;