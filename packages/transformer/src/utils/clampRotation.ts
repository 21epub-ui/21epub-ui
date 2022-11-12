const clampRotation = (rotation: number) => {
  const angle = rotation % 360

  if (angle > 180) return angle - 360

  if (angle < -180) return angle + 360

  return angle
}

export default clampRotation
