import { Api, Colors } from "meconnect-sdk";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, ScrollView, ActivityIndicator, ToastAndroid } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MCHeader from "../components/MCHeader";
import HeaderOption from "../components/HeaderOption";
import Date from "../components/Date";
import { ResizeMode, Video } from "expo-av";

export default function ProductScreen({ navigation, route: { params: { id: postId } } }) {
    const [post, setPost] = useState({
        title: '...',
    })
    const [isLoading, setIsLoading] = useState(false)

    function error() {
        ToastAndroid.show('Ocorreu um erro ao buscar os dados do post', ToastAndroid.LONG)
        navigation.goBack()
    }

    useEffect(() => {
        setIsLoading(true)
        Api.db.posts.get(postId).then(({ data: post, status }) => {
            if (status !== 200) error()
            setPost(post)
            setIsLoading(false)
        })
            .catch(() => error())
    }, [])

    return (
        <View style={styles.background}>
            <StatusBar></StatusBar>
            <MCHeader title={'Post'}>
                <HeaderOption noMargin onClick={() => navigation.goBack()}>
                    <Ionicons name="close" color={'white'} size={26}></Ionicons>
                </HeaderOption>
            </MCHeader>
            {isLoading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color={Colors.DarkOrange} />}
            {
                !isLoading && <ScrollView contentContainerStyle={styles.item}>
                    {
                        !isLoading &&
                        <>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{post.title}</Text>
                            </View>
                            {
                                post.media_type === 'image' && post.media_url ? <Image style={styles.media} source={{ uri: post.media_url }} resizeMode='stretch'/> : <></>
                            }

                            {
                                post.media_type === 'video' && post.media_url ?
                                    <Video
                                        style={styles.media}
                                        source={{ uri: post.media_url }}
                                        useNativeControls
                                        resizeMode={ResizeMode.STRETCH}
                                        isLooping
                                    /> : <></>
                            }
                            {post.content && <Text style={styles.content}>{post.content}</Text>}
                            <View style={styles.textContainer}>
                                <Date date={post.created_at} style={styles.createdAt}>{post.created_at}</Date>
                            </View>
                        </>
                    }
                </ScrollView>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#fff",
        flex: 1,
        display: 'flex',
    },
    item: {
        backgroundColor: "#F3F3F3",
        paddingHorizontal: 14,
        paddingTop: 10,
        paddingBottom: 20,
        borderRadius: 8,
        marginTop: 10,
        marginHorizontal: 10,
        display: 'flex',
        alignItems: 'center',
    },
    media: {
        width: 300,
        height: 300,
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    createdAt: {
        color: Colors.DarkGray,
        textAlign: 'right',
        width: 340,
        fontSize: 12,
        marginTop: 10,
        paddingRight: 30,
    },
    textContainer: {
        width: '100%',
    },
    content: {
        marginTop: 10,
        width: 340,
        lineHeight: 20,
        paddingHorizontal: 20,
    }
});
