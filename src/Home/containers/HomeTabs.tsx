import { useState } from 'react';
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
  Button,
  Grid,
  useDisclosure,
  RadioGroup,
  Stack,
  Radio,
  FormErrorMessage,
} from '@chakra-ui/react';
import { RepairsModal } from './RepairsModal';
import { Session } from '../../Navigation';

export type Data = {
  loading: boolean;
  error: null | unknown;
  data: RepairsData[];
};

export type RepairsData = {
  dni_cliente: string;
  estado: string;
  id_producto: string;
  id_reparacion: string;
};

type Props = {
  session: Session;
  setSession: React.Dispatch<React.SetStateAction<Session>>;
};

export function HomeTabs(props: Props) {
  const [repairs, setRepairs] = useState<Data>({ loading: false, error: null, data: [] });
  const [datoBuscado, setDatoBuscado] = useState('');
  const [user, setUser] = useState('atencion_al_cliente@reparaciones_solari.com');
  const [password, setPassword] = useState('123456');

  const iniciarSesion = async () => {
    try {
      const resp = await fetch(`http://localhost/reparaciones/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario: user, password: password }),
      });
      const data = await resp.json();
      if (data.status === 'ok') {
        props.setSession({
          token: data.result.token,
          role: data.result.role,
          logged: true,
          error: '',
        });
      } else {
        props.setSession({
          token: '',
          role: '',
          logged: false,
          error: data.result.error_msg,
        });
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const buscarConDni = async () => {
    if (datoBuscado) {
      setRepairs({
        loading: true,
        error: null,
        data: [],
      });

      try {
        const resp = await fetch(
          `http://localhost/reparaciones/reparaciones?${searchBy}=${datoBuscado}`,
        );
        const data = await resp.json();
        setRepairs({
          loading: false,
          error: null,
          data: data,
        });
        console.log(data);
        disclosure.onOpen();
      } catch (error) {
        console.log(error);
        setRepairs({
          loading: false,
          error: error,
          data: [],
        });
      }
    }
  };

  const userOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const passwordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const buscarOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatoBuscado(e.target.value);
  };

  const disclosure = useDisclosure();

  const borderColor = useColorModeValue('black !important', 'white !important');
  const [searchBy, setSearchBy] = useState('dni_cliente');
  return (
    <Container>
      <Box
        w={{ sm: 350, md: 400, lg: 500 }}
        borderRadius="lg"
        mt="70px"
        textAlign="center"
        bg={useColorModeValue('#eedfdfe1', '#111d')}
      >
        <Tabs isFitted variant="enclosed" padding="1px">
          <TabList
            borderColor={borderColor}
            borderBottomColor={borderColor}
            mb="1em"
            fontSize="1.2em"
          >
            <Tab _focus={{ boxShadow: '0 0 0' }} fontSize="1.1em" fontWeight={700}>
              Clientes
            </Tab>
            <Tab _focus={{ boxShadow: '0 0 0' }} fontSize="1.1em" fontWeight={700}>
              Empleados
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text fontSize="18px" fontWeight={700} mb="12px">
                Buscar Reparaciones
              </Text>
              <RadioGroup mb="18px" onChange={setSearchBy} value={searchBy}>
                <Stack justifyContent="center" direction="row">
                  <Text>Buscar por: </Text>
                  <Radio value="dni_cliente" defaultChecked>
                    Dni
                  </Radio>
                  <Radio value="nro_reparacion">Nro Reparacion</Radio>
                </Stack>
              </RadioGroup>
              <FormControl>
                <Grid templateColumns="1.5fr 2fr 1.5fr" mb="10px" justifyContent="center">
                  <FormLabel alignSelf="center" textAlign="end" m="0 10px" htmlFor="number">
                    {searchBy === 'dni_cliente' ? 'Nro Dni' : 'Nro Reparacion'}:
                  </FormLabel>
                  <Input
                    borderColor={borderColor}
                    onChange={buscarOnChange}
                    value={datoBuscado}
                    autoComplete="off"
                    w="100%"
                    id="dni"
                    type="text"
                  />
                </Grid>
                <Button
                  w="160px"
                  mt={4}
                  colorScheme="teal"
                  type="submit"
                  fontSize="1.1em"
                  fontWeight={700}
                  onClick={buscarConDni}
                >
                  Buscar
                </Button>
                <FormHelperText></FormHelperText>
              </FormControl>
            </TabPanel>
            <TabPanel>
              <InputGroup>
                <FormControl>
                  <Grid templateColumns="1fr 2.4fr .4fr" mb="10px" justifyContent="center">
                    <FormLabel
                      alignSelf="center"
                      textAlign="end"
                      m="0 10px"
                      htmlFor="number"
                      fontWeight={700}
                    >
                      Usuario:
                    </FormLabel>
                    <Input
                      borderColor={borderColor}
                      autoComplete="off"
                      w="100%"
                      id="user"
                      type="text"
                      onChange={userOnChange}
                      value={user}
                    />
                  </Grid>
                  <Grid templateColumns="1fr 2.4fr .4fr" mb="10px" justifyContent="center">
                    <FormLabel
                      alignSelf="center"
                      textAlign="end"
                      m="0 10px"
                      htmlFor="number"
                      fontWeight={700}
                    >
                      Contraseña:
                    </FormLabel>
                    <Input
                      borderColor={borderColor}
                      autoComplete="off"
                      w="100%"
                      id="password"
                      type="password"
                      onChange={passwordOnChange}
                      value={password}
                    />
                  </Grid>
                  <FormControl minH="90px" isInvalid={props.session.error.trim().length !== 0}>
                    <Button
                      w="160px"
                      mt={4}
                      colorScheme="teal"
                      type="submit"
                      fontSize="1.1em"
                      fontWeight={700}
                      onClick={iniciarSesion}
                    >
                      Ingresar
                    </Button>
                    {props.session.error.trim().length !== 0 && (
                      <FormErrorMessage m="10px" justifyContent="center">
                        * {props.session.error}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </FormControl>
              </InputGroup>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <RepairsModal
        disclosure={disclosure}
        state={repairs}
        setState={setRepairs}
        dniBuscado={datoBuscado}
      />
    </Container>
  );
}
