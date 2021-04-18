import { loginRoutes } from './login';
import { baseRoute } from './root';

export const featureRoutes = [...baseRoute, ...loginRoutes];
