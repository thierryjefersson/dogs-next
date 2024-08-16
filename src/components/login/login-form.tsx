"use client";

import Link from "next/link";
import Button from "../forms/button";
import Field from "../forms/field";
import Label from "../forms/label";
import Input from "../forms/input";
import { useForm } from "react-hook-form";
import Error from "../forms/error";
import { zodResolver } from "@hookform/resolvers/zod";
import login from "@/actions/login";
import React, { useTransition } from "react";
import { loginScheema, LoginScheemaType } from "@/scheemas/login";

type ResponseLogin = {
  error?: string;
  sucessful: boolean;
};

export default function LoginForm() {
  const [pending, startTransition] = useTransition();
  const [responseLoginData, setResponseLoginData] =
    React.useState<ResponseLogin>({ sucessful: false });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginScheemaType>({
    resolver: zodResolver(loginScheema),
  });

  async function handleLogin(data: LoginScheemaType) {
    startTransition(async () => {
      const responseLogin = (await login(data)) as ResponseLogin;
      if (responseLogin.sucessful) window.location.href = "/conta";
      setResponseLoginData(responseLogin);
      // Esse Timeoout atrasa o 'pending' e evita a disponibilizacao do botao antes do redirecionamento.
      await new Promise((resolve) => setTimeout(resolve, 700));
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Field>
          <Label htmlFor="username">Usuário</Label>
          <Input type="text" id="username" {...register("username")} />
          {errors.username?.message && <Error text={errors.username.message} />}
        </Field>
        <Field>
          <Label htmlFor="password">Senha</Label>
          <Input type="password" id="password" {...register("password")} />
          {errors.password?.message && <Error text={errors.password.message} />}
        </Field>
        {responseLoginData.error && <Error text={responseLoginData.error} />}
        <Button disabled={pending}>
          {pending ? "Carregando..." : "Entrar"}
        </Button>
      </form>
      <Link
        href="/login/perdeu"
        className="mt-6 inline-block py-2 text-[#666] underline underline-offset-2"
      >
        Perdeu a senha?
      </Link>
      <div className="mt-16">
        <h2 className="font-secundary text-[32px] leading-7 after:block after:h-2 after:w-12 after:rounded-md after:bg-[#ddd] after:content-['']">
          Cadastre-se
        </h2>
        <p className="mb-6 mt-8">
          Ainda não possui conta? cadastre-se no site.
        </p>
        <Link href="/login/criar">
          <Button className="py-2">Cadastro</Button>
        </Link>
      </div>
    </>
  );
}
