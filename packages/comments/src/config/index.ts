import { extendTheme } from '@chakra-ui/react'

export const chakraTheme = extendTheme({
  styles: {
    global: null,
  },
  components: {
    Button: {
      defaultProps: {
        size: 'xs',
        variant: 'ghost',
      },
    },
  },
})
