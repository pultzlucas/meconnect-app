import { Api, Colors } from "meconnect-sdk";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity, Image, Pressable, StatusBar } from "react-native";
import TopSearch from "../../../components/TopSearch";

export default function SearchProducts({ navigation }) {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigation.navigate('ProductScreen', { productId: item.id })}>
      <View style={styles.item}>
        <Image style={styles.prod} source={{ uri: item.photo_url }} />
        <Text style={styles.desc} numberOfLines={1}>
          {item.description}
        </Text>
        <Text style={styles.val}>R${item.price},00</Text>
      </View>
    </Pressable>
  );

  async function fetchProducts(text) {
    const { data } = await Api.db.products.getByDescription(text)
    return data
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.DarkOrange} />

      <TopSearch onChangeText={txt => {
        setIsLoading(true)
        setProducts([])
        fetchProducts(txt).then(prods => {
          console.log(prods)
          setProducts(prods)
          setIsLoading(false)
        })
      }} />

      {(products.message || products.length === 0) && <Text style={styles.placeholder}>Nenhum produto encontrado</Text>}

      {isLoading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color={Colors.DarkOrange} />}

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    width: '100%',
  },
  placeholder: {
    marginTop: 20,
    textAlign: 'center',
    color: Colors.DarkGray
  },
  prod: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  item: {
    backgroundColor: "#F3F3F3",
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  desc: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 0,
  },
  val: {
    fontSize: 15,
    fontWeight: "bold",
    paddingTop: 6,
  },
});
