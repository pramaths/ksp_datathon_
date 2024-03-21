
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const router = useRouter();
  const { unitName } = router.query;  // Accessing the dynamic route parameter

  useEffect(() => {
    if (unitName) {  // Ensure that the unitName parameter is not undefined
      const loadData = async () => {
        try {
          const response = await axios.get(`/data/${unitName}`);
          setData(response.data);
        } catch (error) {
          console.error("Could not fetch data", error);
        }
      };

      loadData();
    }
  }, [unitName]);  // Dependency array now depends on unitName

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};
