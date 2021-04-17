import { Box, Flex } from '@chakra-ui/react';
import Wallet from '../../../icons/Wallet';
import CallToActionBase from '../components/CallToActionBase';

const ProductOverview = () => {
  return (
    <Flex flexDirection="row" flexBasis={'auto'}>
      <Box flexGrow={1}>
        <CallToActionBase />
      </Box>
      <Box flexGrow={1}>
        <Wallet />
      </Box>
    </Flex>
  );
};

export default ProductOverview;
