import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
// import formatDateString from "../format-date-string"
import { Api, Colors } from 'meconnect-sdk'
import { ToastAndroid } from "react-native";
import OptionMenu from "react-native-option-menu";
import Entypo from "react-native-vector-icons/Entypo";
import Price from "./Price";

export default function Product({ id, description, photo_url, price, onRemove, onEdit, options = false }) {

    async function deleteProduct() {
        try {
            const { status } = await Api.db.products.delete(id)
            if (status === 200) {
                onRemove(id)
                ToastAndroid.show('Produto foi deletado', ToastAndroid.SHORT);
            }
        } catch (error) {
            ToastAndroid.show('Ocorreu um erro ao deletar o produto', ToastAndroid.LONG);
        }
    }


    return (
        <View style={styles.container}>
            {options && <View style={styles.prodHeader}>
                <OptionMenu
                    customButton={<Entypo name="dots-three-horizontal" size={20} color={Colors.DarkGray}></Entypo>}
                    destructiveIndex={1}
                    options={["Editar", "Delete", "Cancel"]}
                    actions={[onEdit, deleteProduct]}>
                </OptionMenu>
            </View>}
            <Image style={styles.prodImg} source={{ uri: photo_url }} resizeMode='stretch' />
            <Text style={styles.desc} numberOfLines={1}>
                {description}
            </Text>
            <Price style={styles.val} value={price} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F3F3F3",
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingTop: 8,
        paddingBottom: 14,
        borderRadius: 8,
        marginHorizontal: 16,
        marginBottom: 10
    },
    prodHeader: {
        marginLeft: 'auto',
        marginBottom: 6,
    },
    prodImg: {
        width: 300,
        height: 300,
        width: "100%",
        borderRadius: 8,
        marginBottom: 10,
    },
    desc: {
        fontSize: 15,
        marginTop: 10,
        marginBottom: 0,
    },
    val: {
        fontSize: 15,
        fontWeight: "bold",
        paddingTop: 6,
    },
})