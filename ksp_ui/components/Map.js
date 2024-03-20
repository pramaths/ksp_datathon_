'use client'

// import React, { useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet'; // Make sure L is imported for Leaflet
// import markerBlue from '../public/pin-blue.svg';

// const MapComponent = () => {
//   const position = [51.505, -0.09]; // Latitude and Longitude of London

//   useEffect(() => {
//     // This is not needed since we'll directly set the icon on the marker
//   }, []);
  
//   // Create a custom icon
//   const customIcon = new L.Icon({
//     iconUrl: '/pin-blue.svg',
//     iconSize: [25, 41], // Size of the icon
//     iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
//     popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
//     shadowSize: [41, 41] // Optional: Size of the shadow image
//   });

//   return (
//     <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={position} icon={customIcon}>
//         <Popup>
//           A pretty CSS3 popup. <br /> Easily customizable.
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default MapComponent;

import React from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.markercluster';

const crimeData = [
  { type: 'CYBER CRIME', location: [15.993124, 75.943519] },
  { type: 'PREVENTION OF DAMAGE TO PUBLIC PROPERTY ACT 1984', location: [0.0, 0.0] },
  { type: 'REPRESENTATION OF PEOPLE ACT 1951 & 1988', location: [0.0, 0.0] },
  { type: 'ANIMAL', location: [15.940025, 75.917794] },
  { type: 'ANTIQUES (CULTURAL PROPERTY)', location: [16.011294, 75.0632] },
  { type: 'ARSON', location: [15.976676, 75.910613] },
  // Add more data as needed
];

const crimeTypeColors = {
  'CYBER CRIME': 'blue',
  'PREVENTION OF DAMAGE TO PUBLIC PROPERTY ACT 1984': 'red',
  'REPRESENTATION OF PEOPLE ACT 1951 & 1988': 'green',
  'ANIMAL': 'purple',
  'ANTIQUES (CULTURAL PROPERTY)': 'orange',
  'ARSON': 'yellow',
  // Define more colors as needed
};
const getMarkerColor = (type) => {
  const colors = {
    'CYBER CRIME': 'blue',
    'PREVENTION OF DAMAGE TO PUBLIC PROPERTY ACT 1984': 'red',
    'REPRESENTATION OF PEOPLE ACT 1951 & 1988': 'green',
    'ANIMAL': 'purple',
    'ANTIQUES (CULTURAL PROPERTY)': 'orange',
    'ARSON': 'yellow',

  };
  return colors[type] || 'gray'; // Default color
};

const CrimeMarkers = () => {
  const map = useMap();

  React.useEffect(() => {
    const markers = L.markerClusterGroup();
    crimeData.forEach(crime => {
      const marker = L.marker(crime.location, {
        icon: L.divIcon({
          className: 'crime-marker',
          html: `<div style="background-color: ${getMarkerColor(crime.type)}; width: 10px; height: 10px; border-radius: 50%;"></div>`,
        }),
      });
      markers.addLayer(marker);
    });
    map.addLayer(markers);
    return () => {
      map.removeLayer(markers);
    };
  }, [map]);

  return null;
};

const MapComponent = () => {
  return (
    <MapContainer center={[15.993124, 75.943519]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <CrimeMarkers />
    </MapContainer>
  );
};

export default MapComponent;
