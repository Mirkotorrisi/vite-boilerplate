import { Dashboard } from './pages/dashboard';
import { LogIn } from './pages/login/index';

const routes = [
  {
    path: '/login',
    component: LogIn,
  },
];

const protectedRoutes = [
  {
    path: '/',
    component: Dashboard,
  },
];

export { routes, protectedRoutes };
