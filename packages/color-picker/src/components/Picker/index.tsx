import { Col, Row, Space } from 'antd'
import { colord } from 'colord'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { ThemeColors } from '../../config'
import getColorHistory from '../../helpers/getColorHistory'
import updateColorHistory from '../../helpers/updateColorHistory'
import type { ColorPickerProps } from '../../index.types'
import Button from '../Button'
import ColorInput from '../ColorInput'
import { ColorRect } from '../ColorPicker/styles'
import NumberInput from '../NumberInput'
import Swatches from '../Swatches'
import {
  Actions,
  Buttons,
  ClearButton,
  ColorHistory,
  Container,
  Divider,
  Painter,
  StyledColorPicker,
  SwatchesSet,
} from './styles'

interface Props
  extends Pick<
    ColorPickerProps,
    | 'style'
    | 'color'
    | 'historySize'
    | 'localStorageKey'
    | 'onChange'
    | 'onRenderSwatches'
  > {
  color: string
  visible: boolean
  onVisibleChange: (visible: boolean) => void
}

const Picker = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    style,
    color,
    historySize,
    localStorageKey,
    onChange,
    visible,
    onVisibleChange,
    onRenderSwatches,
  } = props

  const [initColor, setInitColor] = useState(color)
  const [currColor, setCurrColor] = useState(colord(color))
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  const recentColorsLength = historySize ?? 2 * ThemeColors.length

  const colorHistory = getColorHistory(recentColorsLength, localStorageKey)

  useEffect(() => {
    const element = document.createElement('div')
    setContainer(element)
    document.body.appendChild(element)

    return () => {
      ReactDOM.unmountComponentAtNode(document.body)
      element.remove()
    }
  }, [])

  useEffect(() => {
    if (visible) {
      setInitColor(color)
    } else if (initColor !== color) {
      updateColorHistory(color, recentColorsLength, localStorageKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  const onColorChange = (
    value: Parameters<typeof colord>[0],
    forced?: boolean
  ) => {
    const newColor = colord(value)
    const alpha = newColor.alpha()

    if (alpha === currColor.alpha() && alpha === 0 && !forced) {
      newColor.rgba.a = 1
    }

    setCurrColor(newColor)
    onChange?.(newColor.toRgbString())
  }

  if (!container) return null

  return ReactDOM.createPortal(
    <Container
      ref={ref}
      style={{
        ...style,
        display: visible ? 'flex' : 'none',
      }}
    >
      <SwatchesSet direction="vertical">
        {onRenderSwatches?.({ onChange: onColorChange }) || (
          <Row style={{ width: ThemeColors.length * 24 }} gutter={8}>
            {ThemeColors.map((item, index) => (
              <Col key={index}>
                <Swatches
                  direction="vertical"
                  colors={item}
                  onChange={onColorChange}
                />
              </Col>
            ))}
          </Row>
        )}
        {!colorHistory.length || <Divider />}
        <Row>
          <Swatches
            wrap={true}
            colors={colorHistory}
            onChange={onColorChange}
          />
        </Row>
        <ColorInput color={currColor.toRgbString()} onChange={onColorChange} />
      </SwatchesSet>
      <Painter direction="vertical">
        <StyledColorPicker color={currColor.rgba} onChange={onColorChange} />
        <Space>
          {['r', 'g', 'b', 'a'].map((item) => {
            const isAlpha = item === 'a'

            return (
              <NumberInput
                key={item}
                label={item.toUpperCase()}
                min={0}
                max={isAlpha ? 1 : 255}
                step={isAlpha ? 0.1 : 1}
                controls={false}
                value={currColor.rgba[item]}
                onChange={(value) => {
                  const newColor = {
                    ...currColor.rgba,
                    [item]: value ?? value[item],
                  }
                  onColorChange(newColor)
                }}
              />
            )
          })}
        </Space>
      </Painter>
      <Actions>
        <Buttons>
          <Button
            label="确定"
            type="primary"
            onClick={() => onVisibleChange(false)}
          />
          <Button label="复位" onClick={() => onColorChange(initColor, true)} />
        </Buttons>
        <ColorHistory>
          <div>新的</div>
          <ColorRect width={48} height={32} color={currColor.toRgbString()} />
          <ColorRect width={48} height={32} color={initColor} />
          <div>之前</div>
        </ColorHistory>
        <ClearButton
          onClick={() => onColorChange({ r: 0, g: 0, b: 0, a: 0 }, true)}
        />
      </Actions>
    </Container>,
    container
  )
})

Picker.displayName = 'Picker'

export default Picker
