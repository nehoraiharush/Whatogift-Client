import React, { useState, useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import Colors from '../../utilies/AppColors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actions from '../../../store/actions';

const ViewGift = (props) => {

    const dispatch = useDispatch();

    const product = props.route.params.product.product;
    const distance = props.route.params.product.distance;

    const [isLiked, setIsLiked] = useState(null);
    const [typeOfAction, setTypeOfAction] = useState(null);

    const [token, setToken] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);

    //not pressing after few times
    //and it doesnt remove when i undo the heart mark
    useEffect(() => {
        setIsLiked(!isLiked);

        updateWishList();
    }, [typeOfAction]);


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


    const updateWishList = useCallback(async => {
        try {
            const action = actions.updateWishList(
                token, product._id, typeOfAction
            );
            dispatch(action);
        } catch (error) {
            Alert.alert('Update Wishlist', error.message);
        }

    })
    console.log(props.isFavorite)
    return (
        <View style={{ flex: 1 }}>

            <Image source={{ uri: product.productImage[0].imageSource }} style={{ width: '100%', height: '50%', resizeMode: 'stretch' }} />
            <View style={{ flexDirection: 'row' }}>
                <View style={{ margin: 10, backgroundColor: '#DFE0E0', borderRadius: 20, width: '80%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons size={18} color={Colors.pink} name='md-location-sharp' />
                        <Text style={{ fontSize: 15, marginRight: 5, textAlign: 'center' }}>{(distance / 1000).toFixed(0)}km</Text>
                        <Text style={{ fontSize: 24, padding: 5, fontWeight: '700' }}>
                            {product.productName}
                        </Text>

                    </View>
                    <View style={{ marginBottom: 8 }}>
                        <ScrollView>
                            <Text style={{ fontSize: 24, padding: 5, textAlign: 'center' }} >
                                {product.productDescription}
                            </Text>
                        </ScrollView>
                    </View>
                </View>
                <View style={{ paddingTop: 10, justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => { setTypeOfAction(!typeOfAction) }}>
                        {isLiked ?
                            (
                                <TouchableOpacity onPress={() => { setTypeOfAction(false) }}>
                                    <Ionicons name="ios-heart" size={40} color={Colors.red} />
                                </TouchableOpacity>
                            )
                            :
                            (
                                <TouchableOpacity onPress={() => { setTypeOfAction(true) }}>
                                    <Ionicons name="ios-heart-outline" size={40} color={Colors.white} />
                                </TouchableOpacity>
                            )
                        }
                    </TouchableOpacity>

                </View>
            </View>
        </View >
    );

};

export default ViewGift;