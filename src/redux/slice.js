import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUser,
  loginUser,
  logOutUser,
  addPost,
  getAllPosts,
  delPost,
} from "./thunks";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    // addPost(state, action) {
    //   state.posts.push(action.payload);
    // },
    // addAllPosts(state, action) {
    //   state.posts = action.payload;
    // },
    // delPost(state, action) {
    //   // state.posts=[];
    // },
    // addComment(state, action) {
    //   //todo some
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state, action) => {})
      .addCase(addPost.rejected, (state, action) => {})
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(getAllPosts.pending, (state, action) => {})
      .addCase(getAllPosts.rejected, (state, action) => {})
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(delPost.pending, (state, action) => {})
      .addCase(delPost.rejected, (state, action) => {})
      .addCase(delPost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post.creationTime !== action.payload
        );
      });
    // .addCase(addComment.pending, (state, action) => {})
    // .addCase(addComment.rejected, (state, action) => {})
    // .addCase(addComment.fulfilled, (state, action) => {});
  },
});

// export const { delPost, addComment } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    login: "",
    photoUri: null,
    uid: null,
    isLogin: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state, action) => {})
      .addCase(createUser.rejected, (state, action) => {})
      .addCase(createUser.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.login = action.payload.login;
        state.photoUri = action.payload.url;
        state.uid = action.payload.uid;
        state.isLogin = true;
      })
      .addCase(loginUser.pending, (state, action) => {})
      .addCase(loginUser.rejected, (state, action) => {})
      .addCase(loginUser.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.login = action.payload.login;
        state.photoUri = action.payload.url;
        state.uid = action.payload.uid;
        state.isLogin = true;
      })
      .addCase(logOutUser.pending, (state, action) => {})
      .addCase(logOutUser.rejected, (state, action) => {})
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.email = "";
        state.login = "";
        state.photo = null;
        state.uid = null;
        state.isLogin = false;
      });
  },
});

// export const { createUser, loginUser } = userSlice.actions;
export const userReducer = userSlice.reducer;

const persistUserConfig = {
  key: "user",
  storage: AsyncStorage,
  whitelist: ["uid"],
};

export const pesistUserReducer = persistReducer(
  persistUserConfig,
  userSlice.reducer
);
