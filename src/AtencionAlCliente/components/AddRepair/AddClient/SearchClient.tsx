import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Flex,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import FloatingInput, {
  InputConfig,
  isValidExpression,
} from '../../../../shared/components/FloatingInput';
import { ClientData, NewRepair } from '../../../helpers/types';

export type DniFormError = Record<string, boolean>;

type Props = {
  clientData: ClientData;
  setClientData: React.Dispatch<React.SetStateAction<ClientData>>;
  newRepair: NewRepair;
  setNewRepair: React.Dispatch<React.SetStateAction<NewRepair>>;
};

type DniFormConfig = {
  [key: string]: InputConfig;
  dni: InputConfig;
};

const dniFormConfig: DniFormConfig = {
  dni: {
    label: 'Dni',
    name: 'dni',
    type: 'number',
    min: 7,
    max: 8,
    isRequired: true,
    isReadOnly: false,
  },
};

export function SearchClient(props: Props) {
  const [formError, setFormError] = useState<DniFormError>({ dni: false });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setNewRepair((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const buscarClienteConDni = async () => {
    let isValid = true;

    for (const key in formError) {
      if (dniFormConfig[key].isRequired) {
        const isValidExp = isValidExpression(
          props.newRepair[key],
          dniFormConfig[key].type,
          dniFormConfig[key].min,
          dniFormConfig[key].max,
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
      props.setClientData((prev) => {
        return {
          ...prev,
          loading: true,
        };
      });

      try {
        const resp = await fetch(
          `http://localhost/reparaciones/clientes?dni=${props.newRepair.dni}`,
        );
        const data = await resp.json();
        props.setClientData((prev) => {
          return {
            ...prev,
            loading: false,
            data: data,
          };
        });
      } catch (error) {
        console.log(error);
        props.setClientData((prev) => {
          return {
            ...prev,
            loading: false,
            error: error,
          };
        });
      }
    } else {
      handleAlert();
    }
  };

  const borderColor = useColorModeValue('black !important', 'white !important');

  const handleAlert = () => {
    if (!isOpen) {
      onOpen();
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex flexDirection="column" mb="50px" mt="30px">
      <Flex justifyContent="center" alignItems="center">
        <Box w="250px">
          <FloatingInput
            inputConfig={{
              label: 'Dni',
              name: 'dni',
              type: 'number',
              min: 7,
              max: 8,
              isRequired: true,
              isReadOnly: false,
            }}
            formError={formError}
            setFormError={setFormError}
            newRepair={props.newRepair}
            setNewRepair={props.setNewRepair}
          />
        </Box>
        <Button
          w="100px"
          m="0 30px"
          colorScheme="teal"
          type="submit"
          fontSize="1.1em"
          fontWeight={700}
          onClick={buscarClienteConDni}
        >
          Buscar
        </Button>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Alert status="warning" justifyContent="center" mt="10px">
          <AlertIcon />
          <AlertTitle>Es necesario ingresar un dni!</AlertTitle>
          <AlertDescription>(solo numeros, 7 u 8 digitos)</AlertDescription>
        </Alert>
      </Collapse>
    </Flex>
  );
}
