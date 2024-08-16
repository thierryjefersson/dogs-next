import ResetForm from "@/components/login/reset-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resetar a senha",
};

export default function ResetarPage({
  searchParams,
}: {
  searchParams: { key: string; login: string };
}) {
  console.log(searchParams.key, searchParams.login);
  return (
    <section className="-mt-36">
      <h1 className="title">Resete a Senha</h1>
      <ResetForm keyToken={searchParams.key} login={searchParams.login} />
    </section>
  );
}
