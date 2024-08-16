import { ComponentProps, forwardRef } from "react";

type InputProps = ComponentProps<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      ref={ref}
      className="block w-full rounded-md border border-[#eee] bg-[#eee] p-3 text-base transition-all hover:border-primary hover:bg-white hover:shadow-[0_0_0_3px_#fea] hover:outline-none focus:border-primary focus:bg-white focus:shadow-[0_0_0_3px_#fea] focus:outline-none"
      autoComplete="off"
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
