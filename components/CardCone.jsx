import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, RefreshControl, ActivityIndicator, Image, Dimensions } from 'react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { Api, Colors } from 'meconnect-sdk';
import { useCallback } from 'react';

import MCButton from '../components/MCButton'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConnectionsList({ navigation }) {
  const isFocused = useIsFocused();

  const [vendors, setVendors] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      navigation.navigate('CustomerScreensVendorPage', { vendor_id: item.id })
    }}>
      <View style={styles.item}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <View>
          <Text style={styles.title}>{item.commercial}</Text>
          <Text style={styles.desc}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  async function fetchVendors() {
    const { data: connections } = await Api.db.customers.getConnections(await AsyncStorage.getItem('@CustomerId'))
    let vendors = []

    for (let conn of connections) {
      const { data: vendor } = await Api.db.vendors.get(conn.vendor_id)
      vendors.push(vendor)
    }

    return vendors
  }

  useEffect(() => {
    setIsLoading(true)
    setVendors([])
    fetchVendors().then(vendors => {
      setVendors(vendors)
      setIsLoading(false)
    })
  }, [refreshing, isFocused])


  // Scroll down refreshing Refreshing

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);


  const Placeholder = () => (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholder}>Você não possui nenhuma conexão</Text>
      <MCButton
        style={styles.placeholderBtn}
        size={'medium'}
        onClick={() => navigation.navigate('Explorar', { screen: 'CustomerScreens' })}>
        Explorar conexões
      </MCButton>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color={Colors.DarkOrange} />}

      {(vendors.length === 0 && !isLoading) && <Placeholder />}

      <FlatList
        data={vendors}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        } />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  placeholderContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  placeholderBtn: {
    marginTop: 10,
  },
  placeholder: {
    marginTop: 20,
    textAlign: 'center',
    color: Colors.DarkGray
  },
  item: {
    backgroundColor: "#F3F3F3",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    marginHorizontal: 14,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row'
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  desc: {
    fontSize: 13,
    color: '#333333',
  },
});