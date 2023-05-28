import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RegistrationScreen from "./screens/RegistrationScreen";
import { useFonts } from "expo-font";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";

const MainNav = createStackNavigator();

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   Roboto: require(''),
  // });

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <MainNav.Navigator initialRouteName="Login">
          <MainNav.Screen name="Login" component={LoginScreen} />
          <MainNav.Screen name="Register" component={RegistrationScreen} />
          <MainNav.Screen name="Home" component={Home} />
        </MainNav.Navigator>
      </NavigationContainer>
    </>
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
