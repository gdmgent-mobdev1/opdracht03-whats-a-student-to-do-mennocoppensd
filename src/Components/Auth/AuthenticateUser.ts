/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * AuthenticateUser
 */

import { getAuth, signInWithEmailAndPassword, User } from 'firebase/auth';
import Exception from '../Exceptions/Exception';
import * as firebase from '../firebase';
// eslint-disable-next-line import/no-cycle
// eslint-disable-next-line import/no-cycle
import Projects from '../Project/Projects';

import Router from '../Router';

class AuthenticateUser {
  //  Gets the current user
  static getCurrentUser() {
    return firebase.auth.currentUser;
  }

  //  Get uid of current user
  static getUid(): string | undefined {
    const user = this.getCurrentUser();
    return user?.uid;
  }

  // display error
  static showError({ error }: { error: unknown; } | any) {
    if (!error) return;
    const exception = new Exception(error);
    exception.TypeError();
  }

  static async getAllUsers() {
    try {
      const querySnapshot = await firebase.getDocs(firebase.collection(firebase.fireStoreDb, 'users'));
      const users:any[] = [];
      querySnapshot.forEach((document: { id: string | number | any ; data: () => any; }) => {
        users[document.id] = document.data();
      });
      return users;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getUser(userId:any) {
    const users = await this.getAllUsers();
    return users[userId];
  }

  // register function
  static async register() {
    const collectionRef = firebase.collection(firebase.fireStoreDb, 'users');
    const email : string = (< HTMLInputElement >document.getElementById('email_register')).value;
    const password : string = (< HTMLInputElement >document.getElementById('password_register')).value;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const auth : any = getAuth();

    firebase.createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
      // Profile updated!
        localStorage.setItem('emailUser', email);
        Router.getRouter().navigate('/edit-profile');
      }).catch((error) => {
      // An error occurred
        console.log(error);
      });

    firebase.addDoc(collectionRef, {
      userEmail: email,
    });
  }

  // Sign in function
  static async signin() {
    const signinEmail = (< HTMLInputElement > document.getElementById('email_login')).value;
    const signinPassw = (< HTMLInputElement > document.getElementById('password_login')).value;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const auth = getAuth();

    signInWithEmailAndPassword(auth, signinEmail, signinPassw)
      .then(() => {
      // Signed in
        localStorage.setItem('emailUser', signinEmail);
        Router.getRouter().navigate('/home');
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(`An error has occurred, the error is ${errorMessage}!`);
      });
  }

  //  Log in to an account via Google
  static async loginGoogle() {
    const provider = new firebase.GoogleAuthProvider();

    try {
      await firebase.signInWithPopup(firebase.auth, provider);
      const docRef = firebase.doc(firebase.fireStoreDb, 'users', AuthenticateUser.getUid() as string);
      const docSnap = await firebase.getDoc(docRef);

      if (docSnap.exists()) {
        Router.getRouter().navigate('/home');
      } else {
        Router.getRouter().navigate('/edit-profile');
      }
    } catch (e) {
      AuthenticateUser.showError({ error: e });
    }
  }

  /**
     * Login with Facebook
     */

  static async loginFacebook() {
    const provider = new firebase.FacebookAuthProvider();

    try {
      const result = await firebase.signInWithPopup(firebase.auth, provider);
      if (result.user) {
        const docRef = firebase.doc(firebase.fireStoreDb, 'users', result.user.uid);
        const docSnap = await firebase.getDoc(docRef);
        if (docSnap.exists()) {
          Router.getRouter()?.navigate('/home');
        } else {
          Router.getRouter()?.navigate('/edit-profile');
        }
      }
    } catch (e) {
      AuthenticateUser.showError({ error: e });
    }
  }

  /**
     * Login with Twitter
     */

  static async loginTwitter() {
    try {
      const provider = new firebase.TwitterAuthProvider();
      await firebase.signInWithPopup(firebase.auth, provider);
      const docRef = firebase.doc(firebase.fireStoreDb, 'users', AuthenticateUser.getUid() as string);
      const docSnap = await firebase.getDoc(docRef);

      if (docSnap.exists()) {
        Router.getRouter()?.navigate('/home');
      } else {
        Router.getRouter()?.navigate('/edit-profile');
      }
    } catch (e) {
      AuthenticateUser.showError({ error: e });
    }
  }

  /**
     * Log out
     */

  static async logout() {
    try {
      await firebase.signOut(firebase.auth);
    } catch (e) {
      AuthenticateUser.showError({ error: e });
    }
    Router.getRouter()?.navigate('/');
  }

  //  Deletes the user
  static async deleteUser() {
    firebase.deleteUser(this.getCurrentUser() as User); {
      const uId = this.getUid();

      // Deletes all the projects the user is related to
      const projects = await Projects.getAll();
      projects.forEach(async (project) => {
        if (project.organiser === uId) {
          Projects.deleteProject(project.id);
        } else {
        //  Deletes the user from the project
          await AuthenticateUser.handleDelete(project, uId);
        }
      });
      // Deletes the user from the firestore
      await firebase.deleteDoc(firebase.doc(firebase.fireStoreDb, 'users', uId as string));

      //  Deletes the user itself from the firestore
      firebase.deleteUser(this.getCurrentUser() as User).then(() => {
        Router.getRouter().navigate('/');
      }).catch((e) => {
        this.showError({ error: e });
      });
    }
  }

  static handleDelete(_project: { id: string; organiser: any; title: any; description: any; deadline: any; routerPath: string; joined: any; }, _uId: string | undefined) {
    throw new Error('Method not implemented.');
  }
}
export default AuthenticateUser;
