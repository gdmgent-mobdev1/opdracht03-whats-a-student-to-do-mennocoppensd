/**
 * Login Page Component
 */

import Component from '../../lib/Component';
import Elements from '../../lib/Elements';
import Router from '../Router';
import Authenticator from './AuthenticateUser';

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
          onClick: () => {
            Authenticator.signin();
            Router.getRouter().navigate('/home');
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
      routerPath: '/',
      navigation: false,
    });
  }

  render() {
    const {
      title, subtitle, button, googleButton, facebookButton, twitterButton,
    } = this.model;
    const elements:any[] = [];
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

    const emailInputLogin = document.createElement('input');
    emailInputLogin.type = 'email';
    emailInputLogin.placeholder = 'email';
    emailInputLogin.name = 'email';
    emailInputLogin.id = 'email_login';
    loginForm.appendChild(emailInputLogin);

    const passwordInputLogin = document.createElement('input');
    passwordInputLogin.type = 'password';
    passwordInputLogin.placeholder = 'password';
    passwordInputLogin.name = 'password';
    passwordInputLogin.id = 'password_login';
    loginForm.appendChild(passwordInputLogin);

    const loginButton = () => {
      const buttonLogin = Elements.createButton({
        id: 'btnLogin',
        textContent: 'Login',
        className: 'btnLogin',
        onClick: button.onClick,
      });
      return buttonLogin;
    };
    const btn = loginButton();
    loginForm.appendChild(btn);

    const loginMessage = document.createElement('p');
    loginMessage.classList.add('message');
    loginMessage.textContent = 'Not registered? ';

    const signUpLink = document.createElement('a');
    signUpLink.href = '/register';
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

export default LoginComponent;
