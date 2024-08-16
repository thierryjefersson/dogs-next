import { z } from "zod";

export const resetScheema = z.object({
  password: z
    .string()
    .min(1, "A senha precisa ser preenchida.")
    .min(3, "A senha precisa ter pelo menos 3 caracteres."),
});

export type ResetScheemaType = z.infer<typeof resetScheema>;
