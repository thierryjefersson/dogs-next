import { ComponentProps } from "react";

type LabelProps = ComponentProps<"label"> & {
  children: string;
};

export default function Label({ children, ...props }: LabelProps) {
  return (
    <label className="block pb-2 text-base" {...props}>
      {children}
    </label>
  );
}
