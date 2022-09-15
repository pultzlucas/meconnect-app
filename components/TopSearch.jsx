import { Colors } from 'meconnect-sdk';
import * as React from 'react';
import { StatusBar, StyleSheet, View } from "react-native";
import { Searchbar } from 'react-native-paper';

const TopSearch = (title) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={styles.container}>
    <Searchbar
    style={{
        position: 'relative',
        padding: 0,
        backgroundColor: "#F3F3F3",
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop:10,
    }}
      placeholder="Pesquisar"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      backgroundColor: Colors.DarkOrange,
      marginTop: StatusBar.currentHeight,
  }
})

export default TopSearch;