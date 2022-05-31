import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { Main } from './Navigation';
import { theme } from './lib/theme';

export function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme} resetCSS>
        <Main />
      </ChakraProvider>
    </BrowserRouter>
  );
}
