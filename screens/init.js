import AsyncStorage from "@react-native-async-storage/async-storage"
import { Api, Colors } from "meconnect-sdk"
import { useEffect } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

export default function InitPages({ navigation }) {
    useEffect(() => {
        Api.token.isset().then(async isset => {
            if (isset) {
                if (await AsyncStorage.getItem('@UserType') === 'customer') navigation.navigate("CustomerScreens")
                if (await AsyncStorage.getItem('@UserType') === 'vendor') navigation.navigate("VendorScreens")
            } else {
                navigation.navigate("EscolherConta")
            }
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
        justifyContent: 'center'
    }
})