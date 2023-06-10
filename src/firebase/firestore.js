import { fireStore } from "./config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

export const registerUser = async (login, email, userID) => {
  const db_obj = { login, email };
  try {
    const docRef = await setDoc(doc(fireStore, "users", userID), db_obj);
  } catch (error) {}
};

export const getUserData = async (id) => {
  const getFirestore = await getDoc(doc(fireStore, "users", id));
  if (getFirestore.exists()) {
    return getFirestore.data();
  }
};

export const setPost = async (post) => {
  try {
    const docRef = await setDoc(
      doc(fireStore, "posts", `${post.creationTime}`),
      post
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const getPost = async (id) => {
  const getFirestore = await getDoc(doc(fireStore, "posts", id));
  if (getFirestore.exists()) {
    return getFirestore.data();
  }
};

export const getAllPosts = async () => {
  const data = [];
  const querySnapshot = await getDocs(collection(fireStore, "posts"));
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, "=>", doc.data());
    data.push(doc.data());
  });
  // console.log("data=>", data);
  return data;
};
