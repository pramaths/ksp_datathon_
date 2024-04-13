// components/SearchPage.js
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchPage() {
  const [input, setInput] = useState('');
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();  // Prevent the default form submit behavior
    // Navigate to the specific URL
    router.push(`/unitName/${encodeURIComponent(input)}`);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
    <div className="max-w-md w-full">
      <div className="bg-black shadow-lg rounded p-8">
        <form onSubmit={handleSubmit}>
          <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-900">Enter the Police Station Name:</label>
          <div className="flex items-center mb-4">
            <input
              type="text"
              id="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Narayanapura PS"
              className="w-full rounded border px-4 py-2 text-sm text-gray-900"
              onKeyPress={handleKeyPress}
              required
            />
            <button type="submit" className="ml-2 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  );
}
