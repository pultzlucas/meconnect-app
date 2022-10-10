import { ResizeMode, Video } from "expo-av"
import { Image, StyleSheet, Text, View } from "react-native"
import formatDateString from "../format-date-string"
import { Colors } from 'meconnect-sdk'

export default function Post({ title, content, media_url, created_at, media_type }) {
    return (
        <View style={styles.container}>
            <Text style={styles.date}>{formatDateString(created_at)}</Text>
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
            <Text style={styles.desc}>{content}</Text>
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
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    desc: {
        fontSize: 17,
        color: "#333333",
        marginTop: 10,
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