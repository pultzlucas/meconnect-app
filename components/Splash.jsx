import { Colors } from "meconnect-sdk";
import { ActivityIndicator, StyleSheet } from "react-native";
import { View } from "react-native";

export default function Splash({ show = false }) {
    return show ?
        <View style={styles.container}>
            <ActivityIndicator style={styles.spinner} color={Colors.DarkOrange} size={'large'} />
        </View> :
        ''
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: '#fff',
    },

    spinner: {
        marginTop: 20,
    }
})