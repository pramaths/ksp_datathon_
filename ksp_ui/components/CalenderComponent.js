import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CalendarComponent = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the backend and format them for FullCalendar
    const fetchTasks = async () => {
      const { data } = await axios.get('/api/tasks');
      const formattedTasks = data.map(task => ({
        title: task.title,
        start: task.dueDate,
        // additional formatting as needed
      }));
      setTasks(formattedTasks);
    };

    fetchTasks();
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={tasks}
    />
  );
};

export default CalendarComponent;
