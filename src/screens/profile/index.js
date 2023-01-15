import React, { useEffect, useCallback, useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Style from '../../utilies/AppStyle';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, TextInput } from 'react-native-paper';
import * as actions from '../../../store/actions';
import Colors from '../../utilies/AppColors';
import AsyncStorage from '@react-native-async-storage/async-storage';

import firebase from "../../utilies/firebaseConfig";


const Profile = () => {

    const dispatch = useDispatch();

    const [token, setToken] = useState('');

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

    const myData = useSelector((state) => state.myData?.myData);


    const [firstName, setFirstName] = useState(myData.firstName ? myData.firstName : '');
    const [lastName, setLastName] = useState(myData.lastName ? myData.lastName : '');
    //const [email, setEmail] = useState(myData.email);

    const update_account = useCallback(async => {
        if (!(firstName === '' || lastName === '')) {
            try {
                //firebase.auth().updateCurrentUser(firebase.auth().currentUser.updateEmail(email))
                const action = actions.update_account(token, firstName, lastName, myData.email, myData.password, myData.dob ? myData.dob : null, myData.gender ? myData.gender : null, myData.avatar, myData.address ? myData.address : null, myData.city ? myData.city : null, myData.state ? myData.state : null, myData.zipCode ? myData.zipCode : null, myData.mobile ? myData.mobile : null);
                dispatch(action);
            } catch (error) {
                console.log(error.message);
            }
        } else {
            Alert.alert("One or more fields are missing")
        }
    })

    return (
        <View style={Style.container_nopadding}>

            <View style={Style.avatar_container}>
                {
                    myData?.avatar && <Avatar.Image size={100} source={{ uri: myData?.avatar }} />
                }
                <Text style={Style.username}>{myData?.firstName} {myData?.lastName}</Text>
                <Text style={Style.email}>{myData?.email}</Text>

            </View>
            <View style={{ padding: 10 }}>
                <TextInput
                    value={firstName} onChangeText={text => { setFirstName(text) }}
                    label="First Name"
                    placeholder="First Name"
                    keyboardType="default"
                    autoCapitalize="words"
                    right={<TextInput.Icon icon="account" />}
                />
                <TextInput
                    value={lastName} onChangeText={text => { setLastName(text) }}
                    label="Last Name"
                    placeholder="Last Name"
                    keyboardType="default"
                    autoCapitalize="words"
                    right={<TextInput.Icon icon="account" />}
                />
                {/* <TextInput
                    value={email} onChangeText={text => { setEmail(text) }}
                    label="Email"
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    right={<TextInput.Icon icon="email" />}
                /> */}

                <TouchableOpacity onPress={update_account} style={Style.btn_container}>
                    <Text style={Style.btn_white_text}>
                        UPDATE ACCOUNT
                    </Text>

                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Profile;