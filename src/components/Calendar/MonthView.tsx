import React from 'react';
import { format } from 'date-fns';
import { getCalendarGrid, isSameDay, isToday, isSameMonth } from '../../utils/date.utils';
import { CalendarEvent } from './CalendarView.types';
import { EVENT_COLORS } from './CalendarView.types';

interface MonthViewProps {
    currentDate: Date;
    events: CalendarEvent[];
    selectedDate: Date | null;
    onDateClick: (date: Date) => void;
    onEventClick: (event: CalendarEvent) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const MonthView: React.FC<MonthViewProps> = ({
    currentDate,
    events,
    selectedDate,
    onDateClick,
    onEventClick,
}) => {
    const calendarGrid = React.useMemo(() => getCalendarGrid(currentDate), [currentDate]);

    const getEvents = (date: Date) =>
        events.filter(event => isSameDay(event.startDate, date));

    return (
        <div>
            {/* Day Names Header */}
            <div className="grid grid-cols-7 text-xs font-semibold text-neutral-500 mb-2">
                {WEEKDAYS.map(day => (
                    <div key={day} className="py-2 px-1 text-center">{day}</div>
                ))}
            </div>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-neutral-200 rounded-lg overflow-hidden">
                {calendarGrid.map((date, idx) => {
                    const dayEvents = getEvents(date);
                    const selected = selectedDate && isSameDay(selectedDate, date);
                    const today = isToday(date);
                    const currentMonth = isSameMonth(date, currentDate);

                    return (
                        <div
                            key={idx}
                            tabIndex={0}
                            role="gridcell"
                            aria-label={format(date, 'do MMM yyyy')}
                            className={`relative h-32 bg-white border border-neutral-200 hover:bg-neutral-50
                flex flex-col p-2 transition-colors outline-none
                ${selected ? 'ring-2 ring-primary-500 z-10' : ''}
                ${!currentMonth ? 'bg-neutral-50 text-neutral-400' : ''}
              `}
                            onClick={() => onDateClick(date)}
                            onKeyDown={e => (e.key === 'Enter' ? onDateClick(date) : undefined)}
                        >
                            {/* Date Number & Today Indicator */}
                            <div className="flex items-center justify-between mb-1">
                                <span
                                    className={`text-xs ${today ? 'font-bold' : 'font-medium'}`}
                                >
                                    {format(date, 'd')}
                                </span>
                                {today && (
                                    <span className="ml-auto w-6 h-6 flex items-center justify-center rounded-full bg-primary-500 text-white font-bold text-xs">
                                        Today
                                    </span>
                                )}
                            </div>

                            {/* Event Pills */}
                            <div className="flex flex-col gap-1 mt-1">
                                {dayEvents.slice(0, 3).map(event => (
                                    <button
                                        key={event.id}
                                        title={event.title}
                                        type="button"
                                        onClick={e => {
                                            e.stopPropagation();
                                            onEventClick(event);
                                        }}
                                        className="truncate text-xs px-2 py-1 rounded transition-colors"
                                        style={{
                                            backgroundColor: event.color ?? EVENT_COLORS[0],
                                            color: '#fff',
                                        }}
                                    >
                                        {event.title}
                                    </button>
                                ))}
                                {dayEvents.length > 3 && (
                                    <button
                                        type="button"
                                        className="text-xs mt-1 px-2 py-1 rounded bg-primary-600 text-white"
                                        onClick={e => e.stopPropagation()}
                                        tabIndex={-1}
                                    >
                                        +{dayEvents.length - 3} more
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};