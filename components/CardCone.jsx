import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
import { Api } from 'meconnect-sdk';

const DATA = [
  {
    id: '1',
    title: 'Santo Calçado',
    desc: 'Melhor loja e atacado de roupas e sapatos da cidade',
  },
  {
    id: '2',
    title: 'Leo Eventos',
    desc: 'Empresa de preparação de eventos e cia',
  },
  {
    id: '3',
    title: 'KidsPlay',
    desc: 'E-commerce de brinquedos',
  },
];

export default function ConnectionsList() {
  const [vendors, setVendors] = useState([])

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.item}>
        <Text style={styles.title}>{item.commercial}</Text>
        <Text style={styles.desc}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  async function fetchVendors() {
    const res = await fetch('https://meconnect-api.herokuapp.com/api/users/vendor', {
      headers: {
        'Authorization': "Bearer " + await Api.token.get()
      }
    })

    return res.json()
  }

  useEffect(() => {
    fetchVendors().then(vendors => {
      setVendors(vendors)
    })
  })

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={vendors}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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