import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react';

const NavBar = () => (
  <Flex p="4" grow={1}>
    <Box>
      <Heading size="md">Lightning</Heading>
    </Box>
    <Spacer />
    <Box>
      <Button mr="4">Features</Button>
      <Button>Log in</Button>
    </Box>
  </Flex>
);

export default NavBar;
