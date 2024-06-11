export default function AddIcon({ width = 16, strokeColor = 'currentColor' }) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} viewBox='0 0 24 24'>
      <path
        fill='none'
        stroke={strokeColor}
        strokeLinecap='square'
        strokeLinejoin='round'
        d='M12 6v12m6-6H6'
      ></path>
    </svg>
  )
}
