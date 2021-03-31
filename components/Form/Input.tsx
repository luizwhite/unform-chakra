import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  FormControl as ChakraFormControl,
  FormLabel as ChakraFormLabel,
  FormHelperText as ChakraFormHelperText,
  Button as ChakraButton,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup as ChakraInputGroup,
  InputLeftElement as ChakraInputLeftElement,
  InputRightElement as ChakraInputRightElement,
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
  const [passwordShow, setPasswordShow] = useState(false);
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

  const handlePasswordShowToggle = useCallback(() => {
    setPasswordShow(!passwordShow);
  }, [passwordShow]);

  // ▼ Unform register field
  useEffect(() => {
    if (type !== 'file')
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

  // ▼ States cleared when form reset
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
    defaultValue: defaultValue,
    onBlur: handleInputBlur,
    _hover: {
      borderColor: 'gray.400',
    },
  };

  const inputFileProps = {
    $ref: inputRef,
    name,
    isInvalidFile,
    setIsInvalidFile,
    cleared,
  };

  return (
    <ChakraFormControl
      id={name}
      // ▼ When input is required or invalid, set the Chakra Form Control
      {...(isRequired && { isRequired })}
      {...(isInvalid && { isInvalid })}
    >
      {/* ▼ With label */}
      {!!label && <ChakraFormLabel>{label}</ChakraFormLabel>}

      {/* ▼ Not file type input */}
      {type !== 'file' ? (
        <ChakraInputGroup>
          {/* ▼ With Icon */}
          {!!Icon && (
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
          )}
          <ChakraInput
            {...inputProps}
            {...rest}
            {...(type === 'password' && {
              type: passwordShow ? 'text' : 'password',
            })}
          />
          {/* ▼ When password type, puts this right element */}
          {type === 'password' && (
            <ChakraInputRightElement w={20} h="full" px={2}>
              <ChakraButton
                h={7}
                size="lg"
                fontSize="md"
                onClick={handlePasswordShowToggle}
              >
                {passwordShow ? 'Hide' : 'Show'}
              </ChakraButton>
            </ChakraInputRightElement>
          )}
        </ChakraInputGroup>
      ) : (
        type === 'file' && (
          // ▼ File type input
          <FileInput {...inputFileProps} {...rest} />
        )
      )}
      {!!helperText && (
        <ChakraFormHelperText mt={1}>{helperText}</ChakraFormHelperText>
      )}
    </ChakraFormControl>
  );
};
