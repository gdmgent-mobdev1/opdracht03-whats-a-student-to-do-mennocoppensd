/**
 * Project Detail Page
 */

import Component from '../../lib/Component';
import Elements from '../../lib/Elements';
import Router from '../Router';
import Authenticator from '../Auth/AuthenticateUser';

import Projects from './Projects';
import Project from './Project';
// import UserTag from './UserTag';

class ProjectDetailComponent extends Component {
  declare componentContainer: any;

  declare props: any;

  declare model: any;

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

  async loadUsers() {
    const users = await Authenticator.getAllUsers();
    this.model.users = users;
  }

  async renderAsync() {
    const userId = Authenticator.getUid();
    const projectId = this.props.data.id;
    await this.loadProject(projectId);
    await this.loadUsers();

    const {
      editBtn, goToSubtasksButton, selectUsersbuttons, project,
      users, joinRejectButtons, leaveButton,
    } = this.model;
    const elements:any[] = [];
    const invited:any[] = [];
    const joined:any[] = [];
    const rejected:any[] = [];
    const buttonElements:any[] = [];

    this.clearComponentContainer();

    if (userId === project.organiser) {
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
    elements.push(Elements.createParagraph({
      textContent: `Deadline: ${users[project.deadline]}`,
    }));

    elements.push(Elements.createButton({
      textContent: 'Go to Subtasks',
      className: goToSubtasksButton.className,
      onClick: goToSubtasksButton.onClick,
      // Router.getRouter().navigate('/lists'),
    }));

    elements.push(Elements.createParagraph({
      textContent: `Organisator: ${users[project.organiser].username}`,
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

    project.invited.forEach((invite:any) => {
      const usertag = new UserTag(users[invite].username, users[invite].imageURL);
      invited.push(usertag.render());
      elements.push(Elements.createContainer({
        className: 'buttonLayout',
        children: invited,
      }));
    });

    project.joined.forEach((join:any) => {
      const usertag = new UserTag(users[join].username, users[join].imageURL);
      joined.push(usertag.render());
      elements.push(Elements.createContainer({
        className: 'buttonLayout',
        children: joined,
      }));
    });

    project.rejected.forEach((reject:any) => {
      const usertag = new UserTag(users[reject].username, users[reject].imageURL);
      rejected.push(usertag.render());
      elements.push(Elements.createContainer({
        className: 'buttonLayout',
        children: rejected,
      }));
    });

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
