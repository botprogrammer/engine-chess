export default function DownArrowIcon({
  width = 16,
  strokeColor = 'currentColor',
  ...props
}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      viewBox='0 0 16 16'
      {...props}
    >
      <path
        fill={strokeColor}
        d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'
      ></path>
    </svg>
  )
}
