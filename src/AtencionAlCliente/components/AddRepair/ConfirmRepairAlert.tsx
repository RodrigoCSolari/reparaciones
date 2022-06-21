import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Grid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { initialRepairState } from '../../containers/AtencionAlCliente';
import { ClientData, ClientForm, NewRepair } from '../../helpers/types';

export type Response = {
  loading: boolean;
  error: ErrorResponse | null;
  data: DataResponse | null;
};

export type DataResponse = {
  status: string;
  result: {
    ReparacionId: string;
  };
};

export type ErrorResponse = {
  status: string;
  result: {
    error_id: string;
    error_msg: string;
  };
};

type Props = {
  confirmRepairDisclosure: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
    getButtonProps: (props?: any) => any;
    getDisclosureProps: (props?: any) => any;
  };
  clientData: ClientData;
  setClientData: React.Dispatch<React.SetStateAction<ClientData>>;
  newRepair: NewRepair;
  setNewRepair: React.Dispatch<React.SetStateAction<NewRepair>>;
  token: string;
};

export function ConfirmRepairAlert(props: Props) {
  const { isOpen, onOpen, onClose } = props.confirmRepairDisclosure;
  const cancelRef = useRef(null);
  const data = props.clientData.data || [];
  const [confirmationData, setConfirmationData] = useState<Response>({
    loading: false,
    error: null,
    data: null,
  });

  const altaReparacion = async () => {
    try {
      setConfirmationData({
        loading: true,
        error: null,
        data: null,
      });
      const resp = await fetch(`http://localhost/reparaciones/reparaciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...props.newRepair,
          token: props.token,
        }),
      });
      const data = await resp.json();
      setTimeout(() => {
        if (data.status === 'ok') {
          setConfirmationData({
            loading: false,
            error: null,
            data,
          });
        } else {
          setConfirmationData({
            loading: false,
            error: data,
            data: null,
          });
        }
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const closeOnSuccess = () => {
    setConfirmationData({ loading: false, error: null, data: null });
    props.setClientData({
      loading: false,
      error: null,
      data: null,
    });
    props.setNewRepair(initialRepairState);
    setConfirmationData({
      loading: false,
      error: null,
      data: null,
    });
    onClose();
  };

  const closeOnError = () => {
    setConfirmationData({
      loading: false,
      error: null,
      data: null,
    });
    onClose();
  };

  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay backdropFilter="blur(4px)">
          <AlertDialogContent
            border="white solid 4px"
            bg="#151515DB"
            boxShadow="0 0 0px white"
            minW="1000px"
            minH="500px"
          >
            {!confirmationData.data && !confirmationData.error && !confirmationData.loading && (
              <>
                <AlertDialogHeader fontSize="lg" fontWeight="bold" textAlign="center">
                  Confirmar Alta de Reparacion
                </AlertDialogHeader>

                <AlertDialogBody>
                  <Grid templateColumns="1fr 1fr" mx="75px" my="25px">
                    <Text textAlign="start">
                      Cliente:{' '}
                      {data.length > 0
                        ? `${data[0].nombre.toUpperCase()} ${data[0].apellido.toUpperCase()}`
                        : `${props.newRepair.nombre.toUpperCase()} ${props.newRepair.apellido.toUpperCase()}`}
                    </Text>
                    <Text textAlign="start">Dni: {props.newRepair.dni}</Text>
                  </Grid>
                  <Grid templateColumns="1fr 1fr" mx="75px" my="25px">
                    <Text textAlign="start">
                      Direccion:{' '}
                      {data.length > 0
                        ? data[0].direccion.toUpperCase()
                        : props.newRepair.direccion.toUpperCase()}
                    </Text>
                    <Text textAlign="start">
                      Telefono:{' '}
                      {data.length > 0
                        ? data[0].telefono.toUpperCase()
                        : props.newRepair.telefono.toUpperCase()}
                    </Text>
                  </Grid>
                  <Grid templateColumns="1fr 1fr" mx="75px" my="25px">
                    <Text textAlign="start">
                      Email:{' '}
                      {data.length > 0
                        ? data[0].email.toUpperCase()
                        : props.newRepair.email.toUpperCase()}
                    </Text>
                    <Text textAlign="start">
                      Producto:{' '}
                      {`${props.newRepair.nombre_categoria.toUpperCase()} ${props.newRepair.nombre_comercial.toUpperCase()}`}
                    </Text>
                  </Grid>
                  <Grid templateColumns="1fr 1fr" mx="75px" my="25px">
                    <Text textAlign="start">Modelo: {props.newRepair.modelo.toUpperCase()}</Text>
                    <Text textAlign="start">
                      Numero de Serie: {props.newRepair.numero_serie.toUpperCase()}
                    </Text>
                  </Grid>
                  <Grid templateColumns="1fr 1fr" mx="75px" my="25px">
                    <Text textAlign="start">
                      Garantia: {props.newRepair.garantia.toUpperCase()}
                    </Text>
                    <Text textAlign="start">
                      Desperfecto: {props.newRepair.desperfecto.toUpperCase()}
                    </Text>
                  </Grid>
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button colorScheme="red" ref={cancelRef} onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button colorScheme="green" onClick={altaReparacion} ml={3}>
                    Confirmar
                  </Button>
                </AlertDialogFooter>
              </>
            )}
            {confirmationData.loading && (
              <Flex
                w="100%"
                minH="500px"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Spinner
                  alignSelf="center"
                  thickness="8px"
                  speed="0.45s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
                <Text fontWeight="700">Cargando...</Text>
              </Flex>
            )}

            {confirmationData.data && (
              <>
                <AlertDialogHeader fontSize="lg" fontWeight="bold" textAlign="center">
                  <Text fontSize="1.3em">Alta de Reparacion Confirmada con Exito!</Text>
                  <CheckCircleIcon
                    mt="60px"
                    w="100px"
                    h="100px"
                    color="green"
                    borderRadius="full"
                    boxShadow="0 0 8px green"
                  />
                </AlertDialogHeader>
                <AlertDialogBody>
                  <Text fontSize="0.95em" my="5px" textAlign="center">
                    A la reparacion del producto{' '}
                    {`${props.newRepair.nombre_categoria.toUpperCase()} ${props.newRepair.nombre_comercial.toUpperCase()}`}{' '}
                    se le asignado el numero {confirmationData.data.result.ReparacionId}.
                  </Text>
                  <Text fontSize="0.9em" my="5px" textAlign="center">
                    El cliente asociado a dicha reparacion es{' '}
                    {data.length > 0
                      ? `${data[0].nombre.toUpperCase()} ${data[0].apellido.toUpperCase()}`
                      : `${props.newRepair.nombre.toUpperCase()} ${props.newRepair.apellido.toUpperCase()}`}{' '}
                    con Dni {props.newRepair.dni}
                  </Text>
                  <Text fontSize="1em" mt="25px" textAlign="center">
                    Si quiere agregar los repuestos necesarios puede presionar 'Cargar Repuestos'
                  </Text>
                  <Text fontSize="1em" my="5px" textAlign="center">
                    o puede presionar 'Salir' para volver al inicio y cargarlos luego.
                  </Text>
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button colorScheme="red" onClick={closeOnSuccess}>
                    Salir
                  </Button>
                  <Button colorScheme="green" ml={3}>
                    Cargar Repuestos
                  </Button>
                </AlertDialogFooter>
              </>
            )}
            {confirmationData.error && (
              <>
                <AlertDialogHeader fontSize="lg" fontWeight="bold" textAlign="center">
                  <Text fontSize="1.3em">Hubo un Error en el Alta de Reparacion</Text>
                  <WarningIcon
                    mt="60px"
                    w="100px"
                    h="100px"
                    color="red"
                    borderRadius="full"
                    boxShadow="0 0 8px red"
                  />
                </AlertDialogHeader>

                <AlertDialogBody>
                  <Text fontSize="0.95em" my="30" textAlign="center">
                    Los datos no pudieron guardarse y no se pudo asignar un numero de reparacion.
                  </Text>
                  <Text fontSize="1em" my="30" textAlign="center">
                    Presione el boton Salir y vuelva a intentarlo en unos instantes.
                  </Text>
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button colorScheme="red" onClick={closeOnError}>
                    Salir
                  </Button>
                </AlertDialogFooter>
              </>
            )}
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
