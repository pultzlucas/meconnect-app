import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import MCHeader from "../../../../components/MCHeader";
import ConnectionsList from "../../../../components/CardCone";
import Ionicons from "react-native-vector-icons/Ionicons";
import OptionsMenu from "react-native-option-menu";
import { Searchbar } from "react-native-paper";
const myIcon = <Ionicons name="ellipsis-vertical" size={26} color="#fff" />;
import { Api } from "meconnect-sdk";
import Search from "../../../../components/SearchInput";



export default function Conection({ navigation }) {
  return (
      <View style={styles.container}>
        <MCHeader title={"Conexões"}></MCHeader>
        {/* <Search placeholder={"Pesquisar conexões"} /> */}
        <ConnectionsList navigation={navigation} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icone1: {
    marginRight: 15,
  },

});
