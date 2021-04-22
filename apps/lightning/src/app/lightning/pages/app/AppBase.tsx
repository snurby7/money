import { Button, Center, Flex, StackDivider, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useObservable } from '../../../hooks';
import { budgetService } from '../../service/budget.service';
import AddBudgetModal from './components/AddBudgetModal';
import BudgetTile from './components/BudgetTile';

const AppBase = () => {
  const [isAddBudgetModalOpen, setIsAddBudgetModalOpen] = useState(false);
  const [initialLoadAttempt, setInitialLoadAttempt] = useState(false);
  const budgets = useObservable(budgetService.budgets, []);

  const refreshBudgetList = () => {
    budgetService.loadBudgets();
  };

  useEffect(() => {
    if (!initialLoadAttempt) {
      refreshBudgetList();
      setInitialLoadAttempt(true);
    }
  }, [initialLoadAttempt]);

  return (
    <Center mt={12}>
      <Flex direction="column">
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          {budgets.map((budget) => (
            <BudgetTile key={budget.id} budget={budget} />
          ))}
        </VStack>
        <Button
          mt="4"
          width="100%"
          onClick={() => {
            setIsAddBudgetModalOpen(true);
          }}
        >
          Add new budget
        </Button>
        <AddBudgetModal
          isOpen={isAddBudgetModalOpen}
          onClose={() => {
            refreshBudgetList();
            setIsAddBudgetModalOpen(false);
          }}
        />
      </Flex>
    </Center>
  );
};

export default AppBase;
