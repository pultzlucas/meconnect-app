import { Colors } from "meconnect-sdk";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

export default function PasswordRequirements({ style }) {
    return (
        <View style={[styles.container, { ...style }]}>
            <Text style={{ fontWeight: 'bold' }}>Senha deve possuir:</Text>

            <View style={styles.topic}>
                <Entypo name={'dot-single'} color={Colors.DarkGray} size={25} />
                <Text>Mais de 5 caracteres</Text>
            </View>
            <View style={styles.topic}>
                <Entypo name={'dot-single'} color={Colors.DarkGray} size={25} />
                <Text>Letra maiúscula</Text>
            </View>
            <View style={styles.topic}>
                <Entypo name={'dot-single'} color={Colors.DarkGray} size={25}/>
                <Text>Letra minúscula</Text>
            </View>
            <View style={styles.topic}>
                <Entypo name={'dot-single'} color={Colors.DarkGray} size={25} />
                <Text>Dígito</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    topic: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
})