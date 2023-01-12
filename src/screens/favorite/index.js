import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Style from '../../utilies/AppStyle';
import * as actions from '../../../store/actions';
import GiftItem from "../gifts/GiftItem";

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

    const favoriets_gift = useSelector((state) => state.appReducer.myData?.favorites);

    const giftData = useSelector((state) => state.giftList?.giftList);
    console.log("GIFT DATA: " + JSON.stringify(giftData));


    return (
        <View style={Style.container}>

            {
                !token || favoriets_gift === undefined || favoriets_gift.length === 0 || giftData === undefined || giftData.length === 0 ?
                    (
                        <Text>No Favorites Found</Text>
                    ) :
                    (
                        Object.values(giftData).filter((prod) => Object.values(favoriets_gift).filter((fav) => fav === prod.product._id).length > 0).map((prod, index) => {
                            return (
                                <TouchableOpacity key={index}>
                                    <GiftItem gift={prod} navigation={props.navigation} />
                                </TouchableOpacity>

                            );
                        })
                    )
            }

        </View>
    );
}

export default Favorite;