"use client";

import Field from "../forms/field";
import Label from "../forms/label";
import Error from "../forms/error";
import { useForm } from "react-hook-form";
import { resetScheema, ResetScheemaType } from "@/scheemas/reset";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import Button from "../forms/button";
import Input from "../forms/input";
import reset from "@/actions/reset";

type ResponseReset = {
  error?: string;
};

export default function ResetForm({
  keyToken,
  login,
}: {
  keyToken: string;
  login: string;
}) {
  const [pending, startTransition] = useTransition();
  const [errorReset, setErrorReset] = React.useState<ResponseReset>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetScheemaType>({
    resolver: zodResolver(resetScheema),
  });

  async function handleReset(data: ResetScheemaType) {
    startTransition(async () => {
      const responseReset = (await reset({
        login,
        key: keyToken,
        password: data.password,
      })) as ResponseReset;
      if (responseReset.error) setErrorReset(responseReset);
    });
  }

  return (
    <form onSubmit={handleSubmit(handleReset)}>
      <Field>
        <Label htmlFor="password">Nova Senha</Label>
        <Input type="password" id="password" {...register("password")} />
        {errors.password?.message && <Error text={errors.password.message} />}
      </Field>
      <Button disabled={pending}>
        {pending ? "Carregando..." : "Resetar"}
      </Button>
      {errorReset.error && <Error text={errorReset.error} />}
    </form>
  );
}
