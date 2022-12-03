import { Api, Colors } from "meconnect-sdk"
import { useEffect } from "react"
import { ActivityIndicator, StyleSheet, ToastAndroid, View } from "react-native"
import * as SecureStore from 'expo-secure-store'

export default function RegisterCustomerScreen({ navigation, route: { params: { customer: { name, email, password } } } }) {

    async function register() {
        const { data, status } = await Api.db.customers.create({
            name,
            password,
            email,
            device_token: await SecureStore.getItemAsync('DeviceToken')
        })

        if (status === 200) {
            await Api.token.set(data.token)
            await SecureStore.setItemAsync('CustomerId', String(data.customer.id))
            await SecureStore.setItemAsync('UserType', 'customer')

            ToastAndroid.show(data.message, ToastAndroid.SHORT);
            navigation.popToTop()
            navigation.replace("CustomerScreens")
        } else {
            ToastAndroid.show(data.message, ToastAndroid.LONG)
            navigation.goBack()
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