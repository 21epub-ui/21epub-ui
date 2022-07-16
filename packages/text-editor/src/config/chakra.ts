import { extendTheme } from '@chakra-ui/react'

export const chakraTheme = extendTheme({
  components: {
    Button: {
      defaultProps: {
        size: 'sm',
        variant: 'ghost',
      },
    },
  },
})
