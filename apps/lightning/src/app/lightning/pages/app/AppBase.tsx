import { Button } from '@chakra-ui/react';
import { useRouter } from '../../../routes/useRouter';
import { LightningPathRoutes } from '../../lightning-path.routes';

const AppBase = () => {
  const router = useRouter();
  return (
    <div>
      Here is the application base
      <Button
        onClick={() =>
          router.navigateTo(LightningPathRoutes.BudgetHome, { budgetId: '123' })
        }
      >
        Click
      </Button>
    </div>
  );
};
export default AppBase;
