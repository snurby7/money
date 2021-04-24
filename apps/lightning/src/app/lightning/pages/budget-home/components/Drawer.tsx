import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

function NavigationDrawer() {
  const [isNavigationDrawerOpen, setIsNavigationDrawerOpen] = useState(false);
  const toggleNavigationDrawer = () => {
    setIsNavigationDrawerOpen(!isNavigationDrawerOpen);
  };

  return (
    <>
      {!isNavigationDrawerOpen && (
        <Flex direction="column" width="100px" p={2} mr={4}>
          <VStack flexGrow={1} spacing={4} alignItems="center">
            <Box w="100px" bg="yellow.200">
              Icon
            </Box>
            <Box w="100px" bg="yellow.200">
              Budget
            </Box>
            <Box w="100px" bg="tomato">
              Reports
            </Box>
            <Box w="100px" bg="pink.100">
              All Accounts
            </Box>
          </VStack>
          <Button
            alignSelf="flex-end"
            w="100px"
            onClick={toggleNavigationDrawer}
          >
            Icon
          </Button>
        </Flex>
      )}
      <Drawer
        isOpen={isNavigationDrawerOpen}
        placement="left"
        onClose={toggleNavigationDrawer}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>Content Coming Soon</DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={toggleNavigationDrawer}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
export default NavigationDrawer;
