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

            <main className="auth-page-enter relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-surface-warm px-6 text-text-primary">
                <div className="pointer-events-none absolute inset-0">
                    <img
                        src="/storage/assets/barang/Fams3.jpg"
                        alt=""
                        className="h-full w-full object-cover opacity-[0.08]"
                    />
                    <div className="absolute inset-0 bg-surface-warm/85" />
                </div>

                {/* Background */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.14)_0%,transparent_55%)]" />

                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(154,52,18,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(154,52,18,0.14) 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                    }}
                />

                {/* Soft orange accents */}
                <div className="pointer-events-none absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-orange-500/[0.08] blur-[100px]" />
                <div className="pointer-events-none absolute -right-40 -bottom-40 h-[420px] w-[420px] rounded-full bg-orange-600/[0.07] blur-[100px]" />

                {/* Decorative circles */}
                <div className="pointer-events-none absolute h-[420px] w-[420px] animate-[pulse_5s_ease-in-out_infinite] rounded-full border border-primary-500/20" />
                <div className="pointer-events-none absolute h-[320px] w-[320px] animate-[spin_35s_linear_infinite] rounded-full border border-dashed border-primary-700/15" />

                {/* Main content */}
                <div className="relative z-10 flex flex-col items-center">
                    {/* Animated icon */}
                    <div className="relative mb-9 flex h-32 w-32 items-center justify-center">
                        <div className="absolute inset-0 animate-[spin_12s_linear_infinite] rounded-[30px] border border-orange-400/20" />

                        <div className="absolute inset-3 rounded-[24px] border border-primary-200/80" />

                        <div className="relative flex h-24 w-24 items-center justify-center rounded-[24px] border border-primary-200 bg-white shadow-[0_0_65px_rgba(249,115,22,0.15)]">
                            <Icon
                                name="building"
                                size={42}
                                className="text-primary-600"
                            />

                            {/* RFID icon */}
                            <div className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-input border border-primary-200 bg-white shadow-sm">
                                <Icon
                                    name="rfid"
                                    size={17}
                                    className="text-primary-600"
                                />
                            </div>

                            {/* Package icon */}
                            <div className="absolute -bottom-3 -left-3 flex h-9 w-9 items-center justify-center rounded-input border border-primary-200 bg-white shadow-sm">
                                <Icon
                                    name="package"
                                    size={17}
                                    className="text-gray-600"
                                />
                            </div>
                        </div>

                        {/* Orbit dots */}
                        <span className="absolute top-3 right-5 h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
                        <span className="absolute bottom-5 left-3 h-1 w-1 animate-pulse rounded-full bg-gray-500" />
                    </div>

                    {/* Logo */}
                    <div className="animate-[fadeUp_0.8s_ease-out_both]">
                        <AuthLogo variant="light" />
                    </div>

                    {/* Tagline */}
                    <p className="mt-7 text-center text-sm font-light tracking-wide text-gray-600 sm:text-base">
                        Mengelola aset, membangun keteraturan.
                    </p>

                    {/* Loading */}
                    <div className="mt-12 flex flex-col items-center gap-4">
                        <div className="h-[2px] w-36 overflow-hidden rounded-full bg-primary-200">
                            <div className="h-full w-1/3 animate-[loading_1.4s_ease-in-out_infinite] rounded-full bg-primary-500" />
                        </div>

                        <span className="text-[10px] font-medium tracking-[0.3em] text-gray-500 uppercase">
                            Preparing your workspace
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute right-0 bottom-8 left-0 flex justify-center px-4">
                    <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-gray-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                        FACULTY ASSET MANAGEMENT SYSTEM
                    </div>
                </div>

                {/* Animations */}
                <style>{`
                    @keyframes loading {
                        0% {
                            transform: translateX(-120%);
                        }
                        100% {
                            transform: translateX(420%);
                        }
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
                        *,
                        *::before,
                        *::after {
                            animation-duration: 0.01ms !important;
                            animation-iteration-count: 1 !important;
                        }
                    }
                `}</style>
            </main>
        </>
    );
}
