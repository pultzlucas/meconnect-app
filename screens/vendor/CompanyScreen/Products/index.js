import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { Api } from "meconnect-sdk";

export default function Products({ route }) {
  const [products, setProducts] = useState([])

  // Barra de Pesquisa
  function Search({ title }) {
    const [searchQuery, setSearchQuery] = React.useState("");
    const onChangeSearch = (query) => setSearchQuery(query);
    return (
      <Searchbar
        style={{
          position: "relative",
          padding: 0,
          backgroundColor: "#F3F3F3",
          borderRadius: 10,
          marginLeft: 15,
          marginRight: 15,
          marginTop: 10,
          marginBottom: 10,
        }}
        placeholder={title}
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    );
  }

  // FlatList

  const renderItem = ({ item: { photo_url, description, price } }) => {
    return <View style={styles.item}>
      <Image style={styles.prod} source={{ uri: photo_url }} />
      <Text style={styles.desc} numberOfLines={1}>
        {description}
      </Text>
      <Text style={styles.val}>R${price},00</Text>
    </View>

  }

  async function getProducts() {
    const products = await Api.db.vendors.getProducts(route.params.vendor_id);
    return products.data
  }

  useEffect(() => {
    getProducts().then(prods => setProducts(prods))
  }, []);

  // Body
  return (
    <SafeAreaView style={styles.container}>
      {/* <Search title={"Pesquisar produto"} /> */}
      <FlatList
        data={products}
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
