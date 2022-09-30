import { Api, Colors } from "meconnect-sdk"
import { useEffect } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function InitPages({ navigation }) {
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            // setExpoPushToken(token)
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


    useEffect(() => {
        Api.token.isset().then(isset => {
            Api.token.get().then(console.log)

            if (isset) {
                navigation.navigate("CustomerScreens")
            } else {
                navigation.navigate("EscolherConta")
            }
        })
    }, [])


    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors.DarkOrange} />
        </View>
    )
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})