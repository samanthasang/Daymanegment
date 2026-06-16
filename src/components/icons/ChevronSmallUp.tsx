import { SVGProps } from "react";

export function ChevronSmallUp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      color='yellow'
      {...props}
    >
      <path
        stroke="currentColor"
        strokeDasharray="10"
        strokeDashoffset="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9l-5 5M12 9l5 5"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.3s"
          values="10;0"
        ></animate>
      </path>
    </svg>
  )
}
