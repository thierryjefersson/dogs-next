"use client";

import { PhotoSelected } from "@/actions/photo-get";
import PhotoContent from "../photo/photo-content";
import { usePathname, useRouter } from "next/navigation";

export default function FeedModal({ photo }: { photo: PhotoSelected }) {
  const router = useRouter();
  const pathname = usePathname();
  if (!pathname.includes("foto")) return null;

  function closeModal(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) router.back();
  }

  return (
    <div
      className="fixed inset-0 z-[50] flex h-screen w-full bg-black bg-opacity-40 p-8 sm:px-16"
      onClick={closeModal}
    >
      <PhotoContent data={photo} single={false} />
    </div>
  );
}
