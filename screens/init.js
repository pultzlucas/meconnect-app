import { useIsFocused } from "@react-navigation/native"
import { Api, Colors } from "meconnect-sdk"
import { useEffect } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import * as SecureStore from 'expo-secure-store'
import logout from "../src/logout-action"

export default function InitPages({ navigation }) {
    useEffect(() => {
        Api.token.isset().then(async isset => {
            if (isset) {
                if (await SecureStore.getItemAsync('UserType') === 'customer') navigation.navigate("CustomerScreens")
                if (await SecureStore.getItemAsync('UserType') === 'vendor') navigation.navigate("VendorScreens")
            } else {
                navigation.navigate("EscolherConta")
            }
        })
    }, [useIsFocused()])


    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors.DarkOrange} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})