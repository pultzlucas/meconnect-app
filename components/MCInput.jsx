import { Colors } from "meconnect-sdk";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native"

export default function MCInput({ type = 'text', placeholder, onInput, value, label, style, secureTextEntry, editable = true, maxLength }) {
    return (
        <View>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, {...style}]}
                onChangeText={onInput}
                placeholder={placeholder}
                keyboardType={type}
                value={value}
                editable={editable}
                secureTextEntry={secureTextEntry}
                selectionColor='#FFCCA0'
                maxLength={maxLength}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: '#F9F9F9',
        borderColor: '#EEEEEE',
        color: Colors.Black,
        fontSize: 16,
        borderWidth: 2,
        borderRadius: 12,
        width: 320,
        elevation: 3,
    },
    label: {
        color: Colors.DarkGray,
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    }
})