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

// import React from 'react';
// import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import 'leaflet.markercluster';

// const CrimeMarkers = () => {
//   const map = useMap();

//   React.useEffect(() => {
//     const markers = L.markerClusterGroup();
//     crimeData.forEach(crime => {
//       const marker = L.marker(crime.location, {
//         icon: L.divIcon({
//           className: 'crime-marker',
//           html: `<div style="background-color: ${getMarkerColor(crime.type)}; width: 10px; height: 10px; border-radius: 50%;"></div>`,
//         }),
//       });
//       markers.addLayer(marker);
//     });
//     map.addLayer(markers);
//     return () => {
//       map.removeLayer(markers);
//     };
//   }, [map]);

//   return null;
// };

// const MapComponent = () => {
//   return (
//     <MapContainer center={[15.993124, 75.943519]} zoom={13} style={{ height: '400px', width: '100%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <CrimeMarkers />
//     </MapContainer>
//   );
// };

// export default MapComponent;


import React from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.markercluster';

const CrimeMarkers = ({ crimeData }) => {
  const map = useMap();

  React.useEffect(() => {
    const markers = L.markerClusterGroup();

    crimeData.map_locations.forEach((crimeGroup) => {
      crimeGroup.Locations.forEach((location) => {
        const marker = L.marker([location.Latitude, location.Longitude], {
          icon: L.divIcon({
            className: 'crime-marker',
            html: `<div style="background-color: ${getMarkerColor(crimeGroup.CrimeGroup_Name)}; width: 10px; height: 10px; border-radius: 50%;"></div>`,
          }),
        });
        markers.addLayer(marker);
      });
    });

    map.addLayer(markers);

    return () => {
      map.removeLayer(markers);
    };
  }, [map, crimeData]);

  return null;
};

const getMarkerColor = (crimeType) => {
  const crimeColors = {
    'CYBER CRIME': 'red',
    'ATTEMPT TO MURDER': 'blue',
    'BURGLARY - DAY': 'green',
    'CASES OF HURT': 'yellow',
    'CHEATING': 'purple',
    'CRIMES RELATED TO WOMEN': 'orange',
    'CRUELTY BY HUSBAND': 'pink',
    'KARNATAKA POLICE ACT 1963': 'brown',
    'KIDNAPPING AND ABDUCTION': 'teal',
    'Karnataka State Local Act': 'lime',
    'MISSING PERSON': 'maroon',
    'MOLESTATION': 'navy',
    'MOTOR VEHICLE ACCIDENTS FATAL': 'olive',
    'MOTOR VEHICLE ACCIDENTS NON-FATAL': 'fuchsia',
    'POCSO': 'indigo',
    'RAPE': 'crimson',
    'RIOTS': 'darkgreen',
    'SCHEDULED CASTE AND THE SCHEDULED TRIBES ': 'darkred',
  };

  return crimeColors[crimeType] || 'gray';
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