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
                className="block text-xs font-semibold tracking-wide text-neutral-700"
            >
                {label}
            </label>

            <input
                id={inputId}
                className={`h-12 w-full rounded-lg border bg-white px-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/5 ${
                    error ? 'border-red-400' : 'border-neutral-200'
                } ${className}`}
                {...props}
            />

            {error && (
                <p className="text-xs text-red-500">{error}</p>
            )}
        </div>
    );
}