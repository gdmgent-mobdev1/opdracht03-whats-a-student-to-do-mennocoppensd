import Component from '../../lib/Component';
import Elements from '../../lib/Elements';
import Router from '../Router';

class ProjectContainerComponent extends Component {
  declare componentContainer: any;

  id: any;

  title: any;

  declare props: { id: any; title: any; };

  constructor({ id, title }: { id: string, title: string }) {
    super({
      name: 'projectContainer',
      props: {
        id,
        title,
      },
    });
  }

  render() {
    const {
      id, title,
    } = this.props;
    const elements = [];
    const textElements = [];

    this.clearComponentContainer();

    textElements.push(Elements.createHeader({
      size: 5,
      textContent: title,
    }));

    elements.push(Elements.createClickableContainer({
      className: 'text',
      children: textElements,
      onClick: () => Router.getRouter()?.navigate(`/project-detail/${id}`),
    }));

    elements.forEach((element) => this.componentContainer.appendChild(element));

    return this.componentContainer;
  }
}

export default ProjectContainerComponent;
