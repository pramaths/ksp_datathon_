'use client'
// import React, { useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import markerBlue from '../public/pin-blue.svg';
// const MapComponent = () => {
//   const position = [51.505, -0.09]; // Latitude and Longitude of London
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const L = require('leaflet');
  
//       // Ensure these paths are correctly resolved in your project
//       const iconRetinaUrl = require('leaflet/dist/images/marker-icon-2x.png');
//       const iconUrl = require('leaflet/dist/images/marker-icon.png');
//       const shadowUrl = require('leaflet/dist/images/marker-shadow.png');
  
//       L.Icon.Default.mergeOptions({
//         iconRetinaUrl: markerBlue,
//         iconUrl: markerBlue,
//         shadowUrl: shadowUrl,
//       });
//     }
//   }, []);
  
//   return (
//     <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={position}>
//         <Popup>
//           A pretty CSS3 popup. <br /> Easily customizable.
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default MapComponent;

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Make sure L is imported for Leaflet
import markerBlue from '../public/pin-blue.svg';

const MapComponent = () => {
  const position = [51.505, -0.09]; // Latitude and Longitude of London

  useEffect(() => {
    // This is not needed since we'll directly set the icon on the marker
  }, []);
  
  // Create a custom icon
  const customIcon = new L.Icon({
    iconUrl: '/pin-blue.svg',
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
    shadowSize: [41, 41] // Optional: Size of the shadow image
  });

  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
