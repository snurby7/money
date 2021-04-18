import { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { featureRoutes } from '../features/feature.routes';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {featureRoutes.map(({ component, path, exact }) => (
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
