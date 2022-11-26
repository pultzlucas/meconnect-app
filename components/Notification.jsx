import AsyncStorage from "@react-native-async-storage/async-storage"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import * as SecureStore from 'expo-secure-store'
import { Colors } from "meconnect-sdk"
import Date from "./Date"

export default function VendorProfile({ id, created_at, event, message, vendor }) {
    return (
        <View style={styles.item} key={id}>
            <View style={styles.vendorContainer}>
                <Image style={styles.image} source={{ uri: vendor.photo_url }} />
                <Text style={styles.title}>{vendor.commercial}</Text>
                <Date style={styles.created_at} date={created_at} />
            </View>
            <Text style={styles.desc}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#F3F3F3",
        paddingHorizontal: 14,
        paddingTop: 10,
        paddingBottom: 20,
        borderRadius: 8,
        marginVertical: 5,
        marginHorizontal: 12,
    },
    vendorContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
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
    event: {
        color: Colors.Black,
        fontSize: 12,
        textAlign: "right",
        fontWeight: "bold",
        paddingBottom: 0,
    },
    created_at: {
        fontSize: 12,
        color: Colors.DarkGray,
        textAlign: 'right',
        flex: 1,
    },
    itemHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 100,
        marginRight: 10,
        borderWidth: 2,
    },
})