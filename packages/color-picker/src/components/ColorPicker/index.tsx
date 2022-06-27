import { useEffect, useRef, useState } from 'react'
import getLabel from '../../utils/getLabel'
import type { ColorPickerProps } from '../../index.types'
import { Label } from '../Input/styles'
import Picker from '../Picker'
import { ColorRect, ColorRectContainer, Container } from './styles'

type Position = Record<'left' | 'top', number>

const ColorPicker: React.FC<ColorPickerProps> = ({
  className,
  styles,
  label,
  style,
  color = '#000000',
  disabled,
  onRenderIndicator,
  ...props
}) => {
  const [pickerVisible, setPickerVisible] = useState(false)
  const [pickerPosition, setPickerPosition] = useState<Position>()
  const [mousePosition, setMousePosition] = useState<Position>()

  const picker = useRef<HTMLDivElement>(null)
  const indicator = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hidingPicker = (e: MouseEvent) => {
      const target = e.target as Node
      const visible =
        picker.current?.contains(target) || indicator.current?.contains(target)

      if (visible || disabled) return

      setPickerVisible(visible ?? false)
    }
    document.addEventListener('mousedown', hidingPicker)

    return () => document.removeEventListener('mousedown', hidingPicker)
  }, [disabled])

  useEffect(() => {
    if (!mousePosition || !pickerVisible) return

    const container = picker.current

    if (!container) return

    const rect = container.getBoundingClientRect()
    const pickerWidth = rect.width
    const pickerHeight = rect.height

    const left =
      innerWidth - mousePosition.left > pickerWidth
        ? mousePosition.left
        : innerWidth - pickerWidth
    const top =
      innerHeight - mousePosition.top > pickerHeight
        ? mousePosition.top
        : innerHeight - pickerHeight

    setMousePosition(undefined)
    setPickerPosition({ left, top })
  }, [mousePosition, pickerVisible])

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return

    setMousePosition({ left: e.clientX, top: e.clientY })
    setPickerVisible(!pickerVisible)
  }

  return (
    <Container className={className} style={style}>
      {label && <Label style={styles?.label}>{getLabel(label)}</Label>}
      {!onRenderIndicator ? (
        <div ref={indicator} onClick={onClick}>
          <ColorRectContainer style={styles?.indicator} disabled={disabled}>
            <ColorRect color={color} />
          </ColorRectContainer>
        </div>
      ) : (
        onRenderIndicator({ onClick, ref: indicator })
      )}
      <Picker
        ref={picker}
        style={{
          ...pickerPosition,
          ...styles?.picker,
        }}
        color={color}
        visible={pickerVisible}
        onVisibleChange={setPickerVisible}
        {...props}
      />
    </Container>
  )
}

export default ColorPicker
