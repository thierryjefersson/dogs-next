import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentProps<"button"> & {
  children: string;
};

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "min-w-32 cursor-pointer rounded-md bg-primary px-5 py-3 text-base text-secundary transition hover:shadow-[0_0_0_3px_#fea,0_0_0_4px_#fb1] hover:outline-none focus:shadow-[0_0_0_3px_#fea,0_0_0_4px_#fb1] focus:outline-none disabled:cursor-wait disabled:opacity-50",
        props.className,
      )}
    >
      {children}
    </button>
  );
}
