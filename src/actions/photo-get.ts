"use server";

import { PHOTO_GET } from "@/endpoints/api";
import { Photo } from "./photos-get";

export type Comments = {
  comment_ID: string;
  comment_post_ID: string;
  comment_author: string;
  comment_content: string;
};

export type PhotoSelected = {
  photo: Photo;
  comments: Comments[];
};

export default async function photoGet(id: string) {
  try {
    const { url } = PHOTO_GET(id);
    const response = await fetch(url, {
      next: {
        revalidate: 60,
        tags: ["photos", "comment"],
      },
    });
    if (!response.ok) throw new Error("Erro ao gerar a foto.");
    const data = (await response.json()) as PhotoSelected;
    return { data, sucessful: true };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Erro desconhecido",
      sucessful: false,
    };
  }
}
