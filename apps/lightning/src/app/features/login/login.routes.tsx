import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import { LightningRoutePath } from '../feature-path.routes';

export const loginRoutes: RouteProps[] = [
  {
    path: LightningRoutePath.Login,
    component: lazy(() => import('./LoginPage')),
  },
];
