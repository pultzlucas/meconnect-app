import { StyleSheet, TextInput, View, ScrollView, StatusBar } from 'react-native';
import { Input, Button, Text, ThemeContext } from 'react-native-elements';
import { useEffect, useState } from 'react';
import { Api, Colors } from 'meconnect-sdk';



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

    if(res.status === 200) {
      console.log(res.data.message)
      Api.token.set(res.data.token)
      navigation.navigate('VendorScreens')
    }

    console.log(res)
  }

  return (
    <ScrollView>

      <Text style={styles.title}>
        Confirme os dados
      </Text>

      <View style={styles.form}>
        <Input
          onChangeText={text => setName(text)}
          value={name}
          placeholder="Nome fantasia"
        />

        <Input
          onChangeText={text => setCommercial(text)}
          value={commercial}
          placeholder="Nome comercial"
        />

        <Input
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="Email"
        />

        <Input
          onChangeText={text => setTel(text)}
          value={tel}
          placeholder="Telefone"
          keyboardType='phone-pad'
        />

        <Input
          onChangeText={text => setCep(text)}
          value={cep}
          placeholder="CEP"
        />

        <TextInput
          value={description}
          style={styles.descriptionInput}
          editable
          multiline
          numberOfLines={6}
          placeholder="Descrição da empresa"
          onChangeText={text => setDescription(text)}>
        </TextInput>

        <Button
          title="Registrar"
          loading={false}
          loadingProps={{ size: 'small', color: 'white' }}
          buttonStyle={{
            backgroundColor: '#FFA245',
            borderRadius: 5,
          }}
          titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
          containerStyle={{
            marginHorizontal: 50,
            height: 50,
            width: 200,
            marginVertical: 10,
          }}
          onPress={entrar}

        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 20,
  },

  form: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
  },

  descriptionInput: {
    borderColor: Colors.DarkGray,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    width: '100%',
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 16,
  }
});
