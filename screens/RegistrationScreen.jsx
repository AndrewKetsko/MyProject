import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
// import Image from '../PhotoBG.jpj';

export default function RegistrationScreen() {
  return (
    // <ImageBackground
    //   source={{ uri: "../PhotoBG.jpg" }}
    //   style={{ flex: 1, width: null, height: null }}
    // >
    <View style={styles.container}>
      <Text style={styles.header}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Login"
        placeholderTextColor={"#BDBDBD"}
        textContentType="username"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={"#BDBDBD"}
        textContentType="emailAddress"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={"#BDBDBD"}
        textContentType="password"
      />
      <Button
        style={styles.button}
        color={"#FF6C00"}
        title="Register"
        onPress={() => {}}
      />
      <Text style={styles.text}>Have account? Login</Text>
    </View>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
    container: {
      
  },
  input: {
    height: 50,
    width: 343,
    backgroundColor: "#F6F6F6",
    // border: 1 'solid' '#E8E8E8',
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    marginBottom: 16,
    padding: 15,
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
    borderRadius: 100,
    height: 50,
    width: 343,
    backgroundColor: "#FF6C00",
    marginTop: 43,
    marginBottom: 16,
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
