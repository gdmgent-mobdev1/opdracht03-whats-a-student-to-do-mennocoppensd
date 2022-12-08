/**
 * My Elements Helper
 */
const Elements = {
  createHeader({
    size = 1, textContent = '',
  }) {
    const header = document.createElement(`h${(size < 1 || size > 6) ? 1 : size}`);

    header.textContent = textContent;
    return header;
  },

  createButton({
    textContent = '',
    onClick = null,
    className = '',
    id = '',
    innerHTML = '',
  }) {
    const button = document.createElement('button') as HTMLButtonElement;
    button.textContent = textContent;
    button.className = className;
    if (id) button.id = id;
    if (innerHTML) button.innerHTML = innerHTML;
    if (onClick) {
      button.addEventListener(
        'click',
        onClick,
      );
    }
    return button;
  },
};

export default Elements;
