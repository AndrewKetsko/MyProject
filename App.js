import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RegistrationScreen from "./screens/RegistrationScreen";
import { useFonts } from "expo-font";
import LoginScreen from "./screens/LoginScreen";

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   Roboto: require(''),
  // });
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <RegistrationScreen />
      {/* <LoginScreen/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
