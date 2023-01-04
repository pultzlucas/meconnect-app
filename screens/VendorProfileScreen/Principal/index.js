import { useEffect, useState, RefreshControl } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  Pressable,
  ToastAndroid,
  ActivityIndicator
} from "react-native";
import MCButton from "../../../components/MCButton";
import VendorProfileTopic from "../../../components/VendorProfileTopic";
import Splash from "../../../components/Splash";

import { Api, Colors } from "meconnect-sdk";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import * as SecureStore from 'expo-secure-store'

export default function Principal({ route, navigation }) {
  const [vendor, setVendor] = useState({})
  const [connected, setConnected] = useState(false)
  const [customerId, setCustomerId] = useState(null)
  const [showSplash, setShowSplash] = useState(false)
  const [loadingConnections, setLoadingConnections] = useState(false)
  const { vendor_id, userType } = route.params
  const [notify, setNotify] = useState(true)
  const [connectionId, setConnectionId] = useState(null)
  const [loadingNotifyChanging, setLoadingNotifyChanging] = useState(false)

  useEffect(() => {
    setLoadingConnections(true)
    Api.db.vendors.get(vendor_id).then(({ data: vendor }) => {
      // formating data
      vendor.cnpj = vendor.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
      vendor.cep = vendor.cep.replace(/^(\d{5})(\d{3})/, "$1-$2")
      setVendor(vendor)
      setLoadingConnections(false)
    })
      .catch(err => {
        ToastAndroid.show('Ocorreu um erro ao buscar os dados do perfil', ToastAndroid.LONG);
      })
  }, [connected])

  useEffect(() => {
    setShowSplash(true)
    SecureStore.getItemAsync('CustomerId').then(async id => {
      setCustomerId(id)
      setLoadingNotifyChanging(true)

      const { data } = await Api.db.connections.getInfo(id, vendor_id)

      setConnected(data.connected)
      setNotify(data.notify)
      setConnectionId(data.id)

      setShowSplash(false)
      setLoadingNotifyChanging(false)
    })
  }, [])

  async function connect() {
    try {
      setLoadingConnections(true)
      const { data, status } = await Api.db.connections.connect({
        customer_id: customerId,
        vendor_id: vendor_id
      })

      setConnectionId(data.connection.id)

      if (status === 200) {
        setConnected(true)
        setNotify(true)
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Ocorreu um erro ao se connectar à empresa', ToastAndroid.LONG);
    }
  }

  async function disconnect() {
    try {
      setLoadingConnections(true)
      const { status } = await Api.db.connections.disconnect({
        customer_id: customerId,
        vendor_id: vendor_id
      })

      if (status === 200) {
        setConnected(false)
        setNotify(false)
      }
    } catch (error) {
      ToastAndroid.show('Ocorreu um erro ao se desconnectar da empresa', ToastAndroid.LONG);
    }
  }

  async function changeNotifyState() {
    try {
      setLoadingNotifyChanging(true)
      const { data, status } = await Api.db.connections.update(connectionId, {
        notify: !notify ? 1 : 0
      })

      if (status === 200 && data.updated) {
        setNotify(!notify)
        ToastAndroid.show(!notify ? 'Notificações ativadas' : 'Notificações desativadas', ToastAndroid.SHORT);
      }

      setLoadingNotifyChanging(false)
    } catch (error) {
      ToastAndroid.show(
        !notify ?
          'Ocorreu um erro ao ativar as notificações' :
          'Ocorreu um erro ao desativar as notificações',
        ToastAndroid.LONG);
    }
  }


  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: 'white'
    }}>
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
              <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                <MCButton isLoading={loadingConnections} noElevation children={"Desconectar"} onClick={disconnect} />
                <Pressable style={styles.notifyBtn} onPress={changeNotifyState}>
                  {!loadingNotifyChanging && <Feather name={notify ? 'bell' : 'bell-off'} color={'white'} size={22}></Feather>}
                  {loadingNotifyChanging && <ActivityIndicator size='small' color="white" />}
                </Pressable>
              </View> :
              <MCButton style={{ marginTop: 10 }} isLoading={loadingConnections} noElevation children={"Conectar"} onClick={connect} />
          )
        }

        <View style={styles.customersConnected}>
          <MaterialCommunityIcons name="connection" size={20} style={styles.customersConnectedTitle} color={Colors.DarkGray} />
          <Text style={styles.customersConnectedTotal}>{vendor.connections}</Text>
        </View>

        {vendor.bio && <Text style={styles.bio}>{vendor.bio}</Text>}


        <View>
          <VendorProfileTopic title={'CNPJ'} info={vendor.cnpj} />
          <VendorProfileTopic title={'Email'} info={vendor.email} />
          <VendorProfileTopic title={'Tel'} info={vendor.tel} />
          <VendorProfileTopic title={'CEP'} info={vendor.cep} />
        </View>

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
    marginVertical: 10,
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
  notifyBtn: {
    backgroundColor: Colors.LightGray,
    borderRadius: 10,
    padding: 10,
    marginLeft: 5,
    display: 'flex',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: 'center',
    marginBottom: 10,
  },
  desc: {
    textAlign: "center",
    fontSize: 17,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  bio: {
    marginVertical: 10,
    fontSize: 14,
    color: Colors.Black,
    paddingHorizontal: 20,
  },
});
