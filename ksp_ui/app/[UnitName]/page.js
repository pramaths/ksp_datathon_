'use client'
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Homepage from '../../components/Home';
import Bar from '../../components/Bar';
import BubbleChart from "@/components/BubbleChart";
import dynamic from "next/dynamic";
import DataTable from "../../components/DataTable";
import PolarAreaChart from "../../components/PolarChart";

const MapComponentNoSSR = dynamic(() => import('../../components/Map'), { ssr: false });
const DistributedTree = dynamic(() => import('../../components/DistributesTree'), { ssr: false });

export default function Home({ data }) {
  const router = useRouter();
  const { unitName } = router.query;
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

// Fetch data on the server-side before rendering the page
export async function getServerSideProps(context) {
  const { params } = context;
  const unitName = params.unitName; // Access URL parameter

  // Fetch data using the API endpoint and unitName
  const res = await fetch(`http://localhost:5000/data/${unitName}`); // Adjust the API endpoint as needed
  const data = await res.json();

  // Pass the fetched data as props
  return {
    props: { data },
  };
}
