import { JSX } from 'solid-js/jsx-runtime'

export const DoubleCheckIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30 30"
    fill="none"
    stroke="currentColor"
    stroke-width="1px"
    stroke-linecap="round"
    stroke-linejoin="round"
    height={20}
    width={20}
    {...props}
  >
  <polyline points="20,6 9,17 4,12" />
  <polyline points="24,6 13,17 8,12" />
  </svg>
)
