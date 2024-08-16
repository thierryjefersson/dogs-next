import { PropsWithChildren } from "react";

export default function Field({ children }: PropsWithChildren) {
  return <div className="mb-4">{children}</div>;
}
