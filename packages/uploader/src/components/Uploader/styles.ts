import styled from '@emotion/styled'
import { Button, Modal } from 'antd'

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

export const DropZone = styled.div`
  height: 100%;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background: #fafafa;
  border: 1px dashed #d9d9d9;
  border-radius: 2px;
  transition: border-color 0.3s;
  cursor: pointer;

  :hover {
    border-color: #40a9ff;
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
