const getRotateCursor = (angle: number) => {
  const cursor = `
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 15V12.5C15.8579 12.5 12.5 15.8579 12.5 20H15L11 25L7 20H9.5C9.5 14.201 14.201 9.5 20 9.5V7L25 11L20 15Z"
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
        d="M40 30V25C31.7158 25 25 31.7158 25 40H30L22 50L14 40H19C19 28.402 28.402 19 40 19V14L50 22L40 30Z"
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

export default getRotateCursor
