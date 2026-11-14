import { useEffect, useState } from 'react';
import Icon from './Icon';

export default function SplashScreen() {
    const [isExiting, setIsExiting] = useState(false);
    const [isMounted, setIsMounted] = useState(true);

    useEffect(() => {
        const exitTimer = window.setTimeout(() => {
            setIsExiting(true);
        }, 3500);

        const removeTimer = window.setTimeout(() => {
            setIsMounted(false);
        }, 4000);

        return () => {
            window.clearTimeout(exitTimer);
            window.clearTimeout(removeTimer);
        };
    }, []);

    if (!isMounted) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-surface-warm transition-all duration-700 ${
                isExiting ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
            aria-label="Memuat FAMS"
            role="status"
        >
            {/* Background Decoration */}
            <div className="pointer-events-none absolute inset-0">
                {/* Soft Background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,255,255,0.98)_0%,rgba(255,247,237,0.8)_45%,rgba(249,115,22,0.08)_100%)]" />

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(234,88,12,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(234,88,12,0.08) 1px, transparent 1px)',
                        backgroundSize: '42px 42px',
                        maskImage:
                            'radial-gradient(ellipse at center, black 5%, transparent 76%)',
                    }}
                />

                {/* Orange Blur */}
                <div className="absolute top-1/4 -left-36 h-80 w-80 rounded-full bg-orange-300/25 blur-3xl" />
                <div className="absolute -right-36 -bottom-20 h-96 w-96 rounded-full bg-[#F97316]/15 blur-3xl" />

                {/* Center Rings */}
                <div className="absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 animate-[pulse_3s_ease-in-out_infinite] rounded-full border border-orange-200/70" />

                <div className="absolute top-1/2 left-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 animate-[spin_25s_linear_infinite] rounded-full border border-dashed border-orange-300/70" />

                <div className="absolute top-1/2 left-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white shadow-[0_0_80px_rgba(249,115,22,0.12)]" />
            </div>

            {/* Main Content */}
            <div
                className={`relative z-10 flex flex-col items-center transition-all duration-700 ${
                    isExiting
                        ? '-translate-y-8 scale-95 opacity-0'
                        : 'animate-[splash-enter_1s_cubic-bezier(0.16,1,0.3,1)_both]'
                }`}
            >
                {/* Animated Logo */}
                <div className="relative flex h-28 w-28 items-center justify-center">
                    {/* Rotating Rings */}
                    <div className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-[2rem] border border-orange-400/70" />

                    <div className="absolute -inset-3 animate-[spin_12s_linear_infinite_reverse] rounded-[2.5rem] border border-dashed border-orange-300" />

                    {/* Orbit Dot */}
                    <span className="absolute top-5 -right-2 h-3 w-3 animate-pulse rounded-full bg-[#F97316] shadow-[0_0_15px_rgba(249,115,22,0.5)]" />

                    <span className="absolute -bottom-1 left-4 h-2 w-2 animate-pulse rounded-full bg-gray-400" />

                    {/* Logo Box */}
                    <div className="relative flex h-20 w-20 animate-[splash-logo_1.2s_ease-out_both] items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-700 shadow-2xl shadow-orange-950/20">
                        <Icon name="box" size={40} className="text-[#F97316]" />
                    </div>
                </div>

                {/* Brand Name */}
                <div className="mt-10 overflow-hidden text-center">
                    <h1 className="animate-[splash-text_0.8s_0.4s_both] text-display-md font-bold tracking-[0.28em] text-[#171717]">
                        FAMS
                    </h1>

                    <p className="mt-space-md animate-[splash-text_0.8s_0.6s_both] text-micro font-semibold tracking-[0.22em] text-[#EA580C] sm:text-caption">
                        FACULTY ASSET MANAGEMENT SYSTEM
                    </p>
                </div>

                {/* Loading Animation */}
                <div className="mt-12 w-44 animate-[splash-text_0.8s_0.8s_both]">
                    <div className="h-[3px] overflow-hidden rounded-full bg-orange-200">
                        <div className="h-full w-full origin-left animate-[splash-loading_3.5s_1s_ease-in-out_both] rounded-full bg-gradient-to-r from-[#EA580C] via-[#F97316] to-orange-300" />
                    </div>

                    <div className="mt-space-lg flex items-center justify-between">
                        <p className="text-micro font-medium tracking-[0.2em] text-gray-500 uppercase">
                            Initializing
                        </p>

                        <div className="flex gap-space-xs">
                            <span className="h-1 w-1 animate-pulse rounded-full bg-[#171717]" />
                            <span className="h-1 w-1 animate-pulse rounded-full bg-[#F97316] [animation-delay:150ms]" />
                            <span className="h-1 w-1 animate-pulse rounded-full bg-orange-300 [animation-delay:300ms]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div
                className={`absolute bottom-8 flex w-full items-center justify-center transition-opacity duration-500 ${
                    isExiting ? 'opacity-0' : 'animate-[splash-text_1s_1s_both]'
                }`}
            >
                <p className="text-micro font-medium tracking-[0.18em] text-gray-400">
                    © {new Date().getFullYear()} FAMS
                </p>
            </div>

            {/* Custom Animations */}
            <style>{`
                @keyframes splash-enter {
                    from {
                        opacity: 0;
                        transform: translateY(25px) scale(0.94);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes splash-logo {
                    0% {
                        opacity: 0;
                        transform: scale(0.5) rotate(-15deg);
                    }
                    70% {
                        opacity: 1;
                        transform: scale(1.1) rotate(5deg);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) rotate(0);
                    }
                }

                @keyframes splash-text {
                    from {
                        opacity: 0;
                        transform: translateY(15px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes splash-loading {
                    from {
                        transform: scaleX(0);
                    }
                    to {
                        transform: scaleX(1);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    *,
                    *::before,
                    *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>
        </div>
    );
}
