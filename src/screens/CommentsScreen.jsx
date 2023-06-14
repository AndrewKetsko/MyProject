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
import { postStyles } from "../components/Post";
import { useState } from "react";
import Comment from "../components/Comment";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/selectors";
import { useEffect } from "react";
import { addComment, getComments } from "../redux/thunks";

export default function CommentsScreen({ route }) {
  const id = route.params.creationTime;
  const url = route.params.url;
  const photoUri = useSelector((state) => state.user.photoUri);
  const posts = useSelector((state) => state.posts.posts);
  const [newComment, setNewComment] = useState("");

  const [post] = posts.filter((post) => post.creationTime === id);
  const comments = post.comments;
  const dispatch = useDispatch();

  const setComment = () => {
    if (!newComment) return;
    const date = new Date();
    const data = {
      id,
      text: newComment,
      avatar: photoUri,
      date: date.getTime(),
    };
    dispatch(addComment(data));
    setNewComment("");
  };

  return (
    <>
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 2,
          display: "flex",
          flexDirection:'column',
          justifyContent:'space-between',
        }}
      >
        <ScrollView>
          <Image style={commentStyles.image} source={{ uri: url }} />
          {comments?.map((el, ind) => (
            <Comment key={el.date} ind={ind} comment={el}></Comment>
          ))}
        </ScrollView>
        <View
          style={{
            position: "relative",
            marginTop: "auto",
            paddingVertical: 16,
          }}
        >
          <TextInput
            style={commentStyles.input}
            placeholder="Comment..."
            name="comment"
            placeholderTextColor={"#BDBDBD"}
            textContentType="username"
            value={newComment}
            onChangeText={setNewComment}
          />
          <View style={commentStyles.icon}>
            <AntDesign
              name="arrowup"
              size={24}
              color="white"
              onPress={setComment}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const commentStyles = StyleSheet.create({
  input: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    // fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 16,
  },
  image: {
    width: "100%",
    height: 240,
    backgroundColor: "#bdbdbd",
    borderRadius: 8,
    marginBottom: 8,
  },
  icon: {
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 8,
    top: 24,
    // transform: [{ translateY: 50 }],
  },
});
