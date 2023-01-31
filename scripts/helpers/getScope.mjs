const getScope = (name) => {
  const index = name.indexOf('/')

  if (name.at(0) !== '@' || index < 0) return name

  return name.slice(0, index)
}

export default getScope
