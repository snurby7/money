import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import { LightningPathRoutes } from './lightning-path.routes';

export const lightningRoutes: RouteProps[] = [
  {
    path: LightningPathRoutes.App,
    exact: true,
    component: lazy(() => import('./pages/app/AppBase')),
  },
  {
    path: LightningPathRoutes.BudgetHome,
    exact: false,
    component: lazy(() => import('./pages/budget-home/BudgetHome')),
  },
];
