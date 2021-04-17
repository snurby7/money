import { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { baseRoute } from './features/base';

const appRoutes = [...baseRoute];

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {appRoutes.map(({ component, path }) => (
            <Route
              key={path.toString()}
              exact
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
