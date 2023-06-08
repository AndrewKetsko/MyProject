import { Text, View } from "react-native";
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
import { auth } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import CommentsScreen from "../../screens/CommentsScreen";
// import MapScreen from "../../screens/MapScreen";

export const CustomHeader = ({ title, options }) => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.customHeader}>
        <Text style={styles.customHeaderText}>{title}</Text>
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
            onPress={() =>
              signOut(auth)
                .then(() => AsyncStorage.clear())
                .then(() => navigation.navigate("Login"))
                .catch((error) => {
                  console.log(error.message);
                })
            }
          />
        ) : (
          <AntDesign
            name="arrowleft"
            size={24}
            color="#BDBDBD"
            style={{
              marginLeft: "auto",
              position: "absolute",
              left: 10,
              top: 10,
            }}
            onPress={() => navigation.navigate('Posts')}
          />
        )}
      </View>
    </>
  );
};
