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
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  Spinner,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import FloatingInputGeneric, { InputConfig } from './FloatingInputGeneric';

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
  nombre: InputConfig;
  apellido: InputConfig;
  telefono: InputConfig;
  email: InputConfig;
  mensaje: InputConfig;
};

const initialFormErrorState = {
  nombre: false,
  apellido: false,
  telefono: false,
  email: false,
  mensaje: false,
};

const initialFormState = {
  nombre: '',
  apellido: '',
  telefono: '',
  email: '',
  mensaje: '',
};

const formConfig: FormConfig = {
  nombre: {
    label: 'Nombre',
    name: 'nombre',
    type: 'string',
    min: 1,
    max: 30,
    isRequired: true,
    isReadOnly: false,
  },
  apellido: {
    label: 'Apellido',
    name: 'apellido',
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
  email: {
    label: 'Email',
    name: 'email',
    type: 'email',
    min: 1,
    max: 50,
    isRequired: true,
    isReadOnly: false,
  },
  mensaje: {
    label: 'Mensaje',
    name: 'mensaje',
    type: 'string',
    min: 1,
    max: 40,
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
};

export function ContactForm(props: Props) {
  const { isOpen, onOpen, onClose } = props.disclosure;
  const [formError, setFormError] = useState<FormError>(initialFormErrorState);
  const [form, setForm] = useState<Form>(initialFormState);
  const [confirmationData, setConfirmationData] = useState<Response>({
    loading: false,
    error: null,
    data: null,
  });
  const cancelRef = useRef(null);

  const closeModal = () => {
    setConfirmationData({
      loading: false,
      error: null,
      data: null,
    });
    setForm(initialFormState);
    setFormError(initialFormErrorState);
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
            minW="1300px"
            minH="500px"
          >
            <>
              <AlertDialogHeader
                fontSize="lg"
                fontWeight="bold"
                textAlign="center"
                pt="10px"
                pb="0"
              >
                Formulario de contacto
              </AlertDialogHeader>

              <AlertDialogBody>
                <Grid templateColumns="repeat(2,1fr)" mx="250px" columnGap="50px">
                  <FloatingInputGeneric
                    inputConfig={formConfig.nombre}
                    formError={formError}
                    setFormError={setFormError}
                    form={form}
                    setForm={setForm}
                  />
                  <FloatingInputGeneric
                    inputConfig={formConfig.apellido}
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
                    inputConfig={formConfig.email}
                    formError={formError}
                    setFormError={setFormError}
                    form={form}
                    setForm={setForm}
                  />
                </Grid>
                <Flex justifyContent="center">
                  <FormControl mt="5px" w="750px" isRequired isInvalid={formError.mensaje}>
                    <FormLabel alignSelf="center" textAlign="start" ml="5px" fontSize="0.85em">
                      Mensaje
                    </FormLabel>
                    <Textarea minH="150px" name="mensaje" placeholder="Detalles..." type="text" />
                    {formError.mensaje ? (
                      <FormErrorMessage m="0" justifyContent="center">
                        * Campo obligatorio
                      </FormErrorMessage>
                    ) : (
                      formConfig.mensaje && (
                        <FormHelperText m="0" justifyContent="center">
                          * Campo obligatorio
                        </FormHelperText>
                      )
                    )}
                  </FormControl>
                </Flex>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button colorScheme="red" ref={cancelRef} onClick={closeModal}>
                  Cancelar
                </Button>
                <Button colorScheme="green" ml={3}>
                  Enviar
                </Button>
              </AlertDialogFooter>
            </>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
