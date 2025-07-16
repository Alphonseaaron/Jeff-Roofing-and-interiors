import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import {
  Project,
  InsertProject,
  Message,
  InsertMessage,
  Payment,
  InsertPayment,
  Photo,
  InsertPhoto,
  TeamMember,
  InsertTeamMember,
  User,
} from "@shared/schema";

const convertTimestamp = (timestamp: any) => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  return timestamp;
};

// Projects
export const createProject = async (project: InsertProject) => {
  const docRef = await addDoc(collection(db, 'projects'), {
    ...project,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getProject = async (id: string): Promise<Project | null> => {
  const docRef = doc(db, 'projects', id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) return null;
  
  const data = docSnap.data();
  return {
    id: docSnap.id,
    ...data,
    startDate: convertTimestamp(data.startDate),
    endDate: data.endDate ? convertTimestamp(data.endDate) : undefined,
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt),
  } as Project;
};

export const getProjects = async (filters?: {
  clientId?: string;
  teamLeadId?: string;
  status?: string;
}) => {
  let q = query(collection(db, 'projects'));
  
  if (filters?.clientId) {
    q = query(q, where('clientId', '==', filters.clientId));
  } else if (filters?.teamLeadId) {
    q = query(q, where('teamLeadId', '==', filters.teamLeadId));
  } else if (filters?.status) {
    q = query(q, where('status', '==', filters.status));
  }
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    startDate: convertTimestamp(doc.data().startDate),
    endDate: doc.data().endDate ? convertTimestamp(doc.data().endDate) : undefined,
    createdAt: convertTimestamp(doc.data().createdAt),
    updatedAt: convertTimestamp(doc.data().updatedAt),
  })) as Project[];
};

export const updateProject = async (id: string, updates: Partial<Project>) => {
  await updateDoc(doc(db, 'projects', id), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

export const subscribeToProjects = (
  callback: (projects: Project[]) => void,
  filters?: { clientId?: string; teamLeadId?: string; status?: string }
) => {
  let q = query(collection(db, 'projects'));
  
  if (filters?.clientId) {
    q = query(q, where('clientId', '==', filters.clientId));
  } else if (filters?.teamLeadId) {
    q = query(q, where('teamLeadId', '==', filters.teamLeadId));
  } else if (filters?.status) {
    q = query(q, where('status', '==', filters.status));
  }
  
  return onSnapshot(q, (querySnapshot) => {
    const projects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      startDate: convertTimestamp(doc.data().startDate),
      endDate: doc.data().endDate ? convertTimestamp(doc.data().endDate) : undefined,
      createdAt: convertTimestamp(doc.data().createdAt),
      updatedAt: convertTimestamp(doc.data().updatedAt),
    })) as Project[];
    callback(projects);
  });
};

// Messages
export const sendMessage = async (message: InsertMessage) => {
  const docRef = await addDoc(collection(db, 'messages'), {
    ...message,
    timestamp: serverTimestamp(),
    isRead: false,
  });
  return docRef.id;
};

export const getMessages = async (projectId: string) => {
  const q = query(
    collection(db, 'messages'),
    where('projectId', '==', projectId),
    orderBy('timestamp', 'asc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    timestamp: convertTimestamp(doc.data().timestamp),
  })) as Message[];
};

export const subscribeToMessages = (
  projectId: string,
  callback: (messages: Message[]) => void
) => {
  const q = query(
    collection(db, 'messages'),
    where('projectId', '==', projectId),
    orderBy('timestamp', 'asc')
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: convertTimestamp(doc.data().timestamp),
    })) as Message[];
    callback(messages);
  });
};

export const markMessageAsRead = async (messageId: string) => {
  await updateDoc(doc(db, 'messages', messageId), {
    isRead: true,
  });
};

// Payments
export const createPayment = async (payment: InsertPayment) => {
  const docRef = await addDoc(collection(db, 'payments'), {
    ...payment,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getPayments = async (projectId: string) => {
  const q = query(
    collection(db, 'payments'),
    where('projectId', '==', projectId),
    orderBy('dueDate', 'asc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    dueDate: convertTimestamp(doc.data().dueDate),
    paidDate: doc.data().paidDate ? convertTimestamp(doc.data().paidDate) : undefined,
    createdAt: convertTimestamp(doc.data().createdAt),
    updatedAt: convertTimestamp(doc.data().updatedAt),
  })) as Payment[];
};

export const updatePayment = async (id: string, updates: Partial<Payment>) => {
  await updateDoc(doc(db, 'payments', id), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

// Photos
export const addPhoto = async (photo: InsertPhoto) => {
  const docRef = await addDoc(collection(db, 'photos'), {
    ...photo,
    uploadedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getPhotos = async (projectId: string) => {
  const q = query(
    collection(db, 'photos'),
    where('projectId', '==', projectId),
    orderBy('uploadedAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    uploadedAt: convertTimestamp(doc.data().uploadedAt),
  })) as Photo[];
};

export const deletePhoto = async (id: string) => {
  await deleteDoc(doc(db, 'photos', id));
};

// Team Members
export const assignTeamMember = async (teamMember: InsertTeamMember) => {
  const docRef = await addDoc(collection(db, 'teamMembers'), {
    ...teamMember,
    assignedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getTeamMembers = async (projectId: string) => {
  const q = query(
    collection(db, 'teamMembers'),
    where('projectId', '==', projectId),
    orderBy('assignedAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    assignedAt: convertTimestamp(doc.data().assignedAt),
  })) as TeamMember[];
};

export const removeTeamMember = async (id: string) => {
  await deleteDoc(doc(db, 'teamMembers', id));
};

// Users
export const getUsers = async (role?: string) => {
  let q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
  
  if (role) {
    q = query(q, where('role', '==', role));
  }
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: convertTimestamp(doc.data().createdAt),
    updatedAt: convertTimestamp(doc.data().updatedAt),
  })) as User[];
};

export const getUser = async (id: string): Promise<User | null> => {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) return null;
  
  const data = docSnap.data();
  return {
    id: docSnap.id,
    ...data,
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt),
  } as User;
};

// Contact form submissions
export const submitContactForm = async (formData: any) => {
  const docRef = await addDoc(collection(db, 'contactSubmissions'), {
    ...formData,
    submittedAt: serverTimestamp(),
    status: 'new',
  });
  return docRef.id;
};
