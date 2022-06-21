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
  Text,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import FloatingInputGeneric, {
  InputConfig,
  isValidExpression,
} from '../../../shared/components/FloatingInputGeneric';
import { DataCategorias } from './AddProduct';

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
  cuit: InputConfig;
  nombre_comercial: InputConfig;
  razon_social: InputConfig;
  telefono: InputConfig;
  direccion: InputConfig;
  email: InputConfig;
};

const initialFormErrorState = {
  cuit: false,
  nombre_comercial: false,
  razon_social: false,
  telefono: false,
  direccion: false,
  email: false,
};

const initialFormState = {
  cuit: '',
  nombre_comercial: '',
  razon_social: '',
  telefono: '',
  direccion: '',
  email: '',
};

const formConfig: FormConfig = {
  cuit: {
    label: 'Cuit',
    name: 'cuit',
    type: 'string',
    min: 10,
    max: 11,
    isRequired: true,
    isReadOnly: false,
  },
  nombre_comercial: {
    label: 'Nombre Comercial',
    name: 'nombre_comercial',
    type: 'string',
    min: 1,
    max: 30,
    isRequired: true,
    isReadOnly: false,
  },
  razon_social: {
    label: 'Razon social',
    name: 'razon_social',
    type: 'string',
    min: 1,
    max: 30,
    isRequired: true,
    isReadOnly: false,
  },
  telefono: {
    label: 'Telefono',
    name: 'telefono',
    type: 'number',
    min: 10,
    max: 15,
    isRequired: true,
    isReadOnly: false,
  },
  direccion: {
    label: 'Direccion',
    name: 'direccion',
    type: 'string',
    min: 1,
    max: 40,
    isRequired: true,
    isReadOnly: false,
  },
  email: {
    label: 'Email',
    name: 'email',
    type: 'email',
    min: 1,
    max: 50,
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
  categorias: DataCategorias[];
  setUrlFabricantes: React.Dispatch<React.SetStateAction<string>>;
  setUrlCategoriasFabricantes: React.Dispatch<React.SetStateAction<string>>;
};

export function AddManuFacturersModal(props: Props) {
  const { isOpen, onOpen, onClose } = props.disclosure;
  const [formError, setFormError] = useState<FormError>(initialFormErrorState);
  const [form, setForm] = useState<Form>(initialFormState);
  const [ids, setIds] = useState<string[]>([]);
  const [confirmationData, setConfirmationData] = useState<Response>({
    loading: false,
    error: null,
    data: null,
  });
  const cancelRef = useRef(null);

  const altaFabricante = async () => {
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
        const resp = await fetch(`http://localhost/reparaciones/fabricantes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: props.token,
            ...form,
            ids: ids,
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
          props.setUrlFabricantes('');
          props.setUrlCategoriasFabricantes('');
          props.setUrlFabricantes('http://localhost/reparaciones/fabricantes');
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

  const closeModal = () => {
    setConfirmationData({
      loading: false,
      error: null,
      data: null,
    });
    setIds([]);
    setForm(initialFormState);
    setFormError(initialFormErrorState);
    onClose();
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (!ids.some((item) => e.target.value === item)) {
        setIds((last) => {
          return [...last, e.target.value];
        });
      }
    } else {
      const newCuits = [...ids];
      const index = newCuits.findIndex((item) => item === e.target.value);
      if (index !== -1) {
        newCuits.splice(index, 1);
        setIds(newCuits);
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
                <AlertDialogHeader
                  fontSize="lg"
                  fontWeight="bold"
                  textAlign="center"
                  pt="10px"
                  pb="0"
                >
                  Agregar Nuevo Fabricante
                </AlertDialogHeader>

                <AlertDialogBody>
                  <Grid templateColumns="repeat(3,1fr)" columnGap="70px">
                    <FloatingInputGeneric
                      inputConfig={formConfig.nombre_comercial}
                      formError={formError}
                      setFormError={setFormError}
                      form={form}
                      setForm={setForm}
                    />
                    <FloatingInputGeneric
                      inputConfig={formConfig.razon_social}
                      formError={formError}
                      setFormError={setFormError}
                      form={form}
                      setForm={setForm}
                    />
                    <FloatingInputGeneric
                      inputConfig={formConfig.cuit}
                      formError={formError}
                      setFormError={setFormError}
                      form={form}
                      setForm={setForm}
                    />
                    <FloatingInputGeneric
                      inputConfig={formConfig.telefono}
                      formError={formError}
                      setFormError={setFormError}
                      form={form}
                      setForm={setForm}
                    />
                    <FloatingInputGeneric
                      inputConfig={formConfig.direccion}
                      formError={formError}
                      setFormError={setFormError}
                      form={form}
                      setForm={setForm}
                    />
                    <FloatingInputGeneric
                      inputConfig={formConfig.email}
                      formError={formError}
                      setFormError={setFormError}
                      form={form}
                      setForm={setForm}
                    />
                  </Grid>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold" textAlign="center" mt="0">
                    Asociar Categorias
                  </AlertDialogHeader>

                  <Grid templateColumns="repeat(5,1fr)" gap="5px" m="10px">
                    {props.categorias.map((item) => (
                      <Checkbox
                        onChange={handleCheck}
                        name={item.nombre_categoria}
                        value={item.id_categoria}
                        key={item.id_categoria}
                      >
                        {item.nombre_categoria.toUpperCase()}
                      </Checkbox>
                    ))}
                  </Grid>
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button colorScheme="red" ref={cancelRef} onClick={closeModal}>
                    Cancelar
                  </Button>
                  <Button colorScheme="green" onClick={altaFabricante} ml={3}>
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
                  <Button colorScheme="red" onClick={closeModal}>
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
                  <Button colorScheme="red" onClick={closeModal}>
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
