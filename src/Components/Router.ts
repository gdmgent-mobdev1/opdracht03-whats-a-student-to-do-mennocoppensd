/**
 * My Router
 */

import Navigo from 'navigo';

const Router: {
  router: Navigo | null,
  getRouter: () => Navigo
} = {
  router: null,
  getRouter() {
    if (!this.router) {
      this.router = new Navigo('/');
    }
    return this.router;
  },
};

export default Router;
