// Main event interface
export interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    color?: string;
    category?: string;
}

// Main component props
export interface CalendarViewProps {
    events: CalendarEvent[];
    onEventAdd: (event: CalendarEvent) => void;
    onEventUpdate: (id: string, updates: Partial<CalendarEvent>) => void;
    onEventDelete: (id: string) => void;
    initialView?: 'month' | 'week';
    initialDate?: Date;
}

// Props for the EventModal
export interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (event: CalendarEvent) => void;
    onDelete?: (id: string) => void;
    event?: CalendarEvent | null;
    initialDate?: Date;
}

// Color and category constants
export const EVENT_COLORS = [
    '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6',
    '#ef4444', '#ec4899', '#06b6d4', '#f97316',
] as const;

export const EVENT_CATEGORIES = [
    'Meeting', 'Work', 'Personal', 'Design', 'Development', 'Other',
] as const;