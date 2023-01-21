/**
 * Project Detail Page
 */

import Component from '../../lib/Component';
import Elements from '../../lib/Elements';
import Router from '../Router';
import Authenticator from '../Auth/AuthenticateUser';

import Projects from './Projects';
import Project from './Project';
import UserTag from './UserTag';

class ProjectDetailComponent extends Component {
  declare componentContainer: any;

  constructor() {
    super({
      name: 'projectDetail',
      model: {
        users: [],
        editBtn: '<i class="fas fa-edit fa-3x"></i>',
        goToSubtasksButton: {
          textContent: 'Go to subtasks',
          className: 'goToSubtasks',
          onClick: () => {
            Router.getRouter()?.navigate(`/lists/${this.props.data.id}`);
          },
        },
        selectUsersbuttons: [
          {
            textContent: 'Delete people',
            className: 'delete',
            onClick: () => Router.getRouter()?.navigate(`/delete-users/${this.props.data.id}`),
          },
          {
            textContent: 'Add people',
            className: 'add',
            onClick: () => Router.getRouter()?.navigate(`/add-users/${this.props.data.id}`),
          },
        ],
        joinRejectButtons: [
          {
            innerHTML: '<i class="fas fa-times fa-2x"></i>',
            className: 'danger',
            onClick: async () => {
              const projectData = await Projects.createProjectData(this.props.data.id);
              const project = new Project(projectData);
              await project.rejectProject(this.props.data.id);
              Router.getRouter().navigate('/home');
            },
          },
          {
            innerHTML: '<i class="fas fa-check fa-2x"></i>',
            className: 'success',
            onClick: async () => {
              const projectData = await Projects.createProjectData(this.props.data.id);
              const project = new Project(projectData);
              await project.joinProject(this.props.data.id);
              Router.getRouter().navigate('/home');
            },
          },
        ],
        leaveButton: {
          textContent: 'Leave project',
          className: 'danger',
          onClick: async () => {
            const projectData = await Projects.createProjectData(this.props.data.id);
            const project = new Project(projectData);
            await project.rejectProject(this.props.data.id);
            Router.getRouter().navigate('/home');
          },
        },
        project: {},
      },
      routerPath: '/project-detail/:id',
      navigation: true,
    });
  }

  async loadProject(id: any) {
    this.model.project = await Projects.getById(id);
  }

  async loadUsers(id: string) {
    const users = await Projects.getMembers(id);
    if (!users) return;
    this.model.users = [...users];
  }

  changeModel(data:any) {
    if (data) {
      this.model.data = {
        ...data,
      };
    }
  }

  async renderAsync() {
    await this.getUserData();
    const userId = Authenticator.getUid();
    const projectId = this.props.data.id;
    await this.loadProject(projectId);
    await this.loadUsers(projectId);

    const {
      editBtn, goToSubtasksButton, selectUsersbuttons, project,
      joinRejectButtons, leaveButton,
    } = this.model;
    const elements:any[] = [];
    const joined:any[] = [];
    const buttonElements:any[] = [];

    this.clearComponentContainer();

    if (this.model.data?.uid === project.organiser) {
      elements.push(Elements.createClickableContainer({
        className: 'edit text-right',
        innerHTML: editBtn,
        onClick: () => Router.getRouter().navigate(`/project-edit/${projectId}`),
      }));
    }

    elements.push(Elements.createHeader({
      size: 1,
      textContent: project.title,
    }));
    // FIXME: Confused jan noises here
    // elements.push(Elements.createParagraph({
    //   textContent: `Deadline: ${users[project.deadline]}`,
    // }));

    elements.push(Elements.createButton({
      textContent: 'Go to Subtasks',
      className: goToSubtasksButton.className,
      onClick: goToSubtasksButton.onClick,
      // Router.getRouter().navigate('/lists'),
    }));

    elements.push(Elements.createParagraph({
      textContent: `Organisator: ${this.model.data.username}`,
    }));

    elements.push(Elements.createHeader({
      size: 4,
      textContent: project.description,
    }));

    // const foundJoined = project.joined.find((user:any) => user === userId);
    // const foundInvited = project.invited.find((user:any) => user === userId);
    // const foundRejected = project.rejected.find((user:any) => user === userId);

    elements.push(Elements.createHeader({
      size: 5,
      textContent: 'Group members:',
    }));

    this.model.users.forEach((membs:any) => {
      const usertag = new UserTag(membs.username, membs.imageURL);
      joined.push(usertag.render());
    });
    elements.push(Elements.createContainer({
      className: 'buttonLayout',
      children: joined,
    }));

    if (userId === project.organiser) {
      selectUsersbuttons.forEach((button:any) => {
        buttonElements.push(Elements.createButton({
          textContent: button.textContent,
          className: button.className,
          onClick: button.onClick,
        }));
      });

      elements.push(Elements.createContainer({
        className: 'addDelete buttonLayout',
        children: buttonElements,
      }));
    }

    elements.push(Elements.createParagraph({
      textContent: `Created on ${project.createdOn}`,
    }));

    elements.push(Elements.createParagraph({
      textContent: `Latest edit on ${project.editedOn}`,
    }));

    if (userId === project.organiser) {
      elements.push(Elements.createButton({
        textContent: 'Delete project',
        className: 'danger',
        onClick: async () => {
          await Projects.deleteProject(projectId);
          Router.getRouter().navigate('/home');
        },
      }));
    }

    const foundInvite = project.invited.find((user:any) => user === userId);
    if (foundInvite) {
      const buttons:any[] = [];
      joinRejectButtons.forEach((button:any) => {
        buttons.push(Elements.createButton({
          innerHTML: button.innerHTML,
          className: button.className,
          onClick: button.onClick,
        }));
      });
      elements.push(Elements.createContainer({
        className: 'buttonLayout',
        children: buttons,
      }));
    }

    const foundJoin = project.joined.find((user:any) => user === userId);
    if (foundJoin) {
      elements.push(Elements.createButton({
        textContent: leaveButton.textContent,
        className: leaveButton.className,
        onClick: leaveButton.onClick,
      }));
    }

    elements.forEach((element) => this.componentContainer.appendChild(element));

    return this.componentContainer;
  }
}

export default ProjectDetailComponent;
