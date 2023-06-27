import { red } from '@ant-design/colors'
import styled from '@emotion/styled'
import { Space } from 'antd'
import type { UploadStatus } from '../../index.types'

export const Container = styled(Space)`
  padding-bottom: 16px;
`

interface CardProps {
  status?: UploadStatus
}

export const Card = styled.div<CardProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  width: 104px;
  height: 104px;
  border: 1px solid
    ${({ status }) => (status === 'error' ? red.primary : '#d9d9d9')};
  cursor: default;
  transition: border-color 0.3s;
  border-radius: 2px;
  user-select: none;
`
