import { Api, Colors } from "meconnect-sdk";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, ScrollView, ToastAndroid } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MCHeader from "../components/MCHeader";
import Price from "../components/Price";
import HeaderOption from "../components/HeaderOption";

export default function ProductScreen({ navigation, route: { params: { id: productId } } }) {
    const [product, setProduct] = useState({
        price: 0,
        description: '...'
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
                <Image style={styles.photo} source={{ uri: product.photo_url }} resizeMode='stretch'/>
                <Text style={styles.description}>{product.description}</Text>
                <Price style={styles.price} value={product.price} />
                {/* <MCButton style={styles.btn}>Ver mais</MCButton> */}
                {
                   /*  product.details && <>
                        <HorizontalLine width={300} marginVertical={20} title={'DETALHES'} titleBackgroundColor='#F3F3F3' />
                        <View style={styles.detailsContainer}>
                            <Text style={styles.details}>{product.details}</Text>
                        </View>
                    </> */
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    item: {
        backgroundColor: '#f3f3f3',
        paddingHorizontal: 14,
        paddingTop: 10,
        paddingBottom: 20,
        borderRadius: 8,
        marginVertical: 8,
        marginHorizontal: 16,
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
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        backgroundColor: 'white',
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
