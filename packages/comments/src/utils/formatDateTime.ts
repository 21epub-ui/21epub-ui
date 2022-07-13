const oneSecond = 1000
const oneMinute = 60 * oneSecond
const oneHour = 60 * oneMinute
const oneDay = 24 * oneHour

const dateFormatter = new Intl.DateTimeFormat([...navigator.languages])

const weekdayFormatter = new Intl.DateTimeFormat([...navigator.languages], {
  weekday: 'long',
})

const formatDateTime = (timestamp: number) => {
  const currentTime = Date.now()
  const elapsedTime = currentTime - timestamp

  if (elapsedTime < oneSecond) {
    return '刚刚'
  }

  if (elapsedTime < oneMinute) {
    const seconds = Math.trunc(elapsedTime / oneSecond)
    return `${seconds}秒前`
  }

  if (elapsedTime < oneHour) {
    const minutes = Math.trunc(elapsedTime / oneMinute)
    return `${minutes}分钟前`
  }

  const todayStartTime = new Date().setHours(0, 0, 0, 0)

  if (elapsedTime < currentTime - todayStartTime) {
    const hours = Math.trunc(elapsedTime / oneHour)
    return `${hours}小时前`
  }

  if (elapsedTime < currentTime - todayStartTime + oneDay) {
    return '昨天'
  }

  const dateTime = new Date(timestamp)
  const elapsedDays = dateTime.getDay() + 1
  const thisWeekStartTime = new Date(todayStartTime).setDate(-elapsedDays)

  if (elapsedTime < currentTime - thisWeekStartTime) {
    return weekdayFormatter.format(dateTime)
  }

  return dateFormatter.format(dateTime)
}

export default formatDateTime
