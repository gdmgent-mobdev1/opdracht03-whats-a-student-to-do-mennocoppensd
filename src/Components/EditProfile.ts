/**
 * Profile details edit component
 */

import { DocumentData } from '@firebase/firestore';
import Component from '../lib/Component';
import Elements from '../lib/Elements';
import User from './User';
import Exception from './Exceptions/Exception';

class EditProfileComponent extends Component {
  constructor() {
    super({
      name: 'editProfile',
      model: {
        title: 'Bewerk profiel',
        forms: [
          {
            name: 'Voornaam',
            value: '',
          },
          {
            name: 'Naam',
            value: '',
          },
          {
            name: 'Username',
            username: '',
          },
          {
            name: 'Telefoonnummer',
            telephoneNumber: '',
          },
          {
            name: 'AfbeeldingURL',
            imageURL: '',
          },
        ],
        button: {
          textContent: 'opslaan',
          onClick: () => {
            try {
              //  Get the filled in fields
              const formData = new FormData(document.querySelector('form'));
              const name = formData.get('voornaam');
              const surname = formData.get('naam');
              const username = formData.get('username');
              const telephoneNumber = formData.get('telefoonnummer');
              const imageURL = formData.get('afbeeldingurl');
              formData.append('required', name);
              formData.append('required', surname);
              formData.append('required', username);
              formData.append('required', telephoneNumber);
              const required = formData.getAll('required');

              //  If there is any field empty (apart from the image), throw a new error
              required.forEach((value) => {
                if (!value) throw new Exception();
              });
              //  Create a new User instance
              const user = new User({
                name, surname, username, telephoneNumber, imageURL,
              });
              user.writeUserData();
            } catch (e) {
              e.showError('Gelieve alle velden in te vullen. (afbeelding is niet verplicht)');
            }
          },
        },
      },
      routerPath: '/edit-profile',

    });
  }

  changeModel(data: DocumentData) {
    if (data) {
      this.model.forms = [
        {
          name: 'Voornaam',
          value: data.name,
        },
        {
          name: 'Naam',
          value: data.surname,
        },
        {
          name: 'Username',
          value: data.username,
        },
        {
          name: 'Telefoonnummer',
          value: data.telephoneNumber,
        },
        {
          name: 'URL afbeelding',
          value: data.imageURL,
        },
      ];
    }
  }

  async renderAsync() {
    this.clearComponentContainer();

    await this.getUserData();
    const {
      title, forms, button,
    } = this.model;
    const elements = [];
    const formElements: any[] = [];

    elements.push(Elements.createHeader({
      size: 3,
      textContent: title,
      className: 'text-center',
    }));

    elements.push(Elements.createErrorContainer({}));

    forms.forEach((form: { name: string; value: any; }) => {
      formElements.push(Elements.createHeader({
        size: 4,
        textContent: form.name,
      }));
      formElements.push(Elements.createFormElement({
        type: 'text',
        placeholder: form.name,
        name: form.name.toLowerCase(),
        value: form.value,
        id: form.name.toLowerCase(),
      }));
    });

    elements.push(Elements.createForm({
      children: formElements,
    }));

    elements.push(Elements.createButton({
      textContent: button.textContent,
      onClick: button.onClick,
    }));

    elements.forEach((element) => this.componentContainer.appendChild(element));

    return this.componentContainer;
  }
}

export default EditProfileComponent;
