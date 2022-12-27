import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const GiftItem = props => {

    const product = props.gift;

    return (
        <View>
            <Text>{product.productDescription} {product.productPrice}</Text>
        </View>
    );

}

export default GiftItem