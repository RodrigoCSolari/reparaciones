import { Flex, Grid, Text, useColorModeValue } from '@chakra-ui/react';

type Props = {
  data: any;
};

export function RepairModalItem(props: Props) {
  console.log(props.data);
  return (
    <Grid
      templateColumns="repeat(4,1fr)"
      gap={1}
      bgGradient={useColorModeValue(
        'linear-gradient(225deg, #0003 3.26%, #0005 100%)',
        'linear-gradient(0deg, #0002 3.26%, #0005 100%)',
      )}
    >
      <Flex w="100%" h="30" bg="whiteAlpha.50" justifyContent="center" alignItems="center">
        <Text fontWeight="bolder">{props.data.nro_reparacion}</Text>
      </Flex>

      <Flex w="100%" h="30" bg="whiteAlpha.50" justifyContent="center" alignItems="center">
        <Text fontWeight="bolder">{props.data.dni_cliente}</Text>
      </Flex>

      <Flex w="100%" h="30" bg="whiteAlpha.50" justifyContent="center" alignItems="center">
        <Text fontWeight="bolder">{props.data.estado}</Text>
      </Flex>

      <Flex w="100%" h="30" bg="whiteAlpha.50" justifyContent="center" alignItems="center">
        <Text fontWeight="bolder">{props.data.id_producto}</Text>
      </Flex>
    </Grid>
  );
}
