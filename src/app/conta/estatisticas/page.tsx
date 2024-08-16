import statsGet from "@/actions/stats-get";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const StatsGraph = dynamic(() => import("@/components/account/stats-graph"), {
  loading: () => <p>Carregando...</p>,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Estatísticas | Minha conta",
};

export default async function EstatisticasPage() {
  const { data, error } = await statsGet();
  if (error) return <p>{error}</p>;
  if (!data) return null;
  return (
    <section className="animate-left">
      <StatsGraph data={data} />
    </section>
  );
}
