import { Pressable, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Input, Button, Text, ThemeContext } from 'react-native-elements';
import { TextElement } from 'react-native-elements/dist/text/Text';
import { Api, Colors } from 'meconnect-sdk';
import { useState } from 'react';
import MCButton from '../../components/MCButton';
import MCInput from '../../components/MCInput';
import Ionicons from "react-native-vector-icons/Ionicons";
import PasswordRequirements from '../../components/PasswordRequirements';
import passwordIsInvalid from '../../src/validate-password';


export default function RegistreCustomerScreen({ navigation }) {
  const [nome, setNome] = useState('')
  const [senha, setSenha] = useState('')
  const [email, setEmail] = useState('')
  const [senha2, setSenha2] = useState('')

  const [hidePass1, setHidePass1] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);

  function openEmailVerificationScreen() {
    if(!nome) {
      ToastAndroid.show('Digite seu nome', ToastAndroid.SHORT)
      return
    }

    if(!email) {
      ToastAndroid.show('Digite seu email', ToastAndroid.SHORT)
      return
    }

    const message = passwordIsInvalid(senha)
    if (message) {
      ToastAndroid.show(message, ToastAndroid.LONG)
      return
    }

    if (senha !== senha2) {
      ToastAndroid.show('Senha de confirmação incorreta', ToastAndroid.SHORT)
      return
    }

    navigation.navigate('EmailVerificationCodeScreen', {
      user: {
        name: nome,
        password: senha,
    
        email
      },
      userType: 'customer'
    })
  }

  return (
    <View style={styles.container}>
      <TextElement style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 20 }}>Registre Sua Conta Cliente</TextElement>

      <MCInput
        style={styles.input}
        onInput={(value) => setNome(value)}
        placeholder="Nome Completo"
      />

      <MCInput
        style={styles.input}
        onInput={(value) => setEmail(value)}
        placeholder="Email"
      />

      <PasswordRequirements style={styles.passRequirements} />

      <View style={styles.inputArea}>
        <MCInput
          style={styles.input}
          onInput={(value) => setSenha(value)}
          placeholder="Sua Senha"
          secureTextEntry={hidePass1}
        />
        <Pressable onPress={() => setHidePass1(!hidePass1)}>
          <Ionicons name={hidePass1 ? 'eye-off' : 'eye'} color={Colors.DarkGray} size={25} style={styles.icon} />
        </Pressable>
      </View>

      <View style={styles.inputArea}>
        <MCInput
          style={styles.input}
          onInput={(value) => setSenha2(value)}
          placeholder="Repita a Senha"
          secureTextEntry={hidePass2}
        />
        <Pressable onPress={() => setHidePass2(!hidePass2)}>
          <Ionicons name={hidePass2 ? 'eye-off' : 'eye'} color={Colors.DarkGray} size={25} style={styles.icon} />
        </Pressable>
      </View>

      <MCButton
        style={styles.btn}
        size="medium"
        onClick={openEmailVerificationScreen}
      >
        Registrar
      </MCButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    position: 'absolute',
    right: 10,
    bottom: -20
  },
  input: {
    marginTop: 10,
  },
  btn: {
    marginTop: 20,
    marginBottom: 50,
  },
  passRequirements: {
    width: 320,
    marginTop: 10,
  },
});