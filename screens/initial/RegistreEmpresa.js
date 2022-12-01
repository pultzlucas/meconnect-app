import { StyleSheet, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Input, Button, Text, ThemeContext } from "react-native-elements";
import { TextElement } from "react-native-elements/dist/text/Text";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";


import MCButton from "../../components/MCButton";
import MCInput from "../../components/MCInput";
import { Colors } from "meconnect-sdk";

export default function RegistreEmpresa({ navigation }) {
  const [cnpj, setCnpj] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");

  function register() {
    requestCnpj()
      .then((cnpjInfo) => {
        cnpjInfo.password = senha;
        navigation.navigate("ConfirmaEmpresa", cnpjInfo);
      })
      .catch((err) => {
        ToastAndroid.show(err, ToastAndroid.SHORT);
      });
  }

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
      <TextElement h20>Registre Sua Conta Empresarial</TextElement>

      <MCInput
        style={styles.input}
        onInput={(value) => setCnpj(value)}
        placeholder="CNPJ"
        type="numeric"
        maxLength={14}
      />

      <View style={styles.inputArea}>
        <MCInput
          style={styles.input}
          onInput={(value) => setSenha(value)}
          placeholder="Sua Senha"
          secureTextEntry={hidePass1}
        />
        <TouchableOpacity onPress={() => setHidePass1(!hidePass1)}>
          <Ionicons name="eye" color="#9f9f9" size={25} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputArea}>
        <MCInput
          style={styles.input}
          onInput={(value) => setSenha2(value)}
          placeholder="Repita a Senha"
          secureTextEntry={hidePass2}
        />
        <TouchableOpacity onPress={() => setHidePass2(!hidePass2)}>
          <Ionicons name="eye" color="#9f9f9" size={25} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <MCButton style={styles.btn} size="medium" onClick={register}>
        Registrar
      </MCButton>

      <Text style={styles.senha}>
        Sua senha precisa: {"\n"}
        {"\n"}- Possuir uma letra maiúcula; {"\n"}- Possir uma letra minúscula;{" "}
        {"\n"}- Possuir um número.
      </Text>
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
  inputArea:{
    flexDirection:'row',
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
    marginTop: 10,
    margin: 50,
  },
  senha: {
    textAlign: "center",
    borderColor: Colors.LightGray,
    borderWidth: 7,
    borderRadius: 10,
    padding: 9,
  },
});
