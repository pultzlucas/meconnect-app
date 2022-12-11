import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
// import formatDateString from "../format-date-string"
import { Api, Colors } from 'meconnect-sdk'
import { ToastAndroid } from "react-native";
import OptionMenu from "react-native-option-menu";
import Entypo from "react-native-vector-icons/Entypo";
import Price from "./Price";
import { useEffect } from "react";
import { useState } from "react";

export default function Product({
    id,
    description,
    photo_url,
    price,
    onRemove,
    onEdit,
    options = false,
    vendorId,
    navigation
}) {
    const [vendor, setVendor] = useState(null)

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

    useEffect(() => {
        if (vendorId) {
            Api.db.vendors.get(vendorId).then(({ data: vendor }) => {
                console.log(vendor)
                setVendor(vendor)
            })
        }
    }, [])


    return (

        <View style={[styles.container, { height: (vendorId && !vendor) ? 300 : 'auto' }]}>
            {
                ((vendorId && vendor) || !vendorId) && <>
                    {options && <View style={styles.prodHeader}>
                        <OptionMenu
                            customButton={<Entypo name="dots-three-horizontal" size={20} color={Colors.DarkGray}></Entypo>}
                            destructiveIndex={1}
                            options={["Editar", "Delete", "Cancel"]}
                            actions={[onEdit, deleteProduct]}>
                        </OptionMenu>
                    </View>}
                    {
                        (!options && vendorId && vendor) && <View style={styles.vendorContainer}>
                            <Image style={styles.image} source={{ uri: vendor.photo_url }} />
                            <Text style={styles.title}>{vendor.commercial}</Text>
                        </View>
                    }

                    <TouchableOpacity onPress={() => navigation.navigate('ProductScreen', { id })}
                        style={{ width: '100%', alignItems: 'center' }}>
                        <Image style={styles.prodImg} source={{ uri: photo_url }} resizeMode='stretch' />
                        <Text style={styles.desc} numberOfLines={1}>
                            {description}
                        </Text>
                        <Price style={styles.val} value={price} />
                    </TouchableOpacity>
                </>
            }

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
    vendorContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginRight: 'auto'
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333333",
    },
    desc: {
        fontSize: 14,
        color: "#333333",
        marginTop: 5,
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 100,
        marginRight: 10,
    },
})