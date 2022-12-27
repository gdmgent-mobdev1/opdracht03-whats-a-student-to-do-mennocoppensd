import Component from '../lib/Component';
import Elements from '../lib/Elements';

// inheritence
class LoginComponent extends Component {
  constructor() {
    super({
      name: 'Login',
      model: {},
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const loginContainer = document.createElement('div');
    loginContainer.appendChild(
      Elements.createHeader({
        textContent: '',
      }),
    );
    return loginContainer;
  }
}

export default LoginComponent;
