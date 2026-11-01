
import { useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthLogo from '../../components/auth/AuthLogo';
import Icon from '../../components/Icon';

export default function Splash() {
    useEffect(() => {
        const timeout = window.setTimeout(() => {
            router.visit('/login');
        }, 3000);

        return () => window.clearTimeout(timeout);
    }, []);

    return (
        <>
            <Head title="FAMS — Faculty Asset Management System" />

            <main className="auth-page-enter relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#080808] px-6 text-white">

                {/* Background */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.09)_0%,_transparent_55%)]" />

                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                    }}
                />

                {/* Decorative circles */}
                <div className="pointer-events-none absolute h-[500px] w-[500px] animate-[pulse_5s_ease-in-out_infinite] rounded-full border border-white/[0.06]" />
                <div className="pointer-events-none absolute h-[360px] w-[360px] rounded-full border border-dashed border-white/[0.08] animate-[spin_35s_linear_infinite]" />

                {/* Main content */}
                <div className="relative z-10 flex flex-col items-center">

                    {/* Animated icon */}
                    <div className="relative mb-10 flex h-36 w-36 items-center justify-center">

                        <div className="absolute inset-0 animate-[spin_12s_linear_infinite] rounded-[36px] border border-white/10" />

                        <div className="absolute inset-3 rounded-[30px] border border-white/[0.08]" />

                        <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/15 bg-white/[0.06] shadow-[0_0_80px_rgba(255,255,255,0.08)] backdrop-blur-xl">
                            <Icon
                                name="building"
                                size={43}
                                className="text-white"
                            />

                            <div className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-[#171717] shadow-xl">
                                <Icon
                                    name="rfid"
                                    size={18}
                                    className="text-neutral-300"
                                />
                            </div>

                            <div className="absolute -bottom-3 -left-3 flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-[#171717] shadow-xl">
                                <Icon
                                    name="package"
                                    size={17}
                                    className="text-neutral-300"
                                />
                            </div>
                        </div>

                        {/* Orbit dots */}
                        <span className="absolute right-5 top-3 h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_12px_white] animate-pulse" />
                        <span className="absolute bottom-5 left-3 h-1 w-1 rounded-full bg-neutral-500 animate-pulse" />
                    </div>

                    {/* Logo */}
                    <div className="animate-[fadeUp_0.8s_ease-out_both]">
                        <AuthLogo variant="dark" />
                    </div>

                    {/* Tagline */}
                    <p className="mt-7 text-center text-sm font-light tracking-wide text-neutral-400">
                        Mengelola aset, membangun keteraturan.
                    </p>

                    {/* Loading */}
                    <div className="mt-12 flex flex-col items-center gap-4">
                        <div className="h-[2px] w-36 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full w-1/3 animate-[loading_1.4s_ease-in-out_infinite] rounded-full bg-white" />
                        </div>

                        <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-neutral-600">
                            Preparing your workspace
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                    <div className="flex items-center gap-2 text-[10px] tracking-widest text-neutral-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />
                        FACULTY ASSET MANAGEMENT SYSTEM
                    </div>
                </div>

                {/* Animations */}
                <style>{`
                    @keyframes loading {
                        0% { transform: translateX(-120%); }
                        100% { transform: translateX(420%); }
                    }

                    @keyframes fadeUp {
                        from {
                            opacity: 0;
                            transform: translateY(14px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @media (prefers-reduced-motion: reduce) {
                        *, *::before, *::after {
                            animation-duration: 0.01ms !important;
                            animation-iteration-count: 1 !important;
                        }
                    }
                `}</style>
            </main>
        </>
    );
}
