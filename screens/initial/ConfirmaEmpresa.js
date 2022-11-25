import { StyleSheet, TextInput, View, ScrollView, StatusBar, ToastAndroid } from 'react-native';
import { Input, Button, Text, ThemeContext } from 'react-native-elements';
import { useEffect, useState } from 'react';
import { Api, Colors } from 'meconnect-sdk';
import MCButton from '../../components/MCButton'
import MCInput from '../../components/MCInput'
import MCTextarea from '../../components/MCTextarea'
import * as SecureStore from 'expo-secure-store'


export default function RegistreCliente({ route, navigation }) {
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [commercial, setCommercial] = useState('')
  const [tel, setTel] = useState('')
  const [cep, setCep] = useState('')
  const [email, setEmail] = useState('')

  const { params } = route;

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setDescription(params.description)
    setName(params.name)
    setCommercial(params.name)
    setTel(params.tel)
    setCep(params.cep)
    setEmail(params.email)
  }, [])

  async function entrar() {
    setLoading(true)
    const { data, status } = await Api.db.vendors.create({
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

    if (status === 200) {
      await Api.token.set(data.token)
      await SecureStore.setItemAsync('VendorId', String(data.vendor.id))
      await SecureStore.deleteItemAsync('CustomerId')
      await SecureStore.setItemAsync('UserType', 'vendor')

      ToastAndroid.show(data.message, ToastAndroid.SHORT);
      setLoading(false)
      navigation.popToTop()
      navigation.replace("VendorScreens")
    } else {
      setLoading(false)
      ToastAndroid.show(data.message, ToastAndroid.LONG);
    }
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
            onInput={text => setName(text)}
            value={name}
            label="Nome comercial"
            editable={false}
          />

          <MCInput
            onInput={text => setCommercial(text)}
            value={commercial}
            label="Nome fantasia"
          />

          <MCTextarea label="Descrição" onInput={text => setDescription(text)}>{description}</MCTextarea>

          <MCInput
            onInput={text => setEmail(text)}
            value={email}
            label="Email"
          />

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

        <MCButton onInput={text => setDescription(text)} style={styles.btn} isLoading={loading} onClick={entrar}>Registrar</MCButton>
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
