/**
 * Profile details edit component
 */

import { DocumentData } from '@firebase/firestore';
import Component from '../../lib/Component';
import Elements from '../../lib/Elements';
import User from './User';
import Exception from '../Exceptions/Exception';

class EditProfileComponent extends Component {
  constructor() {
    super({
      name: 'editProfile',
      model: {
        title: 'Edit profile',
        forms: [
          {
            name: 'Surname',
            value: '',
            type: 'text',
          },
          {
            name: 'Name',
            value: '',
            type: 'text',
          },
          {
            name: 'Username',
            username: '',
            type: 'text',
          },
          {
            name: 'Telephone',
            telephoneNumber: '',
            type: 'text',
          },
          {
            name: 'ImageURL',
            imageURL: '',
            type: 'text',
          },
        ],
        button: {
          textContent: 'Save',
          onClick: () => {
            try {
              //  Get the filled in fields
              const formData = new FormData(document.querySelector('form') as HTMLFormElement);
              const surname = formData.get('surname');
              const name = formData.get('name');
              const username = formData.get('username');
              const telephoneNumber = formData.get('telephone');
              const imageURL = formData.get('ImageURL');

              if (!surname) throw new Exception();
              if (!name) throw new Exception();
              if (!username) throw new Exception();
              if (!telephoneNumber) throw new Exception();

              //  Create a new User instance
              const user = new User({
                surname: surname as string,
                name: name as string,
                username: username as string,
                telephoneNumber: telephoneNumber as string,
                imageURL: imageURL as string,
              });
              user.writeUserData();
            } catch (e : Exception | any) {
              e.showError('Please fill in all fields. (image is not required)');
            }
          },
        },
      },
      routerPath: '/edit-profile',
      navigation: false,
    });
  }

  changeModel(data: DocumentData) {
    if (data) {
      this.model.forms = [
        {
          name: 'Surname',
          value: data.surname,
        },
        {
          name: 'Name',
          value: data.name,
        },
        {
          name: 'Username',
          value: data.username,
        },
        {
          name: 'Telephone',
          value: data.telephoneNumber,
        },
        {
          name: 'ImageURL',
          value: data.imageURL,
        },
      ];
    }
  }

  async renderAsync() {
    this.clearComponentContainer();

    // Fetch the user data
    await this.getUserData();

    // Destructure the title, forms, and button properties from the model
    const { title, forms, button } = this.model;
    // Create an array of form elements
    const formElements = forms.map((form: { name: string; value: any; }) => [
      Elements.createHeader({
        size: 3,
        textContent: form.name,
      }),
      Elements.createFormElement({
        elType: 'text',
        placeholder: form.name,
        name: form.name.toLowerCase(),
        value: form.value,
        id: form.name.toLowerCase(),
      }),
    ]);

    // Flatten the array of form elements
    const flattenedFormElements = formElements.flat();

    // Create an array of all the elements that should be added to the component container
    const elements = [
      Elements.createHeader({
        size: 1,
        textContent: title,
        className: 'text-center',
      }),
      Elements.createErrorContainer({}),
      Elements.createForm({
        children: flattenedFormElements,
      }),
      Elements.createButton({
        textContent: button.textContent,
        onClick: button.onClick,
      }),
    ];

    // Add all the elements to the component container
    elements.forEach((element) => this.componentContainer.appendChild(element));

    return this.componentContainer;
  }
}

export default EditProfileComponent;
