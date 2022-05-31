import { Box, Container } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Home } from '../../Home';
import { Exchange } from '../../Exchange';
import { Pools } from '../../Pools';

export function Main() {
  return (
    <Box as="main" pb={8} minHeight="100vh">
      <Navbar path="" />

      <Container maxW="container.md" pt={14}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/pools" element={<Pools />} />
          <Route path="/staking" element={<Exchange />} />
          <Route path="/info" element={<Exchange />} />
        </Routes>
      </Container>
      <Footer />
    </Box>
  );
}
