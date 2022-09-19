import React from "react";
import { View, StyleSheet, TextInput, Text, StatusBar } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import "react-native-gesture-handler";

import Perf from "./PesqPerf";
import Prod from "./PesqProd";

import { Colors } from "meconnect-sdk";

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.DarkOrange,
        },

        tabBarActiveTintColor: "#fff",

        tabBarIndicatorStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Tab.Screen name="Perfis" component={Perf} />
      <Tab.Screen name="Produtos" component={Prod} />
    </Tab.Navigator>
  );
}
