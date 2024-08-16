"use client";

import React from "react";
import { VictoryPie, VictoryChart, VictoryBar } from "victory";
import { StatsData } from "@/actions/stats-get";

type GraphData = {
  x: string;
  y: number;
};

export default function StatsGraph({ data }: { data: StatsData[] }) {
  const [graph, setGraph] = React.useState<GraphData[]>([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const graphData = data.map((item) => {
      return {
        x: item.title,
        y: +item.acessos,
      };
    });

    setTotal(data.map(({ acessos }) => +acessos).reduce((a, b) => a + b, 0));
    setGraph(graphData);
  }, [data]);

  return (
    <section className="mb-8 grid grid-cols-1 grid-rows-[auto_auto] gap-8 sm:mb-0 sm:grid-cols-2">
      <div className="col-[1] grid items-center rounded p-8 shadow-[0_10px_20px_rgba(0,0,0,.1)] sm:col-span-full">
        <p className="text-[2rem]">Acessos: {total}</p>
      </div>
      <div className="grid items-center rounded p-8 shadow-[0_10px_20px_rgba(0,0,0,.1)]">
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: "#fff",
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: "#333",
            },
          }}
        />
      </div>
      <div className="grid items-center rounded p-8 shadow-[0_10px_20px_rgba(0,0,0,.1)]">
        <VictoryChart>
          <VictoryBar alignment="start" data={graph} />
        </VictoryChart>
      </div>
    </section>
  );
}
