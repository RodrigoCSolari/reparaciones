import { Link, Image, Text, useColorModeValue } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Link as RouteLink } from 'react-router-dom';
import LogoImg from '../assets/Logo.png';

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;

  img {
    transition: 200ms ease;
  }

  &:hover img {
    transform: rotate(20deg);
  }
`;

export function Logo() {
  const footPrintImg = `../assets/Logo.png`;

  return (
    <Link as={RouteLink} to="/">
      <LogoBox>
        <Image src={LogoImg} style={{ height: 25 }} alt="logo" />
        <Text
          color={useColorModeValue('gray.800', 'whiteAlpha.900')}
          fontWeight="bold"
          ml={3}
        >
          Reparaciones Solari
        </Text>
      </LogoBox>
    </Link>
  );
}
