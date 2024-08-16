"use server";

import { PASSWORD_LOST } from "@/endpoints/api";
import { lostScheema, LostScheemaType } from "@/scheemas/lost";

type LostType = LostScheemaType & {
  url: string;
};

export default async function lost(lostForm: LostType) {
  try {
    if (!lostScheema.safeParse(lostForm).success)
      throw new Error("Erro de validação dos dados.");
    const { url } = PASSWORD_LOST();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lostForm),
    });
    if (!response.ok) throw new Error("Usuário ou email não existe.");
    return { sucessful: true };
  } catch (e) {
    return {
      sucessful: false,
      error: e instanceof Error ? e.message : "Erro desconhecido",
    };
  }

  return lostForm;
}
