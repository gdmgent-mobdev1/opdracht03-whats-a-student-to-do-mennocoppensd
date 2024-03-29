/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Sub Tasks Page Component
 */

import Component from '../../lib/Component';

import { dragoverHandler, dropHandler } from '../../lib/dragAndDrop';
import { addTodoFirebase, deleteTodoListFirebase } from '../firebase';
// eslint-disable-next-line import/no-cycle
import Card from './Card';
import SubTasks from './Subtasks';

class TodoListComponent extends Component {
  place: HTMLElement;

  title: string;

  cardArray: Card[];

  input!: HTMLInputElement;

  div!: HTMLDivElement;

  h2!: HTMLHeadingElement;

  todoListElement!: HTMLDivElement;

  id: string;

  routerPath = '/lists/:id';

  navigation = false;

  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/default-param-last,
  // @typescript-eslint/no-unused-vars,
  constructor(
    place: HTMLElement,
    title: string,
    id: string,
    cardArray = [],
  ) {
    super({
      name: 'TodoList',
      model: {
        title,
        cardArray,
      },
      routerPath: '',
      navigation: false,
    });
    this.id = id;
    this.place = place;
    this.title = title;
    this.cardArray = cardArray;
    this.createElementsFromHTML();
    this.render();
  }

  async addToDo() {
    const text = this.input.value;
    const cardId = await addTodoFirebase(text, this.id);
    const newCard = new Card({ title: text }, this.div, this, cardId, this.id);
    this.cardArray.push(newCard);
  }

  async loadCards() {
    const cards = await SubTasks.getAll(this.id);
    console.log(cards);
    cards.forEach((card) => {
      const newCard = new Card(card, this.div, this, card.id, this.id);
      this.cardArray.push(newCard);
    });
  }

  async render() {
    await this.loadCards();
    if (this.place && this.todoListElement instanceof HTMLElement) {
      this.place.append(this.todoListElement);
    }
  }

  createElementsFromHTML(): void {
    const template = `
      <div class="todoList" id="${this.id}">
        <h2>${this.title}</h2>
        <input class="comment" placeholder="A good name for a subtask..."/>

        <button class="btn-save" id="to-do-list-button">Add</button>
        <div></div>
        <button class="delete-btn"></button>
      </div>

      <div class="createTaskContainer">
      <p id="" class="CreateTaskText">Create task here!</p>
      <p id="" class="label">Title task</p><input id="titleTask" type="text" name="" class="titleTask" placeholder="Title task"><p id="" class="label">Deadline</p><input type="date" class="calendar" id="calender" min="2023-01-01" max="2025-12-31"><p id="" class="label">Total points</p><input id="totalPoints" type="text" name="" class="totalPoints" placeholder="Give a number"><p id="" class="label">Invite people</p><div class="usercontainer"><input id="checkbox" type="checkbox" name="checkbox" class="checkbox" placeholder="" value="test@gmail.com"><p id="" class="">test@gmail.com</p></div><div class="usercontainer"><input id="checkbox" type="checkbox" name="checkbox" class="checkbox" placeholder="" value="test@gmail.com"><p id="" class="">test@gmail.com</p></div><div class="usercontainer"><input id="checkbox" type="checkbox" name="checkbox" class="checkbox" placeholder="" value="test@gmail.com"><p id="" class="">test@gmail.com</p></div><div class="usercontainer"><input id="checkbox" type="checkbox" name="checkbox" class="checkbox" placeholder="" value="test@gmail.com"><p id="" class="">test@gmail.com</p></div><div class="usercontainer"><input id="checkbox" type="checkbox" name="checkbox" class="checkbox" placeholder="" value="test@icloud.com"><p id="" class="">test@icloud.com</p></div><div class="usercontainer"><input id="checkbox" type="checkbox" name="checkbox" class="checkbox" placeholder="" value="test@test.com"><p id="" class="">test@test.com</p></div><div class="usercontainer"><input id="checkbox" type="checkbox" name="checkbox" class="checkbox" placeholder="" value="wout@hotmail.com"><p id="" class="">wout@hotmail.com</p></div><div class="usercontainer"><input id="checkbox" type="checkbox" name="checkbox" class="checkbox" placeholder="" value="test@gmail.com"><p id="" class="">test@gmail.com</p></div><div class="usercontainer"><input id="checkbox" type="checkbox" name="checkbox" class="checkbox" placeholder="" value="test@gmail.com"><p id="" class="">test@gmail.com</p></div><div class="usercontainer"><input id="checkbox" type="checkbox" name="checkbox" class="checkbox" placeholder="" value="tackwouter@hotmail.com"><p id="" class="">tackwouter@hotmail.com</p></div><div class="usercontainer"><input id="checkbox" type="checkbox" name="checkbox" class="checkbox" placeholder="" value="ikKomKijknaarUwSite@bro.com"><p id="" class="">ikKomKijknaarUwSite@bro.com</p></div></div>
    `;
    const templateElement = document.createElement('template');
    templateElement.innerHTML = template;
    this.todoListElement = templateElement.content.firstElementChild as HTMLDivElement;
    this.input = this.todoListElement.querySelector('.comment') as HTMLInputElement;
    this.div = this.todoListElement.querySelector('div') as HTMLDivElement;
    this.h2 = this.todoListElement.querySelector('h2') as HTMLHeadingElement;
    const button = this.todoListElement.querySelector('.btn-save') as HTMLButtonElement;
    const deleteButton = this.todoListElement.querySelector('.delete-btn') as HTMLButtonElement;
    button.addEventListener('click', () => {
      if (this.input.value !== '') {
        this.addToDo();
        this.input.value = '';
      }
    });
    deleteButton.addEventListener('click', () => {
      deleteTodoListFirebase(this.id);
      document.querySelector(`#${this.id}`)?.remove();
    });
    this.todoListElement.addEventListener('drop', dropHandler);
    this.todoListElement.addEventListener('dragover', dragoverHandler);
  }
}

export default TodoListComponent;
