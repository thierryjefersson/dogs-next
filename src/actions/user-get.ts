"use server";

import { USER_GET } from "@/endpoints/api";
import { cookies } from "next/headers";

type User = {
  id: number;
  username: string;
  nome: string;
  email: string;
};

export default async function userGet() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");
    const { url } = USER_GET();
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      next: {
        revalidate: 60,
      },
    });
    if (!response.ok) throw new Error("Erro ao localizar o usuário.");
    const data = (await response.json()) as User;
    return { data, sucessful: true, error: null };
  } catch (e) {
    return {
      data: null,
      sucessful: false,
      error: e instanceof Error ? e.message : "Erro desconhecido",
    };
  }
}
