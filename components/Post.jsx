import { ResizeMode, Video } from "expo-av";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Api, Colors } from "meconnect-sdk";
import OptionMenu from "react-native-option-menu";
import { ToastAndroid } from "react-native";
import Date from "./Date";
import HorizontalLine from "./HorizontalLine";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store'
import { useEffect } from "react";

export default function Post({
  id: postId,
  title,
  content,
  media_url,
  created_at,
  likes,
  media_type,
  onRemove,
  options = false,
  interativeBar = false,
  navigation,
  interativeBarStatistics = false
}) {

  const [likeActived, setLikeActived] = useState(false)
  const [likesUpdated, setLikesUpdated] = useState(likes)

  const [showPostContent, setShowPostContent] = useState(false)

  useEffect(() => {
    setLikesUpdated(likes)
    SecureStore.getItemAsync('UserId').then(userId => {
      Api.db.posts.wasLikedBy(userId, postId).then(({ data: { liked } }) => {
        if (liked) setLikeActived(true)
        setShowPostContent(true)
      })
    })
  }, [likes])

  async function deletePost() {
    try {
      const { status } = await Api.db.posts.delete(postId);
      if (status === 200) {
        onRemove(postId);
        ToastAndroid.show("Post foi deletado", ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show("Ocorreu um erro ao deletar o post", ToastAndroid.LONG);
    }
  }

  // function reduceContent(content) {
  //   if (content.length > 100) {
  //     const contentCutted = String(content).split("").slice(0, 100);
  //     return contentCutted.join("") + "...";
  //   }
  //   return content;
  // }

  async function incrementLikes() {
    setLikesUpdated(likesUpdated + 1)
    const { status } = await Api.db.posts.like(await SecureStore.getItemAsync('UserId'), postId)
    if (status !== 200 && status !== 201) throw ''
  }

  async function decrementLikes() {
    if (likesUpdated > 0) {
      setLikesUpdated(likesUpdated - 1)
      const { status } = await Api.db.posts.unlike(await SecureStore.getItemAsync('UserId'), postId)
      if (status !== 200) throw ''
    }
  }

  async function toggleLikeBtn() {
    if (likeActived) {
      setLikeActived(!likeActived)
      try {
        await decrementLikes()
      } catch (error) {
        ToastAndroid.show('Ocorreu um erro ao desfazer a curtida do post', ToastAndroid.LONG)
      }
    } else {
      setLikeActived(!likeActived)
      try {
        await incrementLikes()
      } catch (error) {
        ToastAndroid.show('Ocorreu um erro ao curtir o post', ToastAndroid.LONG)
      }
    }
  }

  return (
    <View style={[styles.container, { minHeight: showPostContent ? 0 : 300 }]}>
      {
        showPostContent && <>

          <View style={styles.postHeader}>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
              <Text style={styles.title}>{title}</Text>
              {options && (
                <OptionMenu
                  customButton={
                    <Entypo
                      name="dots-three-horizontal"
                      size={20}
                      color={Colors.DarkGray}
                      style={{ marginTop: 2 }}
                    ></Entypo>
                  }
                  options={["Deletar", "Cancelar"]}
                  actions={[deletePost]}
                ></OptionMenu>
              )}
            </View>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('PostScreen', { id: postId })}>
            <Date style={styles.date} date={created_at} />

            {media_type === "image" && media_url ? (
              <Image
                style={styles.media}
                source={{ uri: media_url }}
                resizeMode={"stretch"}
              />
            ) : (
              <></>
            )}

            {media_type === "video" && media_url ? (
              <Video
                style={styles.media}
                source={{ uri: media_url }}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <></>
            )}
            <Text style={styles.desc}>{content}</Text>
          </TouchableOpacity>

          {
            interativeBarStatistics && <>
              <HorizontalLine color={Colors.LightGray} />
              <View style={styles.interactionBarContainer}>
                <View style={styles.likeInteraction}>
                  <AntDesign name="heart" size={14} color={Colors.LightGray}></AntDesign>
                  <Text style={{ marginLeft: 5, color: Colors.DarkGray, fontSize: 12 }}>{likesUpdated}</Text>
                </View>
              </View>
            </>
          }

          {
            interativeBar && <>
              <HorizontalLine color={Colors.LightGray} />
              <View style={styles.interactionBarContainer}>
                <Pressable onPress={toggleLikeBtn} style={styles2(likesUpdated).interactionBtn}>
                  <View style={styles.likeInteraction}>
                    {
                      likeActived
                        ? <AntDesign name="heart" size={16} color={'red'}></AntDesign>
                        : <AntDesign name="hearto" size={16} color={Colors.DarkGray}></AntDesign>
                    }
                    <Text style={{ marginLeft: 5, color: likeActived ? 'red' : Colors.DarkGray, fontSize: 12 }}>{likesUpdated}</Text>
                  </View>
                </Pressable>
              </View>
            </>
          }
        </>
      }
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 20,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  postHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "auto",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 14,
    color: "#333333",
    marginTop: 10,
    lineHeight: 20,
  },
  date: {
    fontSize: 12,
    color: Colors.DarkGray,
    marginTop: 6,
  },
  media: {
    width: 300,
    height: 300,
    marginTop: 10,
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  likeInteraction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const styles2 = (likesUpdated) => StyleSheet.create({
  interactionBtn: {
    width: 30 + String(likesUpdated).length * 6,
  },
})