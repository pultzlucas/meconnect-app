import { Image, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity } from "react-native"
import { View } from "react-native";

import MCHeader from '../../components/MCHeader'
import MCInput from '../../components/MCInput'
import HeaderOption from '../../components/HeaderOption'

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Api, Colors, Media } from "meconnect-sdk";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Splash from "../../components/Splash";
import * as SecureStore from 'expo-secure-store'

export default function CreateProduct({ navigation }) {
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [imageUrl, setImageUrl] = useState('')

    const [showSplash, setShowSplash] = useState(false)

    async function pickProductImage() {
        const { uri } = await Media.pickImage({
            aspect: [3, 3]
        })
        setImageUrl(uri)
    }

    async function publishProduct() {
        try {
            setShowSplash(true)

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

            const { data, status: saveData } = await Api.db.products.create({
                vendor_id: await SecureStore.getItemAsync('VendorId'),
                description,
                price: String(price).replace(/,/g, '.')
            })

            const { status: saveImage, data: msg } = await Api.db.products.setPhoto(data.product.id, imageUrl)

            if (saveData === 200 && saveImage === 200) {
                ToastAndroid.show('Produto foi publicado', ToastAndroid.SHORT)
                navigation.navigate('VendorScreens')
                setShowSplash(false)
            } else {
                ToastAndroid.show('Ocorreu im erro ao publicar o produto', ToastAndroid.LONG)
            }
        } catch (error) {
            ToastAndroid.show('Ocorreu im erro ao publicar o produto', ToastAndroid.LONG)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{paddingBottom: 10}}>
                <StatusBar></StatusBar>
                <MCHeader title={'Adicionar produto'}>
                    <HeaderOption onClick={publishProduct}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Publicar</Text>
                    </HeaderOption>
                    <HeaderOption onClick={() => navigation.navigate('VendorScreens')}>
                        <Ionicons name="close" color={'white'} size={26}></Ionicons>
                    </HeaderOption>
                </MCHeader>

                <View style={styles.form}>
                    <MCInput label={'Descrição'} onInput={text => setDescription(text)} value={description}></MCInput>
                    <MCInput label={'Preço'} type='numeric' onInput={text => setPrice(text)} value={price}></MCInput>

                    <View style={styles.prodImagePickerContainer}>
                        <Text style={styles.imagePickerTitle}>Foto</Text>
                        <Text>Escolha um arquivo de imagem</Text>
                        <TouchableOpacity style={styles.prodImagePickerBtn} onPress={pickProductImage}>
                            {
                                !imageUrl
                                    ? <FontAwesome name="camera" size={40}></FontAwesome>
                                    : <Image style={styles.prodImg} source={{ uri: imageUrl }} resizeMode='stretch' />
                            }

                        </TouchableOpacity>
                    </View>
                    <Splash show={showSplash} />
                </View>
            </ScrollView>
        </SafeAreaView>
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