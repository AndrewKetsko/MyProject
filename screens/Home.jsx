import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from "./PostsScreen";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const HomeNav = createStackNavigator();

export default function Home() {
  return (
    <>
      <StatusBar style="auto" />
      <HomeNav.Navigator initialRouteName="Posts">
        <HomeNav.Screen name="Posts" component={PostsScreen} />
        {/* <HomeNav.Screen name="Register" component={RegistrationScreen} />
          <HomeNav.Screen name="Posts" component={PostsScreen} /> */}
      </HomeNav.Navigator>
      <AntDesign name="appstore-o" size={24} color="black" />
      <Octicons name="plus" size={24} color="black" />
      <Feather name="user" size={24} color="black" />
    </>
  );
}



