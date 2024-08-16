"use server";

import { COMMENT_POST } from "@/endpoints/api";
import { cookies } from "next/headers";
import { Comments } from "./photo-get";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function commentPost(id: number, body: object) {
  try {
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Token inválido.");
    if (!body) throw new Error("O comentário precisa ser preenchido.");
    const { url } = COMMENT_POST(id);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error("Erro ao comentar na postagem.");
    const data = (await response.json()) as Comments;
    revalidateTag("comment");
    return { sucessful: true, data };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Erro desconhecido",
      sucessful: false,
    };
  }
}
