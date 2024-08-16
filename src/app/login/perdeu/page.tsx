import LostForm from "@/components/login/lost-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perdeu a senha | Dogs",
};

export default function PerdeuPage() {
  return (
    <section className="-mt-36">
      <h1 className="title">Perdeu a senha?</h1>
      <LostForm />
    </section>
  );
}
