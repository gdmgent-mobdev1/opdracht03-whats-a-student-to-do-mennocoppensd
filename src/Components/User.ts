/**
 * User
 */

import {
  doc, setDoc, dbFirestore,
} from './firebase';
import Router from './Router';
import Authenticator from './Authenticator';

class User {
  constructor({
    name = '',
    surname = '',
    username = '',
    telephoneNumber = '',
    imageURL = '',
  }) {
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.telephoneNumber = telephoneNumber;
    this.imageURL = imageURL;
  }

  async writeUserData() {
    const uId = Authenticator.getCurrentUserId();
    //  Creates userdata in the firestore

    await setDoc(doc(dbFirestore, 'users', uId), {
      name: this.name,
      surname: this.surname,
      username: this.username,
      telephoneNumber: this.telephoneNumber,
      imageURL: this.imageURL,
    });
    Router.getRouter().navigate('/profile-detail');
  }
}

export default User;
