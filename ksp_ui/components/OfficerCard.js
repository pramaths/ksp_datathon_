import { useDrag } from 'react-dnd';
import { useState } from 'react';
// const OfficerCard = ({ officer }) => {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: 'officer',
//     item: { id: officer.IOName },
//     collect: monitor => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   }));

//   const summarizeCrimes = (crimes) => {
//     return crimes.map(crime => `${crime.CrimeGroup} - ${crime.CrimeHead}`).join(", ");
//   };

//   const showOfficerDetailsInAlert = () => {
//     const details = `
//       Name: ${officer.IOName}
//       Case Count: ${officer.CaseCount}
//       Arrested Count: ${officer.Total_Arrested_Count}
//       Conviction Count: ${officer.Total_Conviction_Count}
//       Crimes: ${summarizeCrimes(officer.Crime_Info)}
//     `;
//     alert(details.trim());
//   };

//   return (
//     <div ref={drag} style={{ 
//         opacity: isDragging ? 0.5 : 1, 
//         padding: '10px', 
//         // border: '1px solid #ccc', 
//         marginBottom: '5px',
//         backgroundColor: '#f9f9f9',
//         cursor: 'pointer',
//       }}>
//       <h3>{officer.name}</h3>
//       <button onClick={showOfficerDetailsInAlert} style={{ 
//           // marginBottom: '5px', 
//           cursor: 'pointer',
//           backgroundColor: 'grey', 
//           // border: 'none', 
          
//           padding: '5px 10px',
//           fontSize:'0.8rem',
//           text:'white',
//           borderRadius: '5px'
//         }}>
//        {officer.IOName}
//       </button>
//     </div>
//   );
// };

// export default OfficerCard;


// import React, { useState } from 'react';
import PolicePerformanceChart from './policepie'; // Adjust the import path as necessary

const OfficerCard = ({ officer }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'officer',
    item: { id: officer.IOName },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [showChart, setShowChart] = useState(false);

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, padding: '10px', marginBottom: '5px', backgroundColor: '#f9f9f9', cursor: 'pointer' }}>
      <h3>{officer.name}</h3>
      <button onClick={() => setShowChart(true)} style={{ cursor: 'pointer', backgroundColor: 'grey', padding: '5px 10px', fontSize:'0.8rem', color: 'white', borderRadius: '5px' }}>
        {officer.IOName}
      </button>
      {showChart && (
        <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -20%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px', zIndex: 100 }}>
          <PolicePerformanceChart officer={officer} />
          <button onClick={() => setShowChart(false)} style={{ marginTop: '10px' }}>Close</button>
        </div>
      )}
    </div>
  );
};

export default OfficerCard;