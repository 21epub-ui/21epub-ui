const pick = (object, keys) => {
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => keys.includes(key))
  )
}

export default pick
