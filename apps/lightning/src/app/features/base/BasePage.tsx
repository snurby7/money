import { Flex } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import ProductOverview from './components/ProductOverview';

const LandingPage: React.FC = (): JSX.Element => {
  return (
    <Flex direction="column">
      <NavBar />
      <ProductOverview />
    </Flex>
  );
};

export default LandingPage;
