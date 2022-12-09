import { Api, Colors } from "meconnect-sdk";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity, Image, Pressable, StatusBar, ToastAndroid } from "react-native";
import TopSearch from "../../../components/TopSearch";
import Product from "../../../components/Product";

export default function SearchProducts({ navigation }) {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [showPlaceholder, setShowPlaceholder] = useState(false)
  const renderItem = ({ item: { id, photo_url, description, price, vendor_id } }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductScreen', { id })}>
      <Product
        id={id}
        description={description}
        photo_url={photo_url}
        price={price}
        vendorId={vendor_id}
        onEdit={() => navigation.navigate('EditProduct', { id })}
      />
    </TouchableOpacity>
  )

  function refreshList(txt) {
    setIsLoading(true)
    setProducts([])
    setShowPlaceholder(false)
    Api.db.products.getByDescription(txt).then(({data: prods}) => {
      if(prods.length === 0) setShowPlaceholder(true)
      setProducts(prods)
      setIsLoading(false)
    }).catch(() => {
      ToastAndroid.show('Ocorreu um erro ao buscar os produtos', ToastAndroid.LONG)
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.DarkOrange} />
      <TopSearch onChangeText={refreshList} />

      {showPlaceholder && <Text style={styles.placeholder}>Nenhum produto encontrado</Text>}

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
