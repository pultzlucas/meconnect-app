import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  TextInput,
} from "react-native";

import { Api, Colors } from "meconnect-sdk";


export default function Post({ route }) {
  const renderItem = ({ item: { title, content, media_url, created_at } }) => (
    <View style={styles.item}>
      <Text style={styles.date}>{created_at}</Text>
      <Text style={styles.title}>{title}</Text>
      {
        media_url && <Image style={styles.img} source={{ uri: media_url }} />
      }
      <Text style={styles.desc}>{content}</Text>
    </View>
  );

  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const posts = await Api.db.vendors.getPosts(route.params.vendor_id);
    return posts.data
  }

  useEffect(() => {
    getPosts().then(posts => setPosts(posts))
  }, []);

  const [searchQuery, setSearchQuery] = useState('')

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        onChangeText={query => {
          if (!query) {
            getPosts().then(posts => setPosts(posts))
          }

          setSearchQuery(query)

          const postsFiltered = posts.filter(post => post.title.includes(searchQuery))
          setPosts(postsFiltered)
        }}
        value={searchQuery}
        placeholder='Procurar postagens'
      />

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
    backgroundColor: '#fff'
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

