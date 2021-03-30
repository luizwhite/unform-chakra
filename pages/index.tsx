import Head from 'next/head';
import { Divider, Flex, Heading, VStack, IconButton } from '@chakra-ui/react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { FiMail, FiUser, FiLock, FiPhone, FiHome } from 'react-icons/fi';

import { Input } from '../components/Form/Input';
import { Button } from '../components/Button';

type FormData = {
  name: string;
  email: string;
  document: File[];
  'phone-number': string;
  address: string;
  password: string;
};

let countdownTimeout: NodeJS.Timeout;

const Home: React.FC = () => {
  const formRef = useRef<FormHandles & HTMLDivElement>(null);
  const [inputClear, setInputClear] = useState(false);
  const [isInvalidFile, setIsInvalidFile] = useState(false);

  const handleSubmit = useCallback(
    async (myData: FormData & FormEvent<HTMLDivElement>) => {
      if (!myData.document) {
        console.log('No document!');
        setIsInvalidFile(true);
        return;
      }

      console.log(myData);
    },
    [],
  );

  const handleReset = useCallback(() => {
    setInputClear(true);
  }, []);

  const cleanUp = useCallback(() => {
    clearTimeout(countdownTimeout);
  }, []);

  useEffect(() => {
    if (inputClear) {
      countdownTimeout = setTimeout(() => {
        setInputClear(false);
        clearTimeout(countdownTimeout);
      }, 200);
    }

    return cleanUp;
  }, [inputClear]);

  return (
    <>
      <Head>
        <title>unform chakra</title>
      </Head>

      <Flex
        w="100vw"
        h="calc(100vh + calc(100% - 100vh))"
        align="center"
        justify="center"
      >
        <Flex
          as={Form}
          w="full"
          my={8}
          maxWidth={450}
          padding={8}
          bg="gray.800"
          flexDir="column"
          borderRadius={8}
          shadow="0 0 20px rgba(0, 0, 0, 0.05)"
          ref={formRef}
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <Flex w="100%" align="center" justifyContent="space-between">
            <Heading textTransform="uppercase" size="md">
              Cadastro
            </Heading>
            <IconButton
              color="blue.700"
              borderColor="blue.700"
              variant="outline"
              boxSize={7}
              minW={7}
              border="2px"
              _focus={{ boxShadow: 'none' }}
              _hover={{ color: 'blue.500', borderColor: 'blue.500' }}
              _active={{ bg: 'blue.300' }}
              type="reset"
              aria-label="Limpar formulário"
              icon={<DeleteIcon />}
            />
          </Flex>

          <Divider borderColor="gray.500" my={6} />

          <VStack spacing={5}>
            <Input
              required
              cleared={inputClear}
              icon={FiUser}
              label="Nome:"
              name="name"
              type="text"
              pattern="^\s?[a-zA-Z\u00C0-\u017F]+(\s[a-zA-Z\u00C0-\u017F]+)*\s?$"
              title="Nome"
            />
            <Input
              required
              cleared={inputClear}
              icon={FiMail}
              label="E-mail:"
              name="email"
              type="email"
              pattern="^[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              placeholder="exemplo@dominio.com"
              title="E-mail: exemplo@dominio.com"
              helperText="Nós nunca iremos divulgar seu e-mail"
            />
            <Input
              required
              cleared={inputClear}
              name="document"
              type="file"
              isInvalidFile={isInvalidFile}
              setIsInvalidFile={setIsInvalidFile}
              accept="application/pdf"
            />
            <Input
              required
              cleared={inputClear}
              icon={FiPhone}
              label="Telefone:"
              name="phone-number"
              type="tel"
              pattern="^(\+\d{1,2})?(\s\(\d{2}\)\s?|[\s.-]?\d{2}[\s.-]?)\d{4,5}[\s.-]?\d{4}$"
              placeholder="(11) 99999-9999"
              title="Tel: (11) 99999-9999"
            />
            <Input
              required
              cleared={inputClear}
              icon={FiHome}
              label="Endereço:"
              name="address"
              type="text"
              pattern="[a-zA-Z]{3,}\s[a-zA-Z]{3,}"
              placeholder="Rua Tal, 999 - Jd. do Bosque"
              title="Endereço"
            />
            <Input
              required
              cleared={inputClear}
              icon={FiLock}
              label="Senha:"
              name="password"
              type="password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
              title="Senha: 1 (ou +) letra minúscula, 1 (ou +) letra maiúscula, 1 (ou +) dígito e 1 (ou +) caractere especial"
            />
          </VStack>

          <Button
            _hover={{ bg: 'blue.700' }}
            bg="blue.500"
            type="submit"
            mt="8"
          >
            Cadastrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
