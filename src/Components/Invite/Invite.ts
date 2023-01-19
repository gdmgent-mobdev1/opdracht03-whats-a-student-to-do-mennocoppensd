import * as firebase from '../firebase';

class InviteService {
  invitesCollection: any;

  firestore: any;

  static async getAllInvites() {
    try {
      const querySnapshot = await firebase.getDocs(firebase.collection(firebase.fireStoreDb, 'invites'));
      const invites:any[] = [];
      querySnapshot.forEach((document: { id: string | number; data: () => any; }) => {
        invites[document.id] = document.data();
      });
      return invites;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async createInvite(invite: any) {
    return this.invitesCollection.add(invite);
  }

  async getInvite(inviteId: string) {
    return this.invitesCollection.doc(inviteId).get();
  }

  async getInvites() {
    return this.invitesCollection.get();
  }

  async updateInvite(inviteId: string, invite: any) {
    return this.invitesCollection.doc(inviteId).update(invite);
  }

  async deleteInvite(inviteId: string) {
    return this.invitesCollection.doc(inviteId).delete();
  }
}

export default new InviteService();
