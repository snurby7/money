import { Button, Container, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const CallToActionBase = () => {
  return (
    <Container height={'100%'}>
      <Heading>Start caring about your finances</Heading>
      <div>here is some content</div>
      <div>
        <Link to={'/sign-up'}>
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
