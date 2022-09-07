import { StyleSheet, View } from "react-native";

export default function HorizontalLine({ width, marginVertical = 10 }) {
    return (
        <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginVertical,
                width,
            }}
        />
    )
}