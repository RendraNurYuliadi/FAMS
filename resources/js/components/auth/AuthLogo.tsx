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
                className={`text-4xl font-bold tracking-[-0.09em] ${
                    isDark ? 'text-white' : 'text-neutral-950'
                }`}
            >
                FAMS<span className={isDark ? 'text-neutral-500' : 'text-neutral-400'}>.</span>
            </span>

            <span
                className={`text-[9px] font-medium tracking-[0.24em] ${
                    isDark ? 'text-neutral-500' : 'text-neutral-400'
                }`}
            >
                {subtitle}
            </span>
        </div>
    );
}