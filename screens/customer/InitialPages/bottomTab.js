import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

import Conection from "./Conexoes";
import Exploration from "./Explorar";
import Notification from "./Notificacoes";

import { Api, Colors } from "meconnect-sdk";

import { Alert, NativeModules } from "react-native";
import logout from "../../../logout-action";

const Tab = createMaterialBottomTabNavigator();

export default function Routes({ route }) {
  return (
    <Tab.Navigator
      initialRouteName="Exploração"
      activeColor="#F5803E"
      inactiveColor="#999"
      barStyle={{
        backgroundColor: "#f5f5f5",
      }}
    >
      <Tab.Screen
        name="Conexões"
        component={Conection}
        options={{
          color: Colors.DarkOrange,
          tabBarIcon: ({ color }) => (
            <Ionicons name="analytics" size={25} color={color} />
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
        name="Notificações"
        component={Notification}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" size={25} color={color} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Logout"
        component={''}
        listeners={{
          tabPress: e => {
            e.preventDefault()
            logout()
          }
        }}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="log-out" size={25} color={color} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}
