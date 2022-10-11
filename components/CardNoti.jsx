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
import formatDateString from '../format-date-string'

function Noti() {
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item} key={item.id}>
        <View style={styles.itemHeader}>
          <Text style={styles.date}>{formatDateString(item.created_at)}</Text>
          <Text style={styles.type}>{item.type.replace('_', ' ').toUpperCase()}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.subtitle}</Text>
      </View>
    )
  }

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
        style={{ marginBottom: 70 }}
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
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 20,
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
    color: Colors.Black,
    fontSize: 12,
    textAlign: "right",
    fontWeight: "bold",
    paddingBottom: 0,
  },
  date: {
    fontSize: 12,
    textAlign: "right",
    color: Colors.DarkGray
  },
  itemHeader:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export default Noti;
