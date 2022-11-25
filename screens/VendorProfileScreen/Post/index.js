import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";

import { Api, Colors } from "meconnect-sdk";
import Post from '../../../components/Post'

export default function Posts({ navigation, route }) {
  const renderItem = ({ item: { id, title, content, media_url, created_at, media_type } }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PostScreen', { id })}>
      <Post
        title={title}
        content={content}
        media_url={media_url}
        media_type={media_type}
        created_at={created_at}
      />
    </TouchableOpacity>
  );

  const [posts, setPosts] = useState([]);
  const [showPlaceholder, setShowPlaceholder] = useState(false)

  useEffect(() => {
    setShowPlaceholder(false)
    Api.db.vendors.getPosts(route.params.vendor_id).then(posts => {
      if(posts.length === 0) {
        setShowPlaceholder(true)
      }
      setPosts(posts)
    }).catch(() => {
      ToastAndroid.show('Ocorreu um erro ao buscar os posts', ToastAndroid.LONG)
    })
  }, []);

  const Placeholder = () => {
    return (
        <Text style={styles.placeholder}>Esta empresa ainda não publicou nenhum post</Text>
    )
  }

  return (
    <View style={styles.container}>
       {showPlaceholder && <Placeholder/>}
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  placeholder: {
    textAlign: 'center',
    marginTop: 20,
    color: Colors.DarkGray
  },
  searchInput: {
    position: "relative",
    padding: 0,
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    elevation: 3,
    fontSize: 18,
    color: '#333'
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

