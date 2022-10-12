import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
} from "react-native";

import { Api, Colors } from "meconnect-sdk";
import Post from '../../../../components/Post'


export default function Posts({ route }) {
  const renderItem = ({ item: { title, content, media_url, created_at, media_type } }) => (
    <Post
      title={title}
      content={content}
      media_url={media_url}
      media_type={media_type}
      created_at={created_at}
    />
  );

  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const posts = await Api.db.vendors.getPosts(route.params.vendor_id);
    return posts.data
  }

  useEffect(() => {
    getPosts().then(posts => setPosts(posts))
  }, []);

  const Placeholder = () => (
      <Text style={styles.placeholderText}>Este perfil ainda não publicou nenhum post</Text>
  )

  return (
    <View style={styles.container}>
      {(posts.length === 0) && <Placeholder />}
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
    flex: 1
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
  placeholderText: {
    color: Colors.DarkGray,
    textAlign: 'center',
    marginTop: 20,
  },
});

