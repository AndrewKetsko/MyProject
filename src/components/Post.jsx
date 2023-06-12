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
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getEmail } from "../redux/selectors";
import { styles } from "../../src/screens/scc";
import { delPost } from "../redux/thunks";

export default function Post({ data }) {
  const navigation = useNavigation();
  const { geoLocation, location, name, url, email, creationTime } = data;

  const accEmail = useSelector(getEmail);
  const dispatch = useDispatch();

  const delPostFunc = () => {
    dispatch(delPost(creationTime));
  };

  return (
    <View style={postStyles.container}>
      <Image style={postStyles.image} source={{ uri: url }} />
      {accEmail === email && (
        <View
          style={{
            ...styles.bottomNavigation,
            // marginTop: "auto",
            // marginHorizontal: "auto",
            backgroundColor: "#F6F6F6",
            alignSelf: "center",
            position: "absolute",
            top: 5,
            left: 5,
          }}
        >
          <AntDesign
            name="delete"
            size={24}
            color={"#bdbdbd"}
            onPress={delPostFunc}
          />
        </View>
      )}
      <Text style={{ ...postStyles.text, marginBottom: 11 }}>{name}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          <FontAwesome
            name="comment-o"
            size={24}
            color="#BDBDBD"
            onPress={() => navigation.navigate("Comments")}
          />
          <Text style={{ ...postStyles.text, color: "#BDBDBD", marginLeft: 8 }}>
            Num
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <AntDesign
            name="enviromento"
            size={24}
            color="#BDBDBD"
            onPress={() =>
              navigation.navigate("Map", { geoLocation, location, name })
            }
          />
          <Text style={{ ...postStyles.text, marginLeft: 8 }}>{location}</Text>
        </View>
      </View>
    </View>
  );
}

export const postStyles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 240,
    backgroundColor: "#bdbdbd",
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 0,
  },
  text: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
});
