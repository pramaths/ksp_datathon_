import { useDrag } from "react-dnd";
import { useState } from "react";
import PolicePerformanceChart from "./policepie"; // Adjust the import path as necessary

const OfficerCard = ({ officer }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "OFFICER",
    item: { IOName: officer.IOName },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [showChart, setShowChart] = useState(false);

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: "10px",
        marginBottom: "5px",
        backgroundColor: "#f9f9f9",
        cursor: "pointer",
        zIndex: "100",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "50px",
      }}
    >
      <div className="w-full justify-around">
        <h3 className="w-full">{officer.IOName}</h3>
      </div>
      <button
        onClick={() => setShowChart(true)}
        style={{
          cursor: "pointer",
          backgroundColor: "black",
          padding: "5px 10px",
          fontSize: "0.8rem",
          color: "white",
          borderRadius: "5px",
        }}
      >
        Click here for perfromance
      </button>
      {showChart && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -20%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            zIndex: 100,
          }}
        >
          <PolicePerformanceChart officer={officer} />
          <button
            onClick={() => setShowChart(false)}
            style={{ marginTop: "10px" }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default OfficerCard;
