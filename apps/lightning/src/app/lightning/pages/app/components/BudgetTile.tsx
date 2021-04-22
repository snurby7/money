import { Box, Button, ButtonGroup, Text } from '@chakra-ui/react';
import { IBudget } from '@snurbco/contracts';
import { useRouter } from '../../../../routes/useRouter';
import { LightningPathRoutes } from '../../../lightning-path.routes';
import { budgetService } from '../../../service/budget.service';

interface BudgetTileProps {
  budget: IBudget;
}
const BudgetTile = ({ budget }: BudgetTileProps) => {
  const router = useRouter();
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Text fontSize="xl">{budget.name}</Text>
      <Text fontSize="sm">Created: {budget.createdDate}</Text>
      <ButtonGroup spacing="4">
        <Button
          colorScheme="purple"
          mt={4}
          width="100%"
          onClick={() =>
            router.navigateTo(LightningPathRoutes.BudgetHome, {
              budgetId: budget.id,
            })
          }
        >
          Select
        </Button>
        <Button
          colorScheme="red"
          mt={4}
          width="100%"
          onClick={() => budgetService.deleteBudget(budget.id)}
        >
          Delete
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default BudgetTile;
