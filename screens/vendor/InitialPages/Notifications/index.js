import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView, ActivityIndicator, FlatList, RefreshControl } from "react-native";
import MCHeader from "../../../../components/MCHeader";
import NotificationComponent from "../../../../components/Notification";
import { Api, Colors } from "meconnect-sdk";
import { useCallback } from "react";
import * as SecureStore from 'expo-secure-store'
import { useIsFocused } from "@react-navigation/native";
import HeaderOption from "../../../../components/HeaderOption";

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
      Api.db.vendors.getNotifications(vendorId).then(({ data, status }) => {
        setIsLoading(false)
        if (data.length === 0) setShowPlaceholder(true)
        if (status === 200) setNotifications(data)
      }).catch(fetchDataError)
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
    if (event === 'post_like') {
      navigation.navigate('PostScreen', {
        id: redirectId
      })
    }

    if (event === 'new_connection') {
      navigation.navigate('VendorScreens', { screen: 'Perfil' })
    }

  }


  const renderItem = ({ item: { created_at, event, redirect_id, message, user, view } }) => {
    return (
      <TouchableOpacity onPress={() => redirectToScreen(event, redirect_id)}>
        <NotificationComponent
          created_at={created_at}
          event={event}
          message={message}
          user={user}
          view={view}
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
      {showPlaceholder && <Placeholder />}

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
