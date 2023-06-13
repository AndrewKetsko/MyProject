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
  const posts = useSelector(getPosts);
  const { login, photo, uid, email, photoUri } = useSelector(getUser);
  // const filteredPosts = posts.filter((post) => post.uid === uid);
  return (
    <ImageBackground
      source={ImageBG}
      style={{
        flex: 1,
        width: null,
        height: null,
        // opacity: 0.6
      }}
    >
      <View
        style={{
          position: "relative",
          marginTop: "auto",
          // borderWidth: 1,
          // borderStyle: "solid",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingHorizontal: 16,
          paddingTop: 92,
          paddingBottom: 10,
          backgroundColor: "white",
          opacity: 1,
        }}
      >
        <Image
          source={{ uri: photoUri }}
          style={{
            height: 120,
            width: 120,
            backgroundColor: "#F6F6F6",
            position: "absolute",
            top: -60,
            left: "50%",
            borderRadius: 16,
            transform: [{ translateX: -50 }],
            // overflow:'hidden',
            // borderWidth: 1,
            // borderStyle: "solid",
          }}
        />
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
          <ScrollView style={{ paddingHorizontal: 16, paddingVertical: 0 }}>
            {posts
              .filter((post) => post.email === email)
              .map((el) => (
                <Post key={el.creationTime} data={el}></Post>
              ))}
          </ScrollView>
        )}
      </View>
    </ImageBackground>
  );
}
