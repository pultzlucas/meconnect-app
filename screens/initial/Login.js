import { StyleSheet, ToastAndroid, View } from 'react-native';
import { Input, Button, Text, ThemeContext } from 'react-native-elements';
import { TextElement } from 'react-native-elements/dist/text/Text';
import { useState } from 'react';
import { Api } from 'meconnect-sdk';
import MCButton from '../../components/MCButton';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [loading, setLoading] = useState(false)

  async function login() {
    setLoading(true)
    const { data, status } = await Api.login({
      email: email,
      password: password,
      device_token: 'asdasd'
    })

    if (status === 200) {
      ToastAndroid.show('Login efetuado com sucesso', ToastAndroid.SHORT);
      
      await Api.token.set(data.token)

      AsyncStorage.setItem('@UserType', data.user_type)

      if(data.user_type === 'customer') {
        AsyncStorage.setItem('@CustomerId', String(data.id))
      } 
      
      if(data.user_type === 'vendor') {
        AsyncStorage.setItem('@VendorId', String(data.id))
      } 

      navigation.navigate("CustomerScreens")
      return
    }
    
    setLoading(false)
    ToastAndroid.show('Email ou senha incorretos', ToastAndroid.SHORT);
  }

  return (
    <View style={styles.container}>

      <Text>Digite as credenciais para acessar sua conta</Text>

      <Input
        onChangeText={value => setEmail(value)}
        placeholder="E-mail"
      />

      <Input
        onChangeText={value => setPassword(value)}
        placeholder="Sua Senha"
        secureTextEntry={true}
      />

      <MCButton size='medium' isLoading={loading} onClick={login}>Login</MCButton>
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
});
