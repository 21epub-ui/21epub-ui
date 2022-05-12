import { red } from '@ant-design/colors'
import styled from '@emotion/styled'
import { Space } from 'antd'
import type { UploadFileStatus } from 'antd/lib/upload/interface'

export const Container = styled(Space)`
  width: 100%;
  height: 100%;
`

interface CardProps {
  status?: UploadFileStatus
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
