import { Colors } from "meconnect-sdk"
import { StyleSheet, Text, View } from "react-native"


export default function VendorProfileTopic({ title, info, style }) {
    return (
        <View style={[styles.container, {...style}]}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.info}>{info}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.DarkOrange,
        borderWidth: 2,
        borderRadius: 10,
        width: '90%',
        marginTop: 10,
    },
    title: {
        backgroundColor: Colors.DarkOrange,
        padding: 10,
        fontSize: 16,
        color: 'white',
        borderBottomLeftRadius: 6,
        borderTopLeftRadius: 6,
        fontWeight: 'bold',
    },
    info: {
        fontSize: 16,
        textAlign: 'center',
        margin: 'auto',
        flex: 1,
    },
})