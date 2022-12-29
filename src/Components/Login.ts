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
        forms: [
          'Email',
          'Password',
        ],
        header: {
          textContent: 'OF',
        },
        loginButton: {
          textContent: 'login',
          onClick: () => Authenticator.login(),
          className: 'loginButton',
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

  render() {
    const {
      title, forms, loginButton, googleButton, facebookButton, twitterButton,
    } = this.model;
    const elements:any[] = [];
    const formElements:any[] = [];

    this.clearComponentContainer();

    elements.push(Elements.createHeader({
      size: 2,
      textContent: title,
      className: 'text-center',
    }));

    elements.push(Elements.createErrorContainer({}));

    // forms.forEach((form:any) => {
    //   formElements.push(Elements.createFormElement({
    //     type: form.toLowerCase(),
    //     placeholder: form,
    //     name: form.toLowerCase(),
    //   }));
    // });

    // elements.push(Elements.createForm({
    //   children: formElements,
    // }));

    // elements.push(Elements.createButton({
    //   textContent: loginButton.textContent,
    //   onClick: loginButton.onClick,
    //   className: loginButton.className,
    // }));

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

// import Component from '../lib/Component';
// import Elements from '../lib/Elements';
// import Router from './Router';
// import Authenticator from './Authenticator';

// // inheritence
// class LoginComponent extends Component {
//   constructor() {
//     super({
//       name: 'Login',
//       model: {
//         loginButton: {
//           textContent: 'login',
//           onClick: () => Authenticator.login(),
//         },
//         googleButton: {
//           innerHTML: '<i class="fa-brands fa-google"></i>',
//           className: 'google',
//           onClick: () => Authenticator.loginGoogle(),
//         },
//         facebookButton: {
//           innerHTML: '<i class="fa-brands fa-facebook"></i>',
//           className: 'facebook',
//           onClick: () => Authenticator.loginFacebook(),
//         },
//         twitterButton: {
//           innerHTML: '<i class="fa-brands fa-twitter"></i>',
//           className: 'twitter',
//           onClick: () => Authenticator.loginTwitter(),
//         },
//       },
//       routerPath: '/',
//     });
//   }

//   // eslint-disable-next-line class-methods-use-this
//   render() {
//     const loginContainer = document.createElement('div');
//     loginContainer.className = 'login-buttons';
//     loginContainer.appendChild(
//       Elements.createHeader({
//         textContent: 'OF',
//         size: 2,
//       }),
//     );

//     const googleButton = document.createElement('button');
//     loginContainer.appendChild(
//       Elements.createButton({
//         className: 'google',
//         innerHTML: '<i class="fa-brands fa-google"></i>',
//         onClick: googleButton.click,
//       }),
//       // facebook en twitter button verder maken zoals google button
//     );
//     const facebookButton = document.createElement('button');
//     facebookButton.className = 'facebook';
//     loginContainer.appendChild(
//       Elements.createButton({
//         className: 'facebook',
//         innerHTML: '<i class="fa-brands fa-facebook"></i>',
//         onClick: facebookButton.click,
//       }),
//     );
//     const twitterButton = document.createElement('button');
//     loginContainer.appendChild(
//       Elements.createButton({
//         className: 'twitter',
//         innerHTML: '<i class="fa-brands fa-twitter"></i>',
//         onClick: twitterButton.click,
//       }),
//     );

//     return loginContainer;
//   }
// }

// export default LoginComponent;
