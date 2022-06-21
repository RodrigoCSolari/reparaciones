import { AddIcon } from '@chakra-ui/icons';
import { Flex, Grid, IconButton, Text, useColorModeValue } from '@chakra-ui/react';

type Props = {
  data: any;
};

export function ManageRepairItem(props: Props) {
  return (
    <Grid
      templateColumns="1fr 3fr 1.5fr 1.8fr 3fr 1fr"
      gap="4px"
      mb="4px"
      bgGradient={useColorModeValue(
        'linear-gradient(225deg, #0003 3.26%, #0005 100%)',
        'linear-gradient(0deg, #0002 3.26%, #0005 100%)',
      )}
    >
      <Flex w="100%" h="30px" bg="whiteAlpha.50" justifyContent="center" alignItems="center">
        <Text fontSize="0.9em" fontWeight="bolder">
          {props.data.nro_reparacion}
        </Text>
      </Flex>

      <Flex w="100%" h="30px" bg="whiteAlpha.50" justifyContent="center" alignItems="center">
        <Text fontSize="0.9em" fontWeight="bolder">
          {props.data.nombre.toUpperCase()} {props.data.apellido.toUpperCase()}
        </Text>
        <Text fontSize="0.9em" fontWeight="bolder"></Text>
      </Flex>

      <Flex w="100%" h="30px" bg="whiteAlpha.50" justifyContent="center" alignItems="center">
        <Text fontSize="0.9em" fontWeight="bolder">
          {props.data.dni}
        </Text>
      </Flex>

      <Flex w="100%" h="30px" bg="whiteAlpha.50" justifyContent="center" alignItems="center">
        <Text fontSize="0.9em" fontWeight="bolder">
          {props.data.estado}
        </Text>
      </Flex>

      <Flex w="100%" h="30px" bg="whiteAlpha.50" justifyContent="center" alignItems="center">
        <Text fontSize="0.9em" fontWeight="bolder">
          {props.data.nombre_categoria.toUpperCase()} {props.data.nombre_comercial.toUpperCase()}
        </Text>
      </Flex>

      <Flex w="100%" h="30px" bg="whiteAlpha.50" justifyContent="center" alignItems="center">
        <IconButton
          size="xs"
          w="100%"
          h="100%"
          alignSelf="center"
          borderRadius="0"
          aria-label="Add to friends"
          icon={<AddIcon />}
        />
      </Flex>
    </Grid>
  );
}
