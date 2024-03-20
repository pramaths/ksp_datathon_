'use client'
import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';

const TreemapChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Begin loading
      try {
        const response = await fetch(' http://127.0.0.1:5000/data', {
          method: 'GET',
          headers: {
            'User-Agent': 'CustomUserAgent/1.0',
            'ngrok-skip-browser-warning': 125868
          },
        });
        const data = await response.json();
        console.log("hry",data)
        const transformedData = data.map(item => ({
          x: item.CrimeGroup_Name,
          y: Number(item['Total Arrested']), // Ensure the value is a number
        }));
        console.log("Transformed data:", transformedData);
        setChartData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (!loading && chartData.length > 0) {
      // Only proceed if loading is false and chartData is not empty
  
      // Define the options for ApexCharts
      const options = {
        series: [{
          data: chartData
        }],
        chart: {
          height: 550,
          type: 'treemap' // Make sure this type is supported
        },
        title: {
          text: 'Distributed Treemap (different color for each cell)',
          align: 'center'
        },
        colors: ['#3B93A5', '#F7B844', '#ADD8C7', '#EC3C65', '#C0ADDB'],
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false
          }
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#000'] // Sets the data label colors to black
          }
        },
        states: {
          hover: {
            filter: {
              type: 'darken',
              value: 1
            }
          }
        },
        tooltip: {
          style: {
            fontSize: '12px',
            fontFamily: undefined
          },
          y: {
            formatter: function (val) {
              return val;
            }
          }
        },
      };
  
      // Check if the chart container is present in the DOM
      const chartElement = document.querySelector("#chart");
      if (chartElement) {
        // Initialize the chart
        const chart = new ApexCharts(chartElement, options);
        chart.render();
  
        // Cleanup function to destroy chart on component unmount
        return () => chart.destroy();
      } else {
        console.error("The chart container element #chart was not found in the DOM.");
      }
    }
  }, [chartData, loading]); // Depend on both chartData and loading
  
  // The rest of your component remains unchanged
  
  if (loading) {
    return <div>Loading chart...</div>; // Show loading state
  }

  return <div id="chart"></div>;
};

export default TreemapChart;