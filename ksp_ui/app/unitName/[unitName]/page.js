'use client';
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

export default function unitName({ params }) {
  const router = useRouter();
  const [data, setData] = useState(null);

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
      fetchData();
    }
  }, [params.id]);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse">
        <div className="text-white text-4xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <main className="bg-gradient-to-br from-indigo-500 to-blue-500 min-h-screen p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 hover:scale-105 transition-transform duration-300">
          <Homepage data={data.pie_chart_data} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 hover:scale-105 transition-transform duration-300">
          <Bar data={data.bar_chart_data} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 hover:scale-105 transition-transform duration-300">
          <BubbleChart data={data.bubble_chart_data} />
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6 hover:scale-105 transition-transform duration-300">
        <DistributedTree data={data.tree_data} />
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6 hover:scale-105 transition-transform duration-300">
        <DataTable data={data} />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 hover:scale-105 transition-transform duration-300">
          <PolarAreaChart />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 hover:scale-105 transition-transform duration-300">
          <Map data={data.map_locations} />
        </div>
      </div>
    </main>
  );
}

// 'use client'
// import { useRouter } from 'next/navigation';
// import Image from "next/image";
// import Homepage from '../../../components/Home';
// import Bar from '../../../components/Bar';
// import BubbleChart from "@/components/BubbleChart";
// import dynamic from "next/dynamic";
// import DataTable from "../../../components/DataTable";
// import PolarAreaChart from "../../../components/PolarChart";
// import { useEffect, useState } from 'react';

// const Map = dynamic(() => import('../../../components/Map'), { ssr: false });
// const DistributedTree = dynamic(() => import('../../../components/DistributesTree'), { ssr: false });

// export default function unitName({params}) {
//     const router = useRouter();
//     const [data, setData] = useState(null);
//     console.log(params)
//     useEffect(() => {
//       if (params.unitName) {
//         const encoded = params.unitName;
// const decoded = decodeURIComponent(encoded);
//         const fetchData = async () => {
//           try {
//             const response = await fetch(`http://127.0.0.1:5000/data/${decoded}`);
//             const newData = await response.json();
//             setData(newData);
//           } catch (error) {
//             console.error('Error fetching data:', error);
//           }
//         };
//         fetchData()
//       }
    
//   }, [params.id]);
//   if (!data) {
//     return <div>Loading...</div>;
//   }
//   // console.log("Data before passing to MapComponentNoSSR:", data.map_locations);
//   console.log(data)
//   return (
//     <main className="flex min-h-screen flex-col justify-between p-24 bg-white overflow-hidden">
//       <div className="flex w-full h-96">
//         <div className='mr-4'>
//         <Homepage data={data.pie_chart_data} />
//         </div>
//         <Bar data={data.bar_chart_data} />
//       </div>
//       <BubbleChart data={data.bubble_chart_data} />
      
//       <div className="h-full">
//         <DistributedTree data={data.tree_data} />
//       </div>
//       <DataTable data={data} />
//       <div className="flex justify-between">
//         <div className="flex items-start border shadow-xl justify-start">
//           <PolarAreaChart />
//         </div>
//         <Map data={data.map_locations} />
//       </div>
//     </main>
//   );
// }
