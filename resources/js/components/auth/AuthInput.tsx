import type { InputHTMLAttributes } from 'react';

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
};

export default function AuthInput({
    label,
    error,
    className = '',
    id,
    ...props
}: AuthInputProps) {
    const inputId = id ?? props.name;

    return (
        <div className="space-y-2">
            <label
                htmlFor={inputId}
                className="block text-xs font-semibold tracking-wide text-gray-700"
            >
                {label}
            </label>

            <input
                id={inputId}
                className={`h-12 w-full rounded-input border bg-white px-4 text-sm text-text-primary transition outline-none placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 ${
                    error
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                        : 'border-primary-200'
                } ${className}`}
                {...props}
            />

            {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
    );
}
