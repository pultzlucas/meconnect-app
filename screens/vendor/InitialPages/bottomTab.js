import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Posts from "./Posts";
import Products from "./Products";
import Exploration from "./Explorar";
import Principal from "./Principal";

import { Api, Colors } from "meconnect-sdk";

import { Alert, Image, NativeModules } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createMaterialBottomTabNavigator();

export default function Routes({ route, navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Exploração"
      activeColor="#F5803E"
      inactiveColor="#999"
      barStyle={{
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        borderTopColor: "transparent",
        position: "absolute",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Tab.Screen
        name="Perfil"
        component={Principal}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={25} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Explorar"
        component={Exploration}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="compass" size={25} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Posts"
        component={Posts}
        options={{
          color: Colors.DarkOrange,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="local-post-office" size={25} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Produtos"
        component={Products}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="tag" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
