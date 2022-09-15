import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, RefreshControl } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
import { Api } from 'meconnect-sdk';
import { useCallback } from 'react';

export default function ConnectionsList({ navigation }) {
  const [vendors, setVendors] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      navigation.navigate('CustomerScreensVendorPage', { vendor_id: item.id })
    }}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.commercial}</Text>
        <Text style={styles.desc}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  async function fetchVendors() {
    const { data: connections } = await Api.db.customers.getConnections(1)
    let vendors = []

    for (let conn of connections) {
      const { data: vendor } = await Api.db.vendors.get(conn.vendor_id)
      vendors.push(vendor)
    }

    console.log(vendors)
    return vendors
  }

  useEffect(() => {
    fetchVendors().then(vendors => {
      setVendors(vendors)
    })
  }, [refreshing])


  // Scroll down refreshing Refreshing

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={vendors}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  item: {
    backgroundColor: '#F3F3F3',
    position: 'relative',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
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