import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { styles } from "./scc";

const HomeNav = createBottomTabNavigator();

export default function Home({ navigation }) {
  return (
    <>
      {/* <StatusBar style="auto" /> */}
      <HomeNav.Navigator
        initialRouteName="Posts"
        backBehavior="none"
        // headerShown='false'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === "Posts") {
              return (
                <View
                  style={{
                    ...styles.bottomNavigation,
                    backgroundColor: (iconName = focused
                      ? "#FF6C00"
                      : "#ffffff"),
                  }}
                >
                  <AntDesign
                    name="appstore-o"
                    size={24}
                    color={(iconName = focused ? "#ffffff" : "#212121CC")}
                  />
                </View>
              );
            }
            if (route.name === "CreatePost") {
              return (
                <View
                  style={{
                    ...styles.bottomNavigation,
                    backgroundColor: (iconName = focused
                      ? "#FF6C00"
                      : "#ffffff"),
                  }}
                >
                  <Octicons
                    name="plus"
                    size={24}
                    color={(iconName = focused ? "#ffffff" : "#212121CC")}
                  />
                </View>
              );
            }
            if (route.name === "Profile") {
              return (
                <View
                  style={{
                    ...styles.bottomNavigation,
                    backgroundColor: (iconName = focused
                      ? "#FF6C00"
                      : "#ffffff"),
                  }}
                >
                  <Feather
                    name="user"
                    size={24}
                    color={(iconName = focused ? "#ffffff" : "#212121CC")}
                  />
                </View>
              );
            }
          },
        })}
        
      >
        <HomeNav.Screen name="Posts" component={PostsScreen} />
        <HomeNav.Screen name="CreatePost" component={CreatePostsScreen} />
        <HomeNav.Screen name="Profile" component={ProfileScreen} />
      </HomeNav.Navigator>
      {/* <MaterialIcons name="logout" size={24} color="black" /> */}
    </>
  );
}
