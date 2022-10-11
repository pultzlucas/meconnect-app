import { View, StyleSheet, ScrollView, RefreshControl, StatusBar, SafeAreaView, FlatList, Text, Image, ActivityIndicator } from 'react-native';
import MCHeader from "../../../../components/MCHeader";
import HeaderOption from "../../../../components/HeaderOption";
import { useCallback, useEffect, useState } from 'react';
import { Api, Colors } from 'meconnect-sdk';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Entypo from "react-native-vector-icons/Entypo";
import { useIsFocused } from '@react-navigation/native';
import Product from '../../../../components/Product';

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

  function removeProdFromList(prodId) {
    setProducts(products.filter(prod => prod.id !== prodId))
  }

  const renderItem = ({ item: { id, description, photo_url, price } }) => {
    return <Product
      id={id}
      description={description}
      photo_url={photo_url}
      price={price}
      onRemove={removeProdFromList}
      options={true}
    />
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

});
