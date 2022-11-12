const getResizeCursor = (angle: number) => {
  const cursor = `
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 5L12 10H14.5V22H12L16 27L20 22H17.5V10H20L16 5Z"
        fill="black"
        stroke="white"
        stroke-width="1"
        stroke-linejoin="round"
        style="transform:rotate(${angle}deg); transform-origin: 16px 16px"
      />
    </svg>
  `.replace(/\n/g, '')

  const cursor2x = `
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32 10L24 20H29V44H24L32 54L40 44H35V20H40L32 10Z"
        fill="black"
        stroke="white"
        stroke-width="2"
        stroke-linejoin="round"
        style="transform:rotate(${angle}deg); transform-origin: 32px 32px"
      />
    </svg>
  `.replace(/\n/g, '')

  return `-webkit-image-set(url('data:image/svg+xml;utf8,${cursor}') 1x, url('data:image/svg+xml;utf8,${cursor2x}') 2x) 16 16, default`
}

export default getResizeCursor
