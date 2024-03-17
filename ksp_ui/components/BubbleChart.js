 'use client'
// // components/BubbleChart.js
// import React from 'react';
// import { Bubble } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';

// const BubbleChart = () => {
//     const data = {
//         datasets: [{
//             label: 'First Dataset',
//             data: [
//                 { x: 20, y: 30, r: 15 },
//                 { x: 40, y: 10, r: 10 },
//                 { x: 25, y: 5, r: 5 },
//                 { x: 55, y: 50, r: 10 },
//                 { x: 45, y: 25, r: 15 },
//             ],
//             backgroundColor: 'rgba(255, 99, 132, 0.6)',
//         }]
//     };

//     const options = {
//         scales: {
//             x: {
//                 beginAtZero: true,
//             },
//             y: {
//                 beginAtZero: true,
//             },
//         },
//     };

//     return <Bubble data={data} options={options} />;
// };

// export default BubbleChart;
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

const BubbleChart = () => {
    // Modified to include raw data required by the colorize function
    const data = {
        datasets: [{
            label: 'First Dataset',
            data: [
                { x: 20, y: 30, v: 150 }, // Note: Added 'v' for opacity calculation
                { x: 40, y: 10, v: 100 },
                { x: 25, y: 5, v: 50 },
                { x: 55, y: 50, v: 100 },
                { x: 45, y: 25, v: 150 },
            ],
            backgroundColor: colorize.bind(null, false),
            borderColor: colorize.bind(null, true),
        }]
    };

    const options = {
        aspectRatio: 1,
        plugins: {
            legend: false,
            tooltip: false,
        },
        elements: {
            point: {
                borderWidth: function(context) {
                    return Math.min(Math.max(1, context.datasetIndex + 1), 8);
                },
                hoverBackgroundColor: 'transparent',
                hoverBorderColor: 'rgb(0, 0, 0)', // Modify as needed
                hoverBorderWidth: function(context) {
                    return Math.round(8 * context.raw.v / 1000);
                },
                radius: function(context) {
                    const size = context.chart.width;
                    const base = Math.abs(context.raw.v) / 1000;
                    return (size / 24) * base;
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bubble data={data} options={options} />;
};

export default BubbleChart;
