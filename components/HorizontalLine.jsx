import { Colors } from "meconnect-sdk";
import { StyleSheet, View } from "react-native";

export default function HorizontalLine({ width, marginVertical = 10, color = Colors.Black }) {
    return (
        <View
            style={{
                borderBottomColor: color,
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginVertical,
                width,
            }}
        />
    )
}