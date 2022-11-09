import react, { useState } from "react";
import { View, Text } from 'react-native';
import Style from '../../utilies/AppStyle.js';
import { Button, TextInput } from 'react-native-paper'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

            <Button style={{ marginTop: 30 }} icon="send" mode="contained" onPress={() => console.log('Pressed')}>LOGIN</Button>
        </View>
    )
}

export default Login;