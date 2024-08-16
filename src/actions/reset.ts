"use server";

import { PASSWORD_RESET } from "@/endpoints/api";
import { resetScheema, ResetScheemaType } from "@/scheemas/reset";
import { redirect } from "next/navigation";

type ResetType = ResetScheemaType & {
  key: string | null;
  login: string | null;
};

export default async function reset(resetData: ResetType) {
  try {
    if (!resetScheema.safeParse(resetData.password))
      throw new Error("Erro de validação dos dados");
    if (!resetData.key || !resetData.login)
      throw new Error(
        "Erro de validação dos dados, efetue o reset de forma segura através do link enviado para o seu email.",
      );
    const { url } = PASSWORD_RESET();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetData),
    });
    if (!response.ok) throw new Error("Usuário não existe ou link expirado.");
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erro desconhecido" };
  }
  redirect("/login");
}
