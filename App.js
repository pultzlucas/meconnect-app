
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
import { Api } from 'meconnect-sdk';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        // initialRouteName={tokenIsSet ? 'CustomerScreens' : 'EscolherConta'}
        initialRouteName={'InitPages'}
        >
          <Stack.Screen name="InitPages" component={InitPages}/>

          <Stack.Screen name="CustomerScreens"  component={CustomerScreens} />
          <Stack.Screen name="CustomerScreensVendorPage"  component={CustomerScreensVendorPage} />


          <Stack.Screen name="EscolherConta" component={EscolherConta} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="RegistreCliente" component={RegistreCliente} />
          <Stack.Screen name="RegistreEmpresa" component={RegistreEmpresa} />
          <Stack.Screen name="ConfirmaEmpresa" component={ConfirmaEmpresa} />
      </Stack.Navigator>
    </NavigationContainer>
  );



}