import { LazyExoticComponent } from 'react';

export interface AppRoute {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: LazyExoticComponent<any>;
}
