import { StyleSheet, View } from 'react-native';
import { Input, Button, Text, ThemeContext } from 'react-native-elements';
import { TextElement } from 'react-native-elements/dist/text/Text';
import { useState } from 'react';
import { Api } from 'meconnect-sdk';
import MCButton from '../../components/MCButton';




export default function Login({ navigation }) {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  async function login() {
    const {data, status} = await Api.login({
      email: email, 
      password: password,
      device_token: 'asdasd'
    })
    
    if(status === 200) {
      console.log('Logado com sucesso')
      await Api.token.set(data.token)
      
      console.log(await Api.token.get())

      navigation.navigate("CustomerScreens")
      return 
    }

    console.log('Erro ao fazer login')
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

      <MCButton size='medium' onClick={login}>Login</MCButton>
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
