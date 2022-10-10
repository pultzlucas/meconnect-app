import { StyleSheet, TextInput, View, ScrollView, StatusBar } from 'react-native';
import { Input, Button, Text, ThemeContext } from 'react-native-elements';
import { useEffect, useState } from 'react';
import { Api, Colors } from 'meconnect-sdk';
import MCButton from '../../components/MCButton'
import MCInput from '../../components/MCInput'
import MCTextarea from '../../components/MCTextarea'


export default function RegistreCliente({ route, navigation }) {
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [commercial, setCommercial] = useState('')
  const [tel, setTel] = useState('')
  const [cep, setCep] = useState('')
  const [email, setEmail] = useState('')

  const { params } = route;

  useEffect(() => {
    setDescription(params.description)
    setName(params.name)
    setCommercial(params.commercial)
    setTel(params.tel)
    setCep(params.cep)
    setEmail(params.email)
  }, [])

  async function entrar() {
    const res = await Api.db.vendors.create({
      cep,
      cnpj: params.cnpj,
      commercial,
      description,
      email,
      name,
      password: params.password,
      tel,
      device_token: 'asd'
    })

    if (res.status === 200) {
      console.log(res.data.message)
      Api.token.set(res.data.token)
      AsyncStorage.setItem('@VendorId', String(data.id))
      
      console.log('vendor account entered')
      navigation.navigate("VendorScreens")
    }

    console.log(res)
  }

  return (
    <ScrollView>
      <View style={styles.container}>

        <Text style={styles.title}>
          Confirme os dados
        </Text>

        <View style={styles.form}>
          <MCInput
            onInput={text => setName(text)}
            value={name}
            label="Nome fantasia"
          />

          <MCTextarea on label="Slogan">{description}</MCTextarea>

          <MCInput
            onInput={text => setCommercial(text)}
            value={commercial}
            label="Nome comercial"
          />

          <MCInput
            onInput={text => setEmail(text)}
            value={email}
            label="Email"
          />

          <MCInput
            onInput={text => setTel(text)}
            value={tel}
            label="Telefone"
            keyboardType='phone-pad'
          />

          <MCInput
            onInput={text => setCep(text)}
            value={cep}
            label="CEP"
          />


        </View>

        <MCButton onInput={text => setDescription(text)} style={styles.btn} onClick={entrar}>Registrar</MCButton>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20
  },

  title: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
  },

  btn: {
    marginTop: 20,
  },
});
