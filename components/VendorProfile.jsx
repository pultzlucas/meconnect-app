import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import * as SecureStore from 'expo-secure-store'
import Feather from "react-native-vector-icons/Feather";
import { Colors } from "meconnect-sdk";

export default function VendorProfile({ commercial, description, photo_url, banner_url, id, notify, navigation }) {
    return (
        <TouchableOpacity onPress={() => {
            SecureStore.getItemAsync('UserType').then(userType => {
                navigation.navigate('VendorProfileScreen', { userType, vendor_id: id })
            })
        }}>
            <View style={styles.item}>
                <Image style={styles.banner} source={{ uri: banner_url }} />
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{commercial}</Text>
                    <Text style={styles.desc}>{description}</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: photo_url }} />
                </View>
                {
                    (!notify && notify !== undefined) && <View style={styles.isNotifing}>
                        <Feather name={'bell-off'} color={Colors.LightGray} size={16}></Feather>
                    </View>
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 15,
        borderRadius: 8,
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        position: 'relative',
        marginTop: 30,
    },
    isNotifing: {
        position: 'absolute',
        right: 30,
        bottom: 26,
    },
    imageContainer: {
        position: 'absolute',
        backgroundColor: "#F3F3F3",
        padding: 5,
        borderRadius: 100,
        top: -15,
        elevation: 2,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    banner: {
        top: -25,
        position: 'absolute',
        width: '100%',
        height: 40,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    contentContainer: {
        backgroundColor: "#F3F3F3",
        padding: 20,
        width: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingTop: 30,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
    },
    desc: {
        textAlign: 'center',
        flexWrap: 'wrap',
        fontSize: 13,
        color: '#333333',
    },
})