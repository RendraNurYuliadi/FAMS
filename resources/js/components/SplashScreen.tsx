
import { useEffect, useState } from 'react';
import Icon from './Icon';

export default function SplashScreen() {
    const [isExiting, setIsExiting] = useState(false);
    const [isMounted, setIsMounted] = useState(true);

    useEffect(() => {
        const exitTimer = window.setTimeout(() => {
            setIsExiting(true);
        }, 31500);

        const removeTimer = window.setTimeout(() => {
            setIsMounted(false);
        }, 32000);

        return () => {
            window.clearTimeout(exitTimer);
            window.clearTimeout(removeTimer);
        };
    }, []);

    if (!isMounted) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white transition-all duration-700 ${
                isExiting
                    ? 'pointer-events-none opacity-0'
                    : 'opacity-100'
            }`}
            aria-label="Memuat FAMS"
            role="status"
        >
            {/* Background Decoration */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 animate-[pulse_3s_ease-in-out_infinite] rounded-full border border-neutral-100" />

                <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-neutral-200 animate-[spin_25s_linear_infinite]" />

                <div className="absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-100" />

                <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-100/70 blur-3xl" />

                <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-neutral-100/70 blur-3xl" />
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
                    <div className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-[2rem] border border-neutral-300" />

                    <div className="absolute -inset-3 animate-[spin_12s_linear_infinite_reverse] rounded-[2.5rem] border border-dashed border-neutral-300" />

                    {/* Orbit Dot */}
                    <span className="absolute -right-2 top-5 h-3 w-3 animate-pulse rounded-full bg-neutral-950 shadow-[0_0_15px_rgba(0,0,0,0.25)]" />

                    <span className="absolute -bottom-1 left-4 h-2 w-2 rounded-full bg-neutral-400 animate-pulse" />

                    {/* Logo Box */}
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-neutral-950 shadow-2xl shadow-neutral-400/30 animate-[splash-logo_1.2s_ease-out_both]">
                        <Icon
                            name="box"
                            size={40}
                            className="text-white"
                        />
                    </div>
                </div>

                {/* Brand Name */}
                <div className="mt-10 overflow-hidden text-center">
                    <h1 className="animate-[splash-text_0.8s_0.4s_both] text-4xl font-bold tracking-[0.28em] text-neutral-950">
                        FAMS
                    </h1>

                    <p className="mt-3 animate-[splash-text_0.8s_0.6s_both] text-[10px] font-medium tracking-[0.22em] text-neutral-500 sm:text-xs">
                        FACULTY ASSET MANAGEMENT SYSTEM
                    </p>
                </div>

                {/* Loading Animation */}
                <div className="mt-12 w-44 animate-[splash-text_0.8s_0.8s_both]">
                    <div className="h-[3px] overflow-hidden rounded-full bg-neutral-200">
                        <div className="h-full w-full origin-left animate-[splash-loading_3.5s_1s_ease-in-out_both] rounded-full bg-neutral-950" />
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-neutral-400">
                            Initializing
                        </p>

                        <div className="flex gap-1">
                            <span className="h-1 w-1 animate-pulse rounded-full bg-neutral-950" />
                            <span className="h-1 w-1 animate-pulse rounded-full bg-neutral-500 [animation-delay:150ms]" />
                            <span className="h-1 w-1 animate-pulse rounded-full bg-neutral-300 [animation-delay:300ms]" />
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
                <p className="text-[10px] font-medium tracking-[0.18em] text-neutral-400">
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
                    *, *::before, *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>
        </div>
    );
}
