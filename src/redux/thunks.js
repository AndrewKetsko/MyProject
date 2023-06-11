import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { getUserData, registerUser } from "../firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ login, email, password, photo }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const uid = user.uid;
      await registerUser(login, email, uid);
      return { photo, login, email, uid };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;
      const data = await getUserData(uid);
      return { ...data, uid };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  "user/logOutUser",
  async (data, thunkAPI) => {
    try {
      await signOut(auth);
      await AsyncStorage.clear();
      return "logout";
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
