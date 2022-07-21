import type { ButtonProps } from '@chakra-ui/react'
import { Button, Center } from '@chakra-ui/react'
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react-dom-interactions'
import type { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import { forwardRef, useEffect, useState } from 'react'
import forwardElement from '../../helpers/forwardElement'

export const motionVariants: Variants = {
  exit: {
    scale: 0.85,
    opacity: 0,
    transition: {
      opacity: { duration: 0.15, easings: 'easeInOut' },
      scale: { duration: 0.2, easings: 'easeInOut' },
    },
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      opacity: { easings: 'easeOut', duration: 0.2 },
      scale: { duration: 0.2, ease: [0.175, 0.885, 0.4, 1.1] },
    },
  },
}

const Transition = motion(Center)

interface labelButtonProps extends ButtonProps {
  label: string
  isFocused?: boolean
}

const LabelButton = forwardRef<Element, labelButtonProps>(
  ({ label, isFocused, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    /**
     * Chakra UI 的 Tooltip 组件存在 mouseleave 时 target 元素抖动的问题，
     * 改为使用 Floating UI 实现 Tooltip。
     */
    const { x, y, reference, floating, update, strategy, context } =
      useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [offset(8), flip(), shift()],
        whileElementsMounted: autoUpdate,
      })

    const { getReferenceProps, getFloatingProps } = useInteractions([
      useHover(context),
      useRole(context),
      useDismiss(context),
    ])

    useEffect(() => {
      if (isOpen) update()
    }, [isOpen, update])

    return (
      <>
        <Button
          padding="0 8px"
          fontSize="16px"
          fontWeight="normal"
          lineHeight="1"
          aria-label={label}
          variant={isFocused ? 'solid' : 'ghost'}
          {...getReferenceProps({
            ref: (element) => {
              forwardElement(ref, element)
              forwardElement(reference, element)
            },
          })}
          {...props}
        />
        {isOpen && (
          <Transition
            initial="exit"
            animate="enter"
            exit="exit"
            variants={motionVariants}
            padding="4px 8px"
            fontSize="12px"
            color="white"
            backgroundColor="gray.700"
            borderRadius="2px"
            pointerEvents="none"
            userSelect="none"
            {...getFloatingProps({
              ref: floating,
              style: {
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
              },
            })}
          >
            {label}
          </Transition>
        )}
      </>
    )
  }
)

LabelButton.displayName = 'LabelButton'

export default LabelButton
