import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import {
  getAuth,
  signOut,
  deleteUser,
  onAuthStateChanged,
  confirmPasswordReset,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'

import {
  doc,
  query,
  getDoc,
  addDoc,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  Timestamp,
  collection,
  getFirestore,
  collectionGroup,
} from 'firebase/firestore'

const firebaseConfig = {
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  measurementId: import.meta.env.VITE_FIREBASE_MESUREMENT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const firestore = getFirestore(app)

const storage = getStorage(app)

export {
  doc,
  ref,
  auth,
  query,
  addDoc,
  getDoc,
  setDoc,
  storage,
  getDocs,
  signOut,
  updateDoc,
  firestore,
  deleteDoc,
  Timestamp,
  collection,
  deleteUser,
  uploadBytes,
  getDownloadURL,
  collectionGroup,
  onAuthStateChanged,
  confirmPasswordReset,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
}
