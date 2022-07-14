import { Tab, TabList } from '@chakra-ui/react'
import styled from '@emotion/styled'
import TextEditor from '../TextEditor'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 360px;
  padding: 0 12px;
  border-radius: 12px;
  background-color: white;

  .chakra-tabs__tab-panel {
    padding: 0 8px;
  }
`

export const StyledTabList = styled(TabList)`
  display: flex;
  height: 42px;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #f0f0f0;
`

export const StyledTab = styled(Tab)`
  color: #8c8c8c;
  font-size: small;

  &[aria-selected='true'],
  &[data-selected] {
    color: #1f1f1f;
    font-weight: 600;
  }
`

export const CommentEditor = styled(TextEditor)`
  padding: 12px 16px;
  border-radius: 8px;
  background-color: #f0f0f0;
`
