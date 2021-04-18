import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LightningPathRoutes } from '../lightning/lightning-path.routes';
import { featureRoutes } from '../pages/feature.routes';

const LazyLightning = lazy(() => import('../lightning/lightning.router'));

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
          <Route path={LightningPathRoutes.App} component={LazyLightning} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
