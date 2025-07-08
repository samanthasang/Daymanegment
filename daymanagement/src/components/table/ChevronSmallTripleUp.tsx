import { SVGProps } from "react";

export function ChevronSmallTripleUp(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        color='red'
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
          <path d="M12 14l-5 5M12 14l5 5">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.3s"
              values="10;0"
            ></animate>
          </path>
          <path d="M12 9l-5 5M12 9l5 5">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.3s"
              dur="0.3s"
              values="10;0"
            ></animate>
          </path>
          <path d="M12 4l-5 5M12 4l5 5">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.6s"
              dur="0.3s"
              values="10;0"
            ></animate>
          </path>
        </g>
      </svg>
    )
  }
  