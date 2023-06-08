import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ImageBG from "../PhotoBG.jpg";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { styles } from "./scc";
import { useDispatch } from "react-redux";
import { delPost, loginUser } from "../redux/slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, getUserData } from "../../config";

export default function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [focused, setFocused] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const haveParam = email && password;

  const setFocus = (e) => setFocused(e._dispatchInstances.memoizedProps.name);

  const setBlur = () => setFocused(null);

  // dispatch(delPost());

  const onPress = async () => {
    const user = {
      email,
      password,
    };
    //--------------------------------------------
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // const user = userCredential.user;
        const uid = userCredential.user.uid;
        const data = await getUserData(uid);
        dispatch(loginUser({...data, uid}));
        console.log(data);
        navigation.navigate("Home", { screen: "Posts" });
    //--------------------------------------------
  };

  return (
    <ImageBackground source={ImageBG} style={styles.imageBG}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* <Image style={styles.image} /> */}
          <Text style={styles.header}>Login</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <TextInput
              style={
                focused === "email"
                  ? { ...styles.input, ...styles.focus }
                  : { ...styles.input }
              }
              placeholder="Email"
              name="email"
              placeholderTextColor={"#BDBDBD"}
              textContentType="emailAddress"
              value={email}
              onChangeText={setEmail}
              onFocus={setFocus}
              onBlur={setBlur}
            />
            <View style={{ position: "relative" }}>
              <TextInput
                style={
                  focused === "password"
                    ? { ...styles.input, ...styles.focus }
                    : { ...styles.input }
                }
                placeholder="Password"
                name="password"
                placeholderTextColor={"#BDBDBD"}
                textContentType="password"
                secureTextEntry={passwordVisible}
                value={password}
                onChangeText={setPassword}
                onFocus={setFocus}
                onBlur={setBlur}
              />
              <Entypo
                name={passwordVisible ? "eye" : "eye-with-line"}
                size={24}
                color="#212121"
                style={{
                  position: "absolute",
                  right: 12,
                  top: 12,
                }}
                onPress={() => setPasswordVisible((prev) => !prev)}
              />
            </View>
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={
              haveParam
                ? styles.button
                : { ...styles.button, backgroundColor: "#bdbdbd" }
            }
            onPress={onPress}
            disabled={!haveParam}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.bottomText}>
            <Text style={styles.text}>Dont have account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.text}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}