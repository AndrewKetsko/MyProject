// Для роботи із firebase обовʼязково треба ініціалізувати проект
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth, signOut } from "firebase/auth";
// Функція для підключення бази даних у проект
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import {
  getBytes,
  getDownloadURL,
  getMetadata,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import {
  getDatabase,
  onValue,
  child,
  get,
  push,
  update,
  set,
} from "firebase/database";

// const firebaseConfig = {
//   apiKey: "api-key",
//   authDomain: "project-id.firebaseapp.com",
//   databaseURL: "https://project-id.firebaseio.com",
//   projectId: "project-id",
//   storageBucket: "project-id.appspot.com",
//   messagingSenderId: "sender-id",
//   appId: "app-id",
//   measurementId: "G-measurement-id",
// };

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
const storagePostRef = ref(storage, "posts");
const storageAvatarRef = ref(storage, "avatars");
export const database = getDatabase(app);

export const registerUser = async (login, email, userID) => {
  const db_obj = { login, email };
  try {
    const docRef = await setDoc(doc(fireStore, "users", userID), db_obj);
  } catch (error) {}
};

export const getUserData = async (id) => {
  const getFirestore = await getDoc(doc(fireStore, "users", id));
  if (getFirestore.exists()) {
    // console.log('get data');
    return getFirestore.data();
  }
};

// export const setPost = (data) => {
//   const parsedData = JSON.parse(data);
//   console.log(parsedData);
//   set(ref(database, "posts/" + data.photoAssets.creationTime), parsedData);
// };

export const setStorage = async (data) => {
  const snapshot = await uploadBytes(
    ref(storage, `posts/${data.photoAssets.creationTime}.jpg`),
    data.photoAssets.uri
  );
  console.log(snapshot);

  const url = await getDownloadURL(
    ref(storage, `posts/${data.photoAssets.creationTime}.jpg`)
  );
  console.log(url);
  // return url;

  const image = await getBytes(
    ref(storage, `posts/${data.photoAssets.creationTime}.jpg`)
  );
  console.log(image);

  return url;
};
