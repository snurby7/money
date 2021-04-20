import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback, useState } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { setAuthorizationToken } from '../lightning/service/axios-instance';
import { useRouter } from '../routes/useRouter';

export const AuthenticatedRoute = (props: RouteProps) => {
  const [isFetchingToken, setIsFetchingToken] = useState(true);
  const {
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    loginWithRedirect,
  } = useAuth0();

  if (isAuthenticated) {
    getAccessTokenSilently().then((token) => {
      setAuthorizationToken(token);
      setIsFetchingToken(false);
    });
  }

  const router = useRouter();
  const authCallback = useCallback(async () => {
    const token = await getAccessTokenSilently();
    setAuthorizationToken(token);
    if (!token) {
      loginWithRedirect({}).then(() => {
        router.push(router.pathname);
      });
    }
    setIsFetchingToken(false);
  }, [getAccessTokenSilently, loginWithRedirect, router]);

  if (!isAuthenticated) {
    authCallback();
  }

  // Hold this while it is either loading or the user has not authenticated yet.
  return (isLoading || !isAuthenticated) && !isFetchingToken ? (
    <div>Loading...</div>
  ) : (
    <Route {...props} />
  );
};
