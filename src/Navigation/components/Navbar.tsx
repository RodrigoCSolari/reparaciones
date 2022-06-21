import {
  Container,
  Box,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { Logo } from './Logo';
import { LinkItem } from './LinkItem';
import { HamburgerIcon } from '@chakra-ui/icons';
import { ThemeToggleButton } from './ThemeToggleButton';
import { Link as RouteLink } from 'react-router-dom';
import { initialSessionState, Session } from '../containers/Main';
import { ContactForm } from '../../shared/components/ContactForm';

type Props = {
  path: string;
  session: Session;
  setSession: React.Dispatch<React.SetStateAction<Session>>;
};

export function Navbar(props: Props) {
  const cerrarSession = () => {
    props.setSession(initialSessionState);
  };

  const contactDisclosure = useDisclosure();

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('#ffffff40', '#00000020')}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={1}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.lg"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>

        {false && (
          <Stack
            direction={{ base: 'column', md: 'row' }}
            display={{ base: 'none', md: 'flex' }}
            width={{ base: 'full', md: 'auto' }}
            alignItems="center"
            flexGrow={1}
            mt={{ base: 4, md: 0 }}
          >
            <LinkItem href="/exchange" path={props.path}>
              Exchange
            </LinkItem>
            <LinkItem href="/pools" path={props.path}>
              Pools
            </LinkItem>
            <LinkItem href="/staking" path={props.path}>
              Staking
            </LinkItem>
            <LinkItem href="/info" path={props.path}>
              Info
            </LinkItem>
          </Stack>
        )}

        <Box flex={1} align="right">
          {props.session.logged ? (
            <Button mr="10px" onClick={cerrarSession}>
              Cerrar Sesion
            </Button>
          ) : (
            <>
              <Button mr="10px" onClick={contactDisclosure.onOpen}>
                Contacto
              </Button>
              <ContactForm disclosure={contactDisclosure} />
            </>
          )}
          <ThemeToggleButton />

          {false && (
            <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
              <Menu isLazy id="navbar-menu">
                <MenuButton
                  as={IconButton}
                  icon={<HamburgerIcon />}
                  variant="outline"
                  aria-label="Options"
                />
                <MenuList>
                  <RouteLink to="/exchange">
                    <MenuItem>Exchange</MenuItem>
                  </RouteLink>
                  <RouteLink to="/pools">
                    <MenuItem>Pools</MenuItem>
                  </RouteLink>
                  <RouteLink to="/staking">
                    <MenuItem>Staking</MenuItem>
                  </RouteLink>
                  <RouteLink to="/info">
                    <MenuItem>Info</MenuItem>
                  </RouteLink>
                </MenuList>
              </Menu>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
