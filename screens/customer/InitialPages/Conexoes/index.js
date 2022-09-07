import React, { useEffect, useState } from "react";
import { View, StyleSheet } from 'react-native';
import MCHeader from "../../../../components/MCHeader";
import ConnectionsList from "../../../../components/CardCone";
import Ionicons from "react-native-vector-icons/Ionicons";
import OptionsMenu from "react-native-option-menu";
import { Searchbar } from "react-native-paper";
const myIcon = <Ionicons name="ellipsis-vertical" size={26} color="#fff" />;
import { Api } from "meconnect-sdk";
import Search from "../../../../components/SearchInput";

export default function Conection() {
  return (
    <View style={styles.container}>
      <MCHeader title={"Conexões"}>
        <OptionsMenu
          customButton={myIcon}
          buttonStyle={{
            width: 32,
            height: 8,
            margin: 7.5,
            resizeMode: "contain",
          }}
          destructiveIndex={1}
          options={["Edit", "Delete", "Cancel"]}
        />
      </MCHeader>
      <Search placeholder={"Pesquisar conexões"}/>
      <ConnectionsList />
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
