import { StyleSheet, ToastAndroid, View } from 'react-native';
import { Input, Button, Text, ThemeContext } from 'react-native-elements';
import { TextElement } from 'react-native-elements/dist/text/Text';
import { Api } from 'meconnect-sdk';
import { useState } from 'react';
import MCButton from '../../components/MCButton';
import MCInput from '../../components/MCInput';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function RegistreCliente({ navigation }) {
  const [nome, setNome] = useState(null)
  const [senha, setSenha] = useState(null)
  const [email, setEmail] = useState(null)
  const [senha2, setSenha2] = useState(null)

  const [loading, setLoading] = useState(false)

  async function register() {
    if (senha !== senha2) {
      console.log('Senha de confirmação incorreta')
      return
    }

    setLoading(true)

    const { data, status } = await Api.db.customers.create({
      name: nome,
      password: senha,
      email: email,
      device_token: 'asdasd'
    })

    if (status === 200) {
      await Api.token.set(data.token)
      await AsyncStorage.setItem('@CustomerId', String(data.customer.id))
      await AsyncStorage.setItem('@UserType', 'customer')

      setLoading(false)
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
      navigation.popToTop()
      navigation.replace("CustomerScreens")
    }
    
  }

  return (
    <View style={styles.container}>

      <TextElement h20
      >Registre Sua Conta Cliente
      </TextElement>

      <MCInput
        style={styles.input}
        onInput={value => setNome(value)}
        placeholder="Nome Completo"
      />

      <MCInput
        style={styles.input}
        onInput={value => setEmail(value)}
        placeholder="Email"
      />

      <MCInput
        style={styles.input}
        onInput={value => setSenha(value)}
        placeholder="Sua Senha"
        secureTextEntry={true}
      />
      <MCInput
        style={styles.input}
        onInput={value => setSenha2(value)}
        placeholder="Repita a Senha"
        secureTextEntry={true}
      />

      <MCButton style={styles.btn} size='medium' isLoading={loading} onClick={register}>Registrar</MCButton>
    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: 10,
  },
  btn:  {
    marginTop: 10,
  },
});

