'use client'
import { ChakraProvider, extendTheme, ColorModeScript, cookieStorageManager, localStorageManager } from '@chakra-ui/react'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { ReactNode } from 'react'

const emotionCache = createCache({
  key: 'emotion-cache',
  prepend: true,
});

const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  colors: {
    brand: {
      50: '#e6f6ff',
      100: '#b3e0ff',
      200: '#80caff',
      300: '#4db5ff',
      400: '#1a9fff',
      500: '#0088ff',
      600: '#0066cc',
      700: '#004d99',
      800: '#003366',
      900: '#001a33',
    },
    accent: {
      50: '#fff5e6',
      100: '#ffe0b3',
      200: '#ffcc80',
      300: '#ffb84d',
      400: '#ffa31a',
      500: '#ff8f00',
      600: '#cc7200',
      700: '#995500',
      800: '#663800',
      900: '#331c00',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'lg',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        ghost: {
          _hover: {
            bg: 'brand.50',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          boxShadow: 'lg',
          overflow: 'hidden',
        },
      },
    },
  },
  styles: {
    global: (props: { colorMode: 'light' | 'dark' }) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
      },
    }),
  },
  semanticTokens: {
    colors: {
      'chakra-body-text': { _light: 'gray.800', _dark: 'whiteAlpha.900' },
      'chakra-body-bg': { _light: 'gray.50', _dark: 'gray.900' },
      'chakra-border-color': { _light: 'gray.200', _dark: 'whiteAlpha.300' },
      'chakra-placeholder-color': { _light: 'gray.500', _dark: 'whiteAlpha.400' },
    },
  },
})

export function Providers({ children }: { children: ReactNode }) {
  const colorModeManager = typeof window === 'undefined' ? cookieStorageManager : localStorageManager;
  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
} 