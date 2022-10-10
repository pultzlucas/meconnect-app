import { useEffect, useState, RefreshControl } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import MCButton from "../../../../components/MCButton";
import { Api, Colors } from "meconnect-sdk";

import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from "../../../../components/Splash";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export default function Prin({ route }) {
  const [vendor, setVendor] = useState({})
  const [connected, setConnected] = useState(false)
  const [customerId, setCustomerId] = useState(null)
  const [showSplash, setShowSplash] = useState(false)
  const [loadingConnections, setLoadingConnections] = useState(false)
  const { vendor_id } = route.params

  async function getVendor() {
    const { data } = await Api.db.vendors.get(vendor_id)
    return data
  }

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

  useEffect(() => {
    setLoadingConnections(true)
    getVendor().then(vendor => {
      setVendor(vendor)
      setLoadingConnections(false)
    })
  }, [connected])

  useEffect(() => {
    setShowSplash(true)
    AsyncStorage.getItem('@CustomerId').then(async id => {
      setCustomerId(id)
      const { data } = await Api.db.connections.isConnected(id, vendor_id)
      setShowSplash(false)
      setConnected(data.connected)
    })
  }, [])

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Fotos */}
        <Image style={styles.banner} source={{ uri: vendor.banner_url }} />
        <Image style={styles.logo} source={{ uri: vendor.photo_url }} />

        {/* Cabeçalho */}
        <Text style={styles.titulo}>{vendor.commercial}</Text>
        <Text style={styles.desc} >{vendor.description}</Text>

        {/* Conectar */}
        {
          connected ?
            <MCButton style={styles.btn} isLoading={loadingConnections} children={"Desconectar"} onClick={disconnect} /> :
            <MCButton style={styles.btn} isLoading={loadingConnections} children={"Conectar"} onClick={connect} />
        }

        <View style={styles.customersConnected}>
          <MaterialCommunityIcons name="connection" size={20} style={styles.customersConnectedTitle} color={Colors.DarkGray} />
          <Text style={styles.customersConnectedTotal}>{vendor.customers_connected}</Text>
        </View>


        {/* CNPJ */}
        <Text style={styles.cnpj}>CNPJ: {vendor.cnpj}</Text>

        {/* Infos */}
        <Text style={styles.bio}>{vendor.bio}</Text>
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
  banner: {
    width: "100%",
    height: "23%",
    marginBottom: -100,
  },
  logo: {
    borderWidth: 2,
    borderColor: "#ffffff",
    width: 160,
    height: 160,
    marginBottom: 5,
    borderRadius: 200,
    borderWidth: 5,
    borderColor: '#eee',
    borderStyle: 'solid',
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
    // borderWidth: 7,
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
    marginBottom: 200,
    padding: 10,
  },
});
