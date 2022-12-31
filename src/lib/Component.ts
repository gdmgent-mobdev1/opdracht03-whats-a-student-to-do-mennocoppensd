/* eslint-disable class-methods-use-this */
/**
 * The Component parent
 */

import { DocumentData } from '@firebase/firestore';
import Elements from './Elements';
import {
  dbFirestore, doc, getDoc,
} from '../Components/firebase';
import Authenticator from '../Components/Authenticator';

class Component {
  model: any;

  props: any;

  routerPath: any;

  componentContainer: any;

  name: any;

  constructor({
    name,
    model,
    routerPath,
    props = null,
  }) {
    this.name = name;
    this.model = model;
    this.props = props;
    this.componentContainer = this.createComponentContainer();
    this.routerPath = routerPath;
  }

  createComponentContainer() {
    return Elements.createContainer({
      className: 'buttons',
    });
  }

  clearComponentContainer() {
    while (this.componentContainer.firstChild) {
      this.componentContainer.removeChild(this.componentContainer.lastChild);
    }
  }

  //  Gets user data out of the firestore
  async getUserData() {
    const uId = Authenticator.getCurrentUserId();

    const docRef = doc(dbFirestore, 'users', uId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.changeModel(docSnap.data());
    } else {
      console.log('no user');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  changeModel(_arg0: DocumentData) {
    throw new Error('Method not implemented.');
  }
}

export default Component;

// class Component {
//   name:string;

//   model: {};

//   constructor({ name, model }: { name: string; model: {} }) {
//     this.name = name;
//     this.model = model;
//   }

//   render() : HTMLElement {
//     return document.createElement('');
//   }
// }

// export default Component;
