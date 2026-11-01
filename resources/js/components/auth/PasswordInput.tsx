
import { useState } from 'react';
import Icon from '../Icon';

interface PasswordInputProps {
    label: string;
    name: string;
    placeholder?: string;
    autoComplete?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
}

export default function PasswordInput({
    label,
    name,
    placeholder,
    autoComplete,
    value,
    onChange,
    error,
    required,
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-2">
            <label
                htmlFor={name}
                className="block text-[11px] font-semibold tracking-[0.12em] text-neutral-700"
            >
                {label}
            </label>

            {/* Password input with eye icon inside */}
            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`h-[48px] w-full rounded-xl border bg-white py-3 pl-4 pr-12 text-sm text-neutral-900 outline-none transition-all placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/5 ${
                        error
                            ? 'border-neutral-500 focus:border-neutral-700'
                            : 'border-neutral-200'
                    }`}
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                    title={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-neutral-400 transition-colors hover:text-neutral-950 focus:outline-none"
                >
                    <Icon
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={18}
                    />
                </button>
            </div>

            {error && (
                <p className="text-xs text-neutral-600">
                    {error}
                </p>
            )}
        </div>
    );
}
