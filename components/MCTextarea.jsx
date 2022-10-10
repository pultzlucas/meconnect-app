import { Colors } from "meconnect-sdk";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native";
import { Input } from "react-native-elements";

export default function MCTextarea({ placeholder, children = '', label, lines = 2, onInput }) {
    return (
        <View>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                placeholder={placeholder}
                multiline
                editable
                numberOfLines={lines}
                style={styles.textarea}
                value={String(children)}
                onChangeText={onInput}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textarea: {
        padding: 10,
        backgroundColor: '#F9F9F9',
        borderColor: '#EEEEEE',
        color: Colors.Black,
        fontSize: 16,
        borderWidth: 2,
        borderRadius: 12,
        width: 320,
        elevation: 3,
        textAlignVertical: 'top',
    },
    label: {
        color: Colors.DarkGray,
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    }
})