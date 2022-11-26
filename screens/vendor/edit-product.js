import { Alert, Image, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity } from "react-native"
import { View } from "react-native";

import MCHeader from '../../components/MCHeader'
import MCInput from '../../components/MCInput'
import HeaderOption from '../../components/HeaderOption'

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Api, Colors, Media } from "meconnect-sdk";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Splash from "../../components/Splash";
import * as SecureStore from 'expo-secure-store'

export default function EditProduct({ navigation, route: { params: { id: productId } } }) {
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [imageUrl, setImageUrl] = useState('')
    const [showSplash, setShowSplash] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)

    const [initialProduct, setInitialProduct] = useState(null)

    async function pickProductImage() {
        const { uri } = await Media.pickImage({
            aspect: [3, 3]
        })
        if (uri) setImageUrl(uri)
    }

    function error() {
        ToastAndroid.show('Ocorreu um erro ao buscar os dados do produto', ToastAndroid.LONG)
        navigation.goBack()
    }

    useEffect(() => {
        setShowSplash(true)
        Api.db.products.get(productId).then(({ data: product, status }) => {
            if (status !== 200) error()
            setInitialProduct(product)
            setPrice(String(parseFloat(product.price).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')))
            setDescription(product.description)
            setImageUrl(product.photo_url)
            setShowSplash(false)
        })
            .catch(() => error())
    }, [])

    function exitEdition() {
        if (hasChanges) {
            Alert.alert(
                "Tem certeza que deseja descartar as alterações?",
                false,
                [
                    {
                        text: "Sim",
                        onPress: () => navigation.navigate('VendorScreens'),
                        style: "default",
                    },
                    {
                        text: "Não",
                        style: "cancel",
                    },
                ],
                {
                    cancelable: true,
                }
            )
        } else {
            navigation.navigate('VendorScreens')
        }
    }

    async function updateProduct() {
        setShowSplash(true)

        try {
            if (!description) {
                setShowSplash(false)
                ToastAndroid.show('Por favor insira a descrição do produto', ToastAndroid.LONG)
                return
            }

            if (!price) {
                setShowSplash(false)
                ToastAndroid.show('Por favor insira o preço do produto', ToastAndroid.LONG)
                return
            }

            if (!imageUrl) {
                setShowSplash(false)
                ToastAndroid.show('Por favor insira a foto do produto', ToastAndroid.LONG)
                return
            }

            const { status } = await Api.db.products.update(productId, {
                description,
                price: String(price).replace(/,/g, '.'),
            })

            if (status !== 200) throw ''

            if (initialProduct.photo_url !== imageUrl) {
                const { status } = await Api.db.products.setPhoto(productId, imageUrl)
                if (status !== 200) throw ''
            }

            ToastAndroid.show('As alterações foram salvas', ToastAndroid.SHORT)
            navigation.goBack()

        } catch (error) {
            ToastAndroid.show('Ocorreu um erro ao editar o produto', ToastAndroid.LONG)
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{paddingBottom: 10,}}>
                <StatusBar></StatusBar>
                <MCHeader title={'Editar produto'}>
                    <HeaderOption onClick={updateProduct}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Salvar</Text>
                    </HeaderOption>
                    <HeaderOption onClick={exitEdition}>
                        <Ionicons name="close" color={'white'} size={26}></Ionicons>
                    </HeaderOption>
                </MCHeader>

                <View style={styles.form}>
                    <MCInput label={'Descrição'} onInput={text => { setDescription(text); setHasChanges(true) }} value={description}></MCInput>
                    <MCInput label={'Preço'} type='numeric' onInput={text => { setPrice(text); setHasChanges(true) }} value={price}></MCInput>

                    <View style={styles.prodImagePickerContainer}>
                        <Text style={styles.imagePickerTitle}>Foto</Text>
                        <Text>Escolha um arquivo de imagem</Text>
                        <TouchableOpacity style={styles.prodImagePickerBtn} onPress={pickProductImage}>
                            {
                                imageUrl && <Image style={styles.prodImg} source={{ uri: imageUrl }} resizeMode='stretch' />
                            }
                        </TouchableOpacity>
                    </View>
                    <Splash show={showSplash} />
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    form: {
        display: 'flex',
        alignItems: 'center',
    },
    prodImagePickerContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    imagePickerTitle: {
        color: Colors.DarkGray,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    prodImagePickerBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 300,
        borderWidth: 2,
        borderColor: Colors.LightGray,
        borderRadius: 10,
        marginTop: 10,
    },
    prodImg: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
})