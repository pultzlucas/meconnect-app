import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Perf() {
  return (
    <View style={styles.container}>
      <Text>Nenhum perfil encontrado</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  icone1: {
    marginRight: 15,
  },
});
