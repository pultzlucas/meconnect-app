import { StyleSheet, View } from 'react-native';
import { Input, Button, Text, ThemeContext } from 'react-native-elements';
import { TextElement } from 'react-native-elements/dist/text/Text';
import { useState } from 'react';

import MCButton from '../../components/MCButton';
import MCInput from '../../components/MCInput';

export default function RegistreEmpresa({ navigation }) {
  const [cnpj, setCnpj] = useState('')
  const [senha, setSenha] = useState('')
  const [senha2, setSenha2] = useState('')

  function register() {
    requestCnpj()
      .then(cnpjInfo => {
        console.log(cnpjInfo)
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

      <MCInput
        style={styles.input}
        onInput={value => setCnpj(value)}
        placeholder="CNPJ"
        keyboardType='numeric'
      />
      <MCInput
        style={styles.input}
        onInput={value => setSenha(value)}
        placeholder="Sua Senha"
        secureTextEntry={true}
        // value={'L5@1sp5ltz'}
      />
      <MCInput
        style={styles.input}
        onInput={value => setSenha2(value)}
        placeholder="Repita a Senha"
        secureTextEntry={true}
        // value={'L5@1sp5ltz'}
      />

      <MCButton style={styles.btn} size='medium' onClick={register}>Registrar</MCButton>
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
  btn: {
    marginTop: 10,
  },
});