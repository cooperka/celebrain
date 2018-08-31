import Home from './components/Home/component';
import Game from './components/Game/component';
import About from './components/About/component';

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
