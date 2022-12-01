import { Api, Colors } from "meconnect-sdk"
import { useEffect } from "react"
import { ActivityIndicator, StyleSheet, ToastAndroid, View } from "react-native"
import * as SecureStore from 'expo-secure-store'

export default function RegisterVendorScreen({ navigation, route: { params: { vendor } } }) {

    async function register() {
        const {name, email, commercial, description, cep, cnpj, tel, password} = vendor

        const { data, status } = await Api.db.vendors.create({
            cep,
            cnpj,
            commercial,
            description,
            email,
            name,
            password,
            tel,
            device_token: 'asd'
        })

        if (status === 200) {
            await Api.token.set(data.token)
            await SecureStore.setItemAsync('VendorId', String(data.vendor.id))
            await SecureStore.deleteItemAsync('CustomerId')
            await SecureStore.setItemAsync('UserType', 'vendor')

            ToastAndroid.show(data.message, ToastAndroid.SHORT);
            navigation.popToTop()
            navigation.replace("VendorScreens")
        } else {
            ToastAndroid.show(data.message, ToastAndroid.LONG);
        }
    }

    useEffect(() => {
        register().catch(err => {
            console.log(err)
            ToastAndroid.show('Ocorreu um erro ao cadastrar a conta', ToastAndroid.LONG)
            navigation.goBack()
        })
    }, [])

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors.DarkOrange} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    }
})