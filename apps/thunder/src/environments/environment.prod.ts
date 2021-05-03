import { auth0Secrets } from './auth0.secrets';

export const environment = {
  production: true,
  ...auth0Secrets,
};
