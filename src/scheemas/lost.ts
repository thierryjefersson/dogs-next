import { z } from "zod";

export const lostScheema = z.object({
  login: z
    .string()
    .min(1, "O campo precisa ser preenchido.")
    .min(3, "O campo precisa ter pelo menos 3 caracteres."),
});

export type LostScheemaType = z.infer<typeof lostScheema>;
