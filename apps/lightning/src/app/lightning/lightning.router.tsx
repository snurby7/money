import { Switch } from 'react-router-dom';
import { AuthenticatedRoute } from '../auth/AuthenticatedRoute';
import { lightningRoutes } from './lightning.routes';

const LightningRouter = () => {
  return (
    <Switch>
      {lightningRoutes.map((routeProps) => (
        <AuthenticatedRoute key={routeProps.path.toString()} {...routeProps} />
      ))}
    </Switch>
  );
};
export default LightningRouter;
