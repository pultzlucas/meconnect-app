import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import "react-native-gesture-handler";

import TopSearch from "../../../../components/TopSearch";
import MyTabs from "./topBar";

export default function Exploration() {
  return (
    <View style={styles.container}>
      <MyTabs />
      <StatusBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
