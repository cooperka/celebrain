import MainBody from './components/MainBody';
import Game from './components/Game';
import About from './components/About';

const routes = [
  {
    path: '/',
    component: MainBody,
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
