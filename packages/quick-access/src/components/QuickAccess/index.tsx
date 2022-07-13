import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown } from 'antd'
import useSWR from 'swr'
import getQuickAccess from '../../api/getQuickAccess'
import getRecentHistory from '../../api/getRecentHistory'
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

const QuickAccess: React.FC<QuickAccessProps> = ({
  id,
  type,
  style,
  overlayStyle,
  ...props
}) => {
  const quickAccess = useSWR(['quickAccess', id, type], (key, id, type) => {
    return getQuickAccess(id, type)
  })
  const recentHistory = useSWR(['recentHistory', type], (key, type) => {
    return getRecentHistory(type)
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

export default QuickAccess
