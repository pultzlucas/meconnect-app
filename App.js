
import { useEffect, useRef, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/initial/Login'
import EscolherConta from "./screens/initial/TelaEscolherConta";
import RegistreCliente from './screens/initial/RegistreCliente';
import ConfirmaEmpresa from './screens/initial/ConfirmaEmpresa';
import RegistreEmpresa from './screens/initial/RegistreEmpresa';
import InitPages from './screens/init';

import CustomerScreens from './screens/customer'

import VendorScreens from './screens/vendor';
import VendorProfileScreen from './screens/VendorProfileScreen/topbar';

import { Api } from 'meconnect-sdk';
import EditProfile from './screens/vendor/edit-profile';
import CreatePost from './screens/vendor/create-post';
import CreateProduct from './screens/vendor/create-product';
import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store'
import { registerForPushNotificationsAsync } from './src/notification-token';
import ProductScreen from './screens/ProductScreen';
import PostScreen from './screens/PostScreen';


const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export default function App() {
  useEffect(() => {
    // Api.config.setApiDomain('http://44.202.106.85/api')
    Api.config.setApiDomain('http://192.168.15.177:80/api')
  }, [])

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      SecureStore.setItemAsync('DeviceToken', token)
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

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'InitPages'}
      >
        <Stack.Screen name="InitPages" component={InitPages} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="PostScreen" component={PostScreen} />
        <Stack.Screen name="VendorProfileScreen" component={VendorProfileScreen} />


        {/* Customer Screens */}
        <Stack.Screen name="CustomerScreens" component={CustomerScreens} />

        {/* Vendor Screens */}
        <Stack.Screen name="VendorScreens" component={VendorScreens} />
        <Stack.Screen name="VendorProfileEdit" component={EditProfile} />
        <Stack.Screen name="VendorCreatePost" component={CreatePost} />
        <Stack.Screen name="VendorCreateProduct" component={CreateProduct} />

        {/* Initial Screens */}
        <Stack.Screen name="EscolherConta" component={EscolherConta} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RegistreCliente" component={RegistreCliente} />
        <Stack.Screen name="RegistreEmpresa" component={RegistreEmpresa} />
        <Stack.Screen name="ConfirmaEmpresa" component={ConfirmaEmpresa} />
      </Stack.Navigator>
    </NavigationContainer>
  );



}