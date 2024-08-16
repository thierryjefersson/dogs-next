import { SVGProps } from "react";
const IconEstatisticas = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <rect width={2} height={8} x={6} y={14} fill="#333" rx={1} />
    <rect width={2} height={12} x={13} y={10} fill="#333" rx={1} />
    <rect width={2} height={16} x={20} y={6} fill="#333" rx={1} />
  </svg>
);
export default IconEstatisticas;
