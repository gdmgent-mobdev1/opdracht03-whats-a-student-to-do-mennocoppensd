import './css/style.css';
import { LoginComponent } from './Components';

const login = new LoginComponent();

const appContainer = document.querySelector<HTMLDivElement>('#app')!;

appContainer.appendChild(login.render());

// submit button met click event listener

// voorlopig alles hierin steken
