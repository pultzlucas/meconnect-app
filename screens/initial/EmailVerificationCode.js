import { Api, Colors } from "meconnect-sdk"
import { ActivityIndicator, StyleSheet, Text, ToastAndroid, View } from "react-native"
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from "react"
import MCInput from '../../components/MCInput'
import MCButton from '../../components/MCButton'

export default function EmailVerificationCodeScreen({ navigation, route: { params: { user, userType } } }) {
    const [correctCode, setCorrectCode] = useState('000000')
    const [inputCode, setInputCode] = useState('000000')
    const [isLoading, setIsLoading] = useState(false)

    async function sendEmailVerificationCode() {
        setIsLoading(true)
        const { data: { code } } = await Api.db.mail.sendEmailVerificationCode(user.email, user.name)
        console.log(code)
        setCorrectCode(code)
        setIsLoading(false)
    }

    useEffect(() => {
        sendEmailVerificationCode().catch((err) => {
            console.log(err)
            ToastAndroid.show('Ocorreu um erro ao enviar o código de verificação', ToastAndroid.LONG)
        })
    }, [])

    function confirmVerificationCode() {
        if (inputCode !== correctCode) {
            ToastAndroid.show('Código de verificação incorreto', ToastAndroid.LONG)
            return
        }

        if (userType === 'customer') navigation.navigate('RegisterCustomerScreen', { customer: user })
        if (userType === 'vendor') navigation.navigate('RegisterVendorScreen', { vendor: user })
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Um código de confirmação de email foi enviado para <Text style={styles.email}>{user.email}</Text></Text>
            <MCInput style={styles.codeInput} placeholder={'Insira o código'} maxLength={6} type='numeric' onInput={txt => setInputCode(txt)} />
            <MCButton style={styles.btn} onClick={confirmVerificationCode} disabled={isLoading} isLoading={isLoading}>Ok</MCButton>
            <MCButton style={styles.btn} onClick={sendEmailVerificationCode} styleType='secondary'>Reenviar código</MCButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    codeInput: {
        marginTop: 20,
    },
    btn: {
        marginTop: 20,
    },
    email: {
        color: Colors.DarkOrange,
    }
})