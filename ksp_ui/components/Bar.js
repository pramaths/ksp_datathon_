'use client'
import * as React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChartComponent = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.Year.toString()),
    datasets: [
      {
        label: 'FIR Count',
        data: data.map((item) => item.FIR_Count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'FIR Count',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChartComponent;