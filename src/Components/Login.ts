import Component from '../lib/Component';
import Elements from '../lib/Elements';
import Router from './Router';
import Authenticator from './Authenticator';

// inheritence
class LoginComponent extends Component {
  constructor() {
    super({
      name: 'Login',
      model: {
        loginButton: {
          textContent: 'login',
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
      routerPath: '/',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const loginContainer = document.createElement('div');
    loginContainer.className = 'login-buttons';
    loginContainer.appendChild(
      Elements.createHeader({
        textContent: 'OF',
        size: 2,
      }),
    );

    const googleButton = document.createElement('button');
    loginContainer.appendChild(
      Elements.createButton({
        className: 'google',
        innerHTML: '<i class="fa-brands fa-google"></i>',
        onClick: googleButton.click,
      }),
      // facebook en twitter button verder maken zoals google button
    );
    const facebookButton = document.createElement('button');
    facebookButton.className = 'facebook';
    loginContainer.appendChild(
      Elements.createButton({
        className: 'facebook',
        innerHTML: '<i class="fa-brands fa-facebook"></i>',
        onClick: facebookButton.click,
      }),
    );
    const twitterButton = document.createElement('button');
    loginContainer.appendChild(
      Elements.createButton({
        className: 'twitter',
        innerHTML: '<i class="fa-brands fa-twitter"></i>',
        onClick: twitterButton.click,
      }),
    );

    return loginContainer;
  }
}

export default LoginComponent;
