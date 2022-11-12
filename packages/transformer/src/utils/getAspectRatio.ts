const getAspectRatio = (width: number, height: number) => {
  const ratio = width / height

  if (isFinite(ratio)) return ratio

  return 0
}

export default getAspectRatio
