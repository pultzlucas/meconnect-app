import { View, StyleSheet, ScrollView, RefreshControl, StatusBar } from 'react-native';
import MCHeader from "../../../../components/MCHeader";
import ConnectionsList from "../../../../components/CardCone";
import { useIsFocused } from '@react-navigation/native';

export default function Conection({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar/>
      <MCHeader title={"Conexões"}></MCHeader>
      <ConnectionsList navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
