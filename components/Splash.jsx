import { Colors } from "meconnect-sdk";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { View } from "react-native";

export default function Splash({ show = false, message = '', btn = <></> }) {
    return show ?
        <View style={styles.container}>
            {!message && <ActivityIndicator style={styles.spinner} color={Colors.DarkOrange} size={'large'} />}
            <Text style={styles.message}>{message}</Text>
            <View style={styles.btn}>
                {message && btn}
            </View>
        </View> :
        ''
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
    },

    spinner: {
        marginTop: 20,
    },
    message: {
        color: Colors.DarkOrange,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    btn: {
        marginTop: 20,
    },

})