"use client";

import { useForm } from "react-hook-form";
import Button from "../forms/button";
import Field from "../forms/field";
import Input from "../forms/input";
import Label from "../forms/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { lostScheema, LostScheemaType } from "@/scheemas/lost";
import Error from "../forms/error";
import React, { useTransition } from "react";
import lost from "@/actions/lost";

type ResponseLost = {
  error?: string;
  sucessful: boolean;
};

export default function LostForm() {
  const [pending, startTransition] = useTransition();
  const [situationLost, setSituationLost] = React.useState<ResponseLost>({
    sucessful: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LostScheemaType>({
    resolver: zodResolver(lostScheema),
  });

  async function handleLost(data: LostScheemaType) {
    startTransition(async () => {
      const responseLost = (await lost({
        login: data.login,
        url: window.location.href.replace("perdeu", "resetar"),
      })) as ResponseLost;
      setSituationLost(responseLost);
    });
  }

  return (
    <>
      {!situationLost.sucessful ? (
        <form onSubmit={handleSubmit(handleLost)}>
          <Field>
            <Label htmlFor="login">Email / Usuário</Label>
            <Input type="text" id="login" {...register("login")} />
            {errors.login?.message && <Error text={errors.login.message} />}
          </Field>

          <Button disabled={pending}>
            {pending ? "Carregando..." : "Enviar"}
          </Button>

          {situationLost.error && <Error text={situationLost.error} />}
        </form>
      ) : (
        <p className="text-[#4c1]">Email enviado.</p>
      )}
    </>
  );
}
