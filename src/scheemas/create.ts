import { z } from "zod";

export const createScheema = z.object({
  username: z.string().min(1, "O usuário precisa ser preenchido."),
  email: z
    .string()
    .min(1, "O email precisa ser preenchido.")
    .email("Preencha um email válido."),
  password: z
    .string()
    .min(1, "A senha precisa ser preenchida.")
    .min(3, "A senha precisa conter pelo menos 3 caracteres."),
});

export type CreateScheemaType = z.infer<typeof createScheema>;
