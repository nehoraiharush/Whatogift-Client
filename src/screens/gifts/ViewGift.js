import React, { useState, useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from "react-native";
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

    const [token, setToken] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);

    //TOKEN
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

    //updating when clicking the heart
    const updateWishList = useCallback(async => {
        try {
            const action = actions.updateWishList(
                token, product._id
            );
            dispatch(action);
        } catch (error) {
            Alert.alert('Update Wishlist', error.message);
        }

    })

    const favoriets_gift = useSelector((state) => state.appReducer.myData?.favorites);
    console.log("VIEWGIFT: " + favoriets_gift);

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

                    <TouchableOpacity onPress={() => updateWishList()}>
                        {favoriets_gift !== undefined && JSON.stringify(favoriets_gift).includes(JSON.stringify(product._id)) ?
                            (
                                <Ionicons name="ios-heart" size={40} color={Colors.red} />
                            )
                            :
                            (
                                <Ionicons name="ios-heart-outline" size={40} color={Colors.white} />
                            )
                        }
                    </TouchableOpacity>


                </View>
            </View>
        </View >
    );

};

export default ViewGift;