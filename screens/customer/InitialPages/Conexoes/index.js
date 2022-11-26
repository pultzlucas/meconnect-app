import { View, StyleSheet, ScrollView, RefreshControl, StatusBar, Text, Button, Pressable, Touchable, TouchableHighlight, ActivityIndicator, ToastAndroid } from 'react-native';
import MCHeader from "../../../../components/MCHeader";
import HeaderOption from "../../../../components/HeaderOption";
import { useCallback, useEffect, useRef, useState } from 'react';
import { BottomSheet } from 'react-native-btr';
import { Api, Colors } from 'meconnect-sdk';
import HorizontalLine from '../../../../components/HorizontalLine';
import Entypo from "react-native-vector-icons/Entypo";

import logout from "../../../../src/logout-action";
import { useIsFocused } from '@react-navigation/native';
import MCButton from '../../../../components/MCButton';
import { FlatList } from 'react-native-gesture-handler';
import VendorProfile from '../../../../components/VendorProfile';
import * as SecureStore from 'expo-secure-store'

export default function Conection({ navigation }) {
  const [customer, setCustomer] = useState('')
  const [visible, setVisible] = useState(false);

  const isFocused = useIsFocused();

  const [vendors, setVendors] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  async function fetchVendors() {
    const { data: connections } = await Api.db.customers.getConnections(await SecureStore.getItemAsync('CustomerId'))
    return connections
  }

  useEffect(() => {
    SecureStore.getItemAsync('CustomerId').then(id => {
      Api.db.customers.get(id).then(({ data }) => {
        setCustomer(data)
      })
    })
  }, [])

  function fetchDataError() {
    ToastAndroid.show('Ocorreu um erro ao buscar os dados do post', ToastAndroid.LONG)
  }

  useEffect(() => {
    setIsLoading(true)
    setVendors([])
    SecureStore.getItemAsync('CustomerId').then(customerId => {
      Api.db.customers.getConnections(customerId).then(({data: vendors}) => {
        setVendors(vendors)
        setIsLoading(false)
      })
        .catch(fetchDataError)
    })
      .catch(fetchDataError)
  }, [refreshing, isFocused])

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  const renderItem = ({ item: { commercial, description, photo_url, banner_url, vendor_id, notify } }) => (
    <VendorProfile
      key={vendor_id}
      id={vendor_id}
      notify={notify}
      commercial={commercial}
      description={description}
      photo_url={photo_url}
      banner_url={banner_url}
      navigation={navigation}
    />
  );


  const Placeholder = () => (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>Você não possui nenhuma conexão</Text>
      <MCButton
        style={styles.placeholderBtn}
        size={'medium'}
        onClick={() => navigation.navigate('Explorar', { screen: 'CustomerScreens' })}>
        Explorar conexões
      </MCButton>
    </View>
  )

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.DarkOrange} />
      <MCHeader title={"Conexões"}>
        <HeaderOption onClick={toggleBottomNavigationView}>
          <Entypo name="dots-three-vertical" size={20} color={'white'}></Entypo>
        </HeaderOption>
      </MCHeader>

      {isLoading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color={Colors.DarkOrange} />}

      {(vendors.length === 0 && !isLoading) && <Placeholder />}

      <FlatList
        data={vendors}
        renderItem={renderItem}
        keyExtractor={item => item.vendor_id}
        style={{ paddingTop: 10 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        } />

      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}
      >
        <View style={styles.bottomNavigationView}>
          <View style={styles.tabIcon}></View>
          <ScrollView>
            <View style={styles.sheetOptionTextContainer}>
              <Text style={styles.sheetOptionText}>
                <Text>{customer.name}</Text>
              </Text>
              <Text style={styles.sheetOptionText}>
                <Text>{customer.email}</Text>
              </Text>
            </View>

            <HorizontalLine width={'100%'} marginVertical={0} color={Colors.DarkGray} />

            <Pressable
              style={styles.sheetOptionTextContainer}
              onPress={logout}
              android_ripple={{ color: Colors.DarkOrange }}>
              <Text style={styles.sheetOptionText}>Sair</Text>
            </Pressable>
          </ScrollView>
        </View>
      </BottomSheet>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 250,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  sheetOptionTextContainer: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  sheetOptionText: {
    fontSize: 16,
    marginVertical: 10
  },
  tabIcon: {
    width: 40,
    height: 10,
    marginTop: 6,
    backgroundColor: Colors.DarkGray,
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  placeholderContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  placeholderText: {
    color: Colors.DarkGray,
    textAlign: 'center',
    marginTop: 20,
  },
  placeholderBtn: {
    marginTop: 20,
  },
});
