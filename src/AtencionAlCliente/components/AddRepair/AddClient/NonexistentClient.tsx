import { Button, Flex, Text } from '@chakra-ui/react';
import { ClientData, NewRepair } from '../../../helpers/types';

type Props = {
  clientData: ClientData;
  setClientData: React.Dispatch<React.SetStateAction<ClientData>>;
  newRepair: NewRepair;
  setNewRepair: React.Dispatch<React.SetStateAction<NewRepair>>;
};

export function NonexistentClient(props: Props) {
  const handleSiButton = () => {
    props.setNewRepair((last) => {
      return {
        ...last,
        isNewClient: 'yes',
      };
    });
  };

  const handleNoButton = () => {
    props.setClientData({ loading: false, error: null, data: null });
  };

  return (
    <Flex justifyContent="center">
      <Text alignSelf="center">
        El Cliente con el Dni {props.newRepair.dni} no existe, ¿desea crearlo?
      </Text>
      <Button
        w="50px"
        m="0 10px"
        colorScheme="green"
        type="submit"
        fontSize="1.1em"
        fontWeight={700}
        onClick={handleSiButton}
      >
        Si
      </Button>
      <Button
        w="50px"
        m="0 10px"
        colorScheme="red"
        type="submit"
        fontSize="1.1em"
        fontWeight={700}
        onClick={handleNoButton}
      >
        No
      </Button>
    </Flex>
  );
}
