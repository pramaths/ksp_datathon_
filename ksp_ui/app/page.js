import Image from "next/image";
import Homepage from '../components/Home'
import Bar from '../components/Bar'
import BubbleChart from "@/components/BubbleChart";
import Tree from "../components/tree";
// import DistributedTree from '../components/DistributesTree'
const DistributedTree = dynamic(() => import('../components/DistributesTree'), {
  ssr: false, // This line is key to avoiding SSR for the map component
});
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
   <Homepage/>
   <Bar/>
   <BubbleChart/>
<DistributedTree/>
    </main>
  );
}
