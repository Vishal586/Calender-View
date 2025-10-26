import React, { useEffect } from 'react';
import clsx from 'clsx';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    className?: string;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    className,
}) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                className={clsx(
                    'relative bg-white rounded-xl shadow-modal p-6 max-w-2xl w-full mx-4',
                    'animate-slide-up',
                    className
                )}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <h2
                    id="modal-title"
                    className="text-2xl font-semibold text-neutral-900 mb-4"
                >
                    {title}
                </h2>
                {children}
            </div>
        </div>
    );
};