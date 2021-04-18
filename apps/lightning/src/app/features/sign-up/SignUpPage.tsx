import { Box, Flex } from '@chakra-ui/react';
import Vault from '../../icons/Vault';
import UserFormManager from './components/UserFormManager';

const SignUpPage = () => {
  return (
    <Flex direction="row" flexBasis="auto">
      <Box height="auto">
        <Vault />
      </Box>
      <Box>
        <UserFormManager />
      </Box>
    </Flex>
  );
};
export default SignUpPage;
