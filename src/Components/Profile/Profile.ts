import Component from '../../lib/Component';
import Elements from '../../lib/Elements';
import Router from '../Router';
import Authenticator from '../Auth/AuthenticateUser';

class ProfileComponent extends Component {
  constructor() {
    super({
      name: 'profile',
      model: {
        editBtn: '<i class="fas fa-edit fa-3x"></i>',
        title: 'Profile',
        userData: {},
        buttons: [
          {
            textContent: 'Delete profile',
            className: 'danger',
            onClick: () => Authenticator.deleteUser(),
          },
          {
            textContent: 'log out',
            onClick: () => Authenticator.logout(),
          },

        ],
      },
      routerPath: '/profile-detail',
      navigation: true,
    });
  }

  changeModel(data:any) {
    if (data) {
      this.model.userData = {
        name: data.name,
        surname: data.surname,
        username: data.username,
        telephoneNumber: data.telephoneNumber,
        imageURL: data.imageURL,
      };
    }
  }

  async renderAsync() {
    await this.getUserData();

    const {
      editBtn, title, userData, buttons,
    } = this.model;
    const elements = [];

    this.clearComponentContainer();

    elements.push(Elements.createClickableContainer({
      className: 'edit text-right',
      innerHTML: editBtn,
      onClick: () => Router.getRouter().navigate('/edit-profile'),
    }));

    elements.push(Elements.createHeader({
      size: 1,
      textContent: title,
      className: 'text-center',
    }));

    elements.push(Elements.createErrorContainer({}));

    elements.push(Elements.createHeader({
      size: 5,
      textContent: `${userData.surname} ${userData.name}`,
    }));

    if (userData.imageURL) {
      elements.push(Elements.createImageContainer({
        className: 'imageContainer',
        alt: 'Image file not available',
      }));
    } else {
      elements.push(Elements.createImageContainer({
        className: 'imageContainer',
        alt: 'No image selected',
      }));
    }

    elements.push(Elements.createHeader({
      size: 5,
      textContent: `Username: ${userData.username}`,
    }));

    elements.push(Elements.createHeader({
      size: 5,
      textContent: `Telephone: ${userData.telephoneNumber}`,
    }));

    buttons.forEach((button: { textContent: any; className: any; onClick: any; }) => {
      elements.push(Elements.createButton({
        textContent: button.textContent,
        className: button.className,
        onClick: button.onClick,
      }));
    });

    elements.forEach((element) => this.componentContainer.appendChild(element));

    return this.componentContainer;
  }
}

export default ProfileComponent;
