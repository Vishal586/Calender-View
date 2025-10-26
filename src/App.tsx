// src/App.tsx

import React, { useState } from 'react';
import { CalendarView } from './components/Calendar/CalendarView';
import { CalendarEvent } from './components/Calendar/CalendarView.types';

// Sample events to populate calendar
const sampleEvents: CalendarEvent[] = [
  {
    id: 'evt1',
    title: 'Team Standup',
    description: 'Daily sync',
    startDate: new Date(2025, 9, 26, 9, 0),
    endDate: new Date(2025, 9, 26, 9, 30),
    color: '#3b82f6',
    category: 'Meeting',
  },
  {
    id: 'evt2',
    title: 'Design Review',
    description: 'Review designs',
    startDate: new Date(2025, 9, 26, 14, 0),
    endDate: new Date(2025, 9, 26, 15, 30),
    color: '#10b981',
    category: 'Design',
  },
  {
    id: 'evt3',
    title: 'Development Sprint',
    description: 'Sprint work',
    startDate: new Date(2025, 9, 28, 9, 0),
    endDate: new Date(2025, 9, 28, 17, 0),
    color: '#8b5cf6',
    category: 'Work',
  },
  // Add more events as needed...
];

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);

  // CRUD handlers for events
  const handleEventAdd = (event: CalendarEvent) => {
    setEvents((prev) => [...prev, event]);
  };

  const handleEventUpdate = (id: string, updates: Partial<CalendarEvent>) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, ...updates } : ev))
    );
  };

  const handleEventDelete = (id: string) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      <CalendarView
        events={events}
        onEventAdd={handleEventAdd}
        onEventUpdate={handleEventUpdate}
        onEventDelete={handleEventDelete}
        initialView="month"
        initialDate={new Date(2025, 9, 26)}
      />
    </div>
  );
}

export default App;