'use client'
// import React, { useEffect,useState } from 'react';
// import ApexCharts from 'apexcharts';

// const TreemapChart = () => {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     // Function to fetch data from your API
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://ef6c-34-136-255-126.ngrok-free.app/data', {
//           method: 'GET', // Specify the method
//           headers: {
//             'User-Agent': 'CustomUserAgent/1.0',
//             'ngrok-skip-browser-warning': 125868 
//           },
//         });
//         const data= await response.json()
// console.log("hey",data)
//         // Transform data to the format expected by ApexCharts
//         const transformedData = Object.entries(data).map(([key, value]) => ({
//           x: key,
//           y: parseInt(value.replace(' arrested', ''), 10), // assuming value is like "124 arrested"
//         }));

//         setChartData(transformedData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   console.log("heyyy",chartData)
//   useEffect(() => {
//     console.log("ChartData after state update: ", chartData);
//     const options = {
//       series: [{ data: chartData }],
//       legend: { show: false },
//       chart: { height: 350, type: 'treemap' },
//       title: { text: 'Distributed Treemap (different color for each cell)', align: 'center' },
//       colors: [
//         '#3B93A5', '#F7B844', '#ADD8C7', '#EC3C65',
//         // Add the rest of your colors here...
//         '#C0ADDB'
//       ],
//       plotOptions: {
//         treemap: {
//           distributed: true,
//           enableShades: false
//         }
//       }
//     };

//     const chart = new ApexCharts(document.querySelector("#chart"), options);
//     chart.render();

//     // Optional: Cleanup function to destroy chart on component unmount
//     return () => chart.destroy();
//   }, [chartData]);

//   return <div id="chart"></div>;
// };

// export default TreemapChart;
import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';

const TreemapChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Begin loading
      try {
        const response = await fetch('https://5c2d-34-125-27-67.ngrok-free.app/data', {
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
          height: 350,
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
        // ... any other options you need
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