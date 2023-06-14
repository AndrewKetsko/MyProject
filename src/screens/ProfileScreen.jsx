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
  Dimensions,
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
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { getPosts, getUser } from "../redux/selectors";
import { logOutUser } from "../redux/thunks";

export default function ProfileScreen() {
  const dispatch = useDispatch();
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
          marginTop: 120,
          // borderWidth: 1,
          // borderStyle: "solid",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          // paddingHorizontal: 16,
          paddingTop: 60,
          paddingBottom: 30,
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
            left: Dimensions.get("window").width / 2,
            borderRadius: 16,
            transform: [{ translateX: -60 }],
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
          onPress={() => {
            dispatch(logOutUser());
            navigation.navigate("Login");
          }}
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
