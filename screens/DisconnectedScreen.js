import { Colors } from "meconnect-sdk";
import { StatusBar, StyleSheet, Text, ToastAndroid, View } from "react-native";
import MCButton from "../components/MCButton";
import MCHeader from "../components/MCHeader";
import Feather from "react-native-vector-icons/Feather";

export default function DisconnectedScreen({ navigation }) {
    function tryAgain() {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.DarkOrange}></StatusBar>
            <MCHeader title={'Sem conexão'}></MCHeader>
            <Text style={styles.message}>Você está desconectado</Text>
            <Feather style={styles.icon} name="wifi-off" size={100} color={Colors.LightGray}></Feather>
            <MCButton onClick={tryAgain} style={styles.tryAgainBtn}>Tentar novamente</MCButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        display: 'flex',
        alignItems: 'center'
    },
    message: {
        fontSize: 20,
        marginTop: 20,
        color: Colors.DarkGray
    },
    icon: {
        marginTop: 20,
    },
    tryAgainBtn: {
        marginTop: 'auto',
        marginBottom: 20,
    }
})