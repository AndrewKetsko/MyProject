import {
  Button,
  TextInput,
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import ImageBG from "../PhotoBG.jpg";
import { styles } from "./scc";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import Post from "../components/Post";
import { getPosts, getUser } from "../redux/selectors";

export default function ProfileScreen() {
  const navigation = useNavigation();
    const [posts, setPosts] = useState(
      useSelector(getPosts)
    );
  const { login, photo, uid } = useSelector(getUser);
  // const filteredPosts = posts.filter((post) => post.uid === uid);

  return (
    <ImageBackground source={ImageBG} style={styles.imageBG}>
      <View style={styles.container}>
        <ImageBackground source={photo} style={styles.image}>
          {!photo ? (
            <AntDesign
              name="pluscircleo"
              size={24}
              color="#FF6C00"
              style={styles.icon}
            />
          ) : (
            <AntDesign
              name="closecircleo"
              size={24}
              color="#BDBDBD"
              style={styles.icon}
            />
          )}
        </ImageBackground>
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
        <Text
          style={{
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: 30,
            lineHeight: 35,
            textAlign: "center",
            color: "#212121",
          }}
        >
          {login}
        </Text>
        {posts && (
          <ScrollView style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
            {posts
              .filter((post) => post.uid === uid)
              .map((el) => (
                <Post key={el.creationTime} data={el}></Post>
              ))}
          </ScrollView>
        )}
      </View>
    </ImageBackground>
  );
}
