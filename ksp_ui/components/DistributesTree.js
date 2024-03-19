'use client'
import React, { useEffect,useState } from 'react';
import ApexCharts from 'apexcharts';

const TreemapChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Function to fetch data from your API
    const fetchData = async () => {
      try {
        const response = await fetch('https://9f51-35-229-198-103.ngrok-free.app/data', {
          method: 'GET', // Specify the method
          headers: {
            'User-Agent': 'CustomUserAgent/1.0'
          },
        });
console.log("hey",data)
        // Transform data to the format expected by ApexCharts
        const transformedData = Object.entries(data).map(([key, value]) => ({
          x: key,
          y: parseInt(value.replace(' arrested', ''), 10), // assuming value is like "124 arrested"
        }));

        setChartData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  console.log(chartData)
  useEffect(() => {
    const options = {
      series: [{ data: chartData }],
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
  }, [chartData]);

  return <div id="chart"></div>;
};

export default TreemapChart;
