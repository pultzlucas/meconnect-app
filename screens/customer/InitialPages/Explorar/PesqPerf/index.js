import { Api, Colors } from "meconnect-sdk";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import TopSearch from "../../../../../components/TopSearch";
import ConnectionsList from "../../../../../components/CardCone";
import CardPerfSearch from "../../../../../components/CardPerfSearch";

export default function Perf({ navigation }) {
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

  async function fetchVendors(text) {
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
      <TopSearch onChangeText={txt => {
        setIsLoading(true)
        setVendors([])
        fetchVendors(txt).then(vendors => {
          setVendors(vendors)
          setIsLoading(false)
        })
      }} />

      {vendors.length === 0 &&  <Text style={styles.placeholder}>Nenhum perfil encontrado</Text>}

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  placeholder: {
    marginTop: 20,
    textAlign: 'center',
    color: Colors.DarkGray
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
