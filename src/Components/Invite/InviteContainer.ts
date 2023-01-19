import Component from '../../lib/Component';
import Elements from '../../lib/Elements';

class InviteContainerComponent extends Component {
  declare componentContainer: any;

  id: any;

  sender: any;

  project: any;

  status: any;

  routerPath: any;

  projectTitle: any;

  acceptInvite: any;

  declineInvite: any;

  constructor({
    id, sender, project, status, routerPath, projectTitle, acceptInvite, declineInvite,
  }) {
    super({
      name: 'inviteContainer',
      props: {
        id,
        sender,
        project,
        status,
        routerPath,
        projectTitle,
        acceptInvite,
        declineInvite,
      },
    });
  }

  render() {
    const {
      id, projectTitle, acceptInvite, declineInvite,
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
