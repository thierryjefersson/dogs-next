"use server";

import { USER_POST } from "@/endpoints/api";
import { createScheema, CreateScheemaType } from "@/scheemas/create";
import login from "./login";

export default async function create(createForm: CreateScheemaType) {
  try {
    if (!createScheema.safeParse(createForm).success)
      throw new Error("Erro de validação dos dados.");
    const { url } = USER_POST();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createForm),
    });
    if (!response.ok) throw new Error("Email ou usuário já cadastrado.");
    await login({
      username: createForm.username,
      password: createForm.password,
    });
    return { sucessful: true };
  } catch (e) {
    return {
      sucessful: false,
      error: e instanceof Error ? e.message : "Erro desconhecido",
    };
  }
}
