export default function SearchIcon({
  width = 16,
  strokeColor = 'currentColor'
}) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} viewBox='0 0 512 512'>
      <path
        fill='none'
        stroke={strokeColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d='M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64Z'
      ></path>
      <path
        fill='none'
        stroke={strokeColor}
        strokeLinecap='round'
        strokeMiterlimit={10}
        strokeWidth={32}
        d='M338.29 338.29L448 448'
      ></path>
    </svg>
  )
}
