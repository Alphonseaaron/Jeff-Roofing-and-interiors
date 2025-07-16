import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  projectId: "jefroofinginteriors",
  appId: "1:573819421854:web:d608ea1bf0787da71b678f",
  apiKey: "AIzaSyCBjIaH4kbTFcGgviXZD9j6bzw0SKlIhzE",
  authDomain: "jefroofinginteriors.firebaseapp.com",
  storageBucket: "jefroofinginteriors.firebasestorage.app",
  messagingSenderId: "573819421854"
};

// Initialize Firebase app only if it doesn't exist
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
