const getPackageName = (scopedPackageName) => {
  return scopedPackageName.slice(scopedPackageName.indexOf('/') + 1)
}

export default getPackageName
