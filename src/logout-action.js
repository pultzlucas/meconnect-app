import { Api } from "meconnect-sdk"
import * as Updates from 'expo-updates';
import { Alert } from "react-native";
import * as SecureStore from 'expo-secure-store'

export default function logout() {
    Alert.alert(
        "Tem certeza que quer sair da conta?",
        false,
        [
          {
            text: "Sim",
            onPress: logoutAction,
            style: "default",
          },
          {
            text: "Não",
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      )
}

async function logoutAction() {
  const res = await Api.auth.logout({
    device_token: await SecureStore.getItemAsync('DeviceToken')
  })
  
  // console.log(res.data)
  
  await Api.token.unset()
  await SecureStore.deleteItemAsync('DeviceToken')
  await SecureStore.deleteItemAsync('UserType')
  await SecureStore.deleteItemAsync('CustomerId')
  await SecureStore.deleteItemAsync('VendorId')

  await Updates.reloadAsync()
}