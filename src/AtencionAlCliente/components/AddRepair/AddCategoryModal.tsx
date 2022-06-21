import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Checkbox,
  Flex,
  Grid,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import FloatingInputGeneric, {
  InputConfig,
  isValidExpression,
} from '../../../shared/components/FloatingInputGeneric';
import { DataFabricantes } from './AddProduct';

export type Response = {
  loading: boolean;
  error: ErrorResponse | null | unknown;
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

export type FormError = Record<string, boolean>;

export type Form = Record<string, string>;

type FormConfig = {
  [key: string]: InputConfig;
  nombre_categoria: InputConfig;
};

const initialFormErrorState = { nombre_categoria: false };
const initialFormState = { nombre_categoria: '' };

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
  fabricantes: DataFabricantes[];
  setUrlCategorias: React.Dispatch<React.SetStateAction<string>>;
  setUrlCategoriasFabricantes: React.Dispatch<React.SetStateAction<string>>;
};

export function AddCategoryModal(props: Props) {
  const { isOpen, onOpen, onClose } = props.disclosure;
  const [formError, setFormError] = useState<FormError>(initialFormErrorState);
  const [form, setForm] = useState<Form>(initialFormState);
  const [cuits, setCuits] = useState<string[]>([]);
  const [confirmationData, setConfirmationData] = useState<Response>({
    loading: false,
    error: null,
    data: null,
  });
  const cancelRef = useRef(null);

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
        const resp = await fetch(`http://localhost/reparaciones/categorias`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: props.token,
            nombre_categoria: form.nombre_categoria,
            cuits,
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
          props.setUrlCategorias('');
          props.setUrlCategoriasFabricantes('');
          props.setUrlCategorias('http://localhost/reparaciones/categorias');
          props.setUrlCategoriasFabricantes('http://localhost/reparaciones/categorias_fabricantes');
        }, 2000);
      } catch (error) {
        setConfirmationData({
          loading: false,
          error: error,
          data: null,
        });
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
    setCuits([]);
    setForm(initialFormState);
    setFormError(initialFormErrorState);
    onClose();
  };

  const closeOnError = () => {
    setConfirmationData({
      loading: false,
      error: null,
      data: null,
    });
    setCuits([]);
    setForm(initialFormState);
    setFormError(initialFormErrorState);
    onClose();
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (!cuits.some((item) => e.target.value === item)) {
        setCuits((last) => {
          return [...last, e.target.value];
        });
      }
    } else {
      const newCuits = [...cuits];
      const index = newCuits.findIndex((item) => item === e.target.value);
      if (index !== -1) {
        newCuits.splice(index, 1);
        setCuits(newCuits);
      }
    }
  };

  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay backdropFilter="blur(4px)">
          <AlertDialogContent
            border="white solid 4px"
            bg="#151515DB"
            boxShadow="0 0 0px white"
            minW="1300px"
            minH="500px"
          >
            {!confirmationData.data && !confirmationData.error && !confirmationData.loading && (
              <>
                <AlertDialogHeader fontSize="lg" fontWeight="bold" textAlign="center">
                  Crear Nueva Categoria
                </AlertDialogHeader>

                <AlertDialogBody>
                  <Flex mx="30%">
                    <FloatingInputGeneric
                      inputConfig={formConfig.nombre_categoria}
                      formError={formError}
                      setFormError={setFormError}
                      form={form}
                      setForm={setForm}
                    />
                  </Flex>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold" textAlign="center" mt="30px">
                    Asociar Fabricantes
                  </AlertDialogHeader>

                  <Grid templateColumns="repeat(5,1fr)" gap="20px" m="20px">
                    {props.fabricantes.map((item) => (
                      <Checkbox
                        onChange={handleCheck}
                        name={item.nombre_comercial}
                        value={item.cuit}
                        key={item.cuit}
                      >
                        {item.nombre_comercial.toUpperCase()}
                      </Checkbox>
                    ))}
                  </Grid>
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
                </AlertDialogHeader>
                <AlertDialogBody>
                  <Flex justifyContent="center">
                    <CheckCircleIcon
                      mt="100px"
                      w="100px"
                      h="100px"
                      color="green"
                      borderRadius="full"
                      boxShadow="0 0 8px green"
                    />
                  </Flex>
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button colorScheme="red" onClick={closeOnSuccess}>
                    Salir
                  </Button>
                </AlertDialogFooter>
              </>
            )}
            {confirmationData.error && (
              <>
                <AlertDialogHeader fontSize="lg" fontWeight="bold" textAlign="center">
                  <Text fontSize="1.3em">Hubo un Error en el Alta de Categoria</Text>
                  <Flex justifyContent="center">
                    <WarningIcon
                      mt="60px"
                      w="100px"
                      h="100px"
                      color="red"
                      borderRadius="full"
                      boxShadow="0 0 8px red"
                    />
                  </Flex>
                </AlertDialogHeader>

                <AlertDialogBody>
                  <Text fontSize="0.95em" my="30" textAlign="center">
                    Los datos no pudieron guardarse.
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
