import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import { storage } from "./firebase";

export const uploadFile = async (
  file: File,
  path: string,
  fileName?: string
): Promise<string> => {
  const name = fileName || `${Date.now()}-${file.name}`;
  const storageRef = ref(storage, `${path}/${name}`);
  
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  
  return downloadURL;
};

export const uploadProjectPhoto = async (
  file: File,
  projectId: string,
  fileName?: string
): Promise<string> => {
  return uploadFile(file, `projects/${projectId}/photos`, fileName);
};

export const uploadDocuments = async (
  file: File,
  projectId: string,
  fileName?: string
): Promise<string> => {
  return uploadFile(file, `projects/${projectId}/documents`, fileName);
};

export const uploadProfilePicture = async (
  file: File,
  userId: string,
  fileName?: string
): Promise<string> => {
  return uploadFile(file, `users/${userId}/profile`, fileName);
};

export const deleteFile = async (url: string) => {
  const storageRef = ref(storage, url);
  await deleteObject(storageRef);
};

export const listFiles = async (path: string) => {
  const storageRef = ref(storage, path);
  const result = await listAll(storageRef);
  
  const files = await Promise.all(
    result.items.map(async (item) => ({
      name: item.name,
      url: await getDownloadURL(item),
    }))
  );
  
  return files;
};
