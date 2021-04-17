import { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { baseRoute } from './features/base';
import { signUpRoutes } from './features/sign-up';

const appRoutes = [...baseRoute, ...signUpRoutes];

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {appRoutes.map(({ component, path, exact }) => (
            <Route
              key={path.toString()}
              exact={exact}
              path={path}
              component={component}
            />
          ))}
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
