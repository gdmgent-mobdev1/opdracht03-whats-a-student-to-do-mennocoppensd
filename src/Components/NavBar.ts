/**
 * NavBar Component
 */

import Component from '../lib/Component';
// import Elements from '../lib/Elements';
import Router from './Router';

class NavBar extends Component {
  declare model: { buttons: any; };

  declare componentContainer: any;

  constructor() {
    super({
      name: 'navBar',
      model: {
        buttons: [
          {
            innerHTML: '<i class="fa-solid fa-square-plus"></i>',
            className: 'footer',
            onClick: () => Router.getRouter().navigate('/project-edit/:id'),
          },
          {
            innerHTML: '<i class="fas fa-home fa-lg"></i>',
            className: 'footer',
            onClick: () => Router.getRouter().navigate('/home'),
          },
          {
            innerHTML: '<i class="fa-sharp fa-solid fa-user"></i>',
            className: 'footer',
            onClick: () => Router.getRouter().navigate('/profile-detail'),
          },
        ],
      },
    });
  }

  async renderAsync() {
    const { buttons } = this.model;

    this.clearComponentContainer();
    this.componentContainer.classList.remove('basicLayout');
    const footer = document.createElement('footer');
    const div = document.createElement('div');
    div.classList.add('buttons');
    footer.appendChild(div);
    buttons.forEach((button: any) => {
      const buttonEl = document.createElement('button');
      buttonEl.innerHTML = button.innerHTML;
      buttonEl.classList.add(button.className);
      buttonEl.onclick = button.onClick;
      div.appendChild(buttonEl);
    });

    this.componentContainer.appendChild(footer);
    return this.componentContainer;
  }
}

export default NavBar;
