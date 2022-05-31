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
} from '@chakra-ui/react';
import { Logo } from './Logo';
import { LinkItem } from './LinkItem';
import { HamburgerIcon } from '@chakra-ui/icons';
import { ThemeToggleButton } from './ThemeToggleButton';
import { Link as RouteLink } from 'react-router-dom';

type Props = {
  path: string;
};

export function Navbar(props: Props) {
  const { path } = props;

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
        maxW="container.md"
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
            <LinkItem href="/exchange" path={path}>
              Exchange
            </LinkItem>
            <LinkItem href="/pools" path={path}>
              Pools
            </LinkItem>
            <LinkItem href="/staking" path={path}>
              Staking
            </LinkItem>
            <LinkItem href="/info" path={path}>
              Info
            </LinkItem>
          </Stack>
        )}

        <Box flex={1} align="right">
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
