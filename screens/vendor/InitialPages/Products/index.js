import { View, StyleSheet, ScrollView, RefreshControl, StatusBar, SafeAreaView, FlatList, Text, Image, ActivityIndicator } from 'react-native';
import MCHeader from "../../../../components/MCHeader";
import HeaderOption from "../../../../components/HeaderOption";
import { useCallback, useEffect, useState } from 'react';
import { Api, Colors } from 'meconnect-sdk';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Entypo from "react-native-vector-icons/Entypo";
import { useIsFocused } from '@react-navigation/native';

export default function Conection({ navigation, route: { params: { vendorId } } }) {
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([])

  const isFocused = useIsFocused();

  async function getProducts() {
    // console.log('Products: ' + vendorId)
    setIsLoading(true)
    const { data } = await Api.db.vendors.getProducts(vendorId)
    setProducts(data)
    setIsLoading(false)
  }

  useEffect(() => {
    getProducts()
  }, [refreshing, isFocused])


  const renderItem = ({ item: { description, photo_url, price } }) => {
    return <View style={styles.item}>
      <Image style={styles.prod} source={{ uri: photo_url }} />
      <Text style={styles.desc} numberOfLines={1}>
        {description}
      </Text>
      <Text style={styles.val}>R${price},00</Text>
    </View>
  };

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <MCHeader title={'Meus produtos'}>
        <HeaderOption onClick={() => navigation.navigate('VendorCreateProduct')}>
          <Entypo name="plus" size={30} color={'white'}></Entypo>
        </HeaderOption>
      </MCHeader>

      {isLoading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color={Colors.DarkOrange} />}

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
