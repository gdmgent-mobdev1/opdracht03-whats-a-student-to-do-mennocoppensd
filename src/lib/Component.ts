/* eslint-disable class-methods-use-this */
/**
 * The Component parent
 */

class Component {
  name:string;

  model: {};

  constructor({ name, model }: { name: string; model: {} }) {
    this.name = name;
    this.model = model;
  }

  render() : HTMLElement {
    return document.createElement('');
  }
}

export default Component;
