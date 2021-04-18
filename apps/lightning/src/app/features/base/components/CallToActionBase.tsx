import { Button, Container, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { LightningRoutePath } from '../../feature-path.routes';

const CallToActionBase = () => {
  return (
    <Container height={'100%'}>
      <Heading>start caring about your finances</Heading>
      <Text>visuals and insights into your dollars</Text>
      <div>
        <Link to={LightningRoutePath.Login}>
          <Button m="4" backgroundColor="purple" color="white">
            Get Started
          </Button>
        </Link>
        <Button m="4">Find out more</Button>
      </div>
    </Container>
  );
};

export default CallToActionBase;
