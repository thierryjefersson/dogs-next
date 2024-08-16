import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

type NavLinkProps = ComponentProps<"a"> & {
  path: string;
};

export default function NavLink({ path, children }: NavLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      data-active={path === pathname}
      className="data-[active=true]:activeNavLink navLink"
      href={path}
    >
      {children}
    </Link>
  );
}
