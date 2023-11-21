export default function Trash({ fill, stroke }: any) {
  return (
    <svg
      width='20px'
      height='100%'
      viewBox='0 0 28 32'
      fill={fill}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3 8V27C3 29.2091 4.79086 31 7 31H21C23.2091 31 25 29.2091 25 27V8'
        stroke={stroke}
        strokeLinecap='round'
      />
      <rect x='0.5' y='2.5' width='27' height='4' rx='2' stroke={stroke} />
      <path d='M18 1L10 0.999999' stroke={stroke} strokeLinecap='round' />
      <path d='M11 9V27' stroke={stroke} strokeLinecap='round' />
      <path d='M18 9V27' stroke={stroke} strokeLinecap='round' />
    </svg>
  )
}
