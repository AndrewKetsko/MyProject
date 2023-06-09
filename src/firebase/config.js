import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { decode } from "base-64";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

if (typeof atob === "undefined") {
  global.atob = decode;
}

const firebaseConfig = {
  apiKey: "AIzaSyCFjhG2uFyt0OCvGYNrce7WjHcXIxz0AHw",
  authDomain: "nativeproject-388613.firebaseapp.com",
  databaseURL: "https://nativeproject-388613-default-rtdb.firebaseio.com",
  projectId: "nativeproject-388613",
  storageBucket: "nativeproject-388613.appspot.com",
  messagingSenderId: "972830222875",
  appId: "1:972830222875:web:f3b96426e51bac5e3466be",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const fireStore = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);




