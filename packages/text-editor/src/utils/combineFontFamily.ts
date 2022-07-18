const combineFontFamily = (fonts: string[]) => {
  return fonts
    .map((font) => {
      return font.includes(' ') ? `'${font}'` : font
    })
    .join()
}

export default combineFontFamily
