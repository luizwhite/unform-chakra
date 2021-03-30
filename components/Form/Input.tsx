import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import {
  FormControl as ChakraFormControl,
  FormLabel as ChakraFormLabel,
  FormHelperText as ChakraFormHelperText,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup as ChakraInputGroup,
  InputLeftElement as ChakraInputLeftElement,
  Icon as ChakraIcon,
} from '@chakra-ui/react';
import { IconBaseProps as IconProps } from 'react-icons';
import { useField } from '@unform/core';

import { FileInput } from './Input/FileInput';

type InputProps = {
  name: string;
  type: string;
  label?: string;
  cleared?: boolean;
  helperText?: string;
  required?: boolean;
  isInvalidFile?: boolean;
  setIsInvalidFile?: Dispatch<SetStateAction<boolean>>;
  icon?: React.ComponentType<IconProps>;
} & ChakraInputProps;

export const Input: React.FC<InputProps> = ({
  name,
  type,
  label,
  pattern,
  helperText,
  cleared = false,
  required: isRequired,
  isInvalidFile,
  setIsInvalidFile,
  icon: Icon,
  ...rest
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFilled, setIsFilled] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputBlur = useCallback(() => {
    setIsFilled(!!inputRef.current?.value);

    if (!!pattern) {
      const myRegex = new RegExp(pattern);
      setIsInvalid(
        !!inputRef.current &&
          !(inputRef.current.value === null || inputRef.current.value === '') &&
          !myRegex.test(inputRef.current.value),
      );
    }
  }, []);

  useEffect(() => {
    if (name !== 'document')
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
      });
    else
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'files[0]',
      });
  }, [fieldName, registerField]);

  useEffect(() => {
    if (cleared) {
      setIsFilled(false);
      setIsInvalid(false);
    }
  }, [cleared]);

  const inputProps = {
    border: '2px',
    borderColor: 'gray.700',
    errorBorderColor: 'red.400',
    size: 'lg',
    id: name,
    type,
    pattern,
    ref: inputRef,
    onBlur: handleInputBlur,
    _hover: {
      borderColor: 'gray.400',
    },
  };

  return (
    <ChakraFormControl
      id={name}
      {...(isRequired && { isRequired })}
      {...(isInvalid && { isInvalid })}
    >
      {!!label && <ChakraFormLabel>{label}</ChakraFormLabel>}
      {!!Icon && type !== 'file' ? (
        <ChakraInputGroup>
          <ChakraInputLeftElement
            h="100%"
            pointerEvents="none"
            children={
              <ChakraIcon
                color={isFilled ? 'blue.400' : 'gray.600'}
                as={Icon}
                boxSize={6}
              />
            }
          />
          <ChakraInput {...inputProps} {...rest} />
        </ChakraInputGroup>
      ) : type === 'file' ? (
        <FileInput
          $ref={inputRef}
          name={name}
          isInvalidFile={isInvalidFile}
          setIsInvalidFile={setIsInvalidFile}
          cleared={cleared}
        />
      ) : (
        <ChakraInput {...inputProps} {...rest} />
      )}
      {!!helperText && (
        <ChakraFormHelperText mt={1}>{helperText}</ChakraFormHelperText>
      )}
    </ChakraFormControl>
  );
};
