const pick = (object, paths) => {
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => paths.includes(key))
  )
}

export default pick
