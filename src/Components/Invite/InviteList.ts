import Invite from './Invite';

class InviteList {
  invites: any;

  constructor() {
    this.invites = [];
  }

  async getInvites() {
    try {
      const querySnapshot = await Invite.getInvites();
      querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
        this.invites.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const inviteList = document.createElement('div');
    inviteList.innerHTML = `
        <h2>Invite List</h2>
        <ul id="invite-list"></ul>
      `;

    const inviteListContainer = inviteList.querySelector('#invite-list');
    this.invites.forEach((invite: { sender: any; recipient: any; project: any; status: any; }) => {
      const inviteItem = document.createElement('li');
      inviteItem.innerHTML = `
          <p>Sender: ${invite.sender}</p>
          <p>Recipient: ${invite.recipient}</p>
          <p>Project: ${invite.project}</p>
          <p>Status: ${invite.status}</p>
        `;
      inviteListContainer?.appendChild(inviteItem);
    });
    return inviteList;
  }
}
export default new InviteList();
