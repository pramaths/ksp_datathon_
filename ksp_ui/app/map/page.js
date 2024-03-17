import dynamic from 'next/dynamic';

// Import your MapComponent with SSR disabled
const MapComponentNoSSR = dynamic(() => import('../../components/Map'), {
  ssr: false, // This line is key to avoiding SSR for the map component
});

export default function Home() {
  return (
    <div>
        <MapComponentNoSSR /> {/* Use the dynamically imported component here */}
    </div>
  );
}
