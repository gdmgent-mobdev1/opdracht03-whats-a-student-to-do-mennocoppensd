import './css/styles.css';

import { onAuthStateChanged } from './Components/firebase';
import App from './App';

// eslint-disable-next-line import/no-cycle
import {
  RegisterComponent,
  LoginComponent,
  EditProfileComponent,
  HomeComponent,
  NavBar,
  ProfileComponent,
  EditProjectComponent,
  ProjectDetailComponent,
  TodoListsComponent,

} from './Components';

import Router from './Components/Router';

import { auth } from './Components/firebase';

const appContainer = document.querySelector<HTMLDivElement>('#app')!;
const root = document.getElementById('app') as HTMLElement;
interface State {
  id: string,
  title: string
  description: string
  comments?: string[]
}

type Property = keyof State;

const app = new App(appContainer);

export { root };
export type { State, Property };

$('.message a').click(() => {
  $('form').animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
});
app.addComponent(new LoginComponent());
app.addComponent(new RegisterComponent());
app.addComponent(new NavBar());
app.addComponent(new EditProfileComponent());
app.addComponent(new HomeComponent());
app.addComponent(new ProfileComponent());
app.addComponent(new EditProjectComponent());
app.addComponent(new ProjectDetailComponent());
app.addComponent(new TodoListsComponent());

// Probeersel 1

// app.addComponent(new TodoListComponent(
//   this?.place,
//   this?.input,
//   this?.div,
//   this?.h2,
//   this?.button,
//   this?.deleteButton,
//   this?.todoListElement,
//   this?.title,
//   this?.id,
//   this?.cardArray,
// ));

// Probeersel 2

// app.addComponent(new TodoListComponent(
// document.body, document.createElement('input'),
// document.createElement('div'), this?.cardArray, document.createElement('button'),
// document.createElement('button'), document.createElement('h2'),
// document.createElement(this?.id)));

// Probeersel 3

// app.addComponent(new TodoListComponent(new HTMLElement(), '', '', [], new HTMLInputElement(),
// new HTMLDivElement(), new HTMLHeadingElement(), new HTMLButtonElement(),
// new HTMLButtonElement(), new HTMLDivElement()));

const onAuthStateChangedFunction = async (user:any) => {
  if (user) {
    Router.getRouter()?.navigate('/');
  }
};

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.ts');
}

onAuthStateChanged(auth, onAuthStateChangedFunction);

// submit button met click event listener

// voorlopig alles hierin steken
