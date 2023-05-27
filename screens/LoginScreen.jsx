import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ImageBG from "../PhotoBG.jpg";
import { useState } from "react";

export default function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [focused, setFocused] = useState(null);

  const setFocus = (e) =>
    setFocused(e._dispatchInstances.memoizedProps.name);

  const setBlur = () => setFocused(null);

  return (
    <ImageBackground source={ImageBG} style={styles.imageBG}>
      <View style={styles.container}>
        {/* <Image style={styles.image} /> */}
        <Text style={styles.header}>Login</Text>
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
          onFocus={setFocus}
          onBlur={setBlur}
        />
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
          secureTextEntry={true}
          onFocus={setFocus}
          onBlur={setBlur}
          // right={
          //   <TextInput.Icon
          //     name={passwordVisible ? "eye" : "eye-off"}
          //     onPress={() => setPasswordVisible(!passwordVisible)}
          //   />
          // }
        />
        {/* <Button
            // style={styles.button}
            // color={"#FF6C00"}
            title="Register"
            onPress={() => {}}
          /> */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Dont have account? Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  focus: {
    backgroundColor: "#Ffffff",
    borderColor: "#FF6C00",
  },
  container: {
    position: "relative",
    marginTop: "auto",
    // borderWidth: 1,
    // borderStyle: "solid",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 100,
    backgroundColor: "white",
    opacity: 1,
  },
  image: {
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
  },
  icon: {
    position: "absolute",
    right: -12,
    bottom: 14,
    zIndex: 100,
  },
  imageBG: {
    flex: 1,
    width: null,
    height: null,
    // opacity: 0.6
  },
  input: {
    height: 50,
    width: null,
    backgroundColor: "#F6F6F6",
    // border: 1 'solid' '#E8E8E8',
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    marginBottom: 16,
    padding: 15,
    fontFamily: "Roboto",
    fontStyle: "normal",
    // fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    /* identical to box height */

    /* Gray/03 */

    color: "#BDBDBD",
  },
  header: {
    // width: 160,
    height: 35,
    // left: calc((50 % -160) / 2 + 0.5),
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    // letterSpacing: 0.01em,
    color: "#212121",
    marginBottom: 33,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    height: 50,
    width: null,
    backgroundColor: "#FF6C00",
    marginTop: 27,
  },
  buttonText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  text: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
    marginTop: 16,
  },
});
