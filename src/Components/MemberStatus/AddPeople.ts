import { DocumentData } from '@firebase/firestore-types';
import Component from '../../lib/Component';
import Elements from '../../lib/Elements';

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
      }),
    ];
    const addUsersList = document.createElement('div');
    addUsersList.classList.add('add-users-list');

    addUsersList.innerHTML = `
    
<div class="row_lists">
  <div class="col-sm-6 col-md-4 offset-md-2 list-standard">
    <label class="checkbox">Menno123
      <input type="checkbox">

    </label>
    <label class="checkbox">Sebas
      <input type="checkbox">

    </label>
    <label class="checkbox">Jos
      <input type="checkbox">

    </label>
    <label class="checkbox">Pascal
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

export default AddPeopleComponent;
