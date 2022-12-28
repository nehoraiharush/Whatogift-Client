import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import Colors from '../../utilies/AppColors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const GiftItem = props => {

    const product = props.gift;

    return (
        <View style={styles.row}>
            <View style={styles.product_row}>
                <View style={styles.image_container}>
                    <View style={styles.brand}>
                        <Text style={styles.brand_text}>{product.brandId.brandName}/{product.categoryId.categoryName}</Text>
                        <Image source={{ uri: product.productImage[0].imageSource }} style={styles.image} />
                    </View>
                </View>
                <View style={styles.product_container}>
                    <Text style={{ fontSize: 16, fontWeight: '800' }}>{product.productName}</Text>
                    <ScrollView>
                        <Text style={{ paddingTop: 5 }}>{product.productDescription}</Text>
                    </ScrollView>

                </View>
                <View style={styles.price_container}>
                    <Text style={styles.price}>{product.productPrice}$</Text>
                    <Text style={styles.instock}>{product.unitInStock} left</Text>
                </View>
            </View>
            <View style={styles.company_row}>
                <View style={styles.company_container}>
                    <Image source={{ uri: product.companyId.logo }} styles={styles.logo} />
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
        </View>
    );

}

const styles = StyleSheet.create({
    row: {
        width: '100%',
        backgroundColor: Colors.white,
        marginBottom: 12
    },
    product_row: {
        flexDirection: 'row',
        width: '100%',
        height: 100
    },
    company_row: {
        flexDirection: 'row',
        width: '100%',
        height: 40
    },
    image_container: {
        width: '30%'
    },
    product_container: {
        width: '50%',
    },
    price_container: {
        width: '20%',
        paddingTop: 10,
        paddingRight: 7
    },
    company_container: {
        width: '70%',
        alignItems: 'flex-start',
        paddingHorizontal: 5,
        flexDirection: 'row',

    },
    logo: { width: 30, height: 20, resizeMode: 'cover', marginTop: 10 },
    image: { width: '100%', height: 90, resizeMode: 'cover' },
    instore_container: { width: '15%', backgroundColor: Colors.dark_blue, alignItems: 'center' },
    btn_container: {
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.ocean
    },
    company: {
        marginTop: 10,
        marginLeft: 7
    },
    brand: {
        width: '100%',
        height: 15,
        backgroundColor: Colors.pink,
        alignItems: 'center',
    },
    brand_text: { color: Colors.white, fontSize: 10 },
    instock: {
        fontSize: 13,
        alignItems: 'stretch'
    },
    price: {
        fontWeight: '800',
        fontSize: 16,
    },
    reviews: {
        color: Colors.white,
        marginLeft: 6
    },
    view: {
        fontSize: 14,
        color: Colors.white,
        fontWeight: '700',
    },
    desc: { fontSize: 12 },
});

export default GiftItem