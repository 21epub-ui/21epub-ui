import type { InputProps } from 'antd'
import { colord } from 'colord'
import { useEffect, useState } from 'react'
import getColorString from '../../utils/getColorString'
import Input from '../Input'

interface Props extends Omit<InputProps, 'onChange'> {
  color: string
  onChange?: (value: Props['color']) => void
}

const ColorInput: React.FC<Props> = ({ color, onChange, ...props }) => {
  const [inputValue, setInputValue] = useState(getColorString(color))

  useEffect(() => {
    setInputValue(getColorString(color))
  }, [color])

  const onColorChange = (value: Parameters<typeof colord>[0]) => {
    if (!colord(value).isValid()) return

    const newColor = getColorString(value)

    setInputValue(newColor)
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
        onColorChange(e.currentTarget.value)
      }}
      onPressEnter={(e) => {
        onColorChange(e.currentTarget.value)
      }}
      {...props}
    />
  )
}

export default ColorInput
