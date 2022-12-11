import { StyleSheet, ToastAndroid, View, Pressable } from "react-native";
import { Input, Button, Text, ThemeContext } from "react-native-elements";
import { TextElement } from "react-native-elements/dist/text/Text";
import { useEffect, useRef, useState } from "react";
import { Api, Colors } from "meconnect-sdk";
import MCButton from "../../components/MCButton";
import MCInput from "../../components/MCInput";
import Ionicons from "react-native-vector-icons/Ionicons";

import * as SecureStore from "expo-secure-store";
import { TouchableOpacity } from "react-native";

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    
    const { data, status } = await Api.auth.login({
      email: email,
      password: password,
      device_token: await SecureStore.getItemAsync("DeviceToken"),
    });

    if (status === 200) {
      await Api.token.set(data.token);
      await SecureStore.setItemAsync("UserType", data.user_type);
      await SecureStore.setItemAsync("UserId", String(data.user_id));

      if (data.user_type === "customer") {
        await SecureStore.setItemAsync("CustomerId", String(data.id));
        navigation.popToTop();
        navigation.replace("CustomerScreens");
      }

      if (data.user_type === "vendor") {
        console.log("vendor account entered");
        SecureStore.setItemAsync("VendorId", String(data.id));
        navigation.popToTop();
        navigation.replace("VendorScreens");
      }

      ToastAndroid.show("Login efetuado com sucesso", ToastAndroid.SHORT);
      return;
    }

    setLoading(false);
    ToastAndroid.show("Email ou senha incorretos", ToastAndroid.SHORT);
  }

  const [hidePass, setHidePass] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digite as credenciais para acessar sua conta</Text>

      <MCInput
        style={styles.input}
        onInput={(value) => setEmail(value)}
        placeholder="E-mail"
      />

      <View style={styles.inputArea}>
        <MCInput
          style={styles.input}
          onInput={(value) => setPassword(value)}
          placeholder="Sua Senha"
          secureTextEntry={hidePass}
        />
        <Pressable onPress={() => setHidePass(!hidePass)}>
          <Ionicons name={hidePass ? 'eye-off' : 'eye'} color={Colors.DarkGray} size={25} style={styles.icon} />
        </Pressable>
      </View>

      <MCButton
        style={styles.btn}
        size="medium"
        isLoading={loading}
        onClick={login}
      >
        Login
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
  title: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
    width: 300,
    textAlign: 'center'
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
  },
});
