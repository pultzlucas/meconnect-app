import React, { useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Posts from "./Posts";
import Products from "./Products";
import Explore from "../../ExploreScreen";
import Principal from "./Principal";

import { Api, Colors } from "meconnect-sdk";

import { Alert, Text, View, Image, NativeModules, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store'
import Notifications from "./Notifications";
import { useIsFocused } from "@react-navigation/native";

const Tab = createMaterialBottomTabNavigator();

export default function Routes() {
  const [vendorId, setVendorId] = useState('')
  const [unseenNotifications, setUnseenNotifications] = useState(0)

  const [refreshNotifications, setRefreshNotifications] = useState(false)

  useEffect(() => {
    SecureStore.getItemAsync('VendorId').then(id => {
      Api.db.vendors.getUnseenNotifications(id).then(({ data: { unseen_notifications } }) => {
        console.log('unseenNotifications: ' + unseen_notifications)
        setUnseenNotifications(unseen_notifications)
      }).catch(() => ToastAndroid.show('Ocorreu um erro ao buscar as notificações não lidas', ToastAndroid.LONG))
    })
      .catch(() => ToastAndroid.show('Ocorreu um erro ao buscar informações do perfil', ToastAndroid.LONG))
  }, [refreshNotifications])

  useEffect(() => {
    if (!vendorId) {
      SecureStore.getItemAsync('VendorId').then(id => {
        setVendorId(id)
      })
        .catch(() => ToastAndroid.show('Ocorreu um erro ao buscar informações do perfil', ToastAndroid.LONG))
    }
  }, [])

  return (
    <>
      {vendorId &&
        <Tab.Navigator
          initialRouteName="Exploração"
          activeColor={Colors.DarkOrange}
          inactiveColor="#999"
          barStyle={{
            backgroundColor: "#f5f5f5",
          }}
        >
          <Tab.Screen
            name="Perfil"
            component={Principal}
            listeners={{
              tabPress: () => setRefreshNotifications(!refreshNotifications)
            }}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="home" size={25} color={color} />
              ),
            }}
            initialParams={{
              vendorId: vendorId
            }}
          />

          <Tab.Screen
            name="Posts"
            component={Posts}
            listeners={{
              tabPress: () => setRefreshNotifications(!refreshNotifications)
            }}
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
            listeners={{
              tabPress: () => setRefreshNotifications(!refreshNotifications)
            }}
            options={{
              tabBarIcon: ({ color }) => (
                <FontAwesome name="tag" size={25} color={color} />
              ),
            }}
            initialParams={{
              vendorId: vendorId
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
            component={Notifications}
            listeners={{
              tabPress: () => {
                setTimeout(() => {
                  Api.db.vendors.cleanUnseenNotifications(vendorId).then(({ data: { updated } }) => {
                    if(updated) setUnseenNotifications(0)
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
      }
    </>
  );
}
