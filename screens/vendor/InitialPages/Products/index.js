import { View, StyleSheet, ScrollView, RefreshControl, StatusBar, SafeAreaView, FlatList, Text, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import MCHeader from "../../../../components/MCHeader";
import HeaderOption from "../../../../components/HeaderOption";
import { useCallback, useEffect, useState } from 'react';
import { Api, Colors } from 'meconnect-sdk';

import Entypo from "react-native-vector-icons/Entypo";
import { useIsFocused } from '@react-navigation/native';
import Product from '../../../../components/Product';
import MCButton from '../../../../components/MCButton';
import getFetchDataErrorMessage from '../../../../src/get-fetch-data-error-msg';
import Splash from '../../../../components/Splash';

export default function Products({ navigation, route: { params: { vendorId } } }) {
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([])

  const [showSplash, setShowSplash] = useState(false)
  const [showPlaceholder, setShowPlaceholder] = useState(false)

  async function getProducts() {
    setIsLoading(true)
    setShowPlaceholder(false)

    Api.db.vendors.getProducts(vendorId).then(({ data: products }) => {
      setShowSplash(false)
      if (products.length === 0) setShowPlaceholder(true)
      setProducts(products)
      setIsLoading(false)
    }).catch(() => {
      ToastAndroid.show('Ocorreu um erro ao buscar os produtos', ToastAndroid.LONG)
    })
  }

  useEffect(() => {
    getProducts()
  }, [refreshing, useIsFocused()])

  function removeProdFromList(prodId) {
    const prodsFiltered = products.filter(prod => prod.id !== prodId)
    setProducts(prodsFiltered)
    if (prodsFiltered.length === 0) setShowPlaceholder(true)
  }

  const renderItem = ({ item: { id, description, photo_url, price } }) => {
    return (
      <Product
        id={id}
        description={description}
        photo_url={photo_url}
        price={price}
        options={true}
        onEdit={() => navigation.navigate('EditProduct', { id })}
        onRemove={removeProdFromList}
        navigation={navigation}
      />
    )
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

      {showPlaceholder && <Placeholder />}

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ paddingTop: 10 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />

      <Splash show={showSplash} />
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
