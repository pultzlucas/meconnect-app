import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Prod() {
  return (
    <View style={styles.container}>
      <Text>Nenhum produto encontrado</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icone1: {
    marginRight: 15,
  },
});
