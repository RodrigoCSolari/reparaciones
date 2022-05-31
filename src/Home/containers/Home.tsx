import {
  Container,
  Box,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Text,
  InputGroup,
  InputLeftAddon,
  Flex,
  Button,
  Grid,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useFetch } from '../../shared/hooks/useFetch';

export function Home() {
  const [state, setState] = useState('');
  const [state2, setState2] = useState({});
  const data = useFetch(state);

  const buscar2 = async () => {
    fetch('https://breakingbadapi.com/api/quote/random')
      .then((resp) => resp.json())
      .then((data) => {
        setState2({
          loading: false,
          error: null,
          data: data,
        });
      });
  };
  const buscar = async () => {
    setState('https://breakingbadapi.com/api/quote/random');
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <Container>
      <Box
        w={{ sm: 350, md: 400, lg: 500 }}
        borderRadius="lg"
        mt="70px"
        textAlign="center"
        bg={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
      >
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Clientes</Tab>
            <Tab>Empleados</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text fontSize="18px" fontWeight={700} mb="24px">
                Buscar Reparaciones
              </Text>
              <FormControl>
                <Grid
                  templateColumns="1fr 2fr 1fr"
                  mb="10px"
                  justifyContent="center"
                >
                  <FormLabel
                    alignSelf="center"
                    textAlign="end"
                    m="0 10px"
                    htmlFor="number"
                  >
                    Dni:
                  </FormLabel>
                  <Input autoComplete="off" w="100%" id="dni" type="number" />
                </Grid>
                <Button
                  w="160px"
                  mt={4}
                  colorScheme="teal"
                  type="submit"
                  onClick={buscar2}
                >
                  Buscar
                </Button>
                <FormHelperText></FormHelperText>
              </FormControl>
            </TabPanel>
            <TabPanel>
              <InputGroup>
                <FormControl>
                  <Grid
                    templateColumns="1fr 2fr .4fr"
                    mb="10px"
                    justifyContent="center"
                  >
                    <FormLabel
                      alignSelf="center"
                      textAlign="end"
                      m="0 10px"
                      htmlFor="number"
                    >
                      Usuario:
                    </FormLabel>
                    <Input autoComplete="off" w="100%" id="user" type="text" />
                  </Grid>
                  <Grid
                    templateColumns="1fr 2fr .4fr"
                    mb="10px"
                    justifyContent="center"
                  >
                    <FormLabel
                      alignSelf="center"
                      textAlign="end"
                      m="0 10px"
                      htmlFor="number"
                    >
                      Contraseña:
                    </FormLabel>
                    <Input
                      autoComplete="off"
                      w="100%"
                      id="password"
                      type="password"
                    />
                  </Grid>
                  <Button w="160px" mt={4} colorScheme="teal" type="submit">
                    Ingresar
                  </Button>
                  <FormHelperText>{JSON.stringify(state2)}</FormHelperText>
                </FormControl>
              </InputGroup>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
