import { grey } from '@ant-design/colors'
import { Menu } from 'antd'
import styled from '@emotion/styled'

export const StyledMenu = styled(Menu)`
  font-size: 12px;
  padding: 8px 0;

  .ant-dropdown-menu-item {
    color: ${grey[5]};
    font-size: 12px;
    height: 32px;
  }

  .ant-dropdown-menu-title-content {
    min-width: 100%;
    display: flex;
    align-items: center;
  }
`

export const Link = styled.a`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
