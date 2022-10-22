import { Pressable, StyleSheet } from "react-native";

export default function HeaderOption({ children, onClick, noMargin }) {
    return (
        <Pressable style={{ marginLeft: noMargin ? 0 : 15 }} onPress={onClick}>
            {children}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    btn: {
        marginLeft: 15,
    }
})