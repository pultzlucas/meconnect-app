import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MCHeader from "../../../../components/MCHeader";
import NotificationsList from "../../../../components/CardNoti";
import Ionicons from "react-native-vector-icons/Ionicons";
import OptionsMenu from "react-native-option-menu";
import { Searchbar } from "react-native-paper";
const myIcon = <Ionicons name="ellipsis-vertical" size={26} color="#fff" />;

export default function Notification() {
    return (
      <View style={styles.container}>
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
