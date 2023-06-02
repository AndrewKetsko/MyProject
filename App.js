import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RegistrationScreen from "./screens/RegistrationScreen";
import { useFonts } from "expo-font";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import CommentsScreen from "./screens/CommentsScreen";
import MapScreen from "./screens/MapScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { CustomHeader } from "./screens/CustomHeader";

const MainNav = createStackNavigator();
// const HomeNav = createStackNavigator();

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
          screenOptions={{ headerShown: false }}
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
          <MainNav.Screen
            name="Comments"
            component={CommentsScreen}
            options={{
              header: ({ navigation, route, options }) => {
                const title = route.name;
                return (
                  <CustomHeader title={title} options={options.headerStyle} />
                );
              },
              headerShown: "true",
            }}

          />
          <MainNav.Screen
            name="Map"
            component={MapScreen}
            options={{
              header: ({ navigation, route, options }) => {
                const title = route.name;
                return (
                  <CustomHeader title={title} options={options.headerStyle} />
                );
              },
              headerShown: "true",
            }}
          />
        </MainNav.Navigator>
      </NavigationContainer>
    </>
  );
}