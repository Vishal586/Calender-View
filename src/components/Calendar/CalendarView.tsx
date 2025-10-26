import React from 'react';
import { CalendarViewProps, CalendarEvent } from './CalendarView.types';
import { useCalendar } from '../../hooks/useCalendar';
import { CalendarHeader } from './CalendarHeader';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { EventModal } from './EventModal';

export const CalendarView: React.FC<CalendarViewProps> = ({
    events,
    onEventAdd,
    onEventUpdate,
    onEventDelete,
    initialView = 'month',
    initialDate,
}) => {
    const {
        currentDate,
        view,
        selectedDate,
        isModalOpen,
        handleNext,
        handlePrevious,
        handleToday,
        toggleView,
        openModal,
        closeModal,
    } = useCalendar(initialDate, initialView);

    const [selectedEvent, setSelectedEvent] = React.useState<CalendarEvent | null>(null);

    const handleDateClick = (date: Date) => {
        setSelectedEvent(null);
        openModal(date);
    };

    const handleEventClick = (event: CalendarEvent) => {
        setSelectedEvent(event);
        openModal(event.startDate);
    };

    const handleSave = (event: CalendarEvent) => {
        if (selectedEvent) {
            onEventUpdate(selectedEvent.id, event);
        } else {
            onEventAdd(event);
        }
        closeModal();
        setSelectedEvent(null);
    };

    const handleDelete = (id: string) => {
        onEventDelete(id);
        closeModal();
        setSelectedEvent(null);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <CalendarHeader
                currentDate={currentDate}
                view={view}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onToday={handleToday}
                onToggleView={toggleView}
            />

            {view === 'month' ? (
                <MonthView
                    currentDate={currentDate}
                    events={events}
                    selectedDate={selectedDate}
                    onDateClick={handleDateClick}
                    onEventClick={handleEventClick}
                />
            ) : (
                <WeekView
                    currentDate={currentDate}
                    events={events}
                    onDateClick={handleDateClick}
                    onEventClick={handleEventClick}
                />
            )}

            <EventModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={handleSave}
                onDelete={handleDelete}
                event={selectedEvent}
                initialDate={selectedDate || undefined}
            />
        </div>
    );
};