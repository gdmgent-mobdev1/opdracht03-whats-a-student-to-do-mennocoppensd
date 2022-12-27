import './css/styles.css';

import { LoginComponent } from './Components';

const login = new LoginComponent();

const appContainer = document.querySelector<HTMLDivElement>('#app')!;

appContainer.appendChild(login.render());

$('.message a').click(() => {
  $('form').animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
});

// submit button met click event listener

// voorlopig alles hierin steken
