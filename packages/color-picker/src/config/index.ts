import { blue, green, red, yellow } from '@ant-design/colors'
import { extendTheme } from '@chakra-ui/react'

export const defaultLocalStorageKey = 'color-picker-history'

const grayscale = [
  ['#ffffff', '#fafafa', '#f5f5f5', '#e8e8e8', '#d9d9d9'],
  ['#bfbfbf', '#8c8c8c', '#595959', '#262626', '#000000'],
]

export const ThemeColors = grayscale.concat(
  [blue, red, yellow, green].map((item) => {
    return Array.from({ length: 5 }).map((_, index) => item[index * 2])
  })
)

export const chakraTheme = extendTheme({
  styles: {
    global: null,
  },
  components: {
    Button: {
      defaultProps: {
        size: 'xs',
      },
    },
    Divider: {
      baseStyle: {
        color: 'gray.200',
      },
    },
    Input: {
      defaultProps: {
        size: 'xs',
      },
    },
    NumberInput: {
      defaultProps: {
        size: 'xs',
      },
    },
  },
})
