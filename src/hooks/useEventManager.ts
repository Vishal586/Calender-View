import { useState, useCallback } from 'react';
import { CalendarEvent } from '../components/Calendar/CalendarView.types';

export const useEventManager = (initialEvents: CalendarEvent[] = []) => {
    const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

    const addEvent = useCallback((event: CalendarEvent) => {
        setEvents(prev => [...prev, event]);
    }, []);

    const updateEvent = useCallback((id: string, updates: Partial<CalendarEvent>) => {
        setEvents(prev =>
            prev.map(event =>
                event.id === id ? { ...event, ...updates } : event
            )
        );
    }, []);

    const deleteEvent = useCallback((id: string) => {
        setEvents(prev => prev.filter(event => event.id !== id));
    }, []);

    const getEvent = useCallback((id: string): CalendarEvent | undefined => {
        return events.find(event => event.id === id);
    }, [events]);

    return {
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        getEvent,
    };
};