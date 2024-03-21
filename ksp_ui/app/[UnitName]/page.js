'use client'
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Homepage from '../../components/Home';
import Bar from '../../components/Bar';
import BubbleChart from "@/components/BubbleChart";
import dynamic from "next/dynamic";
import DataTable from "../../components/DataTable";
import PolarAreaChart from "../../components/PolarChart";
import { useEffect, useState } from 'react';

const MapComponentNoSSR = dynamic(() => import('../../components/Map'), { ssr: false });
const DistributedTree = dynamic(() => import('../../components/DistributesTree'), { ssr: false });

export default function Home({ data }) {
  const router = useRouter();
  const { unitName } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (unitName) { // Ensure unitName is not undefined
        const response = await fetch(`/data/${unitName}`);
        const newData = await response.json();
        setData(newData);
      }
    }

    fetchData();
  }, [unitName]); // Re-run the effect only if unitName changes

  // Conditional rendering to wait for data to be fetched
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <main className="flex min-h-screen flex-col justify-between p-24 bg-white">
      <div className="flex w-full">
        <Homepage data={data.pie_chart_data} />
        <Bar data={data.bar_chart_data} />
      </div>
      <BubbleChart data={data.bubble_chart_data} />
      <div className="h-full">
        <DistributedTree data={data.tree_data} />
      </div>
      <DataTable data={data} />
      <div className="flex justify-between">
        <div className="flex items-start border shadow-xl justify-start">
          <PolarAreaChart data={data} />
        </div>
        <MapComponentNoSSR data={data.map_locations} />
      </div>
    </main>
  );
}
