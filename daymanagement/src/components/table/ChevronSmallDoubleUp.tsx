import { SVGProps } from "react";

export function ChevronSmallDoubleUp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      color='green'
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeDasharray="10"
        strokeDashoffset="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      {...props}
      >
        <path d="M12 12l-5 5M12 12l5 5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.3s"
            values="10;0"
          ></animate>
        </path>
        <path d="M12 6l-5 5M12 6l5 5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.3s"
            dur="0.3s"
            values="10;0"
          ></animate>
        </path>
      </g>
    </svg>
  )
}
