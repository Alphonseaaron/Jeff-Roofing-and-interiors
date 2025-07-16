import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";
import { User, UserRole, USER_ROLES } from "@shared/schema";

export const signIn = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

export const signUp = async (
  email: string,
  password: string,
  displayName: string,
  role: UserRole = USER_ROLES.CLIENT
) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  
  // Update Firebase profile
  await updateProfile(result.user, { displayName });
  
  // Create user document in Firestore
  const userDoc: Omit<User, 'id'> = {
    email,
    displayName,
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  await setDoc(doc(db, 'users', result.user.uid), {
    ...userDoc,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  
  return result.user;
};

export const logout = async () => {
  await signOut(auth);
};

export const getCurrentUser = (): Promise<FirebaseUser | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

export const getUserProfile = async (uid: string): Promise<User | null> => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (!userDoc.exists()) return null;
  
  const data = userDoc.data();
  return {
    id: uid,
    email: data.email,
    displayName: data.displayName,
    role: data.role,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
  };
};

export const updateUserProfile = async (uid: string, updates: Partial<User>) => {
  await setDoc(doc(db, 'users', uid), {
    ...updates,
    updatedAt: serverTimestamp(),
  }, { merge: true });
};
