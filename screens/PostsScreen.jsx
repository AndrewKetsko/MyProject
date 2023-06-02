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
import Post from "./Post";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";
import { CustomHeader } from "./CustomHeader";
import { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

// const PostNav = createStackNavigator();

export default function PostsScreen() {
  const [posts, setPosts] = useState([1, 2, 3]);
  return (
    <>
      <View style={postStyles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View>
            <ImageBackground source={null} style={postStyles.image} />
          </View>
          <View>
            <Text style={postStyles.name}>Your Name</Text>
            <Text style={postStyles.email}>Your@Email</Text>
          </View>
        </View>
      </View>
      <ScrollView style={{ paddingHorizontal: 16 }}>
        {posts.map((el) => (
          <Post key={el}></Post>
        ))}
      </ScrollView>
    </>
  );
}

const postStyles = StyleSheet.create({
  image: {
    height: 60,
    width: 60,
    backgroundColor: "#BDBDBD",
    borderRadius: 16,
    marginRight: 8,
    // marginLeft: 16,
    // marginTop:32,
  },
  container: {
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  name: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,
    // display: flex,
    // alignItems: center,
    color: "#212121",
  },
  email: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,
    // display: flex,
    // alignItems: center,
    color: "#333333",
  },
});
