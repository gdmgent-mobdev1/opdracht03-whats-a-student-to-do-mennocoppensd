import Component from '../../lib/Component';

class UserTag extends Component {
  private userName: string;

  private imgURL?: string;

  constructor(username: string, imageURL?: string) {
    super({
      name: 'UserTag',
    });
    this.userName = username;
    this.imgURL = imageURL;
  }

  render() {
    const container = document.createElement('div');
    if (!this.imgURL) {
      container.innerHTML = `<p>${this.userName}</p>`;
    } else {
      container.style.display = 'flex';
      container.innerHTML = `
        <div style="width=2vw;height=2vw;object-fit=contain;">
          <img src="${this.imgURL}" style="width=100%;height=100%;" />
        </div>
        <p>${this.userName}</p>
      `;
    }
    return container;
  }
}

export default UserTag;
