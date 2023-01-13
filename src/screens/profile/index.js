import React from 'react'
import { View, Text } from 'react-native';
import Style from '../../utilies/AppStyle';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'react-native-paper';


const Profile = () => {

    const myData = useSelector((state) => state.myData?.myData);
    console.log(myData)
    return (
        <View style={Style.container_nopadding}>

            <View style={Style.avatar_container}>
                {
                    myData?.avatar && <Avatar.Image size={100} source={{ uri: myData?.avatar }} />
                }
                <Text style={Style.username}>{myData?.firstName} {myData?.lastName}</Text>
                <Text style={Style.email}>{myData?.email}</Text>

            </View>

        </View>
    )
}

export default Profile;