/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Component from '../../lib/Component';
import Elements from '../../lib/Elements';

class InviteContainerComponent extends Component {
  id: any;

  sender: any;

  project: any;

  status: any;

  declare routerPath: any;

  projectTitle: any;

  acceptInvite: any;

  declineInvite: any;

  constructor() {
    super({
      name: 'inviteContainer',
      model: {},
      routerPath: '/invite/:id',
      navigation: true,
    });
    this.id,
    this.sender,
    this.project,
    this.status,
    this.routerPath,
    this.projectTitle,
    this.acceptInvite,
    this.declineInvite;
  }

  render() {
    const {
      projectTitle,
      acceptInvite,
      declineInvite,
    } = this.props;
    const elements = [];
    const textElements = [];
    const buttonElements = [];

    this.clearComponentContainer();

    textElements.push(Elements.createParagraph({
      textContent: `You have been invited to join ${projectTitle}`,
    }));

    buttonElements.push(Elements.createButton({
      textContent: 'Accept',
      className: 'accept-button',
      onClick: acceptInvite,
    }));

    buttonElements.push(Elements.createButton({
      textContent: 'Decline',
      className: 'decline-button',
      onClick: declineInvite,
    }));

    elements.push(Elements.createContainer({
      className: 'text',
      children: textElements,
    }));

    elements.push(Elements.createContainer({
      className: 'button-group',
      children: buttonElements,
    }));

    elements.forEach((element) => this.componentContainer.appendChild(element));

    return this.componentContainer;
  }
}

export default InviteContainerComponent;
