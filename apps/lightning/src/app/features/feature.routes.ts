import { baseRoute } from './base';
import { loginRoutes } from './login';

export const featureRoutes = [...baseRoute, ...loginRoutes];
