import photosGet from "@/actions/photos-get";
import userGet from "@/actions/user-get";
import Feed from "@/components/feed/feed";
import Button from "@/components/forms/button";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Minha Conta",
};

export default async function ContaPage() {
  const { data: user } = await userGet();
  const { data } = await photosGet({ user: user?.username });
  return (
    <section className="animate-left">
      {data?.length ? (
        <Feed photos={data} user={user?.username} />
      ) : (
        <div>
          <p className="mb-4 text-xl">Nenhuma foto encontrada</p>
          <Link href="/conta/postar">
            <Button>Postar foto</Button>
          </Link>
        </div>
      )}
    </section>
  );
}
