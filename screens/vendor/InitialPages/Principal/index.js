import { useEffect, useState, RefreshControl } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  Button,
  Pressable,
} from "react-native";
import MCHeader from "../../../../components/MCHeader";
import { Api, Colors } from "meconnect-sdk";

import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from "../../../../components/Splash";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import HeaderOption from "../../../../components/HeaderOption";
import OptionMenu from "react-native-option-menu";
import logout from "../../../../logout-action";
import { useIsFocused } from "@react-navigation/native";
import { BottomSheet } from "react-native-btr";
import HorizontalLine from "../../../../components/HorizontalLine";
import VendorProfileTopic from "../../../../components/VendorProfileTopic";

export default function Principal({ navigation, route: { params: { vendorId } } }) {
  const [vendor, setVendor] = useState('')
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);

  function getVendorInfo() {
    Api.db.vendors.get(vendorId).then(({ data }) => {
      if (data) {
        setVendor(data)
      }
    })
  }

  useEffect(() => {
    getVendorInfo()
  }, [isFocused])

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  return (
    <ScrollView>
      <StatusBar></StatusBar>
      <View style={styles.container}>
        <MCHeader title={'Perfil'}>
          <HeaderOption onClick={() => { navigation.navigate('VendorProfileEdit') }}>
            <MaterialCommunityIcons name="pencil" size={24} color={'white'}></MaterialCommunityIcons>
          </HeaderOption>
          <HeaderOption onClick={toggleBottomNavigationView}>
            {/* <OptionMenu
              customButton={<Entypo name="dots-three-vertical" size={20} color={'white'}></Entypo>}
              destructiveIndex={0}
              options={["Logout", 'Cancel']}
              actions={[logout]}
            /> */}
            <Entypo name="dots-three-vertical" size={20} color={'white'}></Entypo>
          </HeaderOption>
        </MCHeader>

        {/* Fotos */}
        <View style={styles.header}>
          <Image style={styles.banner} source={{ uri: vendor.banner_url }} />
          <Image style={styles.logo} source={{ uri: vendor.photo_url }} />
        </View>

        {/* Cabeçalho */}
        <Text style={styles.titulo}>{vendor.commercial}</Text>
        <Text style={styles.desc} >{vendor.description}</Text>

        <View style={styles.customersConnected}>
          <MaterialCommunityIcons name="connection" size={20} style={styles.customersConnectedTitle} color={Colors.DarkGray} />
          <Text style={styles.customersConnectedTotal}>{vendor.customers_connected}</Text>
        </View>

        <Text style={styles.bio}>{vendor.bio}</Text>

        <VendorProfileTopic title={'CNPJ'} info={vendor.cnpj}/>
        <VendorProfileTopic title={'Email'} info={vendor.email}/>
        <VendorProfileTopic title={'Tel'} info={vendor.tel}/>
        <VendorProfileTopic title={'CEP'} info={vendor.cep}/>


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
                  <Text>{vendor.name}</Text>
                </Text>
                <Text style={styles.sheetOptionText}>
                  <Text>{vendor.email}</Text>
                </Text>
              </View>

              <HorizontalLine width={'100%'} marginVertical={0} color={Colors.DarkGray} />

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
    </ScrollView >
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    alignItems: "center",
    color: Colors.Black,
    paddingBottom: 20,
  },
  header: {
    height: 140,
    width: '100%',
    position: 'relative',
    marginBottom: 70,
  },
  banner: {
    width: "100%",
    height: '100%',
  },
  logo: {
    position: 'absolute',
    bottom: -70,
    left: '50%',
    transform: [{ translateX: -75 }],
    borderColor: "#ffffff",
    width: 140,
    height: 140,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#eee',
  },
  customersConnected: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 10,
    width: '50%',
    marginTop: 10,
  },
  customersConnectedTitle: {
    backgroundColor: "#DDDDDD",
    padding: 7,
  },
  customersConnectedTotal: {
    textAlign: 'center',
    margin: 'auto',
    flex: 1,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: "1%",
  },
  desc: {
    textAlign: "center",
    fontSize: 17,
    marginBottom: "4%",
    marginLeft: 20,
    marginRight: 20,
  },
  cnpj: {
    borderColor: "#EEEEEE",
    borderBottomWidth: 7,
    borderTopWidth: 7,
    color: Colors.Black,
    width: '100%',
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
    padding: 10,
  },
  bio: {
    fontSize: 17,
    color: Colors.Black,
    width: '100%',
    padding: 10,
  },

  /* BottomSheet */
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
