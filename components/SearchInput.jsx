import { useState } from "react";
import { StyleSheet } from "react-native"
import { Searchbar } from "react-native-paper";

export default function Search({ placeholder }) {
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Searchbar
            style={styles.input}
            placeholder={placeholder}
            onChangeText={onChangeSearch}
            value={searchQuery}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        position: 'relative',
        padding: 0,
        backgroundColor: "#F3F3F3",
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 10,
    }
})