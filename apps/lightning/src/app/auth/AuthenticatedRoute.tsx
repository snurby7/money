import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useRouter } from '../routes/useRouter';

export const AuthenticatedRoute = (props: RouteProps) => {
  const {
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    loginWithRedirect,
  } = useAuth0();
  const router = useRouter();
  const authCallback = useCallback(async () => {
    const token = await getAccessTokenSilently();
    if (!token) {
      loginWithRedirect({}).then(() => {
        router.push(router.pathname);
      });
    }
  }, [getAccessTokenSilently, loginWithRedirect, router]);

  if (!isAuthenticated) {
    authCallback();
  }
  // Hold this while it is either loading or the user has not authenticated yet.
  return isLoading || !isAuthenticated ? (
    <div>Loading...</div>
  ) : (
    <Route {...props} />
  );
};
