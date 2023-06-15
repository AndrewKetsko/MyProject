import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { logOutUser } from "../redux/thunks";

export const CustomHeader = ({ title, options }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <>
      <View style={headerStyle.container}>
        <Text style={headerStyle.text}>{title}</Text>
        {title === "Posts" ? (
          <MaterialIcons
            name="logout"
            size={24}
            color="#BDBDBD"
            style={headerStyle.icon}
            onPress={() => {
              dispatch(logOutUser());
              navigation.navigate("Login");
            }}
          />
        ) : (
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            style={{ ...headerStyle.icon, left: 10 }}
            onPress={() => navigation.navigate("Posts")}
          />
        )}
      </View>
    </>
  );
};

const headerStyle = StyleSheet.create({
  container: {
    position: "relative",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderColor: "#BDBDBD",
    marginTop: 35,
  },
  text: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 17,
    lineHeight: 22,
    textAlign: "center",
    letterSpacing: -0.408,
    color: "#212121",
  },
  icon: { marginLeft: "auto", position: "absolute", right: 10, top: 10 },
});
