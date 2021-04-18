import { Auth0Provider } from '@auth0/auth0-react';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/app';

ReactDOM.render(
  <StrictMode>
    <Auth0Provider
      domain={process.env.NX_AUTH0_DOMAIN as string}
      clientId={process.env.NX_AUTH0_CLIENT_ID as string}
      redirectUri={`${window.location.origin}/app`}
      audience="https://mammoth.api.com"
      cacheLocation="localstorage"
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
  document.getElementById('root')
);
