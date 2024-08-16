import { z } from "zod";

export const loginScheema = z.object({
  username: z.string().min(1, "O usuário precisa ser preenchido."),
  password: z
    .string()
    .min(1, "A senha precisa ser preenchida.")
    .min(3, "A senha precisa conter pelo menos 3 caracteres."),
});

export type LoginScheemaType = z.infer<typeof loginScheema>;
