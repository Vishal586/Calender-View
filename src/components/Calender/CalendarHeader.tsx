import React from 'react';
import { format } from 'date-fns';
import { Button } from '../primitives/Button';

interface CalendarHeaderProps {
    currentDate: Date;
    view: 'month' | 'week';
    onPrevious: () => void;
    onNext: () => void;
    onToday: () => void;
    onToggleView: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
    currentDate,
    view,
    onPrevious,
    onNext,
    onToday,
    onToggleView,
}) => {
    return (
        <div className="flex flex-wrap items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
                <Button variant="secondary" onClick={onPrevious} aria-label="Previous">
                    &#8592;
                </Button>
                <Button variant="primary" onClick={onToday} aria-label="Go to Today">
                    Today
                </Button>
                <Button variant="secondary" onClick={onNext} aria-label="Next">
                    &#8594;
                </Button>
                <span className="ml-4 text-xl font-semibold">
                    {format(currentDate, view === 'month' ? 'MMMM yyyy' : 'do MMM, yyyy')}
                </span>
            </div>
            <Button
                variant="secondary"
                onClick={onToggleView}
                aria-label={`Switch to ${view === 'month' ? 'week' : 'month'} view`}
            >
                {view === 'month' ? 'Week View' : 'Month View'}
            </Button>
        </div>
    );
};