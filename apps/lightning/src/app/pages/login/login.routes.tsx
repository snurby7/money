import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import { FeatureRoutePath } from '../feature-path.routes';

export const loginRoutes: RouteProps[] = [
  {
    path: FeatureRoutePath.Login,
    component: lazy(() => import('./LoginPage')),
  },
];
