import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, RefreshControl, ActivityIndicator, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
import { Api, Colors } from 'meconnect-sdk';
import { useCallback } from 'react';

export default function CardPerfSearch({ navigation, text }) {
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
    const { data } = await Api.db.vendors.getByCommercial(text)
    return data
  }

  useEffect(() => {
    setIsLoading(true)
    setVendors([])
    fetchVendors().then(vendors => {
      setVendors(vendors)
      setIsLoading(false)
    })
  }, [refreshing])


  // Scroll down refreshing Refreshing

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color={Colors.DarkOrange} />}
      <FlatList
        data={vendors}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        } />
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  item: {
    backgroundColor: '#F3F3F3',
    position: 'relative',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
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