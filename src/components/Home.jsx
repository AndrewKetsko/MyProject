import { Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from "../screens/PostsScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { styles } from "../screens/scc";
// import CommentsScreen from "../../screens/CommentsScreen";
// import MapScreen from "../../screens/MapScreen";
import { CustomHeader } from "./CustomHeader";

const HomeNav = createBottomTabNavigator();
// const PostNav = createStackNavigator();

export default function Home({ navigation }) {
  return (
    <>
      <HomeNav.Navigator
        initialRouteName="Posts"
        backBehavior="none"
        // headerShown='false'
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
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
        <HomeNav.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            header: ({ navigation, route, options }) => {
              const title = route.name;
              return (
                <CustomHeader title={title} options={options.headerStyle} />
              );
            },
          }}
        />
        <HomeNav.Screen
          name="CreatePost"
          component={CreatePostsScreen}
          options={{
            header: ({ navigation, route, options }) => {
              const title = route.name;
              return (
                <CustomHeader title={title} options={options.headerStyle} />
              );
            },
          }}
        />
        <HomeNav.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        {/* <HomeNav.Screen
          name="Comments"
          component={CommentsScreen}
          options={{
            header: ({ navigation, route, options }) => {
              const title = route.name;
              return (
                <CustomHeader title={title} options={options.headerStyle} />
              );
            },
            tabBarIcon: () => {},
          }}
          // options={{
          //   headerShown: false,
          // }}
        />
        <HomeNav.Screen
          name="Map"
          component={MapScreen}
          options={{
            header: ({ navigation, route, options }) => {
              const title = route.name;
              return (
                <CustomHeader title={title} options={options.headerStyle} />
              );
            },
            tabBarIcon: () => {return (
              <Feather
                name="user"
                size={0}
                color={"#ffffff"}
              />
            );},
          }}
          // options={{
          //   headerShown: false,
          // }}
        /> */}
      </HomeNav.Navigator>

      {/* <PostNav.Navigator>
        <PostNav.Screen
          name="Comments"
          component={CommentsScreen}
          options={{
            header: ({ navigation, route, options }) => {
              const title = route.name;
              return (
                <CustomHeader title={title} options={options.headerStyle} />
              );
            },
          }}
        />
        <PostNav.Screen
          name="Map"
          component={MapScreen}
          options={{
            header: ({ navigation, route, options }) => {
              const title = route.name;
              return (
                <CustomHeader title={title} options={options.headerStyle} />
              );
            },
          }}
        />
      </PostNav.Navigator> */}
    </>
  );
}