import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView, ActivityIndicator, FlatList, RefreshControl } from "react-native";
import MCHeader from "../../../../components/MCHeader";
import NotificationComponent from "../../../../components/Notification";
import { Api, Colors } from "meconnect-sdk";
import { useCallback } from "react";
import * as SecureStore from 'expo-secure-store'
import Date from "../../../../components/Date";
import Price from "../../../../components/Price";
import { useIsFocused } from "@react-navigation/native";

export default function Notification() {
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    setIsLoading(true)
    setNotifications([])
    SecureStore.getItemAsync('CustomerId').then(customerId => {
      Api.db.customers.getNotifications(customerId).then(({ data }) => {
        setNotifications(data)
        setIsLoading(false)
      })
    })
  }, [refreshing, useIsFocused()])

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);


  const renderItem = ({ item: { created_at, event, message, vendor } }) => {
    return (
      <NotificationComponent
        created_at={created_at}
        event={event}
        message={message}
        vendor={vendor}
      />
    )
  }
  const Placeholder = () => (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>Você não possui nenhuma notificação</Text>
    </View>
  )
  return (
    <View style={styles.container}>
      <StatusBar />
      <MCHeader title={"Notificações"}></MCHeader>

      {isLoading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color={Colors.DarkOrange} />}
      {(notifications.length === 0 && !isLoading) && <Placeholder />}

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  placeholderText: {
    color: Colors.DarkGray,
    textAlign: 'center',
    marginTop: 20,
  },
});
