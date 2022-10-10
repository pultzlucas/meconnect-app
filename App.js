
import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/initial/Login'
import EscolherConta from "./screens/initial/TelaEscolherConta";
import RegistreCliente from './screens/initial/RegistreCliente';
import ConfirmaEmpresa from './screens/initial/ConfirmaEmpresa';
import RegistreEmpresa from './screens/initial/RegistreEmpresa';
import InitPages from './screens/init';

import CustomerScreensVendorPage from './screens/customer/CompanyScreen/topbar'
import CustomerScreens from './screens/customer'

import VendorScreens from './screens/vendor';
import VendorScreensVendorPage from './screens/vendor/CompanyScreen/topbar'


import { Api } from 'meconnect-sdk';
import EditProfile from './screens/vendor/edit-profile';
import CreatePost from './screens/vendor/create-post';
import CreateProduct from './screens/vendor/create-product';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    Api.config.setApiDomain('http://192.168.15.177:80/api')
  })
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'InitPages'}
        >
          <Stack.Screen name="InitPages" component={InitPages}/>

          {/* Customer Screens */}
          <Stack.Screen name="CustomerScreens"  component={CustomerScreens} />
          <Stack.Screen name="CustomerScreensVendorPage"  component={CustomerScreensVendorPage} />

          {/* Vendor Screens */}
          <Stack.Screen name="VendorScreens"  component={VendorScreens} />
          <Stack.Screen name="VendorScreensVendorPage"  component={VendorScreensVendorPage} />
          <Stack.Screen name="VendorProfileEdit"  component={EditProfile} />
          <Stack.Screen name="VendorCreatePost"  component={CreatePost} />
          <Stack.Screen name="VendorCreateProduct"  component={CreateProduct} />

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