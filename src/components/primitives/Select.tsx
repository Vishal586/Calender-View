// src/components/primitives/Select.tsx

import React from 'react';
import clsx from 'clsx';

export interface SelectOption<T = string> {
    value: T;
    label: string;
}

export interface SelectProps<T extends string | number = string>
    extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value'> {
    options: SelectOption<T>[];
    value: T;
    onChange: (value: T) => void;
    label?: string;
    placeholder?: string;
    className?: string; // This className is for the wrapper <div>
}

export function Select<T extends string | number = string>({
    options,
    value,
    onChange,
    label,
    placeholder,
    className,
    ...props
}: SelectProps<T>) {
    const id = React.useId();

    return (
        <div className={clsx('flex flex-col gap-1', className)}>
            {label && (
                <label htmlFor={id} className="text-sm font-medium mb-1">
                    {label}
                </label>
            )}
            <select
                id={id}
                className="border border-neutral-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 text-sm bg-white"
                value={value}
                onChange={e => onChange(e.target.value as T)}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}