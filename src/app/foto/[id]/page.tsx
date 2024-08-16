import photoGet from "@/actions/photo-get";
import PhotoContent from "@/components/photo/photo-content";
import { notFound } from "next/navigation";

type PhotoIdParams = {
  params: { id: string };
};

export async function generateMetadata({ params }: PhotoIdParams) {
  const { data } = await photoGet(params.id);
  if (!data) return { title: "Foto" };
  return {
    title: data.photo.title,
  };
}

export default async function FotoIdPage({ params }: PhotoIdParams) {
  const { data } = await photoGet(params.id);

  if (!data) return notFound();
  return (
    <section className="container mt-8">
      <h1 className="title">{data?.photo.author}</h1>
      {<PhotoContent data={data} single={true} />}
    </section>
  );
}
