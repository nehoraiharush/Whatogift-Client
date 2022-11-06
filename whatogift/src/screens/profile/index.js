import React from 'react';
import { View, Text, Button } from 'react-native';
import Style from '../../utilies/AppStyle';

const Profile = (props) => {
    return (
        <View style={Style.container}>
            <Text>
                Profile
            </Text>
            <Button onPress={() => { props.navigation.navigate('Profile Test') }} title='Go to Test'></Button>
        </View>
    );
}

export default Profile;