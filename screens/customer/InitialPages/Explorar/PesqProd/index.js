import { Api, Colors } from "meconnect-sdk";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import TopSearch from "../../../../../components/TopSearch";

export default function Prod() {
  const [products, setProducts] = useState([])

  async function getProducts(text) {
    const res = await Api.db.products.getByDescription(text)
    console.log(res)
  }

  return (
    <View style={styles.container}>
      <TopSearch onChangeText={text => {
        console.log(text)
        getProducts(text)
      }} />
      <Text style={styles.placeholder}>Nenhum produto encontrado</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },

  placeholder: {
    marginTop: 20,
    textAlign: 'center',
    color: Colors.DarkGray
  }
});
