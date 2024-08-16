import CreateForm from "@/components/login/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crie sua conta Dogs",
  description: "Crie sua conta no site Dogs.",
};

export default function CriarPage() {
  return (
    <section className="-mt-24">
      <h1 className="title">Cadastre-se</h1>
      <CreateForm />
    </section>
  );
}
