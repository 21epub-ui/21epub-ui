import { red } from '@ant-design/colors'
import { Button, Modal, Space, Upload } from 'antd'
import type { UploadFileStatus } from 'antd/lib/upload/interface'
import styled from '@emotion/styled'

const { Dragger } = Upload

export const StyledModal = styled(Modal)`
  .ant-modal-close-x {
    width: 32px;
    height: 32px;
    line-height: 32px;
    padding: 4px 4px 0 0;
  }

  .ant-modal-body {
    padding: 32px;
  }
`

export const ModalBody = styled.div`
  width: 50vw;
  height: 50vh;
`

export const DropZone = styled(Dragger)`
  overflow-y: auto;

  .ant-upload.ant-upload-btn {
    padding: 16px;
  }
`

export const Cards = styled(Space)`
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

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  bottom: 30px;
  width: 100%;
  align-items: center;
  justify-content: center;
`

export const StyledButton = styled(Button)`
  border-radius: 50px;
`
