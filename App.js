import { useEffect, useRef, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/initial/Login'
import EscolherConta from "./screens/initial/ChooseAccount";
import RegistreCliente from './screens/initial/CustomerForm';
import ConfirmaEmpresa from './screens/initial/VendorAccountConfirm';
import RegistreEmpresa from './screens/initial/VendorCnpjForm';
import InitPages from './screens/init';

import CustomerScreens from './screens/customer'

import VendorScreens from './screens/vendor';
import VendorProfileScreen from './screens/VendorProfileScreen/topbar';

import { Api } from 'meconnect-sdk';
import EditProfile from './screens/vendor/edit-profile';
import CreatePost from './screens/vendor/create-post';
import CreateProduct from './screens/vendor/create-product';
import ProductScreen from './screens/ProductScreen';
import PostScreen from './screens/PostScreen';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import EditProduct from './screens/vendor/edit-product';
import DisconnectedScreen from './screens/DisconnectedScreen';
import EmailVerificationCodeScreen from './screens/initial/EmailVerificationCode';
import RegisterClientScreen from './screens/initial/RegisterCustomer';
import RegisterVendorScreen from './screens/initial/RegisterVendor';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    // Api.config.setApiDomain('http://15.228.128.65/api')
    Api.config.setApiDomain('http://192.168.15.177:80/api')
    // Api.token.unset()
  }, [])

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
        <Stack.Screen name="DisconnectedScreen" component={DisconnectedScreen} />
        <Stack.Screen name="EmailVerificationCodeScreen" component={EmailVerificationCodeScreen} />

        {/* Customer Screens */}
        <Stack.Screen name="CustomerScreens" component={CustomerScreens} />
        <Stack.Screen name="RegisterCustomerScreen" component={RegisterClientScreen} />

        {/* Vendor Screens */}
        <Stack.Screen name="VendorScreens" component={VendorScreens} />
        <Stack.Screen name="VendorProfileEdit" component={EditProfile} />
        <Stack.Screen name="EditProduct" component={EditProduct} />
        <Stack.Screen name="VendorCreatePost" component={CreatePost} />
        <Stack.Screen name="VendorCreateProduct" component={CreateProduct} />
        <Stack.Screen name="RegisterVendorScreen" component={RegisterVendorScreen} />

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