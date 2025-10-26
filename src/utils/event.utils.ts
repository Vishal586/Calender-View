import { CalendarEvent } from '../components/Calendar/CalendarView.types';
import { isSameDay } from './date.utils';

// Get events for specific date
export const getEventsForDate = (
    events: CalendarEvent[],
    date: Date
): CalendarEvent[] => {
    return events.filter(event =>
        isSameDay(event.startDate, date)
    );
};

// Get events for date range
export const getEventsForDateRange = (
    events: CalendarEvent[],
    startDate: Date,
    endDate: Date
): CalendarEvent[] => {
    return events.filter(event =>
        event.startDate >= startDate && event.startDate <= endDate
    );
};

// Sort events by start date
export const sortEventsByDate = (events: CalendarEvent[]): CalendarEvent[] => {
    return [...events].sort((a, b) =>
        a.startDate.getTime() - b.startDate.getTime()
    );
};

// Validate event
export const validateEvent = (event: Partial<CalendarEvent>): string | null => {
    if (!event.title || event.title.trim().length === 0) {
        return 'Title is required';
    }
    if (event.title.length > 100) {
        return 'Title must be less than 100 characters';
    }
    if (event.description && event.description.length > 500) {
        return 'Description must be less than 500 characters';
    }
    if (event.startDate && event.endDate && event.endDate <= event.startDate) {
        return 'End date must be after start date';
    }
    return null;
};