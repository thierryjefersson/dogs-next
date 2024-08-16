"use client";

import { useForm } from "react-hook-form";
import Button from "../forms/button";
import Field from "../forms/field";
import Input from "../forms/input";
import Label from "../forms/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { createScheema, CreateScheemaType } from "@/scheemas/create";
import Error from "../forms/error";
import create from "@/actions/create";
import React, { useTransition } from "react";

type ResponseCreate = {
  error?: string;
  sucessful: boolean;
};

export default function CreateForm() {
  const [pending, startTransition] = useTransition();
  const [errorCreate, setErrorCreate] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateScheemaType>({
    resolver: zodResolver(createScheema),
  });

  async function handleCreate(data: CreateScheemaType) {
    startTransition(async () => {
      const responseCreate = (await create(data)) as ResponseCreate;
      if (responseCreate.sucessful) {
        window.location.href = "/conta";
      } else if (responseCreate.error) {
        setErrorCreate(responseCreate.error);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(handleCreate)}>
      <Field>
        <Label htmlFor="username">Usuário</Label>
        <Input type="text" id="username" {...register("username")} />
        {errors.username?.message && <Error text={errors.username.message} />}
      </Field>
      <Field>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" {...register("email")} />
        {errors.email?.message && <Error text={errors.email.message} />}
      </Field>
      <Field>
        <Label htmlFor="password">Senha</Label>
        <Input type="password" id="password" {...register("password")} />
        {errors.password?.message && <Error text={errors.password.message} />}
      </Field>
      {errorCreate && <Error text={errorCreate} />}
      <Button disabled={pending}>
        {pending ? "Carregando..." : "Cadastrar"}
      </Button>
    </form>
  );
}
