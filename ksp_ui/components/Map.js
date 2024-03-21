import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

const stringToHashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const character = str.charCodeAt(i);
    hash = (hash << 5) - hash + character;
    hash &= hash; // Convert to 32bit integer
  }
  return hash;
};

const getMarkerColor = (crimeType) => {
  const hash = stringToHashCode(crimeType);
  const color = `hsl(${Math.abs(hash) % 360}, 70%, 60%)`;
  return color;
};

const useCrimeMarkers = (crimeData, map) => {
  React.useEffect(() => {
    if (!map || !crimeData) return;

    const markers = L.markerClusterGroup();
    crimeData.forEach((crimeGroup) => {
      (crimeGroup.Locations || []).forEach((location) => {
        const marker = L.marker([location.Latitude, location.Longitude], {
          icon: L.divIcon({
            className: 'crime-marker',
            html: `<div style="background-color: ${getMarkerColor(crimeGroup.CrimeGroup_Name)}; 
            width: auto; 
            padding: 2px 4px; 
            border-radius: 5px; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            color: black;
            white-space: nowrap;
            font-size: 0.5rem;">${crimeGroup.CrimeGroup_Name}</div>`,
}),
        });
        markers.addLayer(marker);
      });
    });
    map.addLayer(markers);

    return () => {
      if (map) map.removeLayer(markers);
    };
  }, [crimeData, map]);
};

const CrimeMarkers = ({ crimeData }) => {
  const map = useMap();
  useCrimeMarkers(crimeData, map);
  return null;
};

const MapComponent = ({ data }) => {
  return (
    <MapContainer center={[15.993124, 75.943519]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <CrimeMarkers crimeData={data} />
    </MapContainer>
  );
};

export default MapComponent;
