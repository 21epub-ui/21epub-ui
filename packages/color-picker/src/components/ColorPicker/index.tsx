import { ChakraProvider, ScaleFade } from '@chakra-ui/react'
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react-dom-interactions'
import { colord } from 'colord'
import { cloneElement, useState } from 'react'
import { chakraTheme } from '../../config'
import type { ColorPickerProps } from '../../index.types'
import Picker from '../Picker'

const transparent = { r: 0, b: 0, g: 0, a: 0 }

const ColorPicker: React.FC<ColorPickerProps> = ({
  children,
  defaultColor = transparent,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)

  /**
   * 无法使用 Chakra UI 的 Popover 组件。
   * Chakra UI 的 Popover 组件使用 focus 事件触发组件显隐，
   * 所以在文本编辑等场景中会因为 focus 被抢占导致组件意外消失，
   * 改为使用 Floating UI 实现 Popover。
   */
  const { x, y, reference, floating, strategy, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context),
  ])

  return (
    <>
      {cloneElement(
        children,
        getReferenceProps({ ref: reference, ...children.props })
      )}
      <ChakraProvider theme={chakraTheme}>
        <ScaleFade
          in={isOpen}
          {...getFloatingProps({
            ref: floating,
            style: {
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              zIndex: 1,
              pointerEvents: isOpen ? 'auto' : 'none',
            },
          })}
        >
          <Picker
            isOpen={isOpen}
            defaultColor={colord(defaultColor)}
            onClose={() => setIsOpen(false)}
            {...props}
          />
        </ScaleFade>
      </ChakraProvider>
    </>
  )
}

export default ColorPicker
