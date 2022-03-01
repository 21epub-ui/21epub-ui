import { blue, green, red, yellow } from '@ant-design/colors'
import { Col, Row, Space } from 'antd'
import { colord } from 'colord'
import React, { useEffect, useState } from 'react'
import { SketchPicker } from 'react-color'
import ReactDOM from 'react-dom'
import getColorHistory from '../../helpers/getColorHistory'
import updateColorHistory from '../../helpers/updateColorHistory'
import type { Position } from '../../index.types'
import getRgbString from '../../utils/getRgbString'
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
  Palette,
  SwatchesSet,
} from './styles'

export const DefaultPalette = [blue, red, yellow, green].map((item) => {
  return Array.from({ length: 5 }).map((_, index) => item[index * 2])
})

DefaultPalette.unshift(
  ['#ffffff', '#fafafa', '#f5f5f5', '#e8e8e8', '#d9d9d9'],
  ['#bfbfbf', '#8c8c8c', '#595959', '#262626', '#000000']
)

interface Props {
  color: string
  palettes?: string[][]
  historySize?: number
  onChange?: (color: string) => void
  onChangeComplete?: (color: string) => void
  visible: boolean
  setVisible: (visible: boolean) => void
  position?: Position
  style?: React.CSSProperties
}

const Picker = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    color,
    palettes = DefaultPalette,
    historySize,
    onChange,
    onChangeComplete,
    visible,
    setVisible,
    style,
    position,
  } = props

  const [initColor, setInitColor] = useState(color)
  const [currColor, setCurrColor] = useState(color)
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  const maxPaletteLength = palettes.reduce((prev, curr) => {
    const length = curr.length

    return length > prev ? length : prev
  }, 0)

  const defaultHistorySize = (7 - maxPaletteLength) * palettes.length
  const colorHistory = getColorHistory(historySize ?? defaultHistorySize)

  useEffect(() => {
    const element = document.createElement('div')
    setContainer(element)
    document.body.appendChild(element)

    return () => {
      if (element.parentElement === null) return
      ReactDOM.unmountComponentAtNode(element.parentElement)
      element.remove()
    }
  }, [])

  useEffect(() => {
    if (visible) {
      setInitColor(color)
    } else if (initColor !== color) {
      updateColorHistory(color)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  const onColorChange = (value: string) => {
    setCurrColor(value)
    onChange?.(value)
    onChangeComplete?.(value)
  }

  return (
    container &&
    ReactDOM.createPortal(
      <Container
        ref={ref}
        style={{
          ...style,
          display: visible ? 'flex' : 'none',
          left: position && `${position.x}px`,
          top: position && `${position.y}px`,
        }}
      >
        <SwatchesSet direction="vertical" span={palettes.length}>
          <Row gutter={8}>
            {palettes.map((palette) => (
              <Col key={palette.toString()} span={24 / palette.length}>
                <Swatches
                  direction="vertical"
                  palette={palette}
                  onChange={onColorChange}
                />
              </Col>
            ))}
          </Row>
          {!colorHistory.length || <Divider />}
          <Row>
            <Swatches
              wrap={true}
              palette={colorHistory}
              onChange={onColorChange}
            />
          </Row>
          <ColorInput color={currColor} onChange={onColorChange} />
        </SwatchesSet>
        <Palette direction="vertical">
          <SketchPicker
            styles={{
              default: {
                picker: { boxShadow: 'none', padding: 0 },
                color: { display: 'none' },
                hue: { cursor: 'pointer' },
                alpha: { cursor: 'pointer' },
              },
            }}
            color={currColor}
            onChange={(value) => {
              const color = getRgbString(value.rgb)
              setCurrColor(color)
              onChange?.(color)
            }}
            onChangeComplete={(value) => {
              const color = getRgbString(value.rgb)
              setCurrColor(color)
              onChangeComplete?.(color)
            }}
            presetColors={[]}
          />
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
                  value={colord(currColor).toRgb()[item]}
                  onChange={(value) => {
                    const color = colord(currColor).toRgb()
                    const newColor = {
                      ...color,
                      [item]: value ?? color[item],
                    }
                    onColorChange(getRgbString(newColor))
                  }}
                />
              )
            })}
          </Space>
        </Palette>
        <Actions>
          <Buttons>
            <Button
              label="确定"
              type="primary"
              onClick={() => {
                setVisible(false)
              }}
            />
            <Button label="复位" onClick={() => onColorChange(initColor)} />
          </Buttons>
          <ColorHistory>
            <div>新的</div>
            <ColorRect width={48} height={32} color={currColor} />
            <ColorRect width={48} height={32} color={initColor} />
            <div>之前</div>
          </ColorHistory>
          <ClearButton onClick={() => onColorChange('rgba(0, 0, 0, 0)')} />
        </Actions>
      </Container>,
      container
    )
  )
})

Picker.displayName = 'Picker'

export default Picker
