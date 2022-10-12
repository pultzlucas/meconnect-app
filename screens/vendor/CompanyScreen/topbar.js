import React, { useEffect } from "react";
import {
  BackHandler,
  StatusBar,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import "react-native-gesture-handler";
import { Colors } from "meconnect-sdk";

import Principal from "./Principal";
import Post from "./Post";
import Products from "./Products/index";

const Tab = createMaterialTopTabNavigator();

export default function TopBar({ route, navigation }) {
  const { vendor_id } = route.params

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack()
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
          padding: 3,
        },

        tabBarActiveTintColor: "#fff",

        tabBarIndicatorStyle: {
          backgroundColor: "#fff",
        },
      }}
      initialRouteName="Principal"
      backBehavior="history"
      
    >
      <Tab.Screen name="Principal" component={Principal} initialParams={{vendor_id}}/>
      <Tab.Screen name="Posts" component={Post} initialParams={{vendor_id}}/>
      <Tab.Screen name="Products" component={Products} initialParams={{vendor_id}}/>
    </Tab.Navigator>
  );
}
