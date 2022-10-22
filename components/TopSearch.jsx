import { Colors } from 'meconnect-sdk';
import * as React from 'react';
import { StatusBar, StyleSheet, View } from "react-native";
import { Searchbar } from 'react-native-paper';

export default function TopSearch({ onChangeText }) {
  return (
    <View style={styles.container}>
      <Searchbar
        style={{
          position: 'relative',
          backgroundColor: "#F3F3F3",
          borderRadius: 20,
          marginLeft: 15,
          marginRight: 15,
          marginTop: 10,
          height: 40,
        }}
        placeholder="Pesquisar"
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  }
})