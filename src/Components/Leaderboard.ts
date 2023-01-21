import { DocumentData } from '@firebase/firestore-types';
import Component from '../lib/Component';
import Elements from '../lib/Elements';
import User from './Profile/User';

class LeaderboardComponent extends Component {
  private users: User[] = [];

  constructor() {
    super({
      name: 'leaderboard',
      model: {
        title: 'Leaderboard',
      },
      routerPath: '/leaderboard',
      navigation: true,

    });
  }

  // Change the component's model data
  changeModel(data: DocumentData) {
    if (data) {
      this.model.userData = data;
    }
  }

  // Add a user to the leaderboard
  public addUser(user: User): void {
    this.users.push(user);
  }

  // Award points to a user based on their completed tasks
  public awardPoints(userId: string, points: number): void {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      user.points += points;
    } else {
      console.log(`User with id ${userId} not found on leaderboard.`);
    }
  }

  // Get the current leaderboard rankings
  public getLeaderboard(): User[] {
    return this.users.sort((a, b) => b.points - a.points);
  }

  // Render the leaderboard

  async renderAsync() {
    const { title, userData } = this.model;

    const elements = [
      Elements.createHeader({
        size: 1,
        textContent: title,
        className: 'text-center',
      }),
      Elements.createHeader({
        size: 2,
        textContent: 'Your Position on the Leaderboard',
        className: 'your-projects',
      }),
    ];
    const usersList = document.createElement('div');
    usersList.classList.add('users-list');

    usersList.innerHTML = `
                    <div class="user-info">
                        <img src="" alt="">
                        <div class="user-name">@Mennocoppensd</div>

                    </div>
                    <div class="user-points">25</div>
                `;
    this.componentContainer.appendChild(usersList);
    elements.forEach((element) => this.componentContainer.appendChild(element));

    return this.componentContainer;
  }
}

export default LeaderboardComponent;
