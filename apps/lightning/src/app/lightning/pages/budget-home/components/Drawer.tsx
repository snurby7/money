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
  Icon,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineRightSquare } from 'react-icons/ai';
import { BsCardList, BsLightning } from 'react-icons/bs';
import { RiBankFill, RiLineChartLine } from 'react-icons/ri';

const NavigationDrawer: React.FC = () => {
  const [isNavigationDrawerOpen, setIsNavigationDrawerOpen] = useState(false);
  const toggleNavigationDrawer = () => {
    setIsNavigationDrawerOpen(!isNavigationDrawerOpen);
  };

  return (
    <>
      {!isNavigationDrawerOpen && (
        <Flex direction="column" mr={4} bg="purple.300">
          <VStack flexGrow={1} spacing={4}>
            <Box>
              <Button
                variant="ghost"
                leftIcon={<Icon as={BsLightning} w={6} h={6} />}
              >
                {/* Settings eventually */}
              </Button>
            </Box>
            <Box>
              <Button
                variant="ghost"
                leftIcon={<Icon as={BsCardList} w={6} h={6} />}
              >
                {/* Budget */}
              </Button>
            </Box>
            <Box>
              <Button
                variant="ghost"
                leftIcon={<Icon as={RiLineChartLine} w={6} h={6} />}
              >
                {/* Reports */}
              </Button>
            </Box>
            <Box>
              <Button
                variant="ghost"
                leftIcon={<Icon as={RiBankFill} w={6} h={6} />}
              >
                {/* All Accounts */}
              </Button>
              {/* All Accounts */}
            </Box>
            <Box>
              <Button variant="ghost" onClick={toggleNavigationDrawer}>
                {/* Open Drawer */}
                <Icon as={AiOutlineRightSquare} w={6} h={6} />
              </Button>
            </Box>
          </VStack>
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
};
export default NavigationDrawer;
