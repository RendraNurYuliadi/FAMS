type AuthLogoProps = {
    subtitle?: string;
    variant?: 'light' | 'dark';
};

export default function AuthLogo({
    subtitle = 'FACULTY ASSET MANAGEMENT SYSTEM',
    variant = 'light',
}: AuthLogoProps) {
    const isDark = variant === 'dark';

    return (
        <div className="flex flex-col items-center gap-1">
            <span
                className={`text-display-md font-bold tracking-[-0.09em] ${
                    isDark ? 'text-white' : 'text-text-primary'
                }`}
            >
                FAMS
                <span
                    className={isDark ? 'text-primary-400' : 'text-primary-500'}
                >
                    .
                </span>
            </span>

            <span
                className={`text-micro font-medium tracking-[0.24em] ${
                    isDark ? 'text-white/70' : 'text-gray-500'
                }`}
            >
                {subtitle}
            </span>
        </div>
    );
}
