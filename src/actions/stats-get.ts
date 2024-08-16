"use server";

import { GET_STATS } from "@/endpoints/api";
import { cookies } from "next/headers";

export type StatsData = {
  id: number;
  title: string;
  acessos: string;
};

export default async function statsGet() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Token inválido.");
    const { url } = GET_STATS();
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      next: {
        revalidate: 60,
      },
    });
    if (!response.ok) throw new Error("Erro ao carregar os dados.");
    const data = (await response.json()) as StatsData[];
    return { data, sucessful: true };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Erro desconhecido",
      sucessful: false,
    };
  }
}
