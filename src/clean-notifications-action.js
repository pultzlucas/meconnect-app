import { Api } from "meconnect-sdk"
import * as Updates from 'expo-updates';
import { Alert } from "react-native";
import * as SecureStore from 'expo-secure-store'

export default function cleanNotifications() {
    Alert.alert(
        "Tem certeza que quer sair da conta?",
        false,
        [
          {
            text: "Sim",
            onPress: cleanNotificationsAction,
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

async function cleanNotificationsAction() {
  
}