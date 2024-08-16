"use server";

import { loginScheema, LoginScheemaType } from "@/scheemas/login";
import { TOKEN_POST } from "@/endpoints/api";
import { cookies } from "next/headers";

type DataResponse = {
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
};

export default async function login(loginForm: LoginScheemaType) {
  try {
    if (!loginScheema.safeParse(loginForm).success)
      throw new Error("Erro de validação dos dados.");
    const { url } = TOKEN_POST();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm),
    });
    if (!response.ok) throw new Error("Dados incorretos, tente novamente.");
    const data = (await response.json()) as DataResponse;
    cookies().set("token", data?.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });
    return { sucessful: true };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Erro desconhecido",
      sucessful: false,
    };
  }
}
