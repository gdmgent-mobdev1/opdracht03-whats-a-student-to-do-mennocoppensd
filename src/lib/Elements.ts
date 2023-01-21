/* eslint-disable no-constant-condition */
// /**
//  * My Elements Helper
//  */

/* eslint-disable class-methods-use-this */
interface IButtonOptions {
  textContent?: string;
  onClick?: Function;
  className?: string;
  id?: string;
  innerHTML?: string;
  disabled?: boolean;
}
interface IHeaderOptions {
  children?: Element[];
  id?: string;
  className?: string;
  size?: number;
  textContent?: string;
}
interface IParagraphOptions {
  textContent?: string;
  className?: string;
}
interface ILinkOptions {
  href?: string;
  textContent?: string;
  target?: string;
}
interface IListOptions {
  items?: {
    textContent: string;
    href?: string;
  }[];
  ordered?: boolean;
}
interface IContainerOptions {
  className?: string;
  id?: string;
  innerHTML?: string;
  children?: Element[];
  backgroundImage?: string;
}
interface IClickableContainerOptions {
  className?: string;
  id?: string;
  innerHTML?: string;
  children?: Element[];
  onClick?: Function;
}

interface IFormOptions {
  id?: string;
  className?: string;
  method?: 'get' | 'post';
  action?: string;
  children?: Element[];
  onSubmit?: Function;
}
interface IFormElementOptions {
  elType: string;
  name?: string;
  id?: string;
  className?: string;
  placeholder?: string;
  value?: string | boolean;
  required?: boolean;
}
interface ITextareaOptions extends IFormElementOptions {
  rows: number;
  cols: number;
}
interface ICheckboxOptions extends IFormElementOptions {
  label: string;
}
interface ImageContainerOptions {
  alt: string;
  className?: string;
  id?: string;
  onClick?: Function;
}
interface IErrorContainerOptions {
  errorText?: string;
  className?: string;
  id?: string;
}
interface ISuccessContainerOptions {
  successText?: string;
  className?: string;
  id?: string;
}
interface IFooterOptions {
  className?: string;
  id?: string;
  children?: Element[];
  onClick?: Function;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TARGET_SELF = '_self';
const VALID_HEADER_SIZES = [1, 2, 3, 4, 5, 6];

class Elements {
  // eslint-disable-next-line class-methods-use-this
  private isValidUrl(url:string) {
    const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
        + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
        + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
        + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
        + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
        + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(url);
  }

  createButton({
    textContent = '', onClick, className = '', id = '', innerHTML = '', disabled = false,
  }: IButtonOptions) {
    const button = document.createElement('button') as HTMLButtonElement;
    button.textContent = textContent;
    button.className = className;
    if (id) button.id = id;
    if (innerHTML) button.innerHTML = innerHTML;
    if (disabled) button.disabled = disabled;
    if (onClick) {
      button.addEventListener('click', onClick as EventListener);
    }
    return button;
  }

  createHeaderComponent({
    children = [], id = '', className = '', size = 1,
  }: IHeaderOptions) {
    if (VALID_HEADER_SIZES.indexOf(size) === -1) {
      throw new Error(`Invalid header size. Must be between 1 and 6, but got ${size}`);
    }
    const header = document.createElement(`h${size}`);
    if (id) header.setAttribute('id', id);
    if (className) header.classList.add(className);
    if (children.length) {
      children.forEach((child) => {
        if (child instanceof Element) {
          header.appendChild(child);
        }
      });
    }
    return header;
  }

  createHeader({ size = 1, textContent = '', className = '' }: IHeaderOptions) {
    if (VALID_HEADER_SIZES.indexOf(size) === -1) {
      throw new Error(`Invalid header size. Must be between 1 and 6, but got ${size}`);
    }
    const header = document.createElement(`h${size}`);
    header.textContent = textContent;
    if (className) header.className = className;
    return header;
  }

  createParagraph({ textContent = '', className = '' }: IParagraphOptions) {
    const p = document.createElement('p');
    p.textContent = textContent;
    if (className) p.className = className;
    return p;
  }

  createLink({ href = '#', textContent = '', target = TARGET_SELF }: ILinkOptions) {
    if (!this.isValidUrl(href)) {
      throw new Error(`Invalid href. Must be a valid URL, but got ${href}`);
    }
    const a = document.createElement('a');
    a.href = href;
    a.textContent = textContent;
    a.target = target;
    return a;
  }

  createList({ items = [], ordered = false }: IListOptions) {
    const list = document.createElement(ordered ? 'ol' : 'ul');
    items.forEach(({ textContent, href }) => {
      const li = document.createElement('li');
      if (!href) {
        li.textContent = textContent;
      } else {
        li.appendChild(this.createLink({ href, textContent }));
      }
      list.appendChild(li);
    });
    return list;
  }

  createContainer({
    className = '', id = '', innerHTML = '', children = [], backgroundImage = '',
  }: IContainerOptions) {
    const container = document.createElement('div');
    if (id) container.setAttribute('id', id);
    container.className = className;
    container.innerHTML = innerHTML;
    if (backgroundImage) container.style.backgroundImage = `url(${backgroundImage})`;
    if (children.length) {
      children.forEach((child: any) => {
        if (child instanceof Element) {
          container.appendChild(child);
        }
      });
    }
    return container;
  }

  createClickableContainer({
    className = '', id = '', innerHTML = '', children = [], onClick,
  }: IClickableContainerOptions) {
    const container = document.createElement('div');
    if (id) container.setAttribute('id', id);
    container.className = className;
    container.innerHTML = innerHTML;
    if (children.length) {
      children.forEach((child: any) => {
        if (child instanceof Element) {
          container.appendChild(child);
        }
      });
    }
    if (onClick) {
      container.addEventListener('click', onClick as EventListener);
    }
    return container;
  }

  createForm({
    id = '', className = '', method = 'post', action = '', children = [], onSubmit,
  }: IFormOptions) {
    const form = document.createElement('form');
    if (id) form.setAttribute('id', id);
    form.className = className;
    form.method = method;
    form.action = action;
    if (children.length) {
      children.forEach((child: any) => {
        if (child instanceof Element) {
          form.appendChild(child);
        }
      });
    }
    if (onSubmit) {
      form.addEventListener('submit', onSubmit as EventListener);
    }
    return form;
  }

  createFormElement({
    elType, name, id, className, placeholder, value, required,
  }: IFormElementOptions) {
    const element = document.createElement(elType === 'textarea' ? elType : 'input');
    if (name) element.name = name;
    if (id) element.setAttribute('id', id);
    element.className = className || '';
    if (elType === 'text' || elType === 'password' || elType === 'email' || elType === 'date') {
      element.setAttribute('type', elType || 'text' || 'password' || 'email');
      element.placeholder = placeholder || '';
      element.value = value || 'date' ? new Date().toISOString().slice(0, 10) : '';
    }
    if (required) element.required = required;
    return element;
  }

  createTextarea({
    elType, rows, cols, ...rest
  }: ITextareaOptions) {
    const textarea = this.createFormElement({ elType: 'textarea', ...rest });

    return textarea;
  }

  createCheckbox({ label, elType, ...rest }: ICheckboxOptions) {
    const checkbox = this.createFormElement({ elType: 'checkbox', ...rest });
    const checkboxLabel = document.createElement('label');
    checkboxLabel.appendChild(checkbox);
    checkboxLabel.appendChild(document.createTextNode(label));
    return checkboxLabel;
  }

  createImageContainer({
    alt, className = '', id = '', onClick,
  }: ImageContainerOptions) {
    const img = new Image();
    img.alt = alt;
    if (className) img.classList.add(className);
    if (id) img.setAttribute('id', id);
    if (onClick) {
      img.addEventListener('click', onClick as EventListener);
    }
    return img;
  }

  createErrorContainer({ errorText = '', className = '', id = '' }: IErrorContainerOptions) {
    const errorContainer = document.createElement('div');
    if (className) errorContainer.classList.add(className);
    if (id) errorContainer.setAttribute('id', id);
    errorContainer.appendChild(document.createTextNode(errorText));
    return errorContainer;
  }

  createSuccessContainer({ successText = '', className = '', id = '' }: ISuccessContainerOptions) {
    const successContainer = document.createElement('div');
    if (className) successContainer.classList.add(className);
    if (id) successContainer.setAttribute('id', id);
    successContainer.appendChild(document.createTextNode(successText));
    return successContainer;
  }

  createFooter({
    className = '', id = '', children = [], onClick,
  }: IFooterOptions) {
    const footer = document.createElement('footer');
    if (id) footer.setAttribute('id', id);
    footer.className = className;
    if (children.length) {
      children.forEach((child: any) => {
        if (child instanceof Element) {
          footer.appendChild(child);
        }
      });
    }
    if (onClick) {
      footer.addEventListener('click', onClick as EventListener);
    }
    return footer;
  }
}
export default new Elements();
