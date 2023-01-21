/**
 * AuthenticateUser
 */

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Exception from '../Exceptions/Exception';
import * as firebase from '../firebase';
import { auth } from '../firebase';
// eslint-disable-next-line import/no-cycle
import Project from '../Project/Project';
// eslint-disable-next-line import/no-cycle
import Projects from '../Project/Projects';

import Router from '../Router';

class AuthenticateUser {
  //  Gets the current user
  static getCurrentUser() {
    return firebase.auth.currentUser;
  }

  //  Get uid of current user
  static getUid(): string {
    return this.getCurrentUser().uid;
  }

  // display error
  static showError({ error }: { error: unknown; }) {
    if (!error) return;
    const exception = new Exception(error);
    exception.TypeError();
  }

  static async getAllUsers() {
    try {
      const querySnapshot = await firebase.getDocs(firebase.collection(firebase.fireStoreDb, 'users'));
      const users:any[] = [];
      querySnapshot.forEach((document: { id: string | number; data: () => any; }) => {
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
  // // Register a new account
  // static async registerNewAccount() {
  //   const formData = new FormData((<HTMLFormElement> document.querySelector('form')));
  //   const email = formData.get('email');
  //   const password = formData.get('password');

  //   // if (password.length < 6) {
  //   //   return AuthenticateUser.showError({ error: { message: 'Password must be at least 6 characters long' } });
  //   // }

  //   // if (password.length > 20) {
  //   //   return AuthenticateUser.showError({ error: { message: 'Password must be less than 20 characters long' } });
  //   // }

  //   try {
  //     console.log('Creating user with email: ' + email.toString());
  //     await firebase.createUserWithEmailAndPassword(auth, email.toString(), password.toString());
  //     console.log('Logging in user with email: ' + email.toString());
  //     await firebase.signInWithEmailAndPassword(auth, email, password);

  //     Router.getRouter().navigate('/edit-profile');
  //   } catch (e) {
  //     this.showError(e);
  //   }
  // }

  //  Log in to an existing account

  // static async login() {
  //   const formData = new FormData((<HTMLFormElement>document.querySelector('form')));
  //   const email = formData.get('email');
  //   const password = formData.get('password');

  //   try {
  //     await firebase.signInWithEmailAndPassword(firebase.auth, email, password);
  //     Router.getRouter().navigate('/home');
  //   } catch (e) {
  //     AuthenticateUser.showError({ error: e });
  //   }
  // }

  //  Log in to an account via Google
  static async loginGoogle() {
    const provider = new firebase.GoogleAuthProvider();

    try {
      await firebase.signInWithPopup(firebase.auth, provider);
      const docRef = firebase.doc(firebase.fireStoreDb, 'users', AuthenticateUser.getUid());
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
      const docRef = firebase.doc(firebase.fireStoreDb, 'users', AuthenticateUser.getUid());
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
    firebase.deleteUser(); {
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
      await firebase.deleteDoc(firebase.doc(firebase.fireStoreDb, 'users', uId));

      //  Deletes the user itself from the firestore
      firebase.deleteUser(this.getCurrentUser()).then(() => {
        Router.getRouter().navigate('/');
      }).catch((e) => {
        this.showError({ error: e });
      });
    }
  }
}
export default AuthenticateUser;
