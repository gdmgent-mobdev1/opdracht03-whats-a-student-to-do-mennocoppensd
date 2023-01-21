/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-duplicates */
import { DocumentData } from '@firebase/firestore';
import Component from '../lib/Component';
import Elements from '../lib/Elements';
import Authenticator from './Auth/AuthenticateUser';

import ProjectContainerComponent from './Project/ProjectContainer';
import Projects from './Project/Projects';

import Router from './Router';

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
    const { title } = this.model;
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
      Elements.createButton({
        textContent: 'leaderboard',
        className: 'your-leaderboard',
        onClick: () => Router.getRouter().navigate('/leaderboard'),
      }),
      Elements.createHeader({
        size: 2,
        textContent: 'Your Projects',
        className: 'your-projects',
      }),
    ];
    const leaderboardContainer = document.createElement('div');
    leaderboardContainer.classList.add('leaderboard-container');
    leaderboardContainer.innerHTML = `
                    <div class="container-timer">
                        <div class="outerRing">
                            <div class="timer">
                                <div id="time">
                                    <span id="minutes">00</span>
                                    <span id="colon">:</span>
                                    <span id="seconds">10</span>
                                </div>
                                <div id="stsp">START</div>
                                <span id="setting"><i class="fas fa-cog"></i></span>
                            </div>
                        </div>
                    </div>
                `;
    this.componentContainer.appendChild(leaderboardContainer);
    import('./timer.js' as any).then(() => {
      // Run the timer functionality here
    });

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

    elements.forEach((element) => this.componentContainer.appendChild(element));

    return this.componentContainer;
  }
}
export default HomeComponent;
