'use client'
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Homepage from '../../../components/Home';
import Bar from '../../../components/Bar';
import BubbleChart from "@/components/BubbleChart";
import dynamic from "next/dynamic";
import DataTable from "../../../components/DataTable";
import PolarAreaChart from "../../../components/PolarChart";
import { useEffect, useState } from 'react';

const Map = dynamic(() => import('../../../components/Map'), { ssr: false });
const DistributedTree = dynamic(() => import('../../../components/DistributesTree'), { ssr: false });

export default function unitName({params}) {
    const router = useRouter();
    const [data, setData] = useState(null);
    console.log(params)
    useEffect(() => {
      if (params.unitName) {
        const encoded = params.unitName;
const decoded = decodeURIComponent(encoded);
        const fetchData = async () => {
          try {
            const response = await fetch(`http://127.0.0.1:5000/data/${decoded}`);
            const newData = await response.json();
            setData(newData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData()
      }
    
  }, [params.id]);
  if (!data) {
    return <div>Loading...</div>;
  }
  // console.log("Data before passing to MapComponentNoSSR:", data.map_locations);
  console.log(data)
  return (
    <main className="flex min-h-screen flex-col justify-between p-24 bg-white overflow-hidden">
      <div className="flex w-full h-96">
        <div className='mr-4'>
        <Homepage data={data.pie_chart_data} />
        </div>
        <Bar data={data.bar_chart_data} />
      </div>
      <BubbleChart data={data.bubble_chart_data} />
      
      <div className="h-full">
        <DistributedTree data={data.tree_data} />
      </div>
      <DataTable data={data} />
      <div className="flex justify-between">
        <div className="flex items-start border shadow-xl justify-start">
          <PolarAreaChart />
        </div>
        <Map data={data.map_locations} />
      </div>
    </main>
  );
}
