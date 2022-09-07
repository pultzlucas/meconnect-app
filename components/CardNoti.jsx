import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Api } from "meconnect-sdk";

const Noti = () => {
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
    console.log(data)
    return data
  }

  useEffect(() => {
    fetchNotifications().then(nots => setNotifications(nots))
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
