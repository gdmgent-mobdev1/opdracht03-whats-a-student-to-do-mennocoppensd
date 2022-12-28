/**
 * My Firebase Config
 */

// Import Firebase
import {
  initializeApp,
} from 'firebase/app';

// Import Firebase authentication
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  deleteUser,
} from 'firebase/auth';

// Import Firebase firestore
import {
  getFirestore,
  addDoc,
  serverTimestamp,
  collection,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  setDoc,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: 'AIzaSyAcJn1aDVjwaQ9k-SQNLGvkFWHGR0_QSCg',
  authDomain: 'what-s-a-student-to-do-fc8cb.firebaseapp.com',
  projectId: 'what-s-a-student-to-do-fc8cb',
  storageBucket: 'what-s-a-student-to-do-fc8cb.appspot.com',
  messagingSenderId: '115921904907',
  appId: '1:115921904907:web:51a63775ca18805e12ae0e',

};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// Get the authentication
const auth = getAuth();

// Get the firestore
const dbFirestore = getFirestore(firebase);

export {
  //  Firebase
  firebase,
  addDoc,
  serverTimestamp,
  collection,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  setDoc,
  dbFirestore,
  query,
  orderBy,
  onSnapshot,
  //  Authentication
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  deleteUser,
};
