import Image from "next/image";
import Homepage from '../components/Home'
import Bar from '../components/Bar'
import BubbleChart from "@/components/BubbleChart";
import dynamic from "next/dynamic";
import DataTable from "../components/DataTable";
import PolarAreaChart from "../components/PolarChart";
// import Tree from "../components/tree";
// import DistributedTree from '../components/DistributesTree'

// Import your MapComponent with SSR disabled
const MapComponentNoSSR = dynamic(() => import('../components/Map'), {
  ssr: false, // This line is key to avoiding SSR for the map component
});

const DistributedTree = dynamic(() => import('../components/DistributesTree'), {
  ssr: false, // This line is key to avoiding SSR for the map component
});
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <div className="flex w-full">
   <Homepage/>
   <Bar/>
   </div>
   <BubbleChart/>
   <div className="h-full">
<DistributedTree/>
</div>
<DataTable/>
<div className="flex justify-between">
  <div className="flex items-start">
<PolarAreaChart/>
</div>
<MapComponentNoSSR/>
</div>
    </main>
  );
}
