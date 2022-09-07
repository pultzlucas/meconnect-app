import { Colors } from "meconnect-sdk";
import { StatusBar, StyleSheet, Text, View } from "react-native";

function MCHeader({ title, children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.DarkOrange,
    width: "100%",
    height: 60,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    position: 'relative',
    top: 0,
    marginTop: StatusBar.currentHeight,
  },

  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    marginRight: "auto",
  },
});

export default MCHeader;
