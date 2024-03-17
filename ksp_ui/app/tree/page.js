
import Tree from "../../components/tree";
import dynamic from "next/dynamic";
const TreeComponentNoSSR = dynamic(() => import('../../components/tree'), {
    ssr: false, // This line is key to avoiding SSR for the map component
  });
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
<TreeComponentNoSSR/>
    </main>
  );
}
