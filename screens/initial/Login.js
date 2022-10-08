import { StyleSheet, ToastAndroid, View } from 'react-native';
import { Input, Button, Text, ThemeContext } from 'react-native-elements';
import { TextElement } from 'react-native-elements/dist/text/Text';
import { useEffect, useRef, useState } from 'react';
import { Api } from 'meconnect-sdk';
import MCButton from '../../components/MCButton';

import { registerForPushNotificationsAsync } from '../../notification-token'

import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [loading, setLoading] = useState(false)

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      AsyncStorage.setItem('@MCON_NOTIFICATION_TOKEN', token)
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function login() {
    setLoading(true)
    const { data, status } = await Api.login({
      email: email,
      password: password,
      device_token: await AsyncStorage.getItem('@MCON_NOTIFICATION_TOKEN')
    })

    console.log(data)

    if (status === 200) {
      ToastAndroid.show('Login efetuado com sucesso', ToastAndroid.SHORT);

      await Api.token.set(data.token)

      AsyncStorage.setItem('@UserType', data.user_type)

      if (data.user_type === 'customer') {
        console.log('customer account entered')
        AsyncStorage.setItem('@CustomerId', String(data.id))
        navigation.navigate("CustomerScreens")
      }
      
      if (data.user_type === 'vendor') {
        console.log('vendor account entered')
        AsyncStorage.setItem('@VendorId', String(data.id))
        navigation.navigate("VendorScreens")
      }

      return
    }

    setLoading(false)
    ToastAndroid.show('Email ou senha incorretos', ToastAndroid.SHORT);
  }

  return (
    <View style={styles.container}>

      <Text>Digite as credenciais para acessar sua conta</Text>

      <Input
        onChangeText={value => setEmail(value)}
        placeholder="E-mail"
      />

      <Input
        onChangeText={value => setPassword(value)}
        placeholder="Sua Senha"
        secureTextEntry={true}
      />

      <MCButton size='medium' isLoading={loading} onClick={login}>Login</MCButton>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
