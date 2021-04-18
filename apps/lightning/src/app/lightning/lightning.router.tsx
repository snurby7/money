import { Route, Switch } from 'react-router-dom';
import { lightningRoutes } from './lightning.routes';

const LightningRouter = () => {
  return (
    <Switch>
      {lightningRoutes.map((routeProps) => (
        <Route key={routeProps.path.toString()} {...routeProps} />
      ))}
    </Switch>
  );
};
export default LightningRouter;
