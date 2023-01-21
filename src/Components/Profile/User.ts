/**
 * User
 */

import {
  doc, setDoc, fireStoreDb,
} from '../firebase';
import Router from '../Router';
import Authenticator from '../Auth/AuthenticateUser';

class User {
  name: string;

  surname: string;

  username: string;

  telephoneNumber: string;

  imageURL: string;

  points: number;
  id: string;

  constructor({
    name = '',
    surname = '',
    username = '',
    telephoneNumber = '',
    imageURL = '',
    points = 0,
  }) {
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.telephoneNumber = telephoneNumber;
    this.imageURL = imageURL;
    this.points = points;
  }

  async writeUserData() {
    const uId = Authenticator.getUid();
    //  Creates userdata in the firestore

    await setDoc(doc(fireStoreDb, 'users', uId), {
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
