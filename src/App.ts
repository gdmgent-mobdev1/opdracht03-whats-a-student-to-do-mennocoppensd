/* eslint-disable no-console */
/**
 * App
 */

import Component from './lib/Component';
import Router from './Components/Router';
import { fireStoreApp } from './Components/firebase';

class App {
  fireStoreApp: any;

  parent: any;

  components: Component[];

  constructor(parent: HTMLDivElement) {
    this.parent = parent;
    this.components = [];
    this.fireStoreApp = fireStoreApp;
  }

  clearParent() {
    while (this.parent.firstChild) {
      this.parent.removeChild(this.parent.lastChild);
    }
  }

  addComponent(component: any) {
    if (!(component instanceof Component)) return;

    const { name, routerPath, navigation } = component;

    this.components.push(component);

    if (component.routerPath) {
      Router.getRouter().on(
        routerPath,
        (params: any) => {
          this.showComponent({
            name,
            props: params,
            navigation,
          });
        },
      ).resolve();
    }
  }

  async showComponent({ name, props, navigation }: { name: string; props: any; navigation: any; }) {
    // Find the component by name
    const foundComponent = this.components.find((component) => component.name === name);
    if (!foundComponent) return;
    this.clearParent();

    // Set the props, if they are passed
    if (props) foundComponent.props = props;

    // Render the content on the page
    await this.renderComponent(foundComponent, navigation);
  }

  async renderComponent(component: any, navigation: any) {
    if (component.render) {
      this.parent.appendChild(component.render());
    }

    // If the page has a navbar, add it
    if (navigation) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const navBar = this.components.find((component: { name: string; }) => component.name === 'navBar');
      if (!navBar) throw new Error('Failed to find Navbar component');
      try {
        const navBarComponent = await navBar.renderAsync();
        this.parent.appendChild(navBarComponent);
      } catch (error) {
        console.error(error);
      }
    }
    if (component.renderAsync) {
      await component
        .renderAsync()
        .then((renderedComponent: any) => {
          this.parent.appendChild(renderedComponent);
        })
        .catch((error: { message: any; }) => {
          console.error(`error while rendering ${component.name} component: `, error.message);
        });
    }
    if (component.showMessages) {
      component.showMessages();
    }
  }
}

export default App;
