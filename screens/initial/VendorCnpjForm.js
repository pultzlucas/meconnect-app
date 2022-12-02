import { Pressable, StyleSheet, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Input, Button, Text, ThemeContext } from "react-native-elements";
import { TextElement } from "react-native-elements/dist/text/Text";
import { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import MCButton from "../../components/MCButton";
import MCInput from "../../components/MCInput";
import { Colors } from "meconnect-sdk";
import PasswordRequirements from "../../components/PasswordRequirements";

export default function RegistreEmpresa({ navigation }) {
  const [cnpj, setCnpj] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");

  function register() {
    requestCnpj()
      .then(vendor => {
        vendor.password = senha
        navigation.navigate("ConfirmaEmpresa", { vendor })
      })
      .catch(err => {
        console.log(err)
        ToastAndroid.show('Ocorreu um erro ao verificar o CNPJ', ToastAndroid.SHORT)
      })
  }

  useEffect(() => {
    setSenha('Luk5162020')
    setSenha2('Luk5162020')
    setCnpj('20612379000106')
  }, [])

  async function requestCnpj() {
    if (!cnpj) {
      throw "CNPJ inválido";
    }

    if (!senha) {
      throw "Por favor insira a senha";
    }

    if (senha !== senha2) {
      throw "Senha de confirmação incorreta";
    }

    const res = await fetch(
      `https://receitaws.com.br/v1/cnpj/${cnpj.match(/\d/g).join("")}`
    );
    const json = await res.json();

    if (json.status === "ERROR") {
      throw json.message;
    }

    const {
      email,
      nome: name,
      fantasia: commercial,
      cep,
      telefone: tel,
      atividade_principal,
    } = json;
    return {
      cnpj,
      email,
      name,
      commercial,
      cep,
      tel,
      description: atividade_principal[0].text,
    };
  }

  const [hidePass1, setHidePass1] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);

  return (
    <View style={styles.container}>
      <TextElement style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 20 }}>Registre Sua Conta Empresarial</TextElement>

      <MCInput
        style={styles.input}
        onInput={(value) => setCnpj(value)}
        placeholder="Digite seu CNPJ"
        type="numeric"
        maxLength={14}
      />

     <PasswordRequirements style={styles.passRequirements}/>

      <View style={styles.inputArea}>
        <MCInput
          style={styles.input}
          onInput={(value) => setSenha2(value)}
          placeholder="Repita a Senha"
          secureTextEntry={hidePass2}
        />
        <Pressable onPress={() => setHidePass2(!hidePass2)}>
          <Ionicons name={hidePass2 ? 'eye-off' : 'eye'} color={Colors.DarkGray} size={25} style={styles.icon} />
        </Pressable>
      </View>

      <MCButton style={styles.btn} size="medium" onClick={register}>
        Registrar
      </MCButton>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    position: 'absolute',
    right: 10,
    bottom: -20
  },
  input: {
    marginTop: 10,
  },
  btn: {
    marginTop: 20,
    margin: 50,
  },
  passRequirements: {
    width: 320,
    marginTop: 10,
  },
});
