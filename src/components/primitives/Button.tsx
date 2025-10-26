import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...props
}) => {
    const baseStyles = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
        primary: 'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500',
        secondary: 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 focus:ring-neutral-500',
        danger: 'bg-error-500 hover:bg-error-600 text-white focus:ring-error-500',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button
            className={clsx(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
};