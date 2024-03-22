import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

const EventModal = ({ isOpen, onClose, onSubmit, defaultDate }) => {
  const [ioNames, setIoNames] = useState([]);

  const [, drop] = useDrop(() => ({
    accept: 'OFFICER',
    drop: (item) => {
      setIoNames((prevIoNames) => {
        // Prevent duplicates
        if (prevIoNames.includes(item.IOName)) {
          return prevIoNames;
        }
        return [...prevIoNames, item.IOName];
      });
    },
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    onSubmit({ title, description, ioNames, start: defaultDate.startStr, end: defaultDate.endStr });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" id="title" name="title" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" name="description" rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="ioName" className="block text-sm font-medium text-gray-700">ioName</label>
            <div ref={drop} className="p-4 border-2 border-dashed border-gray-200 rounded-md">
              {ioNames.length > 0 ? ioNames.join(', ') : 'Drag officers here'}
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
              Cancel
            </button>
            <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
