import { grey } from '@ant-design/colors'
import { Menu } from 'antd'
import styled from '@emotion/styled'

export const MenuItemGroup = styled(Menu.ItemGroup)`
  font-size: 12px;
`

export const MenuItem = styled(Menu.Item)`
  color: ${grey[5]};
  font-size: 12px;
  height: 32px;
  overflow: hidden;
  white-space: normal;

  .ant-dropdown-menu-title-content {
    display: flex;
    align-items: center;
  }
`
