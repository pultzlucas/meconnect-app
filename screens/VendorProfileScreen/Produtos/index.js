import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { Api, Colors } from "meconnect-sdk";
import Product from "../../../components/Product";

export default function Products({ navigation, route }) {
  const [products, setProducts] = useState([])
  const [showPlaceholder, setShowPlaceholder] = useState(false)

  const renderItem = ({ item: { id, photo_url, description, price } }) => {
    return <TouchableOpacity onPress={() => navigation.navigate('ProductScreen', { id })}>
      <Product
        id={id}
        description={description}
        photo_url={photo_url}
        price={price}
        onEdit={() => navigation.navigate('EditProduct', { id })}
      />
    </TouchableOpacity>

  }

  useEffect(() => {
    setShowPlaceholder(false)
    Api.db.vendors.getProducts(route.params.vendor_id).then(({data: prods}) => {
      if (prods.length == 0) setShowPlaceholder(true)
      setProducts(prods)
    }).catch(() => {
      ToastAndroid.show('Ocorreu um erro ao buscar os produtos', ToastAndroid.LONG)
    })
  }, []);

  const Placeholder = () => {
    return (
      <Text style={styles.placeholder}>Esta empresa ainda não publicou nenhum produto</Text>
    )
  }


  return (
    <SafeAreaView style={styles.container}>

      {showPlaceholder && <Placeholder />}

      <FlatList
        data={products}
        style={{ marginTop: 10 }}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  placeholder: {
    textAlign: 'center',
    marginTop: 20,
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
    marginHorizontal: 16,
    marginBottom: 10
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
