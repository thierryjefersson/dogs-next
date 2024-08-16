"use server";

import { PHOTO_POST } from "@/endpoints/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function photoPost(formData: FormData) {
  try {
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Token inválido.");
    const { url } = PHOTO_POST();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });
    if (!response.ok) throw new Error("Erro de validação");
  } catch (e) {
    return {
      sucessful: false,
      error: e instanceof Error ? e.message : "Erro desconhecido",
    };
  }
  revalidateTag("photos");
  redirect("/conta");
}
