import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import FloatingInput, {
  InputConfig,
  isValidExpression,
} from '../../../../shared/components/FloatingInput';
import { initialRepairState } from '../../../containers/AtencionAlCliente';
import { NewRepair } from '../../../helpers/types';

type Props = {
  newRepair: NewRepair;
  setNewRepair: React.Dispatch<React.SetStateAction<NewRepair>>;
};

export type ClientFormError = Record<string, boolean>;

type ClientFormConfig = {
  [key: string]: InputConfig;
  dni: InputConfig;
  nombre: InputConfig;
  apellido: InputConfig;
  telefono: InputConfig;
  direccion: InputConfig;
  email: InputConfig;
};

export const initialFormError = {
  dni: false,
  nombre: false,
  apellido: false,
  telefono: false,
  direccion: false,
  email: false,
};

const clientFormConfig: ClientFormConfig = {
  dni: {
    label: 'Dni',
    name: 'dni',
    type: 'number',
    min: 7,
    max: 8,
    isRequired: true,
    isReadOnly: true,
  },
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
    min: 8,
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
    max: 40,
    isRequired: true,
    isReadOnly: false,
  },
};

export function AddClientForm(props: Props) {
  const [formError, setFormError] = useState<ClientFormError>(initialFormError);
  const borderColor = useColorModeValue('black !important', 'white !important');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setNewRepair((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });

    setFormError((last) => {
      return {
        ...last,
        [e.target.name]: !e.target.value.trim(),
      };
    });
  };

  const handleSiguienteButton = () => {
    let isValid = true;

    for (const key in clientFormConfig) {
      if (clientFormConfig[key].isRequired) {
        const isValidExp = isValidExpression(
          props.newRepair[key],
          clientFormConfig[key].type,
          clientFormConfig[key].min,
          clientFormConfig[key].max,
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
      props.setNewRepair((prev) => {
        return {
          ...prev,
          step: '1',
        };
      });
    }
  };

  const handleVolver = () => {
    props.setNewRepair({
      ...initialRepairState,
      dni: props.newRepair.dni,
      isNewClient: 'no',
    });
  };

  return (
    <>
      <Grid
        templateColumns="1fr 1fr 1fr"
        columnGap="50px"
        rowGap="10px"
        mb="10px"
        justifyContent="center"
      >
        <FloatingInput
          inputConfig={clientFormConfig.dni}
          formError={formError}
          setFormError={setFormError}
          newRepair={props.newRepair}
          setNewRepair={props.setNewRepair}
        />
        <FloatingInput
          inputConfig={clientFormConfig.nombre}
          formError={formError}
          setFormError={setFormError}
          newRepair={props.newRepair}
          setNewRepair={props.setNewRepair}
        />
        <FloatingInput
          inputConfig={clientFormConfig.apellido}
          formError={formError}
          setFormError={setFormError}
          newRepair={props.newRepair}
          setNewRepair={props.setNewRepair}
        />
        <FloatingInput
          inputConfig={clientFormConfig.telefono}
          formError={formError}
          setFormError={setFormError}
          newRepair={props.newRepair}
          setNewRepair={props.setNewRepair}
        />
        <FloatingInput
          inputConfig={clientFormConfig.direccion}
          formError={formError}
          setFormError={setFormError}
          newRepair={props.newRepair}
          setNewRepair={props.setNewRepair}
        />
        <FloatingInput
          inputConfig={clientFormConfig.email}
          formError={formError}
          setFormError={setFormError}
          newRepair={props.newRepair}
          setNewRepair={props.setNewRepair}
        />
      </Grid>
      <Flex justifyContent="center">
        <Button
          w="120px"
          my="10px"
          mt={4}
          colorScheme="red"
          type="submit"
          fontSize="1.1em"
          fontWeight={700}
          onClick={handleVolver}
        >
          Atras
        </Button>
        <Button
          w="120px"
          ml="10px"
          mt={4}
          colorScheme="green"
          type="submit"
          fontSize="1.1em"
          fontWeight={700}
          onClick={handleSiguienteButton}
        >
          Siguiente
        </Button>
      </Flex>
    </>
  );
}
