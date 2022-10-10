import { SafeAreaView, StatusBar, StyleSheet, Text, ToastAndroid, View, Image, ScrollView } from "react-native"

import MCHeader from '../../components/MCHeader'
import MCInput from '../../components/MCInput'
import MCTextarea from '../../components/MCTextarea'
import HeaderOption from '../../components/HeaderOption'

import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Api, Colors, Media } from "meconnect-sdk"
import { Pressable } from "react-native"
import { useRef, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Splash from "../../components/Splash"
import { ResizeMode, Video } from "expo-av"

export default function CreatePost({ navigation }) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const [videoDimension, setVideoDimension] = useState({ w: 0, h: 0 })

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

        setVideoUrl(video.uri)
        setImageUrl('')

        setVideoDimension({
            w: video.width,
            h: video.height
        })
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

        const { data, status: saveData } = await Api.db.posts.create({
            vendor_id: await AsyncStorage.getItem('@VendorId'),
            title,
            content
        })

        let saveMedia = 200

        if (imageUrl) {
            const { status } = await Api.db.posts.setImage(data.post.id, imageUrl)
            saveMedia = status
        }

        if (videoUrl) {
            const { status } = await Api.db.posts.setVideo(data.post.id, videoUrl)
            saveMedia = status
        }

        if (saveData === 200 && saveMedia === 200) {
            ToastAndroid.show('Post foi publicado', ToastAndroid.SHORT)
            navigation.navigate('VendorScreens')
            setShowSplash(false)
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
                            <Pressable style={styles.prodImagePickerBtn} onPress={pickPostImage}>
                                <Ionicons name="image" size={40}></Ionicons>
                            </Pressable>
                            <Pressable style={styles.prodImagePickerBtn} onPress={pickPostVideo}>
                                <Entypo name="folder-video" size={40}></Entypo>
                            </Pressable>
                        </View>
                        {
                            imageUrl && <Image style={styles.media} source={{ uri: imageUrl }}></Image>
                        }

                        {
                            videoUrl && <Video
                                ref={video}
                                style={styles.media}
                                source={{ uri: videoUrl }}
                                useNativeControls
                                resizeMode={ResizeMode.COVER}
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