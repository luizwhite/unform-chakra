import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Flex,
  FormLabel,
  Text as ChakraText,
  useTheme,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface FileInputProps {
  name: string;
  cleared?: boolean;
  isInvalidFile: boolean | undefined;
  setIsInvalidFile: Dispatch<SetStateAction<boolean>> | undefined;
  $ref: RefObject<HTMLInputElement>;
}

interface Document {
  blob: string;
  file: {
    lastModified: number;
    name: string;
    size: number;
    type: string;
  };
}

export const FileInput: React.FC<FileInputProps> = ({
  name,
  $ref,
  isInvalidFile,
  setIsInvalidFile,
  cleared = false,
}) => {
  const [doc, setDoc] = useState<Document | null>(null);

  const handleDocumentChange = useCallback(({ target }) => {
    setDoc({
      blob: window.URL.createObjectURL(target.files[0]),
      file: target.files[0],
    });
    console.log({
      blob: window.URL.createObjectURL(target.files[0]),
      file: target.files[0],
    });
  }, []);

  useEffect(() => {
    if (doc && setIsInvalidFile) setIsInvalidFile(false);
  }, [doc]);

  useEffect(() => {
    if (cleared) {
      setDoc(null);
      setIsInvalidFile && setIsInvalidFile(false);
    }
  }, [cleared]);

  const { colors } = useTheme();

  return (
    <>
      <ChakraText mt={3} mb={2} fontWeight="medium">
        Selecione seu documento:
      </ChakraText>
      <FormLabel mr="auto" d="inline-flex" mb={2} alignItems="center">
        <Flex
          cursor="pointer"
          justify="center"
          align="center"
          _hover={{
            bg: 'blue.700',
            boxShadow: `inset 0 0 0 2px ${colors.blue[700]}`,
          }}
          _active={{
            bg: 'blue.400',
            boxShadow: `inset 0 0 0 2px ${colors.blue[400]}`,
          }}
          borderRadius={5}
          boxShadow={
            !isInvalidFile
              ? `inset 0 0 0 2px ${colors.gray[700]}`
              : `inset 0 0 0 3px ${colors.red[400]}`
          }
          p={5}
          boxSize={6}
        >
          <SearchIcon />
        </Flex>
      </FormLabel>
      <input
        onChange={handleDocumentChange}
        type="file"
        style={{ display: 'none' }}
        id={name}
        ref={$ref}
      />
      {doc?.file?.name && (
        <ChakraText as="i" d="block" fontSize="xs" mb={3} fontWeight="medium">
          {doc.file.name}
        </ChakraText>
      )}
      {isInvalidFile && (
        <ChakraText
          color="red.400"
          as="i"
          d="block"
          fontSize="xs"
          mb={3}
          fontWeight="medium"
        >
          Documento não foi selecionado!
        </ChakraText>
      )}
    </>
  );
};
