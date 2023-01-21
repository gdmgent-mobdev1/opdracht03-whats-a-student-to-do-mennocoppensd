/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Project Detail Page
 */

import Component from '../../lib/Component';
import Elements from '../../lib/Elements';
import Router from '../Router';
import Authenticator from '../Auth/AuthenticateUser';

import Projects from './Projects';

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
    } = this.model;
    const elements:any[] = [];
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

    elements.push(Elements.createButton({
      textContent: 'Go to Subtasks',
      className: goToSubtasksButton.className,
      onClick: goToSubtasksButton.onClick,
    }));

    elements.push(Elements.createParagraph({
      textContent: `Organisator: ${this.model.data.username}`,
    }));

    elements.push(Elements.createHeader({
      size: 4,
      textContent: project.description,
    }));

    elements.push(Elements.createHeader({
      size: 5,
      textContent: 'Group members:',
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

    elements.forEach((element) => this.componentContainer.appendChild(element));

    return this.componentContainer;
  }
}

export default ProjectDetailComponent;
