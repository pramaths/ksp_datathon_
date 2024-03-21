'use client'
import React, { useEffect, useState } from 'react';

import Tree from 'react-d3-tree';
const orgChart = {
  name: 'CEO',
  children: [
    {
      name: 'Manager',
      attributes: {
        department: 'Production',
      },
      children: [
        {
          name: 'Foreman',
          attributes: {
            department: 'Fabrication',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
        {
          name: 'Foreman',
          attributes: {
            department: 'Assembly',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
      ],
    },
  ],
};


export default function OrgChartTree() {
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Setting a minimum height for the container and adjusting the tree's translate property
  const containerStyles = {
    width: '100%',
    height: '600px', // Set a minimum height
    overflow: 'auto', // Add scrolling for smaller screens
  };

  // Adjusting initial translate and scale for better positioning
  const translate = {
    x: dimensions.width / 4,
    y: dimensions.height / 10,
  };

  return (
    <div id="treeWrapper" style={containerStyles}>
      <Tree
        data={orgChart}
        translate={translate}
        scaleExtent={{ min: 0.5, max: 2 }} // Optional: adjust scale limits for zooming
        orientation="horizontal" // Optional: change orientation
        // Additional customization here
      />
    </div>
  );
}
