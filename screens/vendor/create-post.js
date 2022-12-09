import { SafeAreaView, StatusBar, StyleSheet, Text, ToastAndroid, View, Image, ScrollView, TouchableOpacity } from "react-native"

import MCHeader from '../../components/MCHeader'
import MCInput from '../../components/MCInput'
import MCTextarea from '../../components/MCTextarea'
import HeaderOption from '../../components/HeaderOption'

import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Api, Colors, Media } from "meconnect-sdk"
import { Pressable } from "react-native"
import { useRef, useState } from "react"
import * as SecureStore from 'expo-secure-store'
import Splash from "../../components/Splash"
import { ResizeMode, Video } from "expo-av"

import * as FileSystem from 'expo-file-system';

export default function CreatePost({ navigation }) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState(null)
    const [videoUrl, setVideoUrl] = useState(null)

    const [showSplash, setShowSplash] = useState(false)
    const video = useRef(null);

    async function pickPostImage() {
        const { uri } = await Media.pickImage({
            aspect: [3, 3]
        })
        setImageUrl(uri)
        setVideoUrl('')
    }

    async function pickPostVideo() {
        const video = await Media.pickVideo({
            aspect: [3, 3]
        })

        const info = await FileSystem.getInfoAsync(video.uri)

        if(info.size > 10000000) {
            ToastAndroid.show('Arquivo de vídeo é muito grande para fazer o upload', ToastAndroid.LONG)
            return
        }

        setVideoUrl(video.uri)
        setImageUrl('')
    }

    async function publishPost() {
        setShowSplash(true)

        if (!title) {
            setShowSplash(false)
            ToastAndroid.show('Por favor insira o título do post', ToastAndroid.SHORT)
            return
        }

        if (!content /* && (!imageUrl || !videoUrl) */) {
            setShowSplash(false)
            ToastAndroid.show('Por favor insira o conteúdo do post', ToastAndroid.SHORT)
            return
        }

        try {
            const { data, status: saveData } = await Api.db.posts.create({
                vendor_id: await SecureStore.getItemAsync('VendorId'),
                title,
                content
            })

            const resData = data

            let saveMedia = 0

            if (imageUrl) {
                const { status } = await Api.db.posts.setImage(resData.post.id, imageUrl)
                saveMedia = status
            }

            if (videoUrl) {
                const { status } = await Api.db.posts.setVideo(resData.post.id, videoUrl)
                saveMedia = status
            }

            if (saveData === 200 && (saveMedia === 200 || !imageUrl || !videoUrl)) {
                ToastAndroid.show('Post foi publicado', ToastAndroid.SHORT)
                navigation.navigate('VendorScreens')
                setShowSplash(false)
            } else {
                setShowSplash(false)
                ToastAndroid.show('Ocorreu um erro ao publicar o post', ToastAndroid.LONG)
            }
        } catch (error) {
            ToastAndroid.show('Ocorreu um erro ao publicar o post', ToastAndroid.LONG)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <StatusBar></StatusBar>
                <MCHeader title={'Adicionar post'}>
                    <HeaderOption onClick={publishPost}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Publicar</Text>
                    </HeaderOption>
                    <HeaderOption onClick={() => navigation.navigate('VendorScreens')}>
                        <Ionicons name="close" color={'white'} size={26}></Ionicons>
                    </HeaderOption>
                </MCHeader>

                <View style={styles.form}>
                    <MCInput label={'Título'} onInput={text => setTitle(text)} value={title}></MCInput>
                    <MCTextarea label={'Conteúdo'} onInput={text => setContent(text)} placeholder={'Digite seu texto aqui...'}>{content}</MCTextarea>

                    <View style={styles.prodImagePickerContainer}>
                        <Text style={styles.imagePickerTitle}>Mídia</Text>
                        <Text>Escolha um arquivo de mídia</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
                            <TouchableOpacity style={styles.prodImagePickerBtn} onPress={pickPostImage}>
                                <Ionicons name="image" size={40}></Ionicons>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.prodImagePickerBtn} onPress={pickPostVideo}>
                                <Entypo name="folder-video" size={40}></Entypo>
                            </TouchableOpacity>
                        </View>
                        {
                            imageUrl && <Image style={styles.media} source={{ uri: imageUrl }} resizeMode='stretch'></Image>
                        }

                        {
                            videoUrl && <Video
                                ref={video}
                                style={styles.media}
                                source={{ uri: videoUrl }}
                                useNativeControls
                                resizeMode={ResizeMode.STRETCH}
                                isLooping
                            />
                        }
                    </View>
                    <Splash show={showSplash} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 20
    },
    form: {
        display: 'flex',
        alignItems: 'center',
    },
    prodImagePickerContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    imagePickerTitle: {
        color: Colors.DarkGray,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    prodImagePickerBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150,
        borderWidth: 2,
        borderColor: Colors.LightGray,
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 5
    },
    media: {
        width: 300,
        height: 300,
        borderRadius: 10,
    },
})