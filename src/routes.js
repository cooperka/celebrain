import Home from './components/Home';
import Game from './components/Game';
import About from './components/About';

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
