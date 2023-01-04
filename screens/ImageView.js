import { Colors } from "meconnect-sdk";
import { Pressable } from "react-native";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import HorizontalLine from "../components/HorizontalLine";

export default function ImageView({ navigation, route: { params: { uri } } }) {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'black'}></StatusBar>
            <Pressable style={styles.header} onPress={() => navigation.goBack()}>
                <Ionicons name="close" style={{marginLeft: 'auto', marginRight: 10, marginTop: 5}} color={'white'} size={38}></Ionicons>
            </Pressable>
            <Image
                style={styles.image}
                source={{ uri }}
                resizeMode={'contain'}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
    },
    header: {
        justifyContent: 'flex-end'
    },
    image: {
        marginTop: 'auto',
        marginBottom: 'auto',
        width: '100%',
        height: '100%',
    }
})