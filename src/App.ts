/**
 * App
 */

import Component from './lib/Component';
import Router from './Components/Router';
import { firebase } from './Components/firebase';

class App {
  components: never[];

  firebase: any;

  parent: HTMLElement | null;

  constructor(parent: HTMLElement | null) {
    this.parent = parent;
    this.components = [];
    this.firebase = firebase;
  }

  clearParent() {
    while (this.parent.firstChild) {
      this.parent.removeChild(this.parent.lastChild);
    }
  }

  addComponent(component:any) {
    if (!(component instanceof Component)) return;

    // get the name, routerPath and if there is a navbar from out component
    const { name, routerPath } = component;

    // add to internal class
    this.components.push(component);

    // add to router if it is a page component (check if there is a routerpath)
    if (component.routerPath) {
      Router.getRouter().on(
        routerPath,
        (params:any) => {
          this.showComponent({
            name,
            props: params,
          });
        },
      ).resolve();
    }
  }

  async showComponent({ name, props }) {
    const foundComponent = this.components.find((component) => component.name === name);
    if (!foundComponent) return;
    this.clearParent();

    if (props) foundComponent.props = props;

    // Render the content on the page
    if (foundComponent.render) {
      this.parent.appendChild(foundComponent.render());
    }

    if (foundComponent.renderAsync) {
      await foundComponent
        .renderAsync()
        .then((renderedComponent) => {
          this.parent.appendChild(renderedComponent);
        })
        .catch((error: { message: any; }) => {
          console.error(error.message);
        });
    }
    if (foundComponent.showMessages) {
      foundComponent.showMessages();
    }
  }
}

export default App;
