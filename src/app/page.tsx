import photosGet from "@/actions/photos-get";
import Feed from "@/components/feed/feed";

export default async function Home() {
  const { data } = await photosGet();

  return (
    <section className="container mt-8">
      {data && <Feed photos={data} />}
    </section>
  );
}
