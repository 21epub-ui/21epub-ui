const getLabel = (label: string) => {
  if (
    typeof label === 'string' &&
    ![':', '：'].includes(label[label.length - 1])
  ) {
    return `${label}：`
  }
  return label
}

export default getLabel
