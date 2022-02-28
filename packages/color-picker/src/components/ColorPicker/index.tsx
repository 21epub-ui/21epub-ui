import { useEffect, useRef, useState } from 'react'
import getLabel from '../../utils/getLabel'
import type { ColorPickerProps, Position } from '../../index.types'
import { Label } from '../Input/styles'
import Picker from '../Picker'
import { ColorRect, ColorRectContainer, Container } from './styles'

const ColorPicker: React.FC<ColorPickerProps> = ({
  className,
  styles = {},
  label,
  style,
  color = '#000000',
  disabled,
  renderIndicator,
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

    const innerHeight = document.body.clientHeight
    const innerWidth = document.body.clientWidth

    const x =
      innerWidth - mousePosition.x > pickerWidth
        ? mousePosition.x
        : innerWidth - pickerWidth
    const y =
      innerHeight - mousePosition.y > pickerHeight
        ? mousePosition.y
        : innerHeight - pickerHeight

    setMousePosition(undefined)
    setPickerPosition({ x, y })
  }, [mousePosition, pickerVisible])

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return

    setMousePosition({ x: e.clientX, y: e.clientY })
    setPickerVisible(!pickerVisible)
  }

  return (
    <Container className={className} style={style}>
      {label && <Label style={styles.label}>{getLabel(label)}</Label>}
      {!renderIndicator ? (
        <div ref={indicator} onClick={onClick}>
          <ColorRectContainer style={styles.indicator} disabled={disabled}>
            <ColorRect color={color} />
          </ColorRectContainer>
        </div>
      ) : (
        renderIndicator({ onClick, ref: indicator })
      )}
      <Picker
        ref={picker}
        style={styles.picker}
        position={pickerPosition}
        color={color}
        visible={pickerVisible}
        setVisible={setPickerVisible}
        {...props}
      />
    </Container>
  )
}

export default ColorPicker
