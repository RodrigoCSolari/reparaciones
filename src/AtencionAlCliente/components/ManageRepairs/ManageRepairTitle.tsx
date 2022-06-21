import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Flex, Grid, Text, useColorModeValue } from '@chakra-ui/react';

export function ManageRepairTitle() {
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
      <Flex
        w="100%"
        h="30"
        bg="whiteAlpha.50"
        justifyContent="center"
        _hover={{ bg: 'whiteAlpha.200' }}
        cursor="pointer"
        alignItems="center"
      >
        <Text fontWeight="bolder">Nro</Text>
        <Flex flexDirection="column">
          <TriangleUpIcon w="10px" h="10px" ml="5px" color={false ? 'white' : 'whiteAlpha.400'} />
          <TriangleDownIcon w="10px" h="10px" ml="5px" color={false ? 'white' : 'whiteAlpha.400'} />
        </Flex>
      </Flex>

      <Flex
        w="100%"
        h="30"
        bg="whiteAlpha.50"
        justifyContent="center"
        _hover={{ bg: 'whiteAlpha.200' }}
        cursor="pointer"
        alignItems="center"
      >
        <Text fontWeight="bolder">Nombre Cliente</Text>
        <Flex flexDirection="column">
          <TriangleUpIcon w="10px" h="10px" ml="5px" color={false ? 'white' : 'whiteAlpha.400'} />
          <TriangleDownIcon w="10px" h="10px" ml="5px" color={false ? 'white' : 'whiteAlpha.400'} />
        </Flex>
      </Flex>

      <Flex
        w="100%"
        h="30"
        bg="whiteAlpha.50"
        justifyContent="center"
        _hover={{ bg: 'whiteAlpha.200' }}
        cursor="pointer"
        alignItems="center"
      >
        <Text fontWeight="bolder">Dni Cliente</Text>
        <Flex flexDirection="column">
          <TriangleUpIcon w="10px" h="10px" ml="5px" color={false ? 'white' : 'whiteAlpha.400'} />
          <TriangleDownIcon w="10px" h="10px" ml="5px" color={false ? 'white' : 'whiteAlpha.400'} />
        </Flex>
      </Flex>

      <Flex
        w="100%"
        h="30"
        bg="whiteAlpha.50"
        justifyContent="center"
        _hover={{ bg: 'whiteAlpha.200' }}
        cursor="pointer"
        alignItems="center"
      >
        <Text fontWeight="bolder">Producto</Text>
        <Flex flexDirection="column">
          <TriangleUpIcon w="10px" h="10px" ml="5px" color={false ? 'white' : 'whiteAlpha.400'} />
          <TriangleDownIcon w="10px" h="10px" ml="5px" color={false ? 'white' : 'whiteAlpha.400'} />
        </Flex>
      </Flex>

      <Flex
        w="100%"
        h="30"
        bg="whiteAlpha.50"
        justifyContent="center"
        _hover={{ bg: 'whiteAlpha.200' }}
        cursor="pointer"
        alignItems="center"
      >
        <Text fontWeight="bolder">Estado Reparacion</Text>
        <Flex flexDirection="column">
          <TriangleUpIcon w="10px" h="10px" ml="5px" color={false ? 'white' : 'whiteAlpha.400'} />
          <TriangleDownIcon w="10px" h="10px" ml="5px" color={false ? 'white' : 'whiteAlpha.400'} />
        </Flex>
      </Flex>

      <Flex
        w="100%"
        h="30"
        bg="whiteAlpha.50"
        justifyContent="center"
        _hover={{ bg: 'whiteAlpha.200' }}
        cursor="pointer"
        alignItems="center"
      >
        <Text fontWeight="bolder">Ver mas</Text>
      </Flex>
    </Grid>
  );
}
