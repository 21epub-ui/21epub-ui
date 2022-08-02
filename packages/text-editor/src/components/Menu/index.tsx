import type { ButtonProps } from '@chakra-ui/react'
import { Portal } from '@chakra-ui/react'
import { useMergeRefs } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
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
import type { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import type { Key } from 'react'
import { cloneElement, forwardRef, useEffect, useState } from 'react'
import MenuItem from '../MenuItem'
import { ChevronDownIcon } from '@chakra-ui/icons'

const motionVariants: Variants = {
  enter: {
    visibility: 'visible',
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    transitionEnd: {
      visibility: 'hidden',
    },
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.1,
      easings: 'easeOut',
    },
  },
}

const Transition = motion(Flex)

interface MenuProps {
  children: JSX.Element
  selectedKey?: string
  menuItems?: (ButtonProps & { key: Key })[]
}

const Menu = forwardRef<Element, MenuProps>(
  ({ children, selectedKey, menuItems, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    /**
     * ColorPicker 组件改为使用 Floating UI 实现 Popover，
     * 在此保持一致避免 @chakra-ui/menu 依赖的 Popper 被引入增加打包体积。
     */
    const { x, y, reference, floating, update, strategy, context } =
      useFloating({
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

    useEffect(() => {
      if (isOpen) update()
    }, [isOpen, update])

    return (
      <>
        {cloneElement(
          children,
          getReferenceProps({
            ref: useMergeRefs(reference, ref),
            fontSize: children.props.icon === undefined ? '12px' : '16px',
            rightIcon: <ChevronDownIcon />,
            ...children.props,
          })
        )}
        <Portal>
          <Transition
            initial={false}
            animate={isOpen ? 'enter' : 'exit'}
            variants={motionVariants}
            flexDirection="column"
            padding="8px 0"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            backgroundColor="white"
            transformOrigin="top"
            zIndex="1000"
            {...props}
            {...getFloatingProps({
              ref: floating,
              style: {
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                pointerEvents: isOpen ? 'auto' : 'none',
              },
            })}
          >
            {menuItems?.map(({ key, onClick, ...menuItemProps }) => (
              <MenuItem
                key={key}
                isSelected={key === selectedKey}
                onClick={(event) => {
                  onClick?.(event)
                  setIsOpen(false)
                }}
                {...menuItemProps}
              />
            ))}
          </Transition>
        </Portal>
      </>
    )
  }
)

Menu.displayName = 'Menu'

export default Menu
