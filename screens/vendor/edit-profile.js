import { SafeAreaView, StatusBar, StyleSheet } from "react-native"

import MCHeader from '../../components/MCHeader'
import HeaderOption from '../../components/HeaderOption'

import Ionicons from "react-native-vector-icons/Ionicons";

export default function EditProfile({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar></StatusBar>
            <MCHeader title={'Editar perfil'}>
                <HeaderOption onClick={() => navigation.navigate('VendorScreens')}>
                    <Ionicons name="close" color={'white'} size={26}></Ionicons>
                </HeaderOption>
            </MCHeader>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    }
})