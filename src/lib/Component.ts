/* eslint-disable class-methods-use-this */
/**
 * The Component parent
 */

import { DocumentData } from '@firebase/firestore';
import Elements from './Elements';
import { fireStoreDb, doc, getDoc } from '../Components/firebase';
import Authenticator from '../Components/Auth/AuthenticateUser';
import Invite from '../Components/Invite/Invite';

/**
 * Component class, it's a generic class to hold all common functionality
 * of all classes that inherits from it.
 */
class Component {
  // Properties of the class

  public name: any;

  public model: any;

  public props: any;

  public navigation: any;

  public routerPath: any;

  public componentContainer: any;

  /**
   * Constructor function that initialize the properties of the class
   * @param {string} name
   * @param {object} model
   * @param {object} props
   * @param {string} routerPath
   * @param {object} navigation
   */
  constructor({
    name = '',
    model = {},
    props = null,
    routerPath = '',
    navigation = null,
  }: {
    name?: string;
    model?: any;
    props?: any;
    routerPath?: string;
    navigation?: any;
  }) {
    this.name = name;
    this.model = model;
    this.props = props;
    this.componentContainer = this.createComponentContainer();
    this.routerPath = routerPath;
    this.navigation = navigation;
  }

  // Credits: code snippet (line 61-85) from Bjorn's code

  createComponentContainer() {
    return Elements.createContainer({
      className: `${this.name}-container`,
    });
  }

  clearComponentContainer() {
    while (this.componentContainer.firstChild) {
      this.componentContainer.removeChild(this.componentContainer.lastChild);
    }
  }

  async getUserData() {
    const uId = Authenticator.getUid();

    const docRef = doc(fireStoreDb, 'users', uId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.changeModel(docSnap.data());
    } else { console.log('no user'); }
  }

  async getInviteData() {
    const inviteId = await Invite.getInvites();
    const docRef = doc(fireStoreDb, 'invites', inviteId);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.changeModel(docSnap.data());
    } else { console.log('no user'); }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changeModel(_data: DocumentData) { throw new Error('Method not implemented.'); }
}

export default Component;
