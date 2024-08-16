"use server";

import { PHOTO_DELETE } from "@/endpoints/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function photoDelete(id: number) {
  try {
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Token inválido.");
    const { url } = PHOTO_DELETE(id);
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    revalidateTag("photos");
    if (!response.ok) throw new Error("Erro ao deletar foto.");
    return { sucessful: true };
  } catch (e) {
    return {
      sucessful: false,
      error: e instanceof Error ? e.message : "Erro desconhecido",
    };
  }
}
