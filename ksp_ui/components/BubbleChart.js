'use client'
import React from 'react';
import { Bubble } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

// Custom colorize function for dynamic color calculation
function channelValue(x, y, values) {
  return x < 0 && y < 0 ? values[0] : x < 0 ? values[1] : y < 0 ? values[2] : values[3];
}

function colorize(opaque, context) {
  const value = context.raw;
  const x = value.x / 100;
  const y = value.y / 100;
  const r = channelValue(x, y, [250, 150, 50, 0]);
  const g = channelValue(x, y, [0, 50, 150, 250]);
  const b = channelValue(x, y, [0, 150, 150, 250]);
  const a = opaque ? 1 : 0.5 * value.v / 1000;
  return `rgba(${r},${g},${b},${a})`;
}

const BubbleChartComponent = ({ data }) => {
  const chartData = {
    datasets: [
      {
        label: 'Case Count',
        data: data.map(item => ({
          x: item.IOName.length,
          y: item.Cases,
          v: item.Cases,
          r: Math.sqrt(item.Cases) * 3,
        })),
        backgroundColor: colorize.bind(null, false),
        borderColor: colorize.bind(null, true),
      },
    ],
  };

  const options = {
    aspectRatio: 1,
    plugins: {
      legend: false,
      tooltip: {
        callbacks: {
          label: context => `IO Name: ${context.raw.x}, Cases: ${context.raw.y}`,
        },
      },
    },
    elements: {
      point: {
        borderWidth: function(context) {
          return Math.min(Math.max(1, context.datasetIndex + 1), 8);
        },
        hoverBackgroundColor: 'transparent',
        hoverBorderColor: 'rgb(0, 0, 0)',
        hoverBorderWidth: function(context) {
          return Math.round(8 * context.raw.v / 1000);
        },
        radius: function(context) {
          const size = context.chart.width;
          const base = Math.abs(context.raw.v) / 1000;
          return (size / 24) * base;
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'IO Name Length',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cases',
        },
      },
    },
  };

  return (
    <div className='w-full h-96'>
      <Bubble data={chartData} options={options} />
    </div>
  );
};

export default BubbleChartComponent;