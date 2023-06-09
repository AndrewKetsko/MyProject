import { fireStore } from "./config";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

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
