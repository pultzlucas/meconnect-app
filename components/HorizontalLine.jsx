import { Colors } from "meconnect-sdk";
import { StyleSheet, Text, View } from "react-native";

export default function HorizontalLine({ width = '100%', marginVertical = 10, color = Colors.Black, title }) {
    return (
        <View style={styles({ color, marginVertical, width }).line}>
            {title && <Text style={styles({ color, marginVertical, width }).title}>{title}</Text>}
        </View>
    )
}

const styles = ({ color, marginVertical, width }) => StyleSheet.create({
    line: {
        borderBottomColor: color,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical,
        width,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    title: {
        position: 'absolute',
        top: -11,
        backgroundColor: 'white',
        textAlign: 'center',
        width: 100,
        left: '50%',
        transform: [
            { translateX: -50 }
        ]
    }
})