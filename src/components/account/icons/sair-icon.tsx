import { SVGProps } from "react";
const IconSair = (props: SVGProps<SVGSVGElement>) => (
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
      d="M19.293 9.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L21.586 15H12a1 1 0 1 1 0-2h9.586l-2.293-2.293a1 1 0 0 1 0-1.414Z"
      clipRule="evenodd"
    />
    <path
      fill="#333"
      fillRule="evenodd"
      d="M5 6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V7H7v14h7v-3a1 1 0 1 1 2 0v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6Z"
      clipRule="evenodd"
    />
  </svg>
);
export default IconSair;
