import type { InputProps } from 'antd'
import type { Colord } from 'colord'
import { colord } from 'colord'
import { useEffect, useState } from 'react'
import getColorString from '../../utils/getColorString'
import Input from '../Input'

interface Props extends Omit<InputProps, 'color' | 'value' | 'onChange'> {
  color: Colord
  onChange?: (value: Props['color']) => void
}

const ColorInput: React.FC<Props> = ({ color, onChange, ...props }) => {
  const [inputValue, setInputValue] = useState(getColorString(color))

  useEffect(() => {
    setInputValue(getColorString(color))
  }, [color])

  const onColorChange = (value: string) => {
    const newValue =
      value[0] === '#' || value.slice(0, 3) === 'rgb' ? value : `#${value}`
    const newColor = colord(newValue)

    if (!newColor.isValid()) return

    setInputValue(newColor.toRgbString())
    onChange?.(newColor)
  }

  return (
    <Input
      label="色值"
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.currentTarget.value)
      }}
      onBlur={(e) => {
        onColorChange(e.currentTarget.value.trim())
      }}
      onPressEnter={(e) => {
        onColorChange(e.currentTarget.value.trim())
      }}
      {...props}
    />
  )
}

export default ColorInput
