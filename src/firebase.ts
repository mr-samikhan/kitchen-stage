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
  apiKey: 'AIzaSyBAsqQOb1pnieK6BXwH_xxEYjbi_e4EFyE',
  authDomain: 'kitchen-stage.firebaseapp.com',
  projectId: 'kitchen-stage',
  storageBucket: 'kitchen-stage.appspot.com',
  messagingSenderId: '14757585250',
  appId: '1:14757585250:web:48742c4e088a9066240c3b',
  measurementId: 'G-7RJNTKC6HD',
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
