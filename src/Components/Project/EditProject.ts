/* eslint-disable no-console */
/**
 * Edit Project Page Component
 */

import Component from '../../lib/Component';
import Elements from '../../lib/Elements';
import Router from '../Router';
import Project from './Project';
import Exception from '../Exceptions/Exception';
import Authenticator from '../Auth/AuthenticateUser';
import Projects from './Projects';

class EditProjectComponent extends Component {
  constructor() {
    super({
      name: 'editProject',
      model: {
        title: 'Project',
        linkPicture: '<i class="fas fa-times fa-3x"></i>',
        linkOnclick: () => {
          if (this.props.data.id === ':id') {
            Router.getRouter().navigate('/home');
          } else {
            Router.getRouter().navigate(`/project-detail/${this.props.data.id}`);
          }
        },
        forms: [
          {
            type: 'text',
            name: 'Name',
            placeholder: 'Name',
            value: '',
          },
          {
            type: 'textarea',
            name: 'Description',
            placeholder: 'Description',
            value: '',
          },
          {
            className: 'calendar',
            id: 'calender',
            name: 'deadline',
            type: 'date',
            min: '2023-01-01',
            max: '2030-12-31',
          },
        ],
        button: {
          textContent: 'Save',
          onClick: async () => {
            try {
              const organiser = Authenticator.getUid();
              const formData = new FormData(<HTMLFormElement> (document.querySelector('form')));
              const title = formData.get('name');
              const description = formData.get('description');
              const deadline = formData.get('deadline');

              formData.forEach((value) => {
                if (!value) throw new Exception('Fill in all fields');
              });

              const project = new Project({
                organiser,
                title,
                description,
                deadline,
                editedOn: new Date(),
                createdOn: new Date(),
                invited: [],
                joined: [],
                rejected: [],
                subtasks: [],
              });

              if (this.props.data.id === ':id') {
                const projectData = await project.createNewProject();
                Router.getRouter().navigate(`/project-detail/${projectData.id}`);
              } else {
                await project.editProject(this.props.data.id);
                Router.getRouter().navigate(`/project-detail/${this.props.data.id}`);
              }
            } catch (e : unknown) {
              console.log('Failed to create project');
            }
          },
        },
      },
      routerPath: '/project-edit/:id',
      navigation: false,
    });
  }

  async loadProject(id: string) {
    if (!(id === ':id')) {
      const project = await Projects.getById(id);
      this.model.forms = [
        {
          type: 'text',
          name: 'Name',
          placeholder: 'Name',
          value: project?.title,
        },
        {
          type: 'textarea',
          name: 'Description',
          placeholder: 'Description',
          value: project?.description,
        },
        {
          className: 'calendar',
          name: 'Deadline',
          id: 'calender',
          type: 'date',
          min: '2023-01-01',
          max: '2030-12-31',
        },
      ];
    }
  }

  async renderAsync() {
    const projectId = this.props.data.id;
    await this.loadProject(projectId);
    const {
      title, forms, button, linkPicture, linkOnclick,
    } = this.model;
    const elements = [];
    const formElements:any[] = [];

    this.clearComponentContainer();

    elements.push(Elements.createClickableContainer({
      className: 'text-right',
      innerHTML: linkPicture,
      onClick: linkOnclick,
    }));

    elements.push(Elements.createHeader({
      size: 1,
      textContent: title,
      className: 'text-center',
    }));

    forms.forEach((form:any) => {
      formElements.push(Elements.createHeader({
        size: 3,
        textContent: form.name,
      }));
      if (form.type === 'textarea') {
        formElements.push(Elements.createTextarea({
          value: form.value,
          cols: 5,
          elType: form.type,
          placeholder: form.placeholder,
          name: form.name.toLowerCase(),
          rows: 5,
        }));
      } else if (form.type === 'text') {
        formElements.push(Elements.createFormElement({
          elType: form.type,
          value: form.value,
          placeholder: form.name.toLowerCase(),
          name: form.name.toLowerCase(),
        }));
      } else {
        formElements.push(Elements.createFormElement({
          elType: form.type,
          value: form.value,
          name: form.name,
          className: form.className,
          id: form.id,
        }));
      }
    });

    elements.push(Elements.createForm({
      children: formElements,
    }));

    elements.push(Elements.createErrorContainer({}));

    elements.push(Elements.createButton({
      textContent: button.textContent,
      onClick: button.onClick,
    }));

    elements.forEach((element) => this.componentContainer.appendChild(element));

    return this.componentContainer;
  }
}

export default EditProjectComponent;
