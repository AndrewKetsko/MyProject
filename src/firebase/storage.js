import { storage } from "./config";
import {
  getBytes,
  getDownloadURL,
  getMetadata,
  getStorage,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";

export const setStorage = async ({creationTime, file}) => {
  console.log("before snapshot");

  const snapshot = await uploadBytes(
    ref(storage, `posts/${creationTime}.jpg`),
    file
  );

//   const snapshot = await uploadString(
//     ref(storage, `posts/${data.photoAssets.creationTime}`),
//     data.photo,
//     "base64"
//   );

  console.log("after snapshot before url");

  const url = await getDownloadURL(snapshot.ref);
  //the same result is
  // const url = await getDownloadURL(
  //   ref(storage, `posts/${data.photoAssets.creationTime}.jpg`)
  // );
  console.log("after url");

  return url;
};
