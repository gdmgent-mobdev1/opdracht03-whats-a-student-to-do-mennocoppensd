/**
 * Register Page Component
 */

import Component from '../../lib/Component';
import Elements from '../../lib/Elements';
import Router from '../Router';
import Authenticator from './AuthenticateUser';

class RegisterComponent extends Component {
  constructor() {
    super({
      name: 'register',
      model: {
        title: 'TimeTiger',
        subtitle: 'TimeTiger is a time management app that helps you to manage your time and tasks.',
        forms: [
          'Email',
          'Password',
        ],
        button: {
          textContent: 'Create',
          onClick: () => {
            Authenticator.register();
            Router.getRouter().navigate('/edit-profile');
          },
        },
        googleButton: {
          innerHTML: '<i class="fa-brands fa-google"></i>',
          className: 'google',
          onClick: () => Authenticator.loginGoogle(),
        },
        facebookButton: {
          innerHTML: '<i class="fa-brands fa-facebook"></i>',
          className: 'facebook',
          onClick: () => Authenticator.loginFacebook(),
        },
        twitterButton: {
          innerHTML: '<i class="fa-brands fa-twitter"></i>',
          className: 'twitter',
          onClick: () => Authenticator.loginTwitter(),
        },
      },
      routerPath: '/register',
      navigation: false,
    });
  }

  render() {
    const {
      title, subtitle, button, googleButton, facebookButton, twitterButton,
    } = this.model;
    const elements: any[] = [];
    this.clearComponentContainer();

    // Header
    const header = document.createElement('header');
    header.classList.add('headerLogin');

    const titleElement = document.createElement('h1');
    titleElement.textContent = title;
    header.appendChild(titleElement);

    const subtitleElement = document.createElement('h2');
    subtitleElement.textContent = subtitle;
    header.appendChild(subtitleElement);

    // Login page
    const loginPage = document.createElement('div');
    loginPage.classList.add('login-page');

    // Form container
    const formContainer = document.createElement('div');
    formContainer.classList.add('form');

    // Register form
    const registerForm = document.createElement('form');
    registerForm.classList.add('register-form');
    registerForm.action = '#';

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'email';
    emailInput.name = 'email';
    emailInput.id = 'email_register';
    registerForm.appendChild(emailInput);

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'password';
    passwordInput.name = 'password';
    passwordInput.id = 'password_register';
    registerForm.appendChild(passwordInput);

    const registerButton = document.createElement('button');
    registerButton.id = 'btnRegister';
    registerButton.textContent = 'create';
    registerButton.onclick = () => {
      onclick = button.onClick;
    };
    registerForm.appendChild(registerButton);

    const registerMessage = document.createElement('p');
    registerMessage.classList.add('message');
    registerMessage.textContent = 'Already registered? ';

    const signInLink = document.createElement('a');
    signInLink.href = '/';
    signInLink.textContent = 'Sign In';
    registerMessage.appendChild(signInLink);
    registerForm.appendChild(registerMessage);

    formContainer.appendChild(registerForm);

    // Error container
    const errorContainer = document.createElement('div');
    errorContainer.classList.add('errorContainer', 'hide');
    formContainer.appendChild(errorContainer);

    loginPage.appendChild(formContainer);

    this.componentContainer.appendChild(header);
    this.componentContainer.appendChild(loginPage);

    elements.push(Elements.createHeader({
      size: 2,
      textContent: 'OR USE',
      className: 'text-center',
    }));

    elements.push(Elements.createButton({
      innerHTML: googleButton.innerHTML,
      className: 'google',
      onClick: googleButton.onClick,
    }));

    elements.push(Elements.createButton({
      innerHTML: facebookButton.innerHTML,
      className: 'facebook',
      onClick: facebookButton.onClick,
    }));

    elements.push(Elements.createButton({
      innerHTML: twitterButton.innerHTML,
      className: 'twitter',
      onClick: twitterButton.onClick,
    }));

    elements.forEach((element) => this.componentContainer.appendChild(element));

    return this.componentContainer;
  }
}

export default RegisterComponent;
