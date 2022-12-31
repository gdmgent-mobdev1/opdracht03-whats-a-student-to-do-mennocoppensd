import './css/styles.css';
import App from './App';

import {
  RegisterComponent,
  LoginComponent,
  EditProfileComponent,
} from './Components';

import Router from './Components/Router';

// const login = ;
// const register = new RegisterComponent();
// const editProfile = new EditProfileComponent();

const appContainer = document.querySelector<HTMLDivElement>('#app')!;
const app = new App(appContainer);

$('.message a').click(() => {
  $('form').animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
});

app.addComponent(new RegisterComponent());
app.addComponent(new LoginComponent());
app.addComponent(new EditProfileComponent());
// appContainer.appendChild(register.render());
// appContainer.appendChild(await editProfile.renderAsync());

// submit button met click event listener

// voorlopig alles hierin steken
