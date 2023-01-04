import { Api, Colors } from "meconnect-sdk";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, ScrollView, ToastAndroid, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MCHeader from "../components/MCHeader";
import Price from "../components/Price";
import HeaderOption from "../components/HeaderOption";
import HorizontalLine from "../components/HorizontalLine";

export default function ProductScreen({ navigation, route: { params: { id: productId } } }) {
    const [product, setProduct] = useState({
        price: 0,
        description: '...',
        images: []
    })

    function error() {
        ToastAndroid.show('Ocorreu um erro ao buscar os dados do produto', ToastAndroid.LONG)
        navigation.goBack()
    }

    function getProduct() {
        Api.db.products.get(productId).then(({ data: product, status }) => {
            if (status !== 200) error()
            setProduct(product)
        })
            .catch(() => error())
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar></StatusBar>
            <MCHeader title={'Produto'}>
                <HeaderOption noMargin onClick={() => navigation.goBack()}>
                    <Ionicons name="close" color={'white'} size={26}></Ionicons>
                </HeaderOption>
            </MCHeader>
            <ScrollView contentContainerStyle={styles.item}>
                <Text style={styles.description}>{product.description}</Text>
                <Price style={styles.price} value={product.price} />

                <HorizontalLine />

                <View>
                    <Image style={styles.photo} source={{ uri: product.images[0] }} resizeMode='stretch' />
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        {
                            product.images.slice(1, product.images.length).map((uri, i) => {
                                return <Image style={styles.sidePhotos} key={i} source={{ uri }} resizeMode='stretch' />
                            })
                        }
                    </View>
                </View>

            </ScrollView >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    item: {
        marginVertical: 8,
        marginHorizontal: 10,
        paddingBottom: 30,
    },
    backBtn: {
        marginLeft: 'auto',
        textAlign: 'left',
    },
   /*  header: {
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    }, */
    photo: {
        height: Dimensions.get('screen').width - 10,
        borderRadius: 10,
    },
    sidePhotos: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 5,
    },
    description: {
        // marginTop: 10,
        fontSize: 20,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        color: Colors.DarkOrange
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
