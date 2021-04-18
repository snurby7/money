import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';

const Auth0Button: React.FC = ({ children }) => {
  const { loginWithRedirect, logout, user } = useAuth0();

  const onClick = () => {
    if (user) {
      logout();
    } else {
      loginWithRedirect({});
    }
  };

  return (
    <Button mt={4} onClick={onClick} type="submit" colorScheme="orange">
      {children}
    </Button>
  );
};

export default Auth0Button;
