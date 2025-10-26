import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    isSameDay as fnsIsSameDay,
    isToday as fnsIsToday,
    isSameMonth as fnsIsSameMonth, // Added this import
} from 'date-fns';

// Get 42-cell calendar grid
export const getCalendarGrid = (date: Date): Date[] => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const grid: Date[] = [];
    let currentDate = startDate;

    while (currentDate <= endDate || grid.length < 42) {
        grid.push(new Date(currentDate));
        currentDate = addDays(currentDate, 1);
    }

    return grid.slice(0, 42);
};

// Get 7 days of the week
export const getWeekDates = (date: Date): Date[] => {
    const weekStart = startOfWeek(date);
    const weekDates: Date[] = [];
    for (let i = 0; i < 7; i++) {
        weekDates.push(addDays(weekStart, i));
    }
    return weekDates;
};

// Get 24-hour time slots
export const getTimeSlots = (): string[] => {
    const slots: string[] = [];
    for (let i = 0; i < 24; i++) {
        // Format as "12:00 AM", "1:00 AM", ..., "11:00 PM"
        const hour = i % 12;
        const ampm = i < 12 ? 'AM' : 'PM';
        const displayHour = hour === 0 ? 12 : hour;
        slots.push(`${displayHour}:00 ${ampm}`);
    }
    return slots;
};

// Check if date is today
export const isToday = (date: Date): boolean => fnsIsToday(date);

// Check if same day
export const isSameDay = (date1: Date, date2: Date): boolean =>
    fnsIsSameDay(date1, date2);

// Check if same month
export const isSameMonth = (date1: Date, date2: Date): boolean =>
    fnsIsSameMonth(date1, date2);

// Format date
export const formatDate = (date: Date, formatStr: string): string =>
    format(date, formatStr);