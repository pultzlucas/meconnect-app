import React, { useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

import Conection from "./Conexoes";
import Explore from "../../ExploreScreen";
import Notification from "./Notificacoes";

import { Api, Colors } from "meconnect-sdk";
import { View, Text } from "react-native";
import * as SecureStore from 'expo-secure-store'

const Tab = createMaterialBottomTabNavigator();

export default function Routes({ route }) {
  const [customerId, setCustomerId] = useState(null)
  const [unseenNotifications, setUnseenNotifications] = useState(0)
  const [refreshNotifications, setRefreshNotifications] = useState(false)

  useEffect(() => {
    SecureStore.getItemAsync('CustomerId').then(id => {
      setCustomerId(id)
      Api.db.customers.getUnseenNotifications(id).then(({ data: { unseen_notifications } }) => {
        console.log('unseenNotifications: ' + unseen_notifications)
        setUnseenNotifications(unseen_notifications)
      }).catch(() => ToastAndroid.show('Ocorreu um erro ao buscar as notificações não lidas', ToastAndroid.LONG))
    })
      .catch(() => ToastAndroid.show('Ocorreu um erro ao buscar informações do usuário', ToastAndroid.LONG))
  }, [refreshNotifications])

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
        listeners={{
          tabPress: () => setRefreshNotifications(!refreshNotifications)
        }}
        options={{
          color: Colors.DarkOrange,
          tabBarIcon: ({ color }) => (
            <Ionicons name="analytics" size={25} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Explorar"
        component={Explore}
        listeners={{
          tabPress: () => setRefreshNotifications(!refreshNotifications)
        }}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="compass" size={25} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Notificações"
        component={Notification}
        listeners={{
          tabPress: () => {
            setTimeout(() => {
              Api.db.customers.cleanUnseenNotifications(customerId).then(({ data: { updated } }) => {
                if (updated) setUnseenNotifications(0)
              }).catch(() => ToastAndroid.show('Ocorreu um erro ao limpar as notificações não lidas', ToastAndroid.LONG))
            }, 2000)
          }
        }}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Ionicons name="notifications" size={25} color={color} />
              {
                unseenNotifications > 0 && <Text style={{
                  position: 'absolute',
                  right: 0,
                  backgroundColor: 'red',
                  borderRadius: 10,
                  paddingHorizontal: 4,
                  fontSize: 10,
                  color: 'white',
                  overflow: 'visible',
                }}>{unseenNotifications > 9 ? `9+` : unseenNotifications}</Text>
              }
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
