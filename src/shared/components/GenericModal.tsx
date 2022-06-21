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
import FloatingInputGeneric, {
  InputConfig,
  isValidExpression,
} from '../../shared/components/FloatingInputGeneric';

export type FormError = Record<string, boolean>;
export type Form = Record<string, string>;

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
  disclosure: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
    getButtonProps: (props?: any) => any;
    getDisclosureProps: (props?: any) => any;
  };
  token: string;
};

type FormConfig = {
  [key: string]: InputConfig;
  nombre_categoria: InputConfig;
};

const formConfig: FormConfig = {
  nombre_categoria: {
    label: 'Nombre',
    name: 'nombre_categoria',
    type: 'string',
    min: 1,
    max: 30,
    isRequired: true,
    isReadOnly: false,
  },
};

export function GenericModal(props: Props) {
  const { isOpen, onOpen, onClose } = props.disclosure;
  const [formError, setFormError] = useState<FormError>({ nombre_categoria: false });
  const [form, setForm] = useState<Form>({ nombre_categoria: '' });
  const cancelRef = useRef(null);
  const [confirmationData, setConfirmationData] = useState<Response>({
    loading: false,
    error: null,
    data: null,
  });

  const altaCategoria = async () => {
    let isValid = true;

    for (const key in formConfig) {
      if (formConfig[key].isRequired) {
        const isValidExp = isValidExpression(
          form[key],
          formConfig[key].type,
          formConfig[key].min,
          formConfig[key].max,
        );

        if (!isValidExp) {
          setFormError((last) => {
            return {
              ...last,
              [key]: true,
            };
          });
          isValid = false;
        }
      }
    }
    if (isValid) {
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
    }
  };

  const closeOnSuccess = () => {
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
                  Crear Nueva Categoria
                </AlertDialogHeader>

                <AlertDialogBody>
                  <FloatingInputGeneric
                    inputConfig={formConfig.nombre_categoria}
                    formError={formError}
                    setFormError={setFormError}
                    form={form}
                    setForm={setForm}
                  />
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button colorScheme="red" ref={cancelRef} onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button colorScheme="green" onClick={altaCategoria} ml={3}>
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
                  <Text fontSize="1.3em">Alta de Categoria Confirmada con Exito!</Text>
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
                  <Text fontSize="0.95em" my="5px" textAlign="center"></Text>
                  <Text fontSize="0.9em" my="5px" textAlign="center"></Text>
                  <Text fontSize="1em" mt="25px" textAlign="center"></Text>
                  <Text fontSize="1em" my="5px" textAlign="center"></Text>
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
                  <Text fontSize="1.3em">Hubo un Error en el Alta de Categoria</Text>
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
