import { useEffect, useState } from 'react';
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
  Text,
  InputGroup,
  Flex,
  Button,
  Grid,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import { Session } from '../../Navigation';
import { ClientData, NewRepair } from '../helpers/types';
import { AddClient } from '../components/AddRepair/AddClient/AddClient';
import AddProduct from '../components/AddRepair/AddProduct';
import AddDetails from '../components/AddRepair/AddDetails';
import AddSpares from '../components/AddRepair/AddSpares';
import { CheckIcon } from '@chakra-ui/icons';
import { ManageRepairs } from '../components/ManageRepairs/ManageRepairs';
import ManageProducts from '../components/ManageProducts/ManageProducts';

type Props = {
  session: Session;
  setSession: React.Dispatch<React.SetStateAction<Session>>;
};

export const initialRepairState = {
  dni: '12344321',
  nombre: '',
  apellido: '',
  telefono: '',
  direccion: '',
  email: '',
  cuit_fabricante: '',
  nombre_comercial: '',
  id_categoria: '',
  nombre_categoria: '',
  modelo: '',
  numero_serie: '',
  garantia: '',
  desperfecto: '',
  step: '0',
  isNewClient: 'no',
};

export function AtencionAlCliente(props: Props) {
  const [newRepair, setNewRepair] = useState<NewRepair>(initialRepairState);

  const [clientData, setClientData] = useState<ClientData>({
    loading: false,
    error: null,
    data: null,
  });

  const borderColor = useColorModeValue('black !important', 'white !important');

  useEffect(() => {
    console.log(clientData);
  }, [clientData]);

  return (
    <>
      <Box
        w={{ sm: 350, md: 400, lg: '100%' }}
        borderRadius="lg"
        mt="10px"
        textAlign="center"
        bg={useColorModeValue('#eedfdfe1', '#111d')}
      >
        <Tabs isFitted variant="enclosed" padding="1px">
          <TabList borderColor={borderColor} borderBottomColor={borderColor} fontSize="1.1em">
            <Tab _focus={{ boxShadow: '0 0 0' }} fontSize="1.1em" fontWeight={700}>
              Agregar Reparacion
            </Tab>
            {false && (
              <Tab _focus={{ boxShadow: '0 0 0' }} fontSize="1.1em" fontWeight={700}>
                Gestionar Clientes
              </Tab>
            )}
            <Tab _focus={{ boxShadow: '0 0 0' }} fontSize="1.1em" fontWeight={700}>
              Gestionar Productos
            </Tab>
            <Tab _focus={{ boxShadow: '0 0 0' }} fontSize="1.1em" fontWeight={700}>
              Gestionar Reparaciones
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel minH="500px">
              <Accordion index={parseInt(newRepair.step)} allowMultiple>
                <AccordionItem>
                  <AccordionButton _focus={{ boxShadow: '0' }} cursor="default">
                    <Box flex="1" textAlign="left" ml="40%">
                      <Text fontSize="1.1em" fontWeight={600}>
                        Paso 1 - Asignar Cliente
                        {parseInt(newRepair.step) > 0 && (
                          <CheckIcon ml="20px" color="#6F6C" w="24px" h="24px" />
                        )}
                      </Text>
                    </Box>
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <AddClient
                      clientData={clientData}
                      setClientData={setClientData}
                      newRepair={newRepair}
                      setNewRepair={setNewRepair}
                    />
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton _focus={{ boxShadow: '0' }} cursor="default">
                    <Box flex="1" textAlign="left" ml="40%">
                      <Text fontSize="1.1em" fontWeight={600}>
                        Paso 2 - Asignar Producto
                        {parseInt(newRepair.step) > 1 && (
                          <CheckIcon ml="20px" color="#6F6C" w="24px" h="24px" />
                        )}
                      </Text>
                    </Box>
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <AddProduct
                      newRepair={newRepair}
                      setNewRepair={setNewRepair}
                      token={props.session.token}
                    />
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton _focus={{ boxShadow: '0' }} cursor="default">
                    <Box flex="1" textAlign="left" ml="40%">
                      <Text fontSize="1.1em" fontWeight={600}>
                        Paso 3 - Cargar Detalles
                      </Text>
                    </Box>
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <AddDetails
                      session={props.session}
                      clientData={clientData}
                      setClientData={setClientData}
                      newRepair={newRepair}
                      setNewRepair={setNewRepair}
                    />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </TabPanel>

            {false && (
              <TabPanel minH="500px">
                <Accordion>
                  <AccordionItem>
                    <AccordionButton _focus={{ boxShadow: '0' }} cursor="default">
                      <Box flex="1" textAlign="left" ml="40%">
                        <Text fontSize="1.1em" fontWeight={600}>
                          Paso 4 - Cargar Repuestos
                        </Text>
                      </Box>
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <AddSpares newRepair={newRepair} setNewRepair={setNewRepair} />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </TabPanel>
            )}
            <TabPanel minH="500px">
              <ManageProducts token={props.session.token} />
            </TabPanel>
            <TabPanel minH="500px">
              <ManageRepairs />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
