interface FontColorIconProps {
  color: string
}

const FontColorIcon: React.FC<FontColorIconProps> = ({ color }) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    height="1em"
    width="1em"
  >
    <path d="M253.7 736H338.7C342.9 736 346.7 733.3 348 729.2L401.7 563.2H620.9L674.1 729.2C675.4 733.2 679.1 736 683.4 736H772.5C773.6 736 774.7 735.8 775.7 735.5C776.911 735.084 778.028 734.433 778.987 733.583C779.945 732.734 780.726 731.703 781.283 730.55C781.841 729.397 782.165 728.145 782.237 726.867C782.308 725.588 782.126 724.308 781.7 723.1L573.6 118.6C572.925 116.691 571.682 115.035 570.037 113.855C568.392 112.675 566.424 112.027 564.4 112H462.1C457.9 112 454.2 114.6 452.9 118.6L244.5 723.1C244.1 724.1 244 725.2 244 726.3C243.9 731.6 248.3 736 253.7 736ZM509.6 219.9H513.7L597.5 483.7H424.9L509.6 219.9Z" />
    <rect
      x="112"
      y="816"
      width="800"
      height="160"
      rx="8"
      fill={color}
      stroke="#333"
      strokeOpacity="0.15"
      strokeWidth="64"
    />
  </svg>
)

export default FontColorIcon
