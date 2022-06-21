import { Box, Container } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AtencionAlCliente } from '../../AtencionAlCliente';
import { Repuestos } from '../../Repuestos';
import LogoImg from '../assets/fondo.png';
import { Home } from '../../Home';
import { useState } from 'react';

export const initialSessionState = {
  token: '',
  role: '',
  logged: false,
  error: '',
};

export type Session = {
  token: string;
  role: string;
  logged: boolean;
  error: string;
};

export function Main() {
  const [session, setSession] = useState(initialSessionState);

  return (
    <Box
      as="main"
      pb={8}
      minHeight="100vh"
      backgroundImage={LogoImg}
      backgroundSize="100vh"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
    >
      <Navbar path="" session={session} setSession={setSession} />

      <Container maxW="container.xl" pt={14}>
        <Routes>
          <Route path="/" element={<Home session={session} setSession={setSession} />} />
          <Route path="/exchange" /*element={<AtencionAlCliente />}*/ />
          <Route path="/pools" /*element={<Repuestos />}*/ />
          <Route path="/staking" /*element={<AtencionAlCliente />}*/ />
          <Route path="/info" /*element={<AtencionAlCliente />}*/ />
        </Routes>
      </Container>
      <Footer />
    </Box>
  );
}
