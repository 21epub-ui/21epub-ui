import { useEffect, useState } from 'react'
import formatDateTime from '../../utils/formatDateTime'

const dateFormatter = new Intl.DateTimeFormat([...navigator.languages], {
  dateStyle: 'long',
  timeStyle: 'long',
})

interface TimeProps {
  value: number
}

const Time: React.FC<TimeProps> = ({ value, ...props }) => {
  const [time, setTime] = useState(formatDateTime(value))

  useEffect(() => {
    const oneSecond = 1000
    const oneMinute = 60 * oneSecond
    const interval = Date.now() - value >= oneMinute ? oneMinute : oneSecond
    setInterval(() => setTime(formatDateTime(value)), interval)
  }, [value])

  return (
    <time title={dateFormatter.format(value)} {...props}>
      {time}
    </time>
  )
}

export default Time
