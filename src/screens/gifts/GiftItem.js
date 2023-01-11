import React, { useState, useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actions from '../../../store/actions';

import Colors from '../../utilies/AppColors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


const GiftItem = props => {

    const product = props.gift.product;

    const [token, setToken] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);

    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('viewGift', { product: props.gift })} style={styles.row}>
            <View style={styles.product_row}>
                <View style={styles.image_container}>
                    <View style={styles.brand}>
                        <Text style={styles.brand_text}>{product.brandId.brandName}/{product.categoryId.categoryName}</Text>
                    </View>
                    <Image source={{ uri: product.productImage[0].imageSource }} style={styles.image} />
                </View>
                <View style={styles.product_container}>
                    <Text>{product.productName}</Text>
                    <Text style={styles.desc}>{product.productDescription.toString().substring(0, 60)}...</Text>
                </View>
                <View style={styles.price_container}>
                    <Text style={styles.price}>${product.productPrice}</Text>
                    <Text style={styles.instock}>{product.unitInStock} left</Text>

                    <View style={{ flexDirection: 'row', marginTop: 7 }}>
                        <Ionicons size={18} color={Colors.pink} name='md-location-sharp' />
                        <Text style={styles.distance}>{(props.gift.distance / 1000).toFixed(0)}km</Text>
                    </View>
                </View>
            </View>
            <View style={styles.company_row}>
                <View style={styles.company_container}>
                    <Image source={{ uri: product.companyId.logo }} style={styles.logo} />
                    <Text style={styles.company}>{product.companyId.companyName}</Text>
                </View>
                <View style={styles.instore_container}>
                    <MaterialCommunityIcons size={20} color={Colors.white} name='chat' />
                    <Text style={styles.reviews}>{product.reviews.length}</Text>
                </View>
                <View style={styles.btn_container}>
                    <Text style={styles.view}>VIEW</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    distance: { fontSize: 15, marginRight: 5 },
    instock: { fontSize: 13 },
    price: { fontWeight: '800', fontSize: 16 },
    reviews: { color: Colors.white, marginLeft: 6 },
    view: { fontSize: 14, color: Colors.white, fontWeight: '700' },
    desc: { fontSize: 12 },
    company: { marginTop: 10, marginLeft: 7 },
    logo: { width: 20, height: 20, resizeMode: 'cover', marginTop: 10 },
    image: { width: '100%', height: 90, resizeMode: 'cover', marginTop: 5 },
    row: { width: '100%', backgroundColor: Colors.white, marginBottom: 12, borderRadius: 20 },
    product_row: { flexDirection: 'row', width: '100%', height: 100 },
    company_row: { flexDirection: 'row', width: '100%', height: 40, backgroundColor: Colors.light_blue2 },
    image_container: { width: '35%' },
    product_container: { width: '45%', padding: 10 },
    price_container: { width: '20%', alignItems: 'center', justifyContent: 'center' },
    company_container: { width: '60%', alignItems: 'flex-start', paddingHorizontal: 5, flexDirection: 'row', marginTop: 5 },
    instore_container: { width: '20%', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.dark_blue, flexDirection: 'row' },
    btn_container: { width: '20%', backgroundColor: Colors.ocean, alignItems: 'center', justifyContent: 'center' },
    brand: { width: '100%', height: 15, backgroundColor: Colors.pink, alignItems: 'center', justifyContent: 'center' },
    brand_text: { color: Colors.white, fontSize: 10 },
});

export default GiftItem