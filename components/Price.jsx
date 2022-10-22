import { Text } from "react-native";

export default function Price({ value, style }) {
    return (
        <Text style={style}>R${parseFloat(value).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Text>
    )
}
