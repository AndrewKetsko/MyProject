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
  Platform,
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
import { createUser } from "../redux/slice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, registerUser } from "../../config";

export default function RegistrationScreen() {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [focused, setFocused] = useState(null);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const haveParam = email && password && login;

  const setFocus = (e) => setFocused(e._dispatchInstances.memoizedProps.name);

  const setBlur = () => setFocused(null);

  const onPress = () => {
    const user = {
      login,
      email,
      password,
      photo,
    };
    // dispatch(createUser(user));
    // console.log("were on presss");

    //-------------------------------------------------------
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //signedin
        // console.log('were in create');
        const user = userCredential.user;
        const uid = user.uid;
        registerUser(login, email, uid);
        // console.log("were after register");
        // navigation.navigate("Home", { screen: "Posts" });
        return {login, email, uid};
      })
      .then((user) => {
        dispatch(createUser(user));
        navigation.navigate("Home", { screen: "Posts" });
      })
      .catch((error) => {
        console.log(error.message);

        // const error = error.message;
      });
    //-----------------------------------------------------------
  };

  return (
    <ImageBackground source={ImageBG} style={styles.imageBG}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* <Image style={styles.image} /> */}
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
          <Text style={styles.header}>Registration</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <TextInput
              style={
                focused === "login"
                  ? { ...styles.input, ...styles.focus }
                  : { ...styles.input }
              }
              placeholder="Login"
              name="login"
              placeholderTextColor={"#BDBDBD"}
              textContentType="username"
              value={login}
              onChangeText={setLogin}
              onFocus={setFocus}
              onBlur={setBlur}
            />
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
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <View style={styles.bottomText}>
            <Text style={styles.text}>Have account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}