/* eslint-disable import/no-cycle */
import { v4 as uuidv4 } from 'uuid';
import { root, State } from '../../main';
import { dragstartHandler } from '../../lib/dragAndDrop';
import { deleteCardFromFirebase, addCommentToFirebase } from '../firebase';
import Comment from './Comment';
import editableText from './EditableText';
import TodoList from './TodoList';
import Component from '../../lib/Component';

class Card extends Component {
  declare componentContainer: any;

  place: HTMLElement;

  todoList: TodoList;

  state: State;

  menuContainer?: HTMLElement;

  card?: HTMLDivElement;

  deleteButton?: HTMLButtonElement;

  p?: HTMLParagraphElement;

  menu?: HTMLDivElement;

  menuTitle?: HTMLDivElement;

  menuDescription?: HTMLDivElement;

  commentsInput?: HTMLInputElement;

  commentsButton?: HTMLButtonElement;

  menuComments?: HTMLDivElement;

  editableDescription?: editableText;

  editableText?: editableText;

  id: string;

  parentId: string;

  leaderboardContainer?: HTMLDivElement;

  // eslint-disable-next-line @typescript-eslint/default-param-last
  constructor(state: Partial<State> & { title: string }, place: HTMLElement, todoList: TodoList, id = `_${uuidv4()}`, parentId:string) {
    super({
      name: 'CardContainer',
      props: {
        id,
        title: state.title,
      },
    });
    this.id = id;
    this.place = place;
    this.todoList = todoList;
    this.state = {
      description: 'Click to write a description...',
      comments: [],
      ...state,
      id,
    };
    this.parentId = parentId;
    this.render();
  }

  render(): void {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    this.card.setAttribute('draggable', 'true');
    this.card.id = this.id;
    this.deleteButton = document.createElement('button');
    this.deleteButton.classList.add('delete-btn');
    this.card.addEventListener('click', (e) => {
      if (e.target !== this.deleteButton) {
        this.showMenu.call(this);
      }
    });
    this.card.addEventListener('dragstart', dragstartHandler);

    this.p = document.createElement('p');
    this.p.innerText = this.state.title;

    this.deleteButton = document.createElement('button');
    this.deleteButton.classList.add('delete-btn');

    this.deleteButton.addEventListener('click', () => {
      this.deleteCard.call(this);
      deleteCardFromFirebase(this.parentId!, this.id);
    });

    this.card.append(this.p);
    this.card.append(this.deleteButton);

    this.place.append(this.card);
  }

  deleteCard(): void {
    this.card?.remove();
    const i = this.todoList.cardArray.indexOf(this);
    this.todoList.cardArray.splice(i, 1);
  }

  showMenu(): void {
    // Create elements
    this.menu = document.createElement('div');
    this.menuContainer = document.createElement('div');
    this.menuTitle = document.createElement('div');
    this.menuDescription = document.createElement('div');
    this.commentsInput = document.createElement('input');
    this.commentsButton = document.createElement('button');
    this.menuComments = document.createElement('div');
    this.leaderboardContainer = document.createElement('div');
    this.leaderboardContainer.classList.add('leaderboard-container');
    this.leaderboardContainer.innerHTML = `
                    <div class="container-timer">
                        <div class="outerRing">
                            <div class="timer">
                                <div id="time">
                                    <span id="minutes">00</span>
                                    <span id="colon">:</span>
                                    <span id="seconds">10</span>
                                </div>
                                <div id="stsp">START</div>
                                <span id="setting"><i class="fas fa-cog"></i></span>
                            </div>
                        </div>
                    </div>
                `;
    this.componentContainer.appendChild(this.leaderboardContainer);
    import('../timer.ts').then(() => {
      // Run the timer functionality here
    });

    // Add class names
    this.menu.className = 'menu';
    this.menuContainer.className = 'menuContainer';
    this.menu.setAttribute('data-id', this.id);
    this.menu.setAttribute('data-todolist-id', this.parentId);
    this.menuTitle.className = 'menuTitle';
    this.menuDescription.className = 'menuDescription';
    this.menuComments.className = 'menuComments';
    this.commentsInput.className = 'commentsInput comment';
    this.commentsButton.className = 'commentsButton btn-save';

    // Add inner title
    this.commentsButton.innerText = 'Add';
    this.commentsInput.placeholder = 'Write a comment...';

    // Event listeners
    this.menuContainer.addEventListener('click', (e: MouseEvent) => {
      if ((e.target as HTMLElement).classList.contains('menuContainer') && (this.menuContainer != null)) {
        this.menuContainer?.remove();
      }
    });

    this.commentsButton.addEventListener('click', () => {
      if (this.commentsInput?.value !== '' && (this.commentsInput != null)) {
        this.state.comments?.push(this.commentsInput.value);
        addCommentToFirebase(this.parentId!, this.id, this.commentsInput.value);
        this.renderComments();
        this.commentsInput.value = '';
      }
    });

    // Append
    this.menu.append(this.menuTitle);
    this.menu.append(this.menuDescription);
    this.menu.append(this.commentsInput);
    this.menu.append(this.commentsButton);
    this.menu.append(this.menuComments);
    this.menu.append(this.leaderboardContainer);
    this.menuContainer.append(this.menu);
    root.append(this.menuContainer);
    // eslint-disable-next-line new-cap
    this.editableDescription = new editableText(this.state.description, this.menuDescription, this, 'description', 'textarea', this.id, this.parentId);
    // eslint-disable-next-line new-cap
    this.editableText = new editableText(this.state.title, this.menuTitle, this, 'title', 'input', this.id, this.parentId);

    this.renderComments();
  }

  renderComments(): void {
    if (this.menuComments instanceof HTMLElement && this.menuComments != null) {
      const currentCommentsDOM = Array.from(this.menuComments.childNodes);
      currentCommentsDOM.forEach((commentDOM) => {
        commentDOM.remove();
      });

      this.state.comments?.forEach((comment) => {
        if (this.menuComments instanceof HTMLElement) {
          // eslint-disable-next-line no-new
          new Comment(comment, this.menuComments, this);
        }
      });
    }
  }
}

export default Card;
