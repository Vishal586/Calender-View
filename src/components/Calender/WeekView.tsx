import React from 'react';
import { format } from 'date-fns';
import { getWeekDates, getTimeSlots, isSameDay } from '../../utils/date.utils';
import { CalendarEvent } from './CalendarView.types';
import { EVENT_COLORS } from './CalendarView.types';

interface WeekViewProps {
    currentDate: Date;
    events: CalendarEvent[];
    onDateClick: (date: Date, time?: number) => void;
    onEventClick: (event: CalendarEvent) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
    currentDate,
    events,
    onDateClick,
    onEventClick,
}) => {
    const weekDates = React.useMemo(() => getWeekDates(currentDate), [currentDate]);
    const timeSlots = React.useMemo(() => getTimeSlots(), []);

    // Get events for given day
    const getEventsForDay = (date: Date) =>
        events.filter(event => isSameDay(event.startDate, date));

    return (
        <div className="overflow-x-auto">
            <div className="grid grid-cols-8 min-w-[900px]">
                {/* Time axis */}
                <div className="bg-neutral-50 border-r border-neutral-200 flex flex-col">
                    {timeSlots.map((slot, idx) => (
                        <div key={slot} className="h-12 px-2 text-xs text-neutral-500 flex items-center border-t border-neutral-100">
                            {slot}
                        </div>
                    ))}
                </div>
                {/* Week days */}
                {weekDates.map((date, colIdx) => (
                    <div key={colIdx} className="flex flex-col relative border-l border-neutral-200">
                        {/* Date header */}
                        <div className="sticky top-0 z-10 bg-white py-2 px-2 border-b border-neutral-200">
                            <span className={`font-semibold text-xs ${colIdx === 0 ? 'text-primary-600' : ''}`}>
                                {format(date, 'EEE, MMM d')}
                            </span>
                        </div>
                        {/* Time grid & events */}
                        <div className="relative">
                            {timeSlots.map((slot, rowIdx) => (
                                <div
                                    key={slot}
                                    className="h-12 border-t border-neutral-100 flex items-center"
                                    tabIndex={0}
                                    role="gridcell"
                                    aria-label={`${format(date, 'EEE MMM d')} ${slot}`}
                                    onClick={() => onDateClick(date, rowIdx)}
                                    onKeyDown={e => (e.key === 'Enter' ? onDateClick(date, rowIdx) : undefined)}
                                />
                            ))}
                            {/* Events positioned according to start/end time */}
                            {getEventsForDay(date).map(event => {
                                const startHour = event.startDate.getHours() + event.startDate.getMinutes() / 60;
                                const endHour = event.endDate.getHours() + event.endDate.getMinutes() / 60;
                                const topPx = startHour * 48; // 48px per hour slot
                                const heightPx = Math.max((endHour - startHour) * 48, 36);
                                return (
                                    <button
                                        key={event.id}
                                        title={event.title}
                                        type="button"
                                        onClick={e => {
                                            e.stopPropagation();
                                            onEventClick(event);
                                        }}
                                        className="absolute left-1 right-1 z-20 text-xs px-2 py-1 rounded shadow-card text-white"
                                        style={{
                                            top: topPx,
                                            height: heightPx,
                                            backgroundColor: event.color ?? EVENT_COLORS[0],
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {event.title}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};