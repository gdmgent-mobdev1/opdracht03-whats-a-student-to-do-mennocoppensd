import './css/styles.css';

// eslint-disable-next-line import/no-duplicates
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
  LeaderboardComponent,
  AddPeopleComponent,
  DeletePeopleComponent,

} from './Components';

import Router from './Components/Router';

// eslint-disable-next-line import/no-duplicates
import { auth } from './Components/firebase';

const appContainer = document.querySelector<HTMLDivElement>('#app')!;
const root = document.getElementById('app') as HTMLElement;
interface State {
  id: string,
  title: string
  description: string
  deadline: Date,
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
app.addComponent(new LeaderboardComponent());
app.addComponent(new AddPeopleComponent());
app.addComponent(new DeletePeopleComponent());

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
