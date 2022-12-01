import { Pressable, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Input, Button, Text, ThemeContext } from 'react-native-elements';
import { TextElement } from 'react-native-elements/dist/text/Text';
import { Api, Colors } from 'meconnect-sdk';
import { useState } from 'react';
import MCButton from '../../components/MCButton';
import MCInput from '../../components/MCInput';
import Ionicons from "react-native-vector-icons/Ionicons";


export default function RegistreCustomerScreen({ navigation }) {
  const [nome, setNome] = useState(null)
  const [senha, setSenha] = useState(null)
  const [email, setEmail] = useState(null)
  const [senha2, setSenha2] = useState(null)
  
  const [hidePass1, setHidePass1] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);

  function openEmailVerificationScreen() {
    if (senha !== senha2) {
      ToastAndroid.show('Senha de confirmação incorreta', ToastAndroid.SHORT)
      return
    }

    console.log('1')

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
      <TextElement h20>Registre Sua Conta Cliente</TextElement>

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

      <View style={styles.inputArea}>
        <MCInput
          style={styles.input}
          onInput={(value) => setSenha(value)}
          placeholder="Sua Senha"
          secureTextEntry={hidePass1}
        />
        <Pressable onPress={() => setHidePass1(!hidePass1)}>
        <Ionicons name={ hidePass1 ? 'eye-off' : 'eye'} color={Colors.DarkGray} size={25} style={styles.icon} />
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
          <Ionicons name={ hidePass2 ? 'eye-off' : 'eye'} color={Colors.DarkGray} size={25} style={styles.icon} />
        </Pressable>
      </View>

      <MCButton
        style={styles.btn}
        size="medium"
        onClick={openEmailVerificationScreen}
      >
        Registrar
      </MCButton>

      <Text style={styles.senha}>
        Sua senha precisa: {"\n"}
        {"\n"}- Possuir uma letra maiúcula; {"\n"}- Possir uma letra minúscula;{" "}
        {"\n"}- Possuir um número.
      </Text>
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
  inputArea:{
    flexDirection:'row',
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
    marginTop: 10,
    marginBottom: 50,
  },
  senha: {
    textAlign: "center",
    borderColor: Colors.LightGray,
    borderWidth: 7,
    borderRadius: 10,
    padding: 9,
  },
});