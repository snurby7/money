import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

export const baseRoute: RouteProps[] = [
  {
    path: '',
    component: lazy(() => import('./BasePage')),
  },
];
