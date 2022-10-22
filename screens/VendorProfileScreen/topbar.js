import React, { useEffect } from "react";
import {
  BackHandler,
  StatusBar,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import "react-native-gesture-handler";

import Prin from "./Principal";
import Post from "./Post";
import Prods from "./Produtos";
import { Colors } from "meconnect-sdk";

const Tab = createMaterialTopTabNavigator();

export default function VendorProfileScreen({ navigation, route }) {
  const { vendor_id, userType } = route.params

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.replace('CustomerScreens')
    })
    return () => backHandler.remove();
  }, [])

  return (
    <Tab.Navigator
      activeColor="#F5803E"
      inactiveColor="#999"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.DarkOrange,
          height: 50,
        },

        tabBarActiveTintColor: "#fff",

        tabBarIndicatorStyle: {
          backgroundColor: "#fff",
        },
      }}
      initialRouteName="Principal"
      backBehavior="history"
      
    >
      <Tab.Screen name="Principal" component={Prin} initialParams={{ vendor_id, userType }} />

      <Tab.Screen name="Posts" component={Post} initialParams={{ vendor_id }} />

      <Tab.Screen name="Produtos" component={Prods} initialParams={{ vendor_id }} />
    </Tab.Navigator>
  );
}
