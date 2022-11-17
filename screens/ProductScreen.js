import { Api, Colors } from "meconnect-sdk";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MCButton from "../components/MCButton";
import MCHeader from "../components/MCHeader";
import Price from "../components/Price";
import HeaderOption from "../components/HeaderOption";
import HorizontalLine from "../components/HorizontalLine";

export default function ProductScreen({ navigation, route: { params: { id: productId } } }) {
    const [product, setProduct] = useState({
        price: 0,
        description: '...'
    })

    function getProduct() {
        Api.db.products.get(productId).then(({ data: product }) => {
            setProduct(product)
        })
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar></StatusBar>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <MCHeader>
                    <HeaderOption noMargin onClick={() => navigation.goBack()}>
                        <Ionicons style={styles.backBtn} name="arrow-back-outline" size={35} color={"#fff"} />
                    </HeaderOption>
                </MCHeader>
                <Image style={styles.photo} source={{ uri: product.photo_url }} />
                <Text style={styles.description}>{product.description}</Text>
                <Price style={styles.price} value={product.price} />
                <MCButton style={styles.btn}>Ver mais</MCButton>
                {
                    product.details && <>
                        <HorizontalLine width={300} marginVertical={20} title={'DETALHES'} />
                        <View style={styles.detailsContainer}>
                            <Text style={styles.details}>{product.details}</Text>
                        </View>
                    </>
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        backgroundColor: "#fff",
        flex: 1,
        // paddingBottom: 20,
    },
    backBtn: {
        marginLeft: 'auto',
        textAlign: 'left',
    },
    description: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 20,
        width: 300,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    photo: {
        width: 300,
        height: 300,
        borderWidth: 2,
        borderColor: Colors.LightGray,
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },
    btn: {
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    detailsContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    details: {
        width: 300,
    }
});
