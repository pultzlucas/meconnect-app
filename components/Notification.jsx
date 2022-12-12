import AsyncStorage from "@react-native-async-storage/async-storage"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import * as SecureStore from 'expo-secure-store'
import { Colors } from "meconnect-sdk"
import Date from "./Date"

export default function Notification({ created_at, message, vendor, user, event }) {

    function CustomerNotification() {
        return <>
            <View style={styles.vendorContainer}>
                <Image style={styles.image} source={{ uri: vendor.photo_url }} />
                <Text style={styles.title}>{vendor.commercial}</Text>
                <Date style={styles.created_at} date={created_at} />
            </View>
            <Text style={styles.message}>{message}</Text>
        </>
    }

    function VendorNotification() {
        return <>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.userEmail}>{user.email}</Text>
                <Date style={styles.created_at} date={created_at} />
            </View>
            <View style={styles.messageContainer}>
                <Text style={[styles.message, { fontWeight: 'bold' }]}>{user.name}</Text>
                <Text style={styles.message}>{String(message).replace(user.name, '')}</Text>
            </View>
        </>
    }

    return (
        <View style={styles.item}>
            {(event === 'new_post' || event === 'new_product') && <CustomerNotification />}
            {(event === 'post_like' || event === 'new_connection') && <VendorNotification />}
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
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        flexWrap: 'wrap'
    },
    message: {
        lineHeight: 14,
        fontSize: 14,
        marginTop: 10,
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
    userEmail: {
        fontSize: 12,
        color: Colors.DarkGray,
        fontStyle: 'italic',
    }
})