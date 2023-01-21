/* eslint-disable @typescript-eslint/no-unused-vars */
import { DocumentData } from '@firebase/firestore-types';
import Component from '../../lib/Component';
import Elements from '../../lib/Elements';

class DeletePeopleComponent extends Component {
  constructor() {
    super({
      name: 'deletePeople',
      model: {
        title: 'delete people',
      },
      routerPath: '/delete-users/:projectId',
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
    const { title } = this.model;

    const elements = [
      Elements.createHeader({
        size: 1,
        textContent: title,
        className: 'text-center',
      }),
      Elements.createHeader({
        size: 2,
        textContent: 'Delete users from this project',
        className: 'your-projects',
      }),
      Elements.createButton({
        textContent: 'Delete',
        className: 'delete-users-button',
        id: 'delete-users',
      }),

    ];
    const addUsersList = document.createElement('div');
    addUsersList.classList.add('delete-users-list');

    addUsersList.innerHTML = `
    
<div class="row_lists">
  <div class="col-sm-6 col-md-4 offset-md-2 list-standard">
    <label class="checkbox">Geoffrey De Bondt
      <input type="checkbox">

    </label>
    <label class="checkbox">Rita
      <input type="checkbox">

    </label>
    <label class="checkbox">Jean Paul
      <input type="checkbox">

    </label>
    <label class="checkbox">Rosita
      <input type="checkbox">
    </label>
  </div>
</div>

                `;
    elements.forEach((element) => this.componentContainer.appendChild(element));
    this.componentContainer.appendChild(addUsersList);

    return this.componentContainer;
  }
}

export default DeletePeopleComponent;
