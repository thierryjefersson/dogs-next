import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 2;
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const photoPostSchema = z.object({
  nome: z.string().min(1, "O nome precisa ser preenchido"),
  peso: z
    .string()
    .min(1, "O peso precisa ser preenchido")
    .transform((val) => Number(val))
    .pipe(
      z
        .number()
        .int("O peso deve ser um número inteiro")
        .positive("O peso deve ser um número positivo"),
    )
    .transform((val) => val.toString()),
  idade: z
    .string()
    .min(1, "A idade precisa ser preenchida")
    .transform((val) => Number(val))
    .pipe(
      z
        .number()
        .int("A idade deve ser um número inteiro")
        .positive("A idade deve ser um número positivo"),
    )
    .transform((val) => val.toString()),
  img: z
    .unknown()
    .transform((value) => value as FileList)
    .refine((fileList) => fileList.length > 0, "A imagem é obrigatória")
    .transform((fileList) => fileList[0])
    .refine((file) => {
      return file.size <= MAX_UPLOAD_SIZE;
    }, "O arquivo deve ser menor que 2MB")
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, ".jpg, .jpeg, e .png são arquivos aceitos."),
});

export type PhotoPostSchema = z.infer<typeof photoPostSchema>;
