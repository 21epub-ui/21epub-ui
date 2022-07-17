import { extendTheme } from '@chakra-ui/react'

export const chakraTheme = extendTheme({
  styles: {
    global: null,
  },
  components: {
    Button: {
      defaultProps: {
        size: 'sm',
        variant: 'ghost',
      },
    },
    Divider: {
      baseStyle: {
        color: 'gray.200',
      },
    },
  },
})
