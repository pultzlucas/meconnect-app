import React from "react";
import {
  StatusBar,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import "react-native-gesture-handler";

import Prin from "./Principal";
import Post from "./Post";
import Prods from "./Produtos";
import { Colors } from "meconnect-sdk";

const Tab = createMaterialTopTabNavigator();

export default function TopBar() {
  return (
    <Tab.Navigator
      activeColor="#F5803E"
      inactiveColor="#999"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.DarkOrange,
          marginTop: StatusBar.currentHeight,
          padding: 3,
        },

        tabBarActiveTintColor: "#fff",

        tabBarIndicatorStyle: {
          backgroundColor: "#fff",
        },
      }}
    >


      <Tab.Screen name="Principal" component={Prin} />

      <Tab.Screen name="Posts" component={Post} />

      <Tab.Screen name="Produtos" component={Prods} />
    </Tab.Navigator>
  );
}
