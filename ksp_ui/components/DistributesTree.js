'use client'
import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const TreemapChart = () => {
  useEffect(() => {
    const options = {
      series: [
        {
          data: [
            { x: 'New Delhi', y: 218 },
            { x: 'Kolkata', y: 149 },
            // Add the rest of your data points here...
            { x: 'Kanpur', y: 29 }
          ]
        }
      ],
      legend: { show: false },
      chart: { height: 350, type: 'treemap' },
      title: { text: 'Distributed Treemap (different color for each cell)', align: 'center' },
      colors: [
        '#3B93A5', '#F7B844', '#ADD8C7', '#EC3C65',
        // Add the rest of your colors here...
        '#C0ADDB'
      ],
      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: false
        }
      }
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    // Optional: Cleanup function to destroy chart on component unmount
    return () => chart.destroy();
  }, []);

  return <div id="chart"></div>;
};

export default TreemapChart;
