import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import PostsScreen from "../../screens/PostsScreen";
// import CreatePostsScreen from "../../screens/CreatePostsScreen";
// import ProfileScreen from "../../screens/ProfileScreen";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { styles } from "../screens/scc";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { logOutUser } from "../redux/thunks";
// import CommentsScreen from "../../screens/CommentsScreen";
// import MapScreen from "../../screens/MapScreen";

export const CustomHeader = ({ title, options }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <>
      <View
        style={{
          position: "relative",
          // display: "flex",
          // flexDirection: "row",
          paddingVertical: 11,
          borderBottomWidth: 1,
          borderColor: "#BDBDBD",
          marginTop: 35,
        }}
      >
        <Text
          style={{
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: 17,
            lineHeight: 22,
            textAlign: "center",
            letterSpacing: -0.408,
            color: "#212121",
          }}
        >
          {title}
        </Text>
        {title === "Posts" ? (
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
            onPress={() => {
              dispatch(logOutUser());
              navigation.navigate("Login");
            }}
          />
        ) : (
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            style={{
              marginLeft: "auto",
              position: "absolute",
              left: 10,
              top: 10,
            }}
            onPress={() => navigation.navigate("Posts")}
          />
        )}
      </View>
    </>
  );
};
