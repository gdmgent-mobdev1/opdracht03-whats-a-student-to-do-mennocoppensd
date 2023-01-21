/* eslint-disable no-empty */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * My Firebase Config
 */

// Import Firebase
import {
  initializeApp,
} from 'firebase/app';

// Import Firebase authentication
import * as auth_1 from 'firebase/auth';
import {
  // eslint-disable-next-line max-len
  createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, signInWithPopup, signOut, onAuthStateChanged, deleteUser,
} from 'firebase/auth';

// Import Firebase firestore
import * as firestore from 'firebase/firestore';
import {
  // eslint-disable-next-line max-len
  addDoc, serverTimestamp, collection, getDocs, getDoc, doc, deleteDoc, setDoc, query, orderBy, onSnapshot,
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

const fireStoreApp = initializeApp(firebaseConfig);
// Get the authentication
const auth = auth_1.getAuth();

// Get data from firestore
const fireStoreDb = firestore.getFirestore(fireStoreApp);

const addTodoFirebase = async (text: string, todoId: string) => {
  const cardsSnapShot = firestore.collection(fireStoreDb, `lists/${todoId}/cards`);

  const docRef = await firestore.addDoc(cardsSnapShot, {
    title: text,
    description: '',
    comments: [],
  });
  return docRef.id;
};

// eslint-disable-next-line max-len
const updateTodoFirebase = async (todoListId: string, id: string, attribute: string, value: string) => {
  console.log(todoListId, id, attribute, value);
  if (attribute === 'title') {
  } else {
  }
};

const deleteTodoListFirebase = async (id: string) => {
  await firestore.deleteDoc(firestore.doc(fireStoreDb, 'lists', id));
};

const deleteCardFromFirebase = async (todoListId: string, id: string) => {
  await firestore.deleteDoc(firestore.doc(fireStoreDb, `lists/${todoListId}/cards`, id));
};
// const addCommentToFirebase = async (todoListId: string, id: string, comment: string) => {
//   // eslint-disable-next-line @typescript-eslint/no-shadow
//   const firestore = firebase.firestore();
//   const cardsRef = firestore.collection('lists').doc(todoListId).collection('cards').doc(id);

//   cardsRef.update({
//     comments: firebase.firestore.FieldValue.arrayUnion(comment),
//   });
// };

export {
  //  Firebase
  fireStoreApp,
  addDoc,
  serverTimestamp,
  collection,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  setDoc,
  fireStoreDb,
  addTodoFirebase,
  updateTodoFirebase,
  deleteTodoListFirebase,
  deleteCardFromFirebase,
  // addCommentToFirebase,
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
