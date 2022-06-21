import {
  Container,
  Box,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Text,
  InputGroup,
  InputLeftAddon,
  Flex,
  Button,
  Grid,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Administracion } from '../../Administracion';
import { AtencionAlCliente } from '../../AtencionAlCliente';
import { Gerencia } from '../../Gerencia';
import { Session } from '../../Navigation';
import { Repuestos } from '../../Repuestos';
import { Taller } from '../../Taller';
import { HomeTabs } from './HomeTabs';

type Props = {
  session: Session;
  setSession: React.Dispatch<React.SetStateAction<Session>>;
};

export function Home(props: Props) {
  return (
    <>
      {!props.session.logged && <HomeTabs session={props.session} setSession={props.setSession} />}
      {props.session.logged && props.session.role === 'atencion_al_cliente' && (
        <AtencionAlCliente session={props.session} setSession={props.setSession} />
      )}
      {props.session.logged && props.session.role === 'taller' && <Taller />}
      {props.session.logged && props.session.role === 'repuestos' && <Repuestos />}
      {props.session.logged && props.session.role === 'gerencia' && <Gerencia />}
      {props.session.logged && props.session.role === 'administracion' && <Administracion />}
    </>
  );
}
