import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';

import GlobalStyle from '../styles/globals';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
      <GlobalStyle />
    </>
  );
}

export default MyApp;
