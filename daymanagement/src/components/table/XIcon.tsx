import React, { FC } from 'react'

const XIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg {...props} width="30" height="30" viewBox="0 0 30 30" fill="#fff" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_10267_79962)">
                <path d="M16.0033 14.4882L22.7544 24.1446H19.9838L14.4747 16.2649V16.2644L13.6659 15.1077L7.23047 5.90234H10.0011L15.1945 13.3314L16.0033 14.4882Z" fill="white" />
                <path d="M26.7584 0H3.24156C1.45134 0 0 1.45134 0 3.24156V26.7584C0 28.5487 1.45134 30 3.24156 30H26.7584C28.5487 30 30 28.5487 30 26.7584V3.24156C30 1.45134 28.5487 0 26.7584 0ZM19.135 25.4406L13.5601 17.3271L6.58044 25.4406H4.77653L12.7592 16.1619L4.77653 4.54401H10.865L16.144 12.2269L22.7533 4.54401H24.5572L16.9452 13.3924H16.9447L25.2235 25.4406H19.135Z" fill="white" />
            </g>
            <defs>
                <clipPath id="clip0_10267_79962">
                    <rect width="30" height="30" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}

export default XIcon