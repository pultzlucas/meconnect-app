import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView, ActivityIndicator, FlatList, RefreshControl } from "react-native";
import MCHeader from "../../../../components/MCHeader";
import NotificationComponent from "../../../../components/Notification";
import { Api, Colors } from "meconnect-sdk";
import { useCallback } from "react";
import * as SecureStore from 'expo-secure-store'
import { useIsFocused } from "@react-navigation/native";

export default function Notification({ navigation }) {
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([])
  const [showPlaceholder, setShowPlaceholder] = useState(false)

  function fetchDataError() {
    ToastAndroid.show('Ocorreu um erro ao buscar as notificações', ToastAndroid.LONG)
  }

  useEffect(() => {
    setIsLoading(true)
    setNotifications([])
    setShowPlaceholder(false)

    SecureStore.getItemAsync('VendorId').then(vendorId => {
      fetch(`http://192.168.15.177:80/api/users/vendor/${vendorId}/notifications`, {
        headers: {
          'Authorization': 'Bearer 1|L5zxqScJOu0wiFfb5enlZTbBmLcRpuXb9clURxYu'
        }
      })
        .then(async res => ({
          status: res.status,
          data: await res.json()
        }))
        .then(({ data, status }) => {
          console.log(data)
          setIsLoading(false)
          if (data.length === 0) setShowPlaceholder(true)
          if (status === 200) {
            setNotifications(data)
          }
        })
        .catch(fetchDataError)
    }).catch(fetchDataError)

  }, [refreshing, useIsFocused()])

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  function redirectToScreen(event, redirectId) {
    const screen = event === 'new_post' ? 'PostScreen' : 'ProductScreen'
    navigation.navigate(screen, {
      id: redirectId
    })
  }


  const renderItem = ({ item: { created_at, event, redirect_id, message, user } }) => {
    return (
      <TouchableOpacity onPress={() => redirectToScreen(event, redirect_id)}>
        <NotificationComponent
          created_at={created_at}
          event={event}
          message={message}
          user={user}
        />
      </TouchableOpacity>
    )
  }
  const Placeholder = () => (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>Você não possui nenhuma notificação</Text>
    </View>
  )
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.DarkOrange} />
      <MCHeader title={"Notificações"}></MCHeader>

      {isLoading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color={Colors.DarkOrange} />}
      {(showPlaceholder && notifications.length === 0) && <Placeholder />}

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
