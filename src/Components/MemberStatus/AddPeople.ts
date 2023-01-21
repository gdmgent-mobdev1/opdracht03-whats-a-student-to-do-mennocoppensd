import { DocumentData } from '@firebase/firestore-types';
import Component from '../../lib/Component';
import Elements from '../../lib/Elements';
import Router from '../Router';
import { addUsersToProject, listAllUsers } from './store';

class AddPeopleComponent extends Component {
  constructor() {
    super({
      name: 'addPeople',
      model: {
        title: 'add people',
      },
      routerPath: '/add-users/:projectId',
      navigation: true,

    });
  }

  // Change the component's model data
  changeModel(data: DocumentData) {
    if (data) {
      this.model.userData = data;
    }
  }

  // Render the add users page

  async renderAsync() {
    const { title, userData } = this.model;

    const users = await listAllUsers(this.props.data.projectId);

    const addUsersListElem = document.createElement('form');
    addUsersListElem.classList.add('add-users-list');

    const elements = [
      Elements.createHeader({
        size: 1,
        textContent: title,
        className: 'text-center',
      }),
      Elements.createHeader({
        size: 2,
        textContent: "Let's add users to this project",
        className: 'your-projects',
      }),
      Elements.createButton({
        textContent: 'Add',
        className: 'add-users-button',
        id: 'add-users',
        onClick: async () => {
          const selUsers = $(addUsersListElem).serializeArray().map((v) => v.value);
          await addUsersToProject(this.props.data.projectId, selUsers);
          Router.getRouter()?.navigate(`/project-detail/${this.props.data.projectId}`);
        },
      }),
    ];

    addUsersListElem.innerHTML = `    
      <div class="row_lists">
        <div class="col-sm-6 col-md-4 offset-md-2 list-standard">
        ${users.map((u) => (`
          <label class="checkbox">
            ${u.username}
            <input type="checkbox" name="add-user" value="${u.id}">
          </label>`)).join('')}
        </div>
      </div>`;
    elements.forEach((element) => this.componentContainer.appendChild(element));
    this.componentContainer.appendChild(addUsersListElem);

    return this.componentContainer;
  }
}

export default AddPeopleComponent;
