import { Api, Colors } from "meconnect-sdk";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MCButton from "../components/MCButton";
import MCHeader from "../components/MCHeader";
import Price from "../components/Price";
import HeaderOption from "../components/HeaderOption";
import HorizontalLine from "../components/HorizontalLine";
import Date from "../components/Date";

export default function ProductScreen({ navigation, route: { params: { postId } } }) {
    const [post, setPost] = useState({
        title: '...',
    })

    useEffect(() => {
        Api.db.posts.get(postId).then(({ data: post }) => {
            setPost(post)
        })
    }, [])

    return (
        <View style={styles.background}>
            <StatusBar></StatusBar>
            <ScrollView contentContainerStyle={styles.container}>
                <MCHeader>
                    <HeaderOption noMargin onClick={() => navigation.goBack()}>
                        <Ionicons style={styles.backBtn} name="arrow-back-outline" size={35} color={"#fff"} />
                    </HeaderOption>
                </MCHeader>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{post.title}</Text>
                </View>
                {
                    post.media_type === 'image' && post.media_url ? <Image style={styles.media} source={{ uri: post.media_url }} /> : <></>
                }

                {
                    post.media_type === 'video' && post.media_url ?
                        <Video
                            style={styles.media}
                            source={{ uri: post.media_url }}
                            useNativeControls
                            resizeMode={ResizeMode.COVER}
                            isLooping
                        /> : <></>
                }
                {post.content && <Text style={styles.content}>{post.content}</Text>}
                <View style={styles.textContainer}>
                    <Date date={post.created_at} style={styles.createdAt}>{post.created_at}</Date>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        textAlign: 'center',
        backgroundColor: "#fff",
        flex: 1,
        display: 'flex',
    },
    container: {
        paddingBottom: 20,
        display: 'flex',
        alignItems: 'center',
    },
    media: {
        width: 300,
        height: 300,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.LightGray,
        marginTop: 10,
    },
    title: {
        marginTop: 20,
        fontSize: 18,      
        fontWeight: 'bold',
    },
    createdAt: {
        color: Colors.DarkGray,
        textAlign: 'right',
        fontSize: 12,      
    },
    textContainer: {
        width: 300,
    },
    content: {
        marginTop: 20,
        width: 300,
        lineHeight: 20,
    }
});
