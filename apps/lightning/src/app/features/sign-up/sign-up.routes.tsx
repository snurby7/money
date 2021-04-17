import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

export const signUpRoutes: RouteProps[] = [
  {
    path: '/sign-up',
    component: lazy(() => import('./SignUpPage')),
  },
];
