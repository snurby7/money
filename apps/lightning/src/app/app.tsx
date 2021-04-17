import { ChakraProvider } from '@chakra-ui/react';
import AppRoutes from './app.routes';

export function App() {
  return (
    <ChakraProvider>
      <AppRoutes />
    </ChakraProvider>
  );
}

export default App;
