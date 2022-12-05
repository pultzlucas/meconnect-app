import { useIsFocused } from "@react-navigation/native"
import { Api, Colors } from "meconnect-sdk"
import { useEffect, useRef } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import * as SecureStore from 'expo-secure-store'
import logout from "../src/logout-action"
import { registerForPushNotificationsAsync } from "../src/notification-token"

import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: true,
    }),
});


export default function InitPages({ navigation }) {
    useEffect(() => {
        Api.token.isset().then(async isset => {
            if (isset) {
                if (await SecureStore.getItemAsync('UserType') === 'customer') navigation.navigate("CustomerScreens")
                if (await SecureStore.getItemAsync('UserType') === 'vendor') navigation.navigate("VendorScreens")
            } else {
                navigation.navigate("EscolherConta")
            }
        })
    }, [useIsFocused()])

    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(async token => {
            if(token) {
                await SecureStore.setItemAsync('DeviceToken', token)
            }
        });
        
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            const { notificationId } = response.notification.request.content.data

            if (notificationId === 'new_product') navigation.navigate('ProductScreen', {
                id: response.notification.request.content.data.productId
            })

            if (notificationId === 'new_post') navigation.navigate('PostScreen', {
                id: response.notification.request.content.data.postId
            })
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors.DarkOrange} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    }
})