import { extendTheme } from '@chakra-ui/react';
import { config } from './config';

export const theme = extendTheme({
  config,
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      'body, input, select, button, textarea': {
        fontFamily: 'Roboto, sans-serif',
        fontSize: 'md',
        fontWeight: 'normal',
      },

      body: {
        bg: 'gray.700',
        color: 'blue.50',
      },
    },
  },
});
