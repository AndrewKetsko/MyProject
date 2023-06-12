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

export const setStorage = async ({ folder, creationTime, file }) => {
  const snapshot = await uploadBytes(
    ref(storage, `${folder}/${creationTime}.jpg`),
    file
  );
  const url = await getDownloadURL(snapshot.ref);
  return url;
};
