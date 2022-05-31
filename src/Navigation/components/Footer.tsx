import { Box, Spacer, Text, useColorModeValue } from '@chakra-ui/react';

export function Footer() {
  return (
    <>
      <Spacer mt="56px" />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg={useColorModeValue('#ffffff40', 'linear-gradient(#666666,#151522)')}
        fontSize="sm"
        position="absolute"
        w="100%"
        h="56px"
        bottom={0}
        left="auto"
      >
        <Text>
          &copy; {new Date().getFullYear()} Reparaciones Solari. Todos los
          derechos reservados.
        </Text>
      </Box>
    </>
  );
}
