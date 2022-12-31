/**
 * Login Page Component
 */

import Component from '../lib/Component';
import Elements from '../lib/Elements';
import Router from './Router';
import Authenticator from './Authenticator';

class LoginComponent extends Component {
  constructor() {
    super({
      name: 'login',
      model: {
        title: 'TimeTiger',
        subtitle: 'TimeTiger is a time management app that helps you to manage your time and tasks.',
        forms: [
          'Email',
          'Password',
        ],
        button: {
          textContent: 'Login',
          onClick: () => Authenticator.login(),
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
      routerPath: '/login',
    });
  }

  render() {
    const {
      title, subtitle, googleButton, facebookButton, twitterButton,
    } = this.model;
    const elements:any[] = [];
    const forms:any[] = [];
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

    // Login form
    const loginForm = document.createElement('form');
    loginForm.classList.add('login-form');
    loginForm.action = '#';

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'email';
    emailInput.name = 'email';
    loginForm.appendChild(emailInput);

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'password';
    passwordInput.name = 'password';
    loginForm.appendChild(passwordInput);

    const loginButton = document.createElement('button');
    loginButton.id = 'btnLogin';
    loginButton.textContent = 'Login';
    loginButton.onclick = () => {
      Authenticator.login();
      (Router as any).navigate('/home');
    };
    loginForm.appendChild(loginButton);

    const loginMessage = document.createElement('p');
    loginMessage.classList.add('message');
    loginMessage.textContent = 'Not registered? ';

    const signUpLink = document.createElement('a');
    signUpLink.href = '/';
    signUpLink.textContent = 'Create an account';
    loginMessage.appendChild(signUpLink);
    loginForm.appendChild(loginMessage);

    formContainer.appendChild(loginForm);

    // Error container
    const errorContainer = document.createElement('div');
    errorContainer.classList.add('errorContainer', 'hide');
    formContainer.appendChild(errorContainer);

    loginPage.appendChild(formContainer);

    this.componentContainer.appendChild(header);
    this.componentContainer.appendChild(loginPage);

    elements.push(Elements.createHeader({
      size: 2,
      textContent: 'OF',
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

export default LoginComponent;
