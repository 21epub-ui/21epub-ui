import styled from '@emotion/styled'
import { Button, Modal, Upload } from 'antd'

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
  padding: 16px;
  overflow-y: auto;

  .ant-upload.ant-upload-btn {
    display: flex;
    flex-direction: column;
    padding: 0;

    .ant-upload-drag-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 100%;
  align-items: center;
  justify-content: center;
`

export const StyledButton = styled(Button)`
  border-radius: 50px;
`
