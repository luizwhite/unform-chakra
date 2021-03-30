import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

type ButtonProps = ChakraButtonProps;

export const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <ChakraButton
      size="lg"
      fontSize="md"
      color="white"
      colorScheme="blue"
      {...rest}
    >
      {children}
    </ChakraButton>
  );
};
