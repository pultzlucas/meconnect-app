import { Colors } from 'meconnect-sdk';
import * as React from 'react';
import { StatusBar, StyleSheet, View } from "react-native";
import { Searchbar } from 'react-native-paper';

export default function TopSearch({ onChangeText }) {
  const [searchQuery, setSearchQuery] = React.useState('');


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
          marginTop: 10,
        }}
        placeholder="Pesquisar"
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  }
})