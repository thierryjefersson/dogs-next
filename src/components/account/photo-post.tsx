"use client";

import photoPost from "@/actions/photo-post";
import Button from "@/components/forms/button";
import Error from "@/components/forms/error";
import Field from "@/components/forms/field";
import Input from "@/components/forms/input";
import Label from "@/components/forms/label";
import { photoPostSchema, PhotoPostSchema } from "@/scheemas/photo-post";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";

export default function PhotoPost() {
  const [pending, startTransition] = useTransition();
  const [previewFile, setPreviewFile] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhotoPostSchema>({
    resolver: zodResolver(photoPostSchema),
  });

  async function handlePhost(data: PhotoPostSchema) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    startTransition(async () => {
      await photoPost(formData);
    });
  }

  function handlePreviewImg(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setPreviewFile(URL.createObjectURL(e.target.files[0]));
    } else if (e.target.files && !e.target.files[0]) {
      setPreviewFile("");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handlePhost)}>
        <Field>
          <Label htmlFor="nome">Nome</Label>
          <Input type="text" id="nome" {...register("nome")} />
          {errors.nome?.message && <Error text={errors.nome.message} />}
        </Field>
        <Field>
          <Label htmlFor="peso">Peso</Label>
          <Input type="number" id="peso" {...register("peso")} />
          {errors.peso?.message && <Error text={errors.peso.message} />}
        </Field>
        <Field>
          <Label htmlFor="idade">Idade</Label>
          <Input type="number" id="idade" {...register("idade")} />
          {errors.idade?.message && <Error text={errors.idade.message} />}
        </Field>
        <input
          type="file"
          id="img"
          className="block w-full text-sm text-slate-500 file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-secundary hover:file:saturate-[0.8]"
          {...register("img")}
          accept="image/*"
          onChange={handlePreviewImg}
        />
        {errors.img?.message && <Error text={errors.img.message} />}
        <Button disabled={pending} className="mt-5">
          {pending ? "Enviando..." : "Enviar"}
        </Button>
      </form>
      <div>
        {previewFile && (
          <div
            className="rounded-2xl bg-cover bg-center after:block after:h-0 after:pb-[100%] after:content-['']"
            style={{ backgroundImage: `url(${previewFile})` }}
          ></div>
        )}
      </div>
    </>
  );
}
