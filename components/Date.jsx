import { Text } from "react-native";

export default function Date({ date, style }) {
    return (
        <Text style={style}>{String(date).replace('T', ' ').replace('.000000Z', '').replace(/-/g, '/')}</Text>
    )
}
