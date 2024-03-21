'use client'
import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const TreemapChart = ({ data }) => {
  useEffect(() => {
    if (data.length > 0) {
      const transformedData = data.map(item => ({
        x: item.CrimeGroup_Name,
        y: Number(item['Total Arrested']),
      }));

      // Define the options for ApexCharts
      const options = {
        series: [
          {
            data: transformedData,
          },
        ],
        chart: {
          height: 600,
          type: 'treemap', // Make sure this type is supported
        },
        title: {
          text: 'Distributed Treemap (different color for each cell)',
          align: 'center',
        },
        colors: ['#3B93A5', '#F7B844', '#ADD8C7', '#EC3C65', '#C0ADDB'],
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false,
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#000'], // Sets the data label colors to black
          },
        },
        states: {
          hover: {
            filter: {
              type: 'darken',
              value: 1,
            },
          },
        },
        tooltip: {
          style: {
            fontSize: '12px',
            fontFamily: undefined,
          },
          y: {
            formatter: function (val) {
              return val;
            },
          },
        },
      };

      // Check if the chart container is present in the DOM
      const chartElement = document.querySelector('#chart');
      if (chartElement) {
        // Initialize the chart
        const chart = new ApexCharts(chartElement, options);
        chart.render();

        // Cleanup function to destroy chart on component unmount
        return () => chart.destroy();
      } else {
        console.error('The chart container element #chart was not found in the DOM.');
      }
    }
  }, [data]); // Depend on data prop

  return <div id="chart"></div>;
};

export default TreemapChart;