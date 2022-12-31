/**
 * Authenticator
 */

import Exception from './Exceptions/Exception';
import {
  //  authentication
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  signOut,
  // deleteUser,

  //  firestore
  dbFirestore,
  doc,
  collection,
  getDoc,
  getDocs,
  // deleteDoc,

} from './firebase';

import Router from './Router';

class Authenticator {
  //  Shows the error on screen
  static showError(error: unknown) {
    if (!error) return;
    const exception = new Exception(error);
    exception.checkWichError();
  }

  //  Gets the current user
  static getCurrentUser() {
    return auth.currentUser;
  }

  //  Gets the current userId
  static getCurrentUserId() {
    return this.getCurrentUser().uid;
  }

  static async getAllUsers() {
    const querySnapshot = await getDocs(collection(dbFirestore, 'users'));
    const users:any[] = [];
    querySnapshot.forEach((document: { id: string | number; data: () => any; }) => {
      users[document.id] = document.data();
    });

    return users;
  }

  static async getUser(userId:any) {
    const users = await this.getAllUsers();
    return users[userId];
  }

  //  Register a new account
  static async registerNewAccount() {
    const formData = new FormData((<HTMLFormElement>document.querySelector('form')));
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signInWithEmailAndPassword(auth, email, password);

      Router.getRouter().navigate('/edit-profile');
    } catch (e) {
      Authenticator.showError(e);
    }
  }

  //  Log in to an existing account
  static async login() {
    const formData = new FormData((<HTMLFormElement>document.querySelector('form')));
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Router.getRouter().navigate('/home');
    } catch (e) {
      Authenticator.showError(e);
    }
  }

  //  Log in to an account via Google
  static async loginGoogle() {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      const docRef = doc(dbFirestore, 'users', Authenticator.getCurrentUserId());
      const docSnap = await getDoc(docRef);

      if (docSnap
        .exists()) {
        console.log('bestaat al');

        Router.getRouter().navigate('/home');
      } else {
        Router.getRouter().navigate('/edit-profile');
      }
    } catch (e) {
      Authenticator.showError(e);
    }
  }

  /**
     * Login with Facebook
     */

  static async loginFacebook() {
    const provider = new FacebookAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      const docRef = doc(dbFirestore, 'users', Authenticator.getCurrentUserId());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('bestaat al');

        Router.getRouter()?.navigate('/home');
      } else {
        Router.getRouter()?.navigate('/edit-profile');
      }
    } catch (e) {
      Authenticator.showError(e);
    }
  }

  /**
     * Login with Twitter
     */

  static async loginTwitter() {
    const provider = new TwitterAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      const docRef = doc(dbFirestore, 'users', Authenticator.getCurrentUserId());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('bestaat al');

        Router.getRouter()?.navigate('/home');
      } else {
        Router.getRouter()?.navigate('/edit-profile');
      }
    } catch (e) {
      Authenticator.showError(e);
    }
  }

  /**
     * Log out
     */

  static async logout() {
    try {
      await signOut(auth);
      Router.getRouter()?.navigate('/login');
    } catch (e) {
      Authenticator.showError(e);
    }
  }
}

export default Authenticator;
