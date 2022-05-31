import { Container, Box, useColorModeValue } from '@chakra-ui/react';

export function Pools() {
  return (
    <Container>
      <Box
        borderRadius="lg"
        mb={6}
        p={3}
        textAlign="center"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
      >
        Pools
      </Box>
    </Container>
  );
}
