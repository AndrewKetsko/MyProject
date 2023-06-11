import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { styles } from "./scc";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../redux/slice";
import { setStorage } from "../firebase/storage";
import * as FileSystem from "expo-file-system";
import { setPost } from "../firebase/firestore";
import { getUid } from '../redux/selectors';

export default function CreatePostsScreen() {
  const [permission, setPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoUri, setPhotoUri] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [geoLocation, setGeoLocation] = useState(null);
  const [haveParam, setHaveParam] = useState(false);

  // let haveParam = photoUri && !!name && !!location;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const uid = useSelector(getUid);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setGeoLocation(coords);
    })();
  }, []);

  useEffect(() => {
    setHaveParam(photoUri && !!name && !!location);
  }, [photoUri, name, location]);

  if (permission === null) {
    return <View />;
  }
  if (permission === false) {
    navigation.navigate("Posts");
  }

  const onPostPress = async () => {
    setHaveParam(false);
    const { creationTime } = await MediaLibrary.createAssetAsync(photoUri);

    const response = await fetch(photoUri);
    const file = await response.blob();

    const url = await setStorage({ creationTime, file });
    console.log(url);

    const post = {
      name,
      location,
      geoLocation,
      url,
      creationTime,
      uid,
      // photo,
    };
    console.log("post", post);
    await setPost(post);
    // const url = await setStorage({ ...post, uid });
    // console.log({ ...post, uid });
    // console.log(url);
    dispatch(addPost(post));
    console.log("after dispatch");
    // setPost({ ...post, uid });
    console.log("after setpost");
    onDelPress();
    console.log("after ondel");
    navigation.navigate("Posts");
  };

  const onDelPress = () => {
    setPhotoUri(null);
    setName("");
    setLocation("");
    setGeoLocation(null);
  };

  const onShot = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync({
        quality: 1,
        base64: true,
      });
      setPhotoUri(uri);

      // const base64 = await FileSystem.readAsStringAsync(uri, {
      //   encoding: FileSystem.EncodingType.Base64,
      // });
      // console.log("base64");

      // const utf = await FileSystem.readAsStringAsync(uri);
      // const response = await fetch(uri);
      // const file = await response.blob();
      console.log("response ");
      // const file = await base64.blob();
      console.log("file");
      // const asset = await MediaLibrary.createAssetAsync(uri);
      console.log(uri);
      // console.log(asset);
      // console.log("set uri");
      // setPhoto(base64);
      // setPhoto(utf);
      console.log("set file");
    }
  };

  // const getImage = async () => {
  //   const asset = await MediaLibrary.getAssetInfoAsync(photoUri);
  //   console.log(asset.uri);
  //   return asset.uri;
  // };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        style={{
          paddingHorizontal: 16,
          paddingTop: 32,
          paddingBottom: 10,
          backgroundColor: "white",
          height: "100%",
          display: "flex",
        }}
      >
        {photoUri ? (
          <ImageBackground
            style={innerStyles.imageContainer}
            source={{
              uri: photoUri,
            }}
          >
            <View>
              <View style={innerStyles.photoIcon}>
                <MaterialIcons
                  name="photo-camera"
                  size={24}
                  color={"#BDBDBD"}
                  onPress={async () => {
                    if (photoUri) {
                      // await MediaLibrary.deleteAssetsAsync(photoUri);
                      setPhotoUri(null);
                    }
                  }}
                />
              </View>
            </View>
          </ImageBackground>
        ) : (
          <Camera
            style={innerStyles.imageContainer}
            type={type}
            ref={setCameraRef}
          >
            <View>
              <View style={innerStyles.photoIcon}>
                <MaterialIcons
                  name="photo-camera"
                  size={24}
                  color={"#BDBDBD"}
                  onPress={onShot}
                />
              </View>
            </View>
          </Camera>
        )}
        <TouchableOpacity
          style={styles.text}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <Text
            style={{
              ...innerStyles.innerText,
              marginBottom: 10,
              color: "black",
            }}
          >
            Flip camera
          </Text>
        </TouchableOpacity>
        {/* <Text style={innerStyles.innerText}>
          {!photoUri ? "Add photo" : "Edit photo"}
        </Text> */}
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <TextInput
            style={innerStyles.input}
            placeholder="Name..."
            name="name"
            placeholderTextColor={"#BDBDBD"}
            value={name}
            onChangeText={setName}
          />
          <View style={{ position: "relative" }}>
            <TextInput
              style={{ ...innerStyles.input, paddingLeft: 25 }}
              placeholder="Location..."
              name="location"
              placeholderTextColor={"#BDBDBD"}
              value={location}
              onChangeText={setLocation}
            />
            <AntDesign
              name="enviromento"
              size={24}
              color="#BDBDBD"
              style={{ position: "absolute", bottom: 5 }}
            />
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          disabled={!haveParam}
          style={
            haveParam
              ? styles.button
              : { ...styles.button, backgroundColor: "#F6F6F6" }
          }
          onPress={onPostPress}
        >
          <Text
            style={
              haveParam
                ? styles.buttonText
                : { ...styles.buttonText, color: "#bdbdbd" }
            }
          >
            Post
          </Text>
        </TouchableOpacity>
        <View
          style={{
            ...styles.bottomNavigation,
            marginTop: "auto",
            // marginHorizontal: "auto",
            backgroundColor: "#F6F6F6",
            alignSelf: "center",
          }}
        >
          <AntDesign
            name="delete"
            size={24}
            color="#bdbdbd"
            onPress={onDelPress}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const innerStyles = StyleSheet.create({
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
    height: 240,
    // border: 1px solid #E8E8E8,
    borderRadius: 8,
  },
  photoIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 60,
    backgroundColor: "white",
    opacity: 0.5,
    borderRadius: 30,
  },
  innerText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginTop: 16,
    marginBottom: 16,
  },
  input: {
    height: 40,
    marginTop: 20,
    fontSize: 16,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderBottomWidth: 1,
  },
});
