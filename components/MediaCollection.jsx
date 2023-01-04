import { Colors } from "meconnect-sdk";
import { Dimensions, Image, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import PostImage from "./PostImage";

export default function MediaCollection({ style, navigation, images = [], videos = [] }) {

    return (
        <View style={[styles.container, { ...style }]}>

            {
                images.length === 1 && <PostImage navigation={navigation} uri={images[0]}/>
            }

            {
                images.length === 2 && <View style={{ flex: 1 }}>
                    {
                        images.map((image, i) => {
                            return <PostImage navigation={navigation} key={i} uri={image}/>
                        })
                    }
                </View>
            }

            {
                images.length === 3 && <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <PostImage navigation={navigation} uri={images[0]}/>
                        <PostImage navigation={navigation} uri={images[1]}/>
                    </View>
                    <View style={{ flex: 1 }}>
                        <PostImage navigation={navigation} uri={images[2]}/>
                    </View>
                </View>
            }

            {
                images.length === 4 && <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <PostImage navigation={navigation} uri={images[0]}/>
                        <PostImage navigation={navigation} uri={images[1]}/>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <PostImage navigation={navigation} uri={images[2]}/>
                        <PostImage navigation={navigation} uri={images[3]}/>
                    </View>
                </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Dimensions.get('screen').width - 30,
        flexDirection: 'row',
        borderRadius: 20,
    },
})