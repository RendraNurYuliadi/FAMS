
type LoginInputProps = {
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
};

export default function LoginInput({
    label,
    type = 'text',
    value,
    onChange,
    error,
}: LoginInputProps) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium">
                {label}
            </label>

            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                autoComplete={type === 'email' ? 'username' : undefined}
                className="w-full rounded-lg border border-gray-300
                           px-4 py-3 outline-none focus:border-blue-600"
                required
            />

            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
