import { RouteConfig } from 'react-router-config';

import { withLazy, Layout } from './components/shared';

const Home = withLazy(() => import('./pages/Home'));

const NotFound = withLazy(() => import('./pages/NotFound'));

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Layout,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        component: NotFound
      }
    ]
  },
  {
    component: NotFound
  }
];

export default routes;
