import { Pressable, StyleSheet } from "react-native";

export default function HeaderOption({ children, onClick }) {
    return (
        <Pressable style={styles.btn} onPress={onClick}>
            {children}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    btn: {
        marginLeft: 15,
    }
})