import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import { useQuery } from 'react-query'
import fetchRecentHistory from '../../api/fetchRecentHistory'
import fetchQuickAccess from '../../api/fetchQuickAccess'
import type { QuickAccessProps } from '../../index.types'
import { MenuItem, MenuItemGroup } from './styles'

const QuickAccessMenu: React.FC<QuickAccessProps> = ({ id, type }) => {
  const quickAccess = useQuery(['quickAccess', id, type], ({ queryKey }) => {
    return fetchQuickAccess(queryKey[1], queryKey[2])
  })
  const recentHistory = useQuery(['recentHistory', type], ({ queryKey }) => {
    return fetchRecentHistory(queryKey[1])
  })

  const menus = [
    {
      id: 'quickAccess',
      title: '快捷打开',
      value: quickAccess.data,
    },
    {
      id: 'recentHistory',
      title: '最近使用',
      value: recentHistory.data,
    },
  ]

  return (
    <Dropdown
      overlayStyle={{ width: '200px' }}
      overlay={
        <Menu>
          {menus.map(({ id, title, value }) => (
            <MenuItemGroup key={title} title={title}>
              {value?.map((item) => (
                <MenuItem key={item.id}>
                  <a
                    rel="noopener noreferrer"
                    href={item.url}
                    target={id === 'quickAccess' ? '_blank ' : '_self'}
                  >
                    {item.title}
                  </a>
                </MenuItem>
              ))}
            </MenuItemGroup>
          ))}
        </Menu>
      }
    >
      <Button size="small">
        <DownOutlined />
      </Button>
    </Dropdown>
  )
}

export default QuickAccessMenu
