import { StyleSheet, View } from 'react-native';
import { Input, Button, Text, ThemeContext } from 'react-native-elements';
import { TextElement } from 'react-native-elements/dist/text/Text';
import { useState } from 'react';
import MCButton from '../../components/MCButton';



export default function RegistreEmpresa({ navigation }) {
  const [cnpj, setCnpj] = useState('')
  const [senha, setSenha] = useState('')
  const [senha2, setSenha2] = useState('')

  function register() {
    requestCnpj()
      .then(cnpjInfo => {
        cnpjInfo.password = senha
        navigation.navigate("ConfirmaEmpresa", cnpjInfo)
      })
  }

  async function requestCnpj() {
    const res = await fetch(`https://receitaws.com.br/v1/cnpj/${cnpj}`)
    const { email, nome: name, fantasia: commercial, cep, telefone: tel, atividade_principal } = await res.json()
    return {
      cnpj,
      email,
      name,
      commercial,
      cep,
      tel,
      description: atividade_principal[0].text
    }
  }

  return (
    <View style={styles.container}>

      <TextElement h20
      >Registre Sua Conta Empresarial
      </TextElement>

      <Input
        onChangeText={value => setCnpj(value)}
        placeholder="CNPJ"
        keyboardType='numeric'
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