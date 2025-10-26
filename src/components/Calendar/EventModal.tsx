// src/components/Calendar/EventModal.tsx

import React, { useEffect, useState } from 'react';
import { CalendarEvent, EventModalProps, EVENT_COLORS, EVENT_CATEGORIES } from './CalendarView.types';
import { Modal } from '../primitives/Modal';

export const EventModal: React.FC<EventModalProps> = ({
    isOpen,
    onClose,
    onSave,
    onDelete,
    event,
    initialDate,
}) => {
    // Fields
    const [title, setTitle] = useState(event?.title || '');
    const [description, setDescription] = useState(event?.description || '');
    const [startDate, setStartDate] = useState(event?.startDate || initialDate || new Date());
    const [endDate, setEndDate] = useState(event?.endDate || initialDate || new Date());
    const [color, setColor] = useState(event?.color || EVENT_COLORS[0]);
    const [category, setCategory] = useState(event?.category || EVENT_CATEGORIES[0]);
    const [error, setError] = useState<string | null>(null);

    // Reset form on open/close
    useEffect(() => {
        setTitle(event?.title || '');
        setDescription(event?.description || '');
        setStartDate(event?.startDate || initialDate || new Date());
        setEndDate(event?.endDate || initialDate || new Date());
        setColor(event?.color || EVENT_COLORS[0]);
        setCategory(event?.category || EVENT_CATEGORIES[0]);
        setError(null);
    }, [isOpen, event, initialDate]);

    const validate = () => {
        if (!title.trim()) return 'Event title is required';
        if (title.length > 100) return 'Title must be at most 100 characters';
        if (description.length > 500) return 'Description must be at most 500 characters';
        if (endDate <= startDate) return 'End date must be after start date';
        return null;
    };

    const handleSave = () => {
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }
        const newEvent: CalendarEvent = {
            id: event?.id ?? Math.random().toString(36).substr(2, 9),
            title: title.trim(),
            description: description.trim(),
            startDate,
            endDate,
            color,
            category,
        };
        onSave(newEvent);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={event ? "Edit Event" : "New Event"}>
            {/* Form */}
            <form
                className="flex flex-col gap-4"
                onSubmit={e => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <label className="font-medium text-sm">
                    Title<span className="text-error-500">*</span>
                    <input
                        type="text"
                        className="mt-1 block w-full border border-neutral-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                        value={title}
                        maxLength={100}
                        required
                        placeholder="Event title"
                        onChange={e => setTitle(e.target.value)}
                    />
                </label>
                <label className="font-medium text-sm">
                    Description
                    <textarea
                        className="mt-1 block w-full border border-neutral-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                        value={description}
                        maxLength={500}
                        placeholder="Event description"
                        onChange={e => setDescription(e.target.value)}
                    />
                </label>
                <div className="flex gap-4">
                    <label className="font-medium text-sm flex-1">
                        Start date/time
                        <input
                            type="datetime-local"
                            className="mt-1 block w-full border border-neutral-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                            value={
                                startDate
                                    ? new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000)
                                        .toISOString()
                                        .slice(0, 16)
                                    : ''
                            }
                            onChange={e => setStartDate(new Date(e.target.value))}
                            required
                        />
                    </label>
                    <label className="font-medium text-sm flex-1">
                        End date/time
                        <input
                            type="datetime-local"
                            className="mt-1 block w-full border border-neutral-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                            value={
                                endDate
                                    ? new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000)
                                        .toISOString()
                                        .slice(0, 16)
                                    : ''
                            }
                            onChange={e => setEndDate(new Date(e.target.value))}
                            required
                        />
                    </label>
                </div>
                <label className="font-medium text-sm">
                    Color
                    <div className="mt-1 flex gap-2">
                        {EVENT_COLORS.map((c, idx) => (
                            <button
                                key={c}
                                type="button"
                                className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-primary-500 shadow-card' : 'border-neutral-200'}`}
                                style={{ backgroundColor: c }}
                                aria-label={`Choose color ${idx + 1}`}
                                onClick={() => setColor(c)}
                            />
                        ))}
                    </div>
                </label>
                <label className="font-medium text-sm">
                    Category
                    <select
                        className="mt-1 block w-full border border-neutral-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                        value={category}
                        onChange={e => setCategory(e.target.value as typeof EVENT_CATEGORIES[number])}
                        required
                    >
                        {EVENT_CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </label>
                {error && <div className="text-error-500 text-xs mb-2">{error}</div>}
                <div className="flex items-center gap-3 justify-end mt-2">
                    {event && onDelete && (
                        <button
                            type="button"
                            className="bg-error-500 hover:bg-error-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                            onClick={() => onDelete(event.id)}
                        >
                            Delete
                        </button>
                    )}
                    <button
                        type="button"
                        className="bg-neutral-100 hover:bg-neutral-200 text-neutral-900 px-4 py-2 rounded-lg text-sm font-semibold"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                        Save Event
                    </button>
                </div>
            </form>
        </Modal>
    );
};