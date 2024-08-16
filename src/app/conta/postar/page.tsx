import PhotoPost from "@/components/account/photo-post";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Postar | Minha conta",
};

export default function PostarPage() {
  return (
    <section className="mb-4 grid animate-left grid-cols-1 gap-8 sm:grid-cols-2">
      <PhotoPost />
    </section>
  );
}
