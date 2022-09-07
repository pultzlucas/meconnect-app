import { StyleSheet, View } from 'react-native';
import { Input, Button, Text, ThemeContext } from 'react-native-elements';
import { TextElement } from 'react-native-elements/dist/text/Text';
import { Api } from 'meconnect-sdk';
import { useState } from 'react';
import MCButton from '../../components/MCButton';



export default function RegistreCliente({ navigation }) {
  const [nome, setNome] = useState(null)
  const [senha, setSenha] = useState(null)
  const [email, setEmail] = useState(null)
  const [senha2, setSenha2] = useState(null)

  async function register() {
    if (senha !== senha2) {
      console.log('Senha de confirmação incorreta')
      return
    }

    const { data, status } = await Api.db.customers.create({
      name: nome,
      password: senha,
      email: email,
      device_token: 'asdasd'
    })

    if (status === 200) {
      await Api.token.set(data.token)
      console.log('Conta cliente criada com sucesso')
      navigation.navigate("CustomerScreens")
      return
    }

    console.log(data)
  }

  return (
    <View style={styles.container}>

      <TextElement h20
      >Registre Sua Conta Cliente
      </TextElement>

      <Input
        onChangeText={value => setNome(value)}
        placeholder="Nome Completo"
        leftIcon={{ type: 'font-awesome', name: '' }}
      />

      <Input
        onChangeText={value => setEmail(value)}
        placeholder="Email"
        leftIcon={{ type: 'font-awesome', name: '' }}
      />

      <Input
        onChangeText={value => setSenha(value)}
        placeholder="Sua Senha"
        leftIcon={{ type: 'font-awesome', name: '' }}
        secureTextEntry={true}
      />
      <Input
        onChangeText={value => setSenha2(value)}
        placeholder="Repita a Senha"
        leftIcon={{ type: 'font-awesome', name: '' }}
        secureTextEntry={true}
      />

      <MCButton size='medium' onClick={register}>Registrar</MCButton>
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

