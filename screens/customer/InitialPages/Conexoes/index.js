import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import MCHeader from "../../../../components/MCHeader";
import ConnectionsList from "../../../../components/CardCone";

export default function Conection({ navigation }) {
  return (
      <View style={styles.container}>
        <MCHeader title={"Conexões"}></MCHeader>
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
