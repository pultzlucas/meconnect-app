import { View, StyleSheet, ScrollView, RefreshControl, StatusBar, SafeAreaView, FlatList, Text, Image, ActivityIndicator } from 'react-native';
import MCHeader from "../../../../components/MCHeader";
import ConnectionsList from "../../../../components/CardCone";
import { useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Api, Colors } from 'meconnect-sdk';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Conection({ navigation }) {
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([])

  useEffect(() => {
    setIsLoading(true)
    AsyncStorage.getItem('@VendorId').then(async vendorId => {
      const { data } = await Api.db.vendors.getProducts(vendorId)
      setProducts(data)
      setIsLoading(false)
    })
  }, [refreshing])

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
    <SafeAreaView style={styles.container}>
      <StatusBar></StatusBar>
      <MCHeader title={'Produtos'}></MCHeader>
      {isLoading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color={Colors.DarkOrange} />}

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ marginBottom: 70 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
