import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown } from 'antd'
import { useQuery } from 'react-query'
import fetchQuickAccess from '../../api/fetchQuickAccess'
import fetchRecentHistory from '../../api/fetchRecentHistory'
import type { LinkData, QuickAccessProps } from '../../index.types'
import { Link, StyledMenu } from './styles'

const getMenuItem = (
  data: LinkData,
  target: React.HTMLAttributeAnchorTarget
) => {
  return {
    key: data.id,
    title: data.title,
    label: (
      <Link rel="noopener noreferrer" href={data.url} target={target}>
        {data.title}
      </Link>
    ),
  }
}

const QuickAccessMenu: React.FC<QuickAccessProps> = ({
  id,
  type,
  style,
  overlayStyle,
  ...props
}) => {
  const quickAccess = useQuery(['quickAccess', id, type], ({ queryKey }) => {
    return fetchQuickAccess(queryKey[1], queryKey[2])
  })
  const recentHistory = useQuery(['recentHistory', type], ({ queryKey }) => {
    return fetchRecentHistory(queryKey[1])
  })

  const menuItems = [
    {
      key: 'quickAccess',
      label: '快捷打开',
      children: quickAccess.data,
    },
    {
      key: 'recentHistory',
      label: '最近使用',
      children: recentHistory.data,
    },
  ].map(({ key, label, children }) => {
    return {
      key,
      label,
      type: 'group',
      children: children?.map((item) => {
        return getMenuItem(item, key === 'quickAccess' ? '_blank ' : '_self')
      }),
    }
  })

  return (
    <Dropdown
      {...props}
      overlayStyle={{ width: '200px', ...overlayStyle }}
      overlay={<StyledMenu items={menuItems} />}
    >
      <Button size="small" style={style}>
        <DownOutlined />
      </Button>
    </Dropdown>
  )
}

export default QuickAccessMenu
