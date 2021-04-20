import { Button } from '@chakra-ui/react';
import { IBudget } from '@snurbco/contracts';
import { useEffect } from 'react';
import { from } from 'rxjs';
import { useRouter } from '../../../routes/useRouter';
import { LightningPathRoutes } from '../../lightning-path.routes';
import { budgetService } from '../../service/budget.service';

const AppBase = () => {
  const router = useRouter();
  useEffect(() => {
    from(budgetService.loadBudgets()).subscribe({
      next: (budgets: IBudget[]) => {
        console.log('here are the budgets', budgets);
      },
    });
  }, []);

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
