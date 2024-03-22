'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import OfficerCard from '../../components/OfficerCard';
import TaskCalendar from '../../components/TaskCalendar';

const Dashboard = () => {
  const [officers, setOfficers] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/io_details/Narayanapura%20PS')
      .then(res =>
        {
        setOfficers(res.data)})
      .catch(err => console.error(err));
  }, []);
console.log(officers)
  return (
    <div className='flex w-full overflow-hidden'>
    <DndProvider backend={HTML5Backend}>
      <div className='flex p-2 w-full'>
        <div className='flex flex-wrap bg-white w-1/4 items-center overflow-y-auto' style={{ maxHeight: '100vh' }}>
          {officers.map(officer => (
            <OfficerCard key={officer.IOName} officer={officer} />
          ))}
        </div>
        <div className='w-full' >
          <TaskCalendar/>
        </div>
      </div>
    </DndProvider>
  </div>
  
  );
};

export default Dashboard;
