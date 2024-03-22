import React from 'react';
import { Chart, ArcElement, Tooltip, Legend, PieController } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register the components
Chart.register(ArcElement, Tooltip, Legend, PieController);

const PolicePerformanceChart = ({ officer }) => {
  const data = {
    labels: ['Case Count', 'Arrested Count', 'Conviction Count'],
    datasets: [
      {
        data: [officer.CaseCount, officer.Total_Arrested_Count, officer.Total_Conviction_Count],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PolicePerformanceChart;
