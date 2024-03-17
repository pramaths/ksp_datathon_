import Image from "next/image";
import Homepage from '../components/Home'
import Bar from '../components/Bar'
import BubbleChart from "@/components/BubbleChart";
import Tree from "../components/tree";
import DistributedTree from '../components/DistributesTree'
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
