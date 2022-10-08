import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView } from "react-native";
import MCHeader from "../../../../components/MCHeader";
import NotificationsList from "../../../../components/CardNoti";

export default function Notification() {
  return (
    <View style={styles.container}>
      <StatusBar/>
      <MCHeader title={"Notificações"}></MCHeader>
      <NotificationsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  Limp: {
    fontSize: 15,
    marginRight: 7,
    textAlign: "right",
    fontWeight: "bold",
    marginBottom: 7,
  }
});
