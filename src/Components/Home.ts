import { DocumentData } from '@firebase/firestore';
import Component from '../lib/Component';
import Elements from '../lib/Elements';
import Authenticator from './Auth/AuthenticateUser';

import ProjectContainerComponent from './Project/ProjectContainer';
import Projects from './Project/Projects';

import InviteService from './Invite/Invite';
import Invite from './Invite/Invite';
import InviteContainerComponent from './Invite/InviteContainer';

// Home component that acts as a dashboard for logged in users
class HomeComponent extends Component {
  constructor() {
    super({
      name: 'home',
      model: {
        title: 'Dashboard',
      },
      routerPath: '/home',
      navigation: true,
    });
  }

  // Change the component's model data
  changeModel(data: DocumentData) {
    if (data) {
      this.model.userData = data;
    }
  }

  async renderAsync() {
    const userId = Authenticator.getUid();
    await this.getUserData();

    // const inviteId = Invite.getInvites();
    // await this.getInviteData();

    // Destructure the title and userData properties from the model
    const { title, userData } = this.model;
    // Fetch the user data

    const projects = await Projects.getAll();
    // const invites = await Invite.getInvites();

    this.clearComponentContainer();

    // Create an array of elements
    const elements = [
      Elements.createHeader({
        size: 1,
        textContent: title,
        className: 'text-center',
      }),
      Elements.createHeader({
        size: 2,
        textContent: 'Welcome!',
        className: 'welcome',
      }),
      Elements.createHeader({
        size: 2,
        textContent: 'Your Projects',
        className: 'your-projects',
      }),
    ];

    // Credits to Bjorn for the help with this part (line 62-82)

    // Create a new project container component
    projects.forEach((project) => {
      if (project.organiser === userId) {
        const ProjectContainer = new ProjectContainerComponent({
          id: project.id,
          title: project.title,
        });
        elements.push(ProjectContainer.render());
      }
    });

    projects.forEach((project) => {
      const joinedUsers = project.joined;
      const found = joinedUsers.find((user: any) => user === userId);
      if (found) {
        const ProjectContainer = new ProjectContainerComponent({
          id: project.id,
          title: project.title,
        });
        elements.push(ProjectContainer.render());
      }
    });

    const invite = {
      sender: 'user1',
      recipient: 'user2',
      project: 'project1',
      status: 'pending',
    };

    // Create a new invite container component
    // eslint-disable-next-line max-len, @typescript-eslint/no-shadow
    // invites.forEach((invite: { recipient: string; id: any; sender: any; project: any; status: any; }) => {
    //   if (invite.recipient === userId) {
    //     const InviteContainer = new InviteContainerComponent({
    //       id: invite.id,
    //       sender: invite.sender,
    //       project: invite.project,
    //       status: invite.status, // pending, accepted, declined
    //       routerPath: 'invite-detail',
    //     });
    //     elements.push(InviteContainer.render());
    //   }
    // });

    // InviteService.createInvite(invite);

    // const inviteSnapshot = await InviteService.getInvite('inviteId');
    // const inviteData = inviteSnapshot.data();
    // console.log(inviteData);

    // InviteService.updateInvite('inviteId', { status: 'accepted' });
    // InviteService.deleteInvite('inviteId');

    // Add all the elements to the component container
    elements.forEach((element) => this.componentContainer.appendChild(element));

    return this.componentContainer;
  }
}
export default HomeComponent;
