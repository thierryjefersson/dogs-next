"use server";

import { TOKEN_VALIDATE_POST } from "@/endpoints/api";
import { cookies } from "next/headers";

export default async function validateToken() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Acesso negado.");
    const { url } = TOKEN_VALIDATE_POST();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) throw new Error("Erro ao validar token.");
    const data = await response.json();
    return { data, ok: true };
  } catch (e) {
    return {
      data: null,
      ok: false,
      error: e instanceof Error ? e.message : "Erro desconhecido",
    };
  }
}
