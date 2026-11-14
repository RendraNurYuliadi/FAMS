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
                className="block text-[11px] font-semibold tracking-[0.12em] text-gray-700"
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
                    className={`h-[48px] w-full rounded-input border bg-white py-3 pr-12 pl-4 text-sm text-text-primary transition-all outline-none placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 ${
                        error
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                            : 'border-primary-200'
                    }`}
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                        showPassword
                            ? 'Sembunyikan password'
                            : 'Tampilkan password'
                    }
                    title={
                        showPassword
                            ? 'Sembunyikan password'
                            : 'Tampilkan password'
                    }
                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-input text-gray-400 transition-colors hover:text-primary-600 focus:outline-none"
                >
                    <Icon name={showPassword ? 'eye-off' : 'eye'} size={18} />
                </button>
            </div>

            {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
    );
}
