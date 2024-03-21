'use client'
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie({ data }) {
  const series = [
    {
      data: data.map(item => ({
        id: item.Complaint_Mode,
        value: item.Count,
        label: item.Complaint_Mode,
      })),
    },
  ];

  return (
    <div className=''>
      <PieChart
        series={series}
        width={500}
        height={300}
      />
    </div>
  );
}