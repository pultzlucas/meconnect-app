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
import { Api, Colors } from "meconnect-sdk";
import { Pressable } from "react-native";

export default function Prods({ navigation, route }) {
  const [products, setProducts] = useState([])
  const [showPlaceholder, setShowPlaceholder] = useState(false)

  const renderItem = ({ item: { id, photo_url, description, price } }) => {
    return <TouchableOpacity onPress={() => navigation.navigate('ProductScreen', { id })}>
      <View style={styles.item}>
        <Image style={styles.prod} source={{ uri: photo_url }} />
        <Text style={styles.desc} numberOfLines={1}>
          {description}
        </Text>
        <Text style={styles.val}>R${price},00</Text>
      </View>
    </TouchableOpacity>

  }

  async function getProducts() {
    const {data} = await Api.db.vendors.getProducts(route.params.vendor_id);
    return data
  }
  
  useEffect(() => {
    setShowPlaceholder(false)
    getProducts().then(prods => {
      if(prods.length == 0) {
        setShowPlaceholder(true)
      }
      setProducts(prods)
    })
  }, []);

  const Placeholder = () => {
    return (
        <Text style={styles.placeholder}>Esta empresa ainda não publicou nenhum produto</Text>
    )
  }
  
  
  return (
    <SafeAreaView style={styles.container}>

      {showPlaceholder && <Placeholder/>}

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
