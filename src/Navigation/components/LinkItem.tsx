import { Link, useColorModeValue } from '@chakra-ui/react';
import { Link as RouteLink } from 'react-router-dom';

type Props = React.ComponentProps<typeof Link>;

export function LinkItem({ href, path, _target, children, ...props }: Props) {
  const active = path === href;
  const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900');
  return (
    <Link
      as={RouteLink}
      to={href}
      href={href}
      p={2}
      bg={active ? 'grassTeal' : undefined}
      color={active ? '#202023' : inactiveColor}
      _target={_target}
      {...props}
    >
      {children}
    </Link>
  );
}
