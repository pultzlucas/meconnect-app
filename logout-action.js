import { Api } from "meconnect-sdk"
import { Alert, NativeModules } from "react-native"

export default function logout() {
    Alert.alert(
        "Tem certeza que quer sair da conta?",
        false,
        [
          {
            text: "Sim",
            onPress: async () => {
              await Api.token.unset()
              NativeModules.DevSettings.reload()
            },
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