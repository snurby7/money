import { ChakraProvider } from '@chakra-ui/react';
import styled from '@emotion/styled';
import AppRoutes from './app.routes';

const StyledMain = styled.main`
  background-color: #f5f5f5;
`;

export function App() {
  return (
    <ChakraProvider>
      <StyledMain>
        <AppRoutes />
      </StyledMain>
    </ChakraProvider>
  );
}

export default App;
