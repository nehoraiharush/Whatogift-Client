import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Style from '../../utilies/AppStyle';
import * as actions from '../../../store/actions';

const Favorite = (props) => {

    const [token, setToken] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);

    const dispatch = useDispatch();

    const hasToken = useCallback(async () => {
        const dataFromAsync = await AsyncStorage.getItem('Account');
        if (dataFromAsync != null) {
            const data = JSON.parse(dataFromAsync);
            setToken(data.token);
        }
    }, [token])

    useEffect(() => {
        hasToken();
    }, [hasToken]);

    useEffect(() => {
        getWishList();
    }, []);

    const getWishList = useCallback(async => {

        try {
            const action = actions.get_wishlist(
                token
            );
            dispatch(action);
        } catch (error) {
            Alert.alert('Get Wishlist', error.message);
        }

    })

    const favoriets_gift = useSelector((state) => state.appReducer.wishlist?.message);

    return (
        <View style={Style.container}>

            {
                !token || favoriets_gift === undefined || favoriets_gift.length === 0 ?
                    (
                        <Text>No Favorites Found</Text>
                    ) :
                    (
                        <Text>{favoriets_gift}</Text>
                    )
            }

        </View>
    );
}

export default Favorite;