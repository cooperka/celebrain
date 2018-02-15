import MainBody from './components/MainBody';
import About from './components/About';

const routes = [
  {
    path: '/',
    component: MainBody,
    displayName: 'Home',
  },
  {
    path: '/about',
    component: About,
    displayName: 'About',
  },
];

export default routes;
