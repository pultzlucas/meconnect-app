<<<<<<< HEAD:screens/initial/RegistreCliente.js
import { StyleSheet, ToastAndroid, View, TouchableOpacity } from "react-native";
import { Input, Button, Text, ThemeContext } from "react-native-elements";
import { TextElement } from "react-native-elements/dist/text/Text";
import { Api, Colors } from "meconnect-sdk";
import { useState } from "react";
import MCButton from "../../components/MCButton";
import MCInput from "../../components/MCInput";
import * as SecureStore from "expo-secure-store";
import Ionicons from "react-native-vector-icons/Ionicons";


export default function RegistreCliente({ navigation }) {
  const [nome, setNome] = useState(null);
  const [senha, setSenha] = useState(null);
  const [email, setEmail] = useState(null);
  const [senha2, setSenha2] = useState(null);

  const [loading, setLoading] = useState(false);

  async function register() {
    if (senha !== senha2) {
      ToastAndroid.show("Senha de confirmação incorreta", ToastAndroid.SHORT);
      return;
    }

    setLoading(true);

    const { data, status } = await Api.db.customers.create({
      name: nome,
      password: senha,
      email: email,
      device_token: "asdasd",
    });

    if (status === 200) {
      await Api.token.set(data.token);
      await SecureStore.setItemAsync("CustomerId", String(data.customer.id));
      await SecureStore.setItemAsync("UserType", "customer");

      setLoading(false);
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
      navigation.popToTop();
      navigation.replace("CustomerScreens");
    } else {
      setLoading(false);
      ToastAndroid.show(data.message, ToastAndroid.LONG);
    }
=======
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { Input, Button, Text, ThemeContext } from 'react-native-elements';
import { TextElement } from 'react-native-elements/dist/text/Text';
import { Api } from 'meconnect-sdk';
import { useState } from 'react';
import MCButton from '../../components/MCButton';
import MCInput from '../../components/MCInput';


export default function RegistreCustomerScreen({ navigation }) {
  const [nome, setNome] = useState(null)
  const [senha, setSenha] = useState(null)
  const [email, setEmail] = useState(null)
  const [senha2, setSenha2] = useState(null)

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
>>>>>>> 9a60038 (add account verification via email):screens/initial/CustomerForm.js
  }

const [hidePass1, setHidePass1] = useState(true);
const [hidePass2, setHidePass2] = useState(true);


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
        <TouchableOpacity onPress={() => setHidePass1(!hidePass1)}>
          <Ionicons name="eye" color="#9f9f9" size={25} style={styles.icon}/>
        </TouchableOpacity>
      </View>

<<<<<<< HEAD:screens/initial/RegistreCliente.js
      <View style={styles.inputArea}>
        <MCInput
          style={styles.input}
          onInput={(value) => setSenha2(value)}
          placeholder="Repita a Senha"
          secureTextEntry={hidePass2}
        />
        <TouchableOpacity onPress={() => setHidePass2(!hidePass2)}>
          <Ionicons name="eye" color="#9f9f9" size={25} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <MCButton
        style={styles.btn}
        size="medium"
        isLoading={loading}
        onClick={register}
      >
        Registrar
      </MCButton>

      <Text style={styles.senha}>
        Sua senha precisa: {"\n"}
        {"\n"}- Possuir uma letra maiúcula; {"\n"}- Possir uma letra minúscula;{" "}
        {"\n"}- Possuir um número.
      </Text>
=======
      <MCButton style={styles.btn} size='medium' onClick={openEmailVerificationScreen}>Registrar</MCButton>
>>>>>>> 9a60038 (add account verification via email):screens/initial/CustomerForm.js
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
