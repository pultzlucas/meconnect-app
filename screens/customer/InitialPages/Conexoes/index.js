import { View, StyleSheet, ScrollView, RefreshControl, StatusBar, Text, Button, Pressable, Touchable, TouchableHighlight } from 'react-native';
import MCHeader from "../../../../components/MCHeader";
import HeaderOption from "../../../../components/HeaderOption";
import ConnectionsList from "../../../../components/CardCone";
import { useEffect, useRef, useState } from 'react';
import { BottomSheet } from 'react-native-btr';
import { Api, Colors } from 'meconnect-sdk';
import HorizontalLine from '../../../../components/HorizontalLine';
import Entypo from "react-native-vector-icons/Entypo";

import logout from "../../../../logout-action";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Conection({ navigation }) {
  const [customer, setCustomer] = useState('')
  const [visible, setVisible] = useState(false);

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    AsyncStorage.getItem('@CustomerId').then(id => {
      Api.db.customers.get(id).then(({ data }) => {
        setCustomer(data)
      })
    })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar />
      <MCHeader title={"Conexões"}>
        <HeaderOption onClick={toggleBottomNavigationView}>
          <Entypo name="dots-three-vertical" size={20} color={'white'}></Entypo>
        </HeaderOption>
      </MCHeader>
      <ConnectionsList navigation={navigation} />

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

            <HorizontalLine width={'100%'} marginVertical={0} color={Colors.DarkGray}/>

            <Pressable
              style={styles.sheetOptionTextContainer}
              onPress={logout}
              android_ripple={{ color: Colors.DarkOrange }}>
              <Text style={styles.sheetOptionText}>Logout</Text>
            </Pressable>
          </ScrollView>
        </View>
      </BottomSheet>

    </View>
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
});
