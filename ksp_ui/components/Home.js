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
    <div className='border rounded-sm border-cyan-700'>
      <PieChart
        series={series}
        width={400}
        height={200}
      />
    </div>
  );
}