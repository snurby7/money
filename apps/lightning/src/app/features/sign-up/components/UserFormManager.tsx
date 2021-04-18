import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const UserFormManager = () => {
  const [userType, setUserType] = useState<'Existing' | 'New'>('Existing');

  return (
    <Container>
      <Box>
        <Heading size="xl" m="2">
          Tell us more about you...
        </Heading>
        <Wrap mb="2">
          <WrapItem>
            <Button
              onClick={() => setUserType('New')}
              isActive={userType === 'New'}
            >
              New User
            </Button>
          </WrapItem>
          <WrapItem>
            <Button
              onClick={() => setUserType('Existing')}
              isActive={userType === 'Existing'}
            >
              Existing User
            </Button>
          </WrapItem>
        </Wrap>
      </Box>
      <Divider m="2" orientation="horizontal" />{' '}
      {userType === 'Existing' ? <SignInForm /> : <SignUpForm />}
    </Container>
  );
};

export default UserFormManager;
