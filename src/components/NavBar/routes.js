import Home from '../Home/component';
import Game from '../Game/component';
import About from '../About/component';

// Note: Make sure to also update static.config routes.
const routes = [
  {
    path: '/',
    component: Home,
    displayName: 'Home',
  },
  {
    path: '/game',
    component: Game,
    displayName: 'Play now',
  },
  {
    path: '/about',
    component: About,
    displayName: 'About',
  },
];

export default routes;
