// src/components/Calendar/CalendarView.stories.tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { CalendarView } from './CalendarView';
import { CalendarEvent } from './CalendarView.types';

// Sample events data
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
    // ...add more diverse test events as needed
];

// Storybook config
const meta: Meta<typeof CalendarView> = {
    title: 'Components/Calendar/CalendarView',
    component: CalendarView,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof CalendarView>;

// Utility to create controlled state for events in stories
const useStoryEvents = (initial: CalendarEvent[]) => {
    const [events, setEvents] = React.useState<CalendarEvent[]>(initial);

    const add = (event: CalendarEvent) => setEvents(evs => [...evs, event]);
    const update = (id: string, updates: Partial<CalendarEvent>) =>
        setEvents(evs => evs.map(ev => (ev.id === id ? { ...ev, ...updates } : ev)));
    const remove = (id: string) =>
        setEvents(evs => evs.filter(ev => ev.id !== id));

    return { events, add, update, remove };
};

export const Default: Story = {
    render: () => {
        const { events, add, update, remove } = useStoryEvents(sampleEvents);
        return (
            <CalendarView
                events={events}
                onEventAdd={add}
                onEventUpdate={update}
                onEventDelete={remove}
                initialView="month"
                initialDate={new Date(2025, 9, 26)}
            />
        );
    },
    name: 'Default (Month View)',
};

export const WeekView: Story = {
    render: () => {
        const { events, add, update, remove } = useStoryEvents(sampleEvents);
        return (
            <CalendarView
                events={events}
                onEventAdd={add}
                onEventUpdate={update}
                onEventDelete={remove}
                initialView="week"
                initialDate={new Date(2025, 9, 26)}
            />
        );
    },
    name: 'Week View',
};

export const ManyEvents: Story = {
    render: () => {
        // Add 8+ events to the same day to demo +X more
        const moreEvents = [
            ...sampleEvents,
            ...Array.from({ length: 8 }).map((_, i) => ({
                id: `evtX${i}`,
                title: `Overflow ${i + 1}`,
                description: `Demo overflow event ${i + 1}`,
                startDate: new Date(2025, 9, 26, 10 + i, 0),
                endDate: new Date(2025, 9, 26, 10 + i, 30),
                color: '#f59e0b', // Different color for clarity
                category: 'Work',
            })),
        ];
        const { events, add, update, remove } = useStoryEvents(moreEvents);

        return (
            <CalendarView
                events={events}
                onEventAdd={add}
                onEventUpdate={update}
                onEventDelete={remove}
                initialView="month"
                initialDate={new Date(2025, 9, 26)}
            />
        );
    },
    name: 'Many Events Overflow',
};
