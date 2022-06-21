import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-35px)',
};

const styles = {
  global: (props: ReturnType<typeof mode>) => ({
    body: {
      bg: mode('#f0e7db', '#202023')(props),
    },
  }),
};

const components = {
  Link: {
    baseStyle: (props: ReturnType<typeof mode>) => ({
      color: mode('#3d7aed', '#ff63c3')(props),
      textUnderlineOffset: 3,
    }),
  },
  Form: {
    variants: {
      floating: {
        container: {
          _focusWithin: {
            label: {
              ...activeLabelStyles,
            },
          },
          'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label': {
            ...activeLabelStyles,
          },
          label: {
            top: '8px',
            left: 0,
            zIndex: 2,
            position: 'absolute',
            backgroundColor: 'transparent',
            pointerEvents: 'none',
            mx: '0px',
            px: '10px',
            my: '0px',
            transformOrigin: 'left top',
          },
        },
      },
    },
  },
};

const fonts = {};

const colors = {
  grassTeal: '#88ccca',
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

export const theme = extendTheme({
  ...config,
  styles,
  components,
  fonts,
  colors,
});
