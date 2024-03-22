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

//   const [showDetails, setShowDetails] = useState(false);

//   const summarizeCrimes = (crimes) => {
//     return crimes.map(crime => `${crime.CrimeGroup} - ${crime.CrimeHead}`).join(", ");
//   };

//   const toggleDetails = () => {
//     setShowDetails(prev => !prev);
//   };

//   return (
//     <div ref={drag} style={{ 
//         opacity: isDragging ? 0.5 : 1, 
//         padding: '10px', 
//         border: '1px solid #ccc', 
//         marginBottom: '10px',
//         backgroundColor: '#f9f9f9',
//         cursor: 'pointer',
//       }}>
//       <h3>{officer.name}</h3>
//       <button onClick={toggleDetails} style={{ 
//           marginBottom: '5px', 
//           cursor: 'pointer',
//           backgroundColor: '#ddd', 
//           border: 'none', 
//           padding: '5px 10px',
//           borderRadius: '5px'
//         }}>
//         {showDetails ? 'Hide Details ↑' : 'Show Details ↓'}
//       </button>
//       {showDetails && (
//         <div>
//           <p><strong>Case Count:</strong> {officer.caseCount}</p>
//           <p><strong>Arrested Count:</strong> {officer.arrestedCount}</p>
//           <p><strong>Conviction Count:</strong> {officer.convictionCount}</p>
//           <p><strong>Crimes:</strong> {summarizeCrimes(officer.crimes)}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OfficerCard;


const OfficerCard = ({ officer }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'officer',
    item: { id: officer.IOName },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const summarizeCrimes = (crimes) => {
    return crimes.map(crime => `${crime.CrimeGroup} - ${crime.CrimeHead}`).join(", ");
  };

  const showOfficerDetailsInAlert = () => {
    const details = `
      Name: ${officer.IOName}
      Case Count: ${officer.CaseCount}
      Arrested Count: ${officer.Total_Arrested_Count}
      Conviction Count: ${officer.Total_Conviction_Count}
      Crimes: ${summarizeCrimes(officer.Crime_Info)}
    `;
    alert(details.trim());
  };

  return (
    <div ref={drag} style={{ 
        opacity: isDragging ? 0.5 : 1, 
        padding: '10px', 
        // border: '1px solid #ccc', 
        marginBottom: '5px',
        backgroundColor: '#f9f9f9',
        cursor: 'pointer',
      }}>
      <h3>{officer.name}</h3>
      <button onClick={showOfficerDetailsInAlert} style={{ 
          // marginBottom: '5px', 
          cursor: 'pointer',
          backgroundColor: 'grey', 
          // border: 'none', 
          
          padding: '5px 10px',
          fontSize:'0.8rem',
          text:'white',
          borderRadius: '5px'
        }}>
       {officer.IOName}
      </button>
    </div>
  );
};

export default OfficerCard;
