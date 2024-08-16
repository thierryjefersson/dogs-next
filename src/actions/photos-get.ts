"use server";

import { PHOTOS_GET } from "@/endpoints/api";

export type Photo = {
  id: number;
  author: string;
  title: string;
  date: string;
  src: string;
  peso: string;
  idade: string;
  acessos: string;
  total_comments: string;
};

type PhotosGetParams = {
  page?: number;
  total?: number;
  user?: 0 | string;
};

export default async function photosGet(
  { page = 1, total = 6, user = 0 }: PhotosGetParams = {},
  optionsFront?: RequestInit,
) {
  try {
    const options = optionsFront || {
      next: { revalidate: 10, tags: ["photos"] },
    };
    const { url } = PHOTOS_GET({ page, total, user });
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Falha na captação de imagens.");
    const data = (await response.json()) as Photo[];
    return { sucessful: true, data };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Erro desconhecido",
      sucessful: false,
    };
  }
}
