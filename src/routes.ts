import { RouteConfig } from 'react-router-config';

import { lazyLoad, Layout } from 'components/shared';

const Home = lazyLoad(() => import('pages/Home'));
const NotFound = lazyLoad(() => import('pages/NotFound'));

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
