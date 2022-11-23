import { Alert, Image, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native"

import MCHeader from '../../components/MCHeader'
import MCInput from '../../components/MCInput'
import HeaderOption from '../../components/HeaderOption'

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { Api, Media } from "meconnect-sdk";
import MCTextarea from "../../components/MCTextarea";
import Splash from "../../components/Splash";
import * as SecureStore from 'expo-secure-store'

export default function EditProfile({ navigation }) {
    const [vendorId, setVendorId] = useState('')
    const [initialVendor, setInitialVendor] = useState('')

    const [vendorPhotoUrl, setVendorPhotoUrl] = useState('#')
    const [vendorBannerUrl, setVendorBannerUrl] = useState('#')

    const [vendorName, setVendorName] = useState('')
    const [vendorCommercial, setVendorCommercial] = useState('')
    const [vendorCnpj, setVendorCnpj] = useState('')

    const [vendorDescription, setVendorDescription] = useState('')
    const [vendorEmail, setVendorEmail] = useState('')
    const [vendorTel, setVendorTel] = useState('')
    const [vendorCep, setVendorCep] = useState('')
    const [vendorBio, setVendorBio] = useState('')

    const [showSplash, setShowSplash] = useState(false)

    const [hasChanges, setHasChanges] = useState(false)

    useEffect(() => {
        setShowSplash(true)
        SecureStore.getItemAsync('VendorId').then(async vendorIdRes => {
            setVendorId(vendorIdRes)
            Api.db.vendors.get(vendorIdRes).then(({ data }) => {
                setInitialVendor(data)

                setVendorCommercial(data.commercial)
                setVendorName(data.name)
                setVendorCnpj(data.cnpj)
                setVendorPhotoUrl(data.photo_url)
                setVendorBannerUrl(data.banner_url)
                setVendorDescription(data.description)
                setVendorEmail(data.email)
                setVendorTel(data.tel)
                setVendorCep(data.cep)
                setVendorBio(data.bio)

                setShowSplash(false)
            })
        })
    }, [])

    async function updateVendorPhoto() {
        const newPhoto = await Media.pickImage({
            aspect: [3, 3]
        })

        if (!newPhoto.uri) return
        setVendorPhotoUrl(newPhoto.uri)
    }

    async function updateVendorBanner() {
        const newPhoto = await Media.pickImage({
            aspect: [3, 1]
        })
        if (!newPhoto.uri) return
        setVendorBannerUrl(newPhoto.uri)
    }


    async function saveChanges() {
        setShowSplash(true)

        const { data, status: saveData } = await Api.db.vendors.update(vendorId, {
            commercial: vendorCommercial,
            description: vendorDescription,
            tel: vendorTel,
            cep: vendorCep,
            bio: vendorBio,
        })

        let saveBanner = vendorBannerUrl === initialVendor.banner_url
            ? 200
            : (await Api.db.vendors.setProfileBanner(vendorId, vendorBannerUrl)).status

        let savePhoto = vendorPhotoUrl === initialVendor.photo_url
            ? 200
            : (await Api.db.vendors.setProfilePhoto(vendorId, vendorPhotoUrl)).status

        if ([saveData, saveBanner, savePhoto].every(status => status === 200)) {
            ToastAndroid.show(data.message, ToastAndroid.SHORT);
            navigation.navigate('VendorScreens', { 'reload': true })
            setShowSplash(false)
        }
    }

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

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <StatusBar></StatusBar>

                <MCHeader title={'Editar perfil'}>
                    <HeaderOption onClick={saveChanges}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Salvar</Text>
                    </HeaderOption>
                    <HeaderOption onClick={exitEdition}>
                        <Ionicons name="close" color={'white'} size={26}></Ionicons>
                    </HeaderOption>
                </MCHeader>
                <View>
                    <View style={styles.header}>
                        <Image style={styles.banner} source={{ uri: vendorBannerUrl }} />
                        <Image style={styles.logo} source={{ uri: vendorPhotoUrl }} />
                        <Pressable onPress={updateVendorBanner} style={[styles.bannerEditBtn, styles.editMediaBtn]}>
                            <FontAwesome name="camera" size={20}></FontAwesome>
                        </Pressable>
                        <Pressable onPress={updateVendorPhoto} style={[styles.photoEditBtn, styles.editMediaBtn]}>
                            <FontAwesome name="camera" size={20}></FontAwesome>
                        </Pressable>
                    </View>

                    <View style={styles.form}>
                        <MCInput label={'Nome'} editable={false} value={vendorName}></MCInput>
                        <MCInput label={'Fantasia'} onInput={text => { setVendorCommercial(text); setHasChanges(true) }} value={vendorCommercial}></MCInput>
                        <MCInput label={'Descrição'} onInput={text => { setVendorDescription(text); setHasChanges(true) }} value={vendorDescription}></MCInput>
                        <MCInput label={'CNPJ'} editable={false} value={vendorCnpj}></MCInput>
                        <MCInput label={'Email'} editable={false} value={vendorEmail}></MCInput>
                        <MCInput label={'Telefone'} onInput={text => { setVendorTel(text); setHasChanges(true) }} value={vendorTel}></MCInput>
                        <MCInput label={'CEP'} onInput={text => { setVendorCep(text); setHasChanges(true) }} value={vendorCep}></MCInput>
                        <MCTextarea label={'Bio'} onInput={text => { setVendorBio(text); setHasChanges(true) }}>{vendorBio}</MCTextarea>
                    </View>
                    <Splash show={showSplash} />
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginBottom: 20
    },
    header: {
        height: 140,
        width: '100%',
        position: 'relative',
        marginBottom: 70,
    },
    banner: {
        width: "100%",
        height: '100%',
    },
    logo: {
        position: 'absolute',
        bottom: -70,
        left: '50%',
        transform: [{ translateX: -75 }],
        borderColor: "#ffffff",
        width: 140,
        height: 140,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: '#eee',
    },
    editMediaBtn: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 100,
    },
    bannerEditBtn: {
        margin: 10,
        right: 0,
    },
    photoEditBtn: {
        left: '50%',
        bottom: -79,
        borderWidth: 5,
        borderColor: '#eee',
    },
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})