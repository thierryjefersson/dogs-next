import Button from "@/components/forms/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mt-4">
      <h2 className="title mb-2">Página não encontrada</h2>
      <Link href="/">
        <Button>Volte para a página inicial</Button>
      </Link>
    </div>
  );
}
