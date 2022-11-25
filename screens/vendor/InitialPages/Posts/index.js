import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  StatusBar,
  SafeAreaView,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import MCHeader from "../../../../components/MCHeader";
import HeaderOption from "../../../../components/HeaderOption";
import { useCallback, useEffect, useState } from "react";
import { Api, Colors } from "meconnect-sdk";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Entypo from "react-native-vector-icons/Entypo";
import Post from "../../../../components/Post";
import MCButton from "../../../../components/MCButton";
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import Splash from "../../../../components/Splash";
import getFetchDataErrorMessage from "../../../../src/get-fetch-data-error-msg";
import * as Network from 'expo-network';

export default function Posts({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  function getPosts() {
    SecureStore.getItemAsync("VendorId").then((vendorId) => {
      setShowPlaceholder(false);
      setIsLoading(true);
      setShowSplash(false);
      Api.db.vendors
        .getPosts(vendorId)
        .then(({ data }) => {
          if (data.length === 0) setShowPlaceholder(true);
          setIsLoading(false);
          setPosts(data);
        })
        .catch(() => {
          ToastAndroid.show('Ocorreu um erro ao buscar os posts', ToastAndroid.LONG)
        })
    }).catch(() => {
      ToastAndroid.show('Ocorreu um erro ao buscar os posts', ToastAndroid.LONG)
    })
  }



  useEffect(() => {
    getPosts();
  }, [refreshing, useIsFocused()]);

  function removePostFromList(postId) {
    const postsFiltered = posts.filter((post) => post.id !== postId);
    setPosts(postsFiltered);
    if (postsFiltered.length === 0) setShowPlaceholder(true);
  }

  const renderItem = ({
    item: { id, title, content, media_url, created_at, media_type },
  }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('PostScreen', { id })}>
        <Post
          id={id}
          title={title}
          content={content}
          media_url={media_url}
          media_type={media_type}
          created_at={created_at}
          onRemove={removePostFromList}
          options={true}
        />
      </TouchableOpacity>
    );
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  const Placeholder = () => (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>
        Você ainda não publicou nenhum post
      </Text>
      <MCButton
        style={styles.placeholderBtn}
        onClick={() => navigation.navigate("VendorCreatePost")}
      >
        Criar um post
      </MCButton>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar></StatusBar>

      <MCHeader title={"Meus posts"}>
        <HeaderOption onClick={() => navigation.navigate("VendorCreatePost")}>
          <Entypo name="plus" size={30} color={"white"}></Entypo>
        </HeaderOption>
      </MCHeader>
      {isLoading && (
        <ActivityIndicator
          style={{ marginTop: 20 }}
          size="large"
          color={Colors.DarkOrange}
        />
      )}

      {showPlaceholder && <Placeholder />}

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        rende
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <Splash show={showSplash} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  placeholderContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
  placeholderText: {
    color: Colors.DarkGray,
  },
  placeholderBtn: {
    marginTop: 10,
  },
});
