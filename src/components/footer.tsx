import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex h-40 flex-col items-center gap-4 bg-primary px-4 pt-12 text-secundary">
      <Image src="/images/dogs-footer.svg" width={28} height={22} alt="Dogs" />
      <p>Dogs. Alguns direitos reservados.</p>
    </footer>
  );
}
