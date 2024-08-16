"use client";

import photoDelete from "@/actions/photo-delete";
import { useTransition } from "react";

export default function PhotoDelete({ id }: { id: number }) {
  const [pending, startTransition] = useTransition();
  function handleDelete() {
    const confirm = window.confirm("Tem certeza que deseja deletar?");
    if (confirm) {
      startTransition(async () => {
        const { sucessful } = await photoDelete(id);
        if (sucessful) window.location.href = "/conta";
      });
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="cursor-pointer rounded-md border border-transparent bg-[#ddd] px-[.6rem] py-[.3rem] text-sm transition hover:border-[#333] hover:bg-white hover:outline-none focus:border-[#333] focus:bg-white focus:outline-none disabled:cursor-wait disabled:opacity-50"
    >
      Deletar
    </button>
  );
}
