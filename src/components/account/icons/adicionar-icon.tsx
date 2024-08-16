import { SVGProps } from "react";
const IconAdicionar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <path
      fill="#333"
      fillRule="evenodd"
      d="M14 5a1 1 0 0 1 1 1v7h7a1 1 0 1 1 0 2h-7v7a1 1 0 1 1-2 0v-7H6a1 1 0 1 1 0-2h7V6a1 1 0 0 1 1-1z"
      clipRule="evenodd"
    />
  </svg>
);
export default IconAdicionar;
