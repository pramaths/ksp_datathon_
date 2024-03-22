import React, { useState,useEffect,useMemo } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import EventModal from './EventModal'
import axios from 'axios'
export default function DemoApp() {
  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentEvents, setCurrentEvents] = useState([])
  

  // Add the modal component state
const [isModalOpen, setIsModalOpen] = useState(false);
const [modalDefaultDate, setModalDefaultDate] = useState(null);

// Adjust handleDateSelect to manage the modal
const handleDateSelect = (selectInfo) => {
  setIsModalOpen(true);
  setModalDefaultDate(selectInfo);
};

useEffect(() => {
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:8000/events');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const events = await response.json();
      setCurrentEvents(events); // Assuming the backend returns an array of events
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  fetchEvents();
}, []);

const submitEventToServer = async (eventData) => {
  console.log("thjyhdthtyrt",eventData)
  try {
    const response = await fetch('http://localhost:8000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: eventData.title,
        description: eventData.description,
        assignedTo: eventData.assignedTo, // Assuming ioNames is an array of officer IDs
        start: eventData.start,
        end: eventData.end,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Submitted successfully:', data);
  } catch (error) {
    console.error('Error submitting event:', error);
  }
};

// Add a new function to handle the submission from the modal
const handleEventSubmit = (eventData) => {
  let calendarApi = modalDefaultDate.view.calendar;
  calendarApi.unselect(); // clear date selection
  setIsModalOpen(false); // Close the modal

  const newEvent = {
    id: createEventId(),
    title: eventData.title,
    description:eventData.description,
    start: eventData.start,
    end: eventData.end,
    assignedTo:eventData.ioNames,
    allDay: modalDefaultDate.allDay,
    extendedProps: {
      description: eventData.description,
      ioName: eventData.ioName,
    },
  };
  calendarApi.addEvent(newEvent);
  submitEventToServer(newEvent);
  
  setIsModalOpen(false);
};

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible)
  }

  function handleEventClick(clickInfo) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  function handleEvents(events) {
    setCurrentEvents(events)
  }
  const memoizedEvents = useMemo(() => currentEvents, [currentEvents]);
  return (
    <div className='demo-app w-full'>
      <Sidebar
        weekendsVisible={weekendsVisible}
        handleWeekendsToggle={handleWeekendsToggle}
        currentEvents={currentEvents}
      />
      <div className='demo-app-main w-full'>
        <FullCalendar
        key={currentEvents.length} 
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={currentEvents} // alternatively, use the `events` setting to fetch from a feed
          // events={currentEvents}
          // events={memoizedEvents}
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
        <EventModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSubmit={handleEventSubmit}
  defaultDate={modalDefaultDate}
/>
      </div>
    </div>
  )
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function Sidebar({ weekendsVisible, handleWeekendsToggle, currentEvents }) {
  return (
    <div className='demo-app-sidebar'>
      <div className='demo-app-sidebar-section'>
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div className='demo-app-sidebar-section'>
        <label>
          <input
            type='checkbox'
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
          ></input>
          toggle weekends
        </label>
      </div>
      <div className='demo-app-sidebar-section'>
        <h2>All Events ({currentEvents.length})</h2>
        <ul>
          {currentEvents.map((event) => (
            <SidebarEvent key={event.id} event={event} />
          ))}
        </ul>
      </div>
    </div>
  )
}

function SidebarEvent({ event }) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}
