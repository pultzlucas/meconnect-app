import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Api, Colors } from "meconnect-sdk";
import { useCallback } from "react";

function Noti() {
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);

  const renderItem = ({ item }) => (
    <View style={styles.item} key={item.id}>
      <Text style={styles.type}>{item.type.replace('_', ' ').toUpperCase()}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.subtitle}</Text>
    </View>
  );

  const [notifications, setNotifications] = useState([])

  async function fetchNotifications() {
    const { data } = await Api.db.customers.getNotifications(1)
    return data
  }

  useEffect(() => {
    setNotifications([])
    setIsLoading(true)
    fetchNotifications().then(nots => {
      setNotifications(nots)
      setIsLoading(false)
    })
  }, [refreshing])

  // Scroll down refreshing Refreshing

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color={Colors.DarkOrange} />}

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  item: {
    backgroundColor: "#F3F3F3",
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  desc: {
    fontSize: 13,
    color: "#333333",
  },
  type: {
    color: "#333333",
    fontSize: 13,
    textAlign: "right",
    fontWeight: "bold",
    paddingBottom: 0,
  },
  date: {
    fontSize: 12,
    textAlign: "right",
  },
});

export default Noti;
