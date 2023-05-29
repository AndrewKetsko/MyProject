import { Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
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

const CustomHeader = ({ title, options }) => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.customHeader}>
        <Text style={styles.customHeaderText}>{title}</Text>
        <MaterialIcons
          name="logout"
          size={24}
          color="#BDBDBD"
          style={{
            marginLeft: "auto",
            position: "absolute",
            right: 10,
            top: 10,
          }}
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </>
  );
};

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
        <HomeNav.Screen name="CreatePost" component={CreatePostsScreen} />
        <HomeNav.Screen name="Profile" component={ProfileScreen} />
      </HomeNav.Navigator>
    </>
  );
}
