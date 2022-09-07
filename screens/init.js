import { Api, Colors } from "meconnect-sdk"
import { useEffect } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

export default function InitPages({ navigation }) {
    useEffect(() => {
        Api.token.isset().then(isset => {
            Api.token.get().then(console.log)

            if (isset) {
                navigation.navigate("CustomerScreens")
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