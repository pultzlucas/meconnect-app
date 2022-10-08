import { View, StyleSheet, ScrollView, RefreshControl, StatusBar, SafeAreaView, FlatList, Text, Image, ActivityIndicator } from 'react-native';
import MCHeader from "../../../../components/MCHeader";
import ConnectionsList from "../../../../components/CardCone";
import { useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Api, Colors } from 'meconnect-sdk';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Conection({ navigation }) {
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([])

  useEffect(() => {
    setIsLoading(true)
    AsyncStorage.getItem('@VendorId').then(async vendorId => {
      const { data } = await Api.db.vendors.getPosts(vendorId)
      setPosts(data)
      setIsLoading(false)
    })
  }, [refreshing])

  const renderItem = ({ item: { title, content, media_url, created_at } }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.date}>{created_at}</Text>
        <Text style={styles.title}>{title}</Text>
        {
          media_url && <Image style={styles.img} source={{ uri: media_url }} />
        }
        <Text style={styles.desc}>{content}</Text>
      </View>
    )
  };

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar></StatusBar>
      <MCHeader title={'Posts'}></MCHeader>
      {isLoading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color={Colors.DarkOrange} />}

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ marginBottom: 70 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    backgroundColor: "#F3F3F3",
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  desc: {
    fontSize: 17,
    color: "#333333",
  },
  date: {
    fontSize: 14,
    color: "#000",
    textAlign: "right",
  },
  img: {
    width: '100%',
    height: 200,
  }
});
