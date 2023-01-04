import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";

export default function PostImage({ navigation, uri }) {

    function viewImage() {
        navigation.navigate('ImageView', { uri })
    }

    return (
        <TouchableOpacity style={styles.media} onPress={viewImage}>
            <Image
                style={{ flex: 1, borderRadius: 5 }}
                source={{ uri }}
                resizeMode='cover'
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    media: {
        flex: 1,
        margin: 4,
    }
})