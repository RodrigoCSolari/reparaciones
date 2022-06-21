import { Button, Flex, Grid, Text } from '@chakra-ui/react';
import { ClientData, ClientForm, NewRepair } from '../../../helpers/types';
import { initialClientForm } from './AddClient';

type Props = {
  data: ClientForm;
  setClientData: React.Dispatch<React.SetStateAction<ClientData>>;
  newRepair: NewRepair;
  setNewRepair: React.Dispatch<React.SetStateAction<NewRepair>>;
};

export function ExistentClient(props: Props) {
  const handleSiguienteButton = () => {
    props.setNewRepair((prev) => {
      return {
        ...prev,
        step: '1',
      };
    });
  };

  const handleAtrasButton = () => {
    props.setNewRepair((prev) => {
      return {
        ...prev,
        ...initialClientForm,
      };
    });
    props.setClientData({ loading: false, error: null, data: null });
  };

  return (
    <>
      <Grid
        border="2px white solid"
        templateColumns="1fr 1fr 1fr"
        mx="30px"
        borderRadius="8px"
        p="10px"
        rowGap="10px"
        justifyContent="center"
      >
        <Text>Dni: {props.data.dni.toUpperCase()}</Text>
        <Text>Nombre: {props.data.nombre.toUpperCase()}</Text>
        <Text>Apellido: {props.data.apellido.toUpperCase()}</Text>
        <Text>Telefono: {props.data.telefono.toUpperCase()}</Text>
        <Text>Direccion: {props.data.direccion.toUpperCase()}</Text>
        <Text>Email: {props.data.email.toLowerCase()}</Text>
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
          onClick={handleAtrasButton}
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
