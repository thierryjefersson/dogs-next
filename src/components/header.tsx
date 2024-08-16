import userGet from "@/actions/user-get";
import Image from "next/image";
import Link from "next/link";

export default async function Header() {
  const { data } = await userGet();

  return (
    <header className="fixed top-0 z-[40] w-full bg-white shadow-sm">
      <nav className="container flex h-16 items-center justify-between">
        <Link href="/">
          <Image
            src="/images/dogs.svg"
            width={28}
            height={22}
            alt="Dogs"
            priority
          />
        </Link>
        <Link
          className="flex items-center after:mb-[1px] after:ml-2 after:inline-block after:h-[17px] after:w-3.5 after:bg-[url('/images/usuario.svg')] after:bg-center after:bg-no-repeat after:content-['']"
          href={data ? "/conta" : "/login"}
        >
          {data ? data.username : "Login / Criar"}
        </Link>
      </nav>
    </header>
  );
}
