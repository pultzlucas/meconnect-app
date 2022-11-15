import { ResizeMode, Video } from "expo-av"
import { Image, StyleSheet, Text, View } from "react-native"
import { Api, Colors } from 'meconnect-sdk'
import Entypo from "react-native-vector-icons/Entypo";
import OptionMenu from "react-native-option-menu";
import { ToastAndroid } from "react-native";
import Date from "./Date";

export default function Post({ id, title, content, media_url, created_at, media_type, onRemove, options = false }) {

    async function deletePost() {
        const { status } = await Api.db.posts.delete(id)
        if (status === 200) {
            onRemove(id)
            ToastAndroid.show('Post foi deletado', ToastAndroid.SHORT);
        }
    }

    function reduceContent(content) {
        if (content.length > 100) {
            const contentCutted = String(content).split('').slice(0, 100)
            return contentCutted.join('') + '...'
        }

        return content
    }

    return (
        <View style={styles.container}>
            <View style={styles.postHeader}>
                <Date style={styles.date} date={created_at} />
                {options && <OptionMenu
                    customButton={<Entypo name="dots-three-vertical" size={16} color={Colors.Black}></Entypo>}
                    options={["Deletar post", "Cancelar"]}
                    actions={[deletePost]}>
                </OptionMenu>}

            </View>
            <Text style={styles.title}>{title}</Text>
            {
                media_type === 'image' && media_url ? <Image style={styles.media} source={{ uri: media_url }} /> : <></>
            }

            {
                media_type === 'video' && media_url ?
                    <Video
                        style={styles.media}
                        source={{ uri: media_url }}
                        useNativeControls
                        resizeMode={ResizeMode.COVER}
                        isLooping
                    /> : <></>
            }
            <Text style={styles.desc}>{reduceContent(content)}</Text>
        </View>
    )
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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        textAlign: "left",
    },
    media: {
        width: '100%',
        height: 200,
        marginTop: 10,
        borderRadius: 10,
    },
})