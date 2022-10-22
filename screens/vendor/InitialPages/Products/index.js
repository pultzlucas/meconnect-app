import { View, StyleSheet, ScrollView, RefreshControl, StatusBar, SafeAreaView, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import MCHeader from "../../../../components/MCHeader";
import HeaderOption from "../../../../components/HeaderOption";
import { useCallback, useEffect, useState } from 'react';
import { Api, Colors } from 'meconnect-sdk';

import Entypo from "react-native-vector-icons/Entypo";
import { useIsFocused } from '@react-navigation/native';
import Product from '../../../../components/Product';
import MCButton from '../../../../components/MCButton';

export default function Conection({ navigation, route: { params: { vendorId } } }) {
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([])

  const isFocused = useIsFocused();

  async function getProducts() {
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
    return <TouchableOpacity onPress={() => navigation.navigate('ProductScreen', { productId: id })}>
      <Product
        id={id}
        description={description}
        photo_url={photo_url}
        price={price}
        onRemove={removeProdFromList}
        options={true}
      />
    </TouchableOpacity>
  };

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  const Placeholder = () => (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>Você ainda não publicou nenhum produto</Text>
      <MCButton style={styles.placeholderBtn} onClick={() => navigation.navigate('VendorCreateProduct')}>Publicar um produto</MCButton>
    </View>
  )

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <MCHeader title={'Meus produtos'}>
        <HeaderOption onClick={() => navigation.navigate('VendorCreateProduct')}>
          <Entypo name="plus" size={30} color={'white'}></Entypo>
        </HeaderOption>
      </MCHeader>

      {isLoading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color={Colors.DarkOrange} />}

      {(products.length === 0 && !isLoading) && <Placeholder />}

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ paddingTop: 10, }}
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
  placeholderContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
  },
  placeholderText: {
    color: Colors.DarkGray
  },
  placeholderBtn: {
    marginTop: 10,
    width: 200,
  },
});
