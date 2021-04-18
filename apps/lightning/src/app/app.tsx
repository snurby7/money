import { ChakraProvider } from '@chakra-ui/react';
import styled from '@emotion/styled';
import AppRoutes from './routes/app.routes';

export function App() {
  return (
    <ChakraProvider>
      <AppRoutes />
    </ChakraProvider>
  );
}

export default App;
