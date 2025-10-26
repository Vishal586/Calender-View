import { useState, useCallback } from 'react';
import { addMonths, subMonths, addWeeks, subWeeks } from 'date-fns';

type ViewType = 'month' | 'week';

interface CalendarState {
    currentDate: Date;
    view: ViewType;
    selectedDate: Date | null;
    isModalOpen: boolean;
}

export const useCalendar = (
    initialDate: Date = new Date(),
    initialView: ViewType = 'month'
) => {
    const [state, setState] = useState<CalendarState>({
        currentDate: initialDate,
        view: initialView,
        selectedDate: null,
        isModalOpen: false,
    });

    const handleNext = useCallback(() => {
        setState(prev => ({
            ...prev,
            currentDate: prev.view === 'month'
                ? addMonths(prev.currentDate, 1)
                : addWeeks(prev.currentDate, 1),
        }));
    }, []);

    const handlePrevious = useCallback(() => {
        setState(prev => ({
            ...prev,
            currentDate: prev.view === 'month'
                ? subMonths(prev.currentDate, 1)
                : subWeeks(prev.currentDate, 1),
        }));
    }, []);

    const handleToday = useCallback(() => {
        setState(prev => ({ ...prev, currentDate: new Date() }));
    }, []);

    const toggleView = useCallback(() => {
        setState(prev => ({
            ...prev,
            view: prev.view === 'month' ? 'week' : 'month'
        }));
    }, []);

    const openModal = useCallback((date: Date | null = null) => {
        setState(prev => ({
            ...prev,
            isModalOpen: true,
            selectedDate: date
        }));
    }, []);

    const closeModal = useCallback(() => {
        setState(prev => ({
            ...prev,
            isModalOpen: false,
            selectedDate: null
        }));
    }, []);

    return {
        ...state,
        handleNext,
        handlePrevious,
        handleToday,
        toggleView,
        openModal,
        closeModal,
    };
};