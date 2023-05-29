import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RegistrationScreen from "./screens/RegistrationScreen";
import { useFonts } from "expo-font";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import { MaterialIcons } from "@expo/vector-icons";

const MainNav = createStackNavigator();
const HomeNav = createStackNavigator();

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   Roboto: require(''),
  // });
  // const navigation = useNavigation();

  return (
    <>
      <NavigationContainer>
        <MainNav.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown:false }}
        >
          <MainNav.Screen name="Login" component={LoginScreen} />
          <MainNav.Screen name="Register" component={RegistrationScreen} />
          <MainNav.Screen
            name="Home"
            component={Home}
            options={{
              title: "Posts",
            }}
          />
        </MainNav.Navigator>
      </NavigationContainer>
    </>
  );
}