/* eslint-disable import/no-cycle */
import Component from '../../lib/Component';
import TodoListComponent from './TodoList';

// listId: this.props.data.id
class TrelloLists extends Component {
  toDoList: TodoListComponent | null;

  wipList: TodoListComponent | null;

  doneList: TodoListComponent | null;

  listElement: HTMLElement | null;

  constructor() {
    super({
      name: 'SubtaskLists',
      model: {},
      routerPath: '/lists/:id',
      navigation: true,
    });
    this.listElement = null;
    this.toDoList = null;
    this.wipList = null;
    this.doneList = null;
  }

  createHTMLElement() {
    this.listElement = document.createElement('div');
    this.listElement.className = 'lists';
    this.toDoList = new TodoListComponent(this.listElement!, 'To Do', `${this.props.data.id}_todo`);
    this.wipList = new TodoListComponent(this.listElement!, 'WIP', `${this.props.data.id}_wip`);
    this.doneList = new TodoListComponent(this.listElement!, 'Done', `${this.props.data.id}_done`);
  }

  render() {
    this.createHTMLElement();
    return this.listElement;
  }
}

export default TrelloLists;
