import { StyleSheet, TextInput, View, ScrollView, StatusBar, ToastAndroid } from 'react-native';
import { Input, Button, Text, ThemeContext } from 'react-native-elements';
import { useEffect, useState } from 'react';
import { Api, Colors } from 'meconnect-sdk';
import MCButton from '../../components/MCButton'
import MCInput from '../../components/MCInput'
import MCTextarea from '../../components/MCTextarea'
import * as SecureStore from 'expo-secure-store'
import HorizontalLine from '../../components/HorizontalLine';


export default function RegistreCliente({ route: { params: { vendor } }, navigation }) {
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [commercial, setCommercial] = useState('')
  const [tel, setTel] = useState('')
  const [cep, setCep] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    setDescription(vendor.description)
    setName(vendor.name)
    setCommercial(vendor.name)
    setTel(vendor.tel)
    setCep(vendor.cep)
    setEmail(vendor.email)
  }, [])

  async function entrar() {
    navigation.navigate('EmailVerificationCodeScreen', {
      user: {
        name,
        description,
        email,
        password: vendor.password,
        commercial,
        tel,
        cep,
        cnpj: vendor.cnpj
      },
      userType: 'vendor'
    })
  }

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: 'white'
    }}>
      <View style={styles.container}>

        <Text style={styles.title}>
          Confirme os dados
        </Text>

        <View style={styles.form}>
          <MCInput
            value={name}
            label="Nome comercial"
            editable={false}
          />

          <MCInput
            value={email}
            label="Email"
            editable={false}
          />

          <MCInput
            onInput={text => setCommercial(text)}
            value={commercial}
            label="Nome fantasia"
          />


          <MCTextarea label="Descrição" onInput={text => setDescription(text)}>{description}</MCTextarea>


          <MCInput
            onInput={text => setTel(text)}
            value={tel}
            label="Telefone"
            type='numeric'
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
