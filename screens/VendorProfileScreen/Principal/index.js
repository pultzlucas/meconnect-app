import { useEffect, useState, RefreshControl } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  Pressable
} from "react-native";
import MCButton from "../../../components/MCButton";
import VendorProfileTopic from "../../../components/VendorProfileTopic";
import Splash from "../../../components/Splash";

import { Api, Colors } from "meconnect-sdk";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SecureStore from 'expo-secure-store'

export default function Principal({ route, navigation }) {
  const [vendor, setVendor] = useState({})
  const [connected, setConnected] = useState(false)
  const [customerId, setCustomerId] = useState(null)
  const [showSplash, setShowSplash] = useState(false)
  const [loadingConnections, setLoadingConnections] = useState(false)
  const { vendor_id, userType } = route.params

  async function getVendor() {
    const { data } = await Api.db.vendors.get(vendor_id)
    return data
  }

  useEffect(() => {
    setLoadingConnections(true)
    getVendor().then(vendor => {
      setVendor(vendor)
      setLoadingConnections(false)
    })
  }, [connected])

  useEffect(() => {
    setShowSplash(true)
    SecureStore.getItemAsync('CustomerId').then(async id => {
      setCustomerId(id)
      const { data } = await Api.db.connections.isConnected(id, vendor_id)
      setShowSplash(false)
      setConnected(data.connected)
    })
  }, [])


  async function connect() {
    setLoadingConnections(true)
    const { status } = await Api.db.connections.connect({
      customer_id: customerId,
      vendor_id: vendor_id
    })

    if (status === 200) {
      setConnected(true)
    }
  }

  async function disconnect() {
    setLoadingConnections(true)
    const { status } = await Api.db.connections.disconnect({
      customer_id: customerId,
      vendor_id: vendor_id
    })

    if (status === 200) {
      setConnected(false)
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Fotos */}
        <View style={styles.header}>
          <Image style={styles.banner} source={{ uri: vendor.banner_url }} />
          <Image style={styles.logo} source={{ uri: vendor.photo_url }} />
        </View>

        {/* Back Button */}
        <Pressable style={styles.backBtn} onPress={() => navigation.navigate(
          userType === 'customer' ? 'CustomerScreens' : 'VendorScreens'
        )}>
          <Ionicons name="arrow-back-outline" size={26} color={"#fff"} />
        </Pressable>

        {/* Cabeçalho */}
        <Text style={styles.titulo}>{vendor.commercial}</Text>
        <Text style={styles.desc} >{vendor.description}</Text>

        {/* Conectar */}
        {
          userType === 'customer' && (
            connected ?
              <MCButton style={styles.btn} isLoading={loadingConnections} noElevation children={"Desconectar"} onClick={disconnect} /> :
              <MCButton style={styles.btn} isLoading={loadingConnections} noElevation children={"Conectar"} onClick={connect} />
          )
        }

        <View style={styles.customersConnected}>
          <MaterialCommunityIcons name="connection" size={20} style={styles.customersConnectedTitle} color={Colors.DarkGray} />
          <Text style={styles.customersConnectedTotal}>{vendor.connections}</Text>
        </View>

        <Text style={styles.bio}>{vendor.bio}</Text>

        <VendorProfileTopic title={'CNPJ'} info={vendor.cnpj} />
        <VendorProfileTopic title={'Email'} info={vendor.email} />
        <VendorProfileTopic title={'Tel'} info={vendor.tel} />
        <VendorProfileTopic title={'CEP'} info={vendor.cep} />

      </View>
      <Splash show={showSplash} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    alignItems: "center",
    color: Colors.Black,
    paddingBottom: 20,
    height: '100%',
  },
  header: {
    height: 140,
    width: '100%',
    position: 'relative',
    marginBottom: 70,
  },
  backBtn: {
    backgroundColor: Colors.DarkOrange,
    borderColor: '#f3f3f3',
    borderRadius: 100,
    position: 'absolute',
    padding: 5,
    left: 10,
    top: 10
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
    borderColor: "#f3f3f3",
    width: 140,
    height: 140,
    borderRadius: 100,
    borderWidth: 8,
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
});
