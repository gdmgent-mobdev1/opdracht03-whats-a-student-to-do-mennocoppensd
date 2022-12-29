/**
 * Register Page Component
 */

import Component from '../lib/Component';
import Elements from '../lib/Elements';
import Router from './Router';
import Authenticator from './Authenticator';

class RegisterComponent extends Component {
  componentContainer: any;

  model: { title: any; forms: any; button: any; };

  constructor() {
    super({
      name: 'register',
      model: {
        forms: [
          'Email',
          'Password',
        ],
        registerButton: {
          textContent: 'Create',
          onClick: () => Authenticator.registerNewAccount(),
        },
      },
      routerPath: '/register',
    });
  }

  render() {
    const { title, forms, button } = this.model;
    const elements:any[] = [];
    const formElements :any[] = [];

    this.clearComponentContainer();

    elements.push(Elements.createHeader({
      size: 2,
      textContent: title,
      className: 'text-center',
    }));

    elements.push(Elements.createErrorContainer({}));

    forms.forEach((form:any) => {
      formElements.push(Elements.createFormElement({
        type: form.toLowerCase(),
        placeholder: form,
        name: form.toLowerCase(),
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

export default RegisterComponent;
