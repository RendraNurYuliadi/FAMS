
import { useEffect } from 'react';

export default function AssetFlowSection() {
    useEffect(() => {
        const style = document.createElement('style');

        style.textContent = `
            @keyframes fams-float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }

            @keyframes fams-pulse {
                0%, 100% { opacity: .35; }
                50% { opacity: 1; }
            }

            @keyframes fams-scan {
                0% { transform: translateY(-100%); opacity: 0; }
                20%, 80% { opacity: .6; }
                100% { transform: translateY(500%); opacity: 0; }
            }

            .fams-float {
                animation: fams-float 5s ease-in-out infinite;
            }

            .fams-float-delayed {
                animation: fams-float 6s ease-in-out 1s infinite;
            }

            .fams-pulse {
                animation: fams-pulse 2.5s ease-in-out infinite;
            }

            .fams-scan {
                animation: fams-scan 7s ease-in-out infinite;
            }

            @media (prefers-reduced-motion: reduce) {
                .fams-float,
                .fams-float-delayed,
                .fams-pulse,
                .fams-scan {
                    animation: none !important;
                }
            }
        `;

        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <section className="relative overflow-hidden bg-neutral-950 py-24 text-white md:py-32">
            {/* Background Grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)',
                    backgroundSize: '44px 44px',
                }}
            />

            <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
                {/* LEFT: CONTENT */}
                <div>
                    <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[10px] font-medium tracking-[0.2em] text-neutral-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-white fams-pulse" />
                        SMART FACILITY MANAGEMENT
                    </span>

                    <h2 className="max-w-xl text-4xl font-semibold leading-[1.15] tracking-tight md:text-5xl lg:text-6xl">
                        Membangun pengelolaan aset
                        <span className="mt-2 block text-neutral-500">
                            yang lebih terarah.
                        </span>
                    </h2>

                    <p className="mt-7 max-w-lg text-sm leading-8 text-neutral-400 md:text-base">
                        FAMS menghadirkan sistem pengelolaan aset fakultas
                        yang terintegrasi. Mulai dari pendataan, peminjaman,
                        pengembalian, hingga pemeliharaan, seluruh proses
                        dirancang agar lebih terstruktur, transparan, dan efisien.
                    </p>

                    <div className="mt-10 flex items-center gap-4">
                        <div className="h-px w-12 bg-neutral-500" />
                        <span className="text-[10px] tracking-[0.25em] text-neutral-500">
                            ONE SYSTEM. BETTER MANAGEMENT.
                        </span>
                    </div>

                    {/* Values */}
                    <div className="mt-12 grid grid-cols-3 gap-5 border-t border-white/10 pt-7">
                        <div>
                            <p className="text-lg font-semibold text-white">
                                Terpusat
                            </p>
                            <p className="mt-1 text-[11px] leading-5 text-neutral-500">
                                Data aset dalam satu sistem
                            </p>
                        </div>

                        <div>
                            <p className="text-lg font-semibold text-white">
                                Terpantau
                            </p>
                            <p className="mt-1 text-[11px] leading-5 text-neutral-500">
                                Status aset lebih jelas
                            </p>
                        </div>

                        <div>
                            <p className="text-lg font-semibold text-white">
                                Terintegrasi
                            </p>
                            <p className="mt-1 text-[11px] leading-5 text-neutral-500">
                                Proses lebih terhubung
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT: VISUAL PANEL */}
                <div className="relative mx-auto w-full max-w-xl">
                    <div className="group relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/10 bg-neutral-900 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">

                        {/* Background Image */}
                        <img
                            src="/storage/assets/barang/Fams.png"
                            alt="Ilustrasi pengelolaan fasilitas FAMS"
                            className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-700 group-hover:scale-105"
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 via-neutral-950/30 to-neutral-950/95" />

                        {/* Grid Overlay */}
                        <div
                            className="absolute inset-0 opacity-[0.12]"
                            style={{
                                backgroundImage:
                                    'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
                                backgroundSize: '30px 30px',
                            }}
                        />

                        {/* Scanning Effect */}
                        <div className="fams-scan absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-transparent via-white/15 to-transparent" />

                        {/* Top Label */}
                        <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-neutral-950/50 px-4 py-2 shadow-xl backdrop-blur-xl">
                                <span className="h-1.5 w-1.5 rounded-full bg-white fams-pulse" />
                                <span className="text-[9px] font-medium tracking-[0.2em] text-white">
                                    FAMS SYSTEM
                                </span>
                            </div>

                            <span className="rounded-full border border-white/20 bg-neutral-950/50 px-3 py-2 text-[9px] tracking-widest text-neutral-300 shadow-xl backdrop-blur-xl">
                                01 / 03
                            </span>
                        </div>

                        {/* Center Content */}
                        <div className="absolute inset-x-6 bottom-10 z-10 md:inset-x-8">
                            <span className="text-[10px] font-medium tracking-[0.25em] text-neutral-300">
                                FACULTY ASSET MANAGEMENT
                            </span>

                            <h3 className="mt-4 max-w-sm text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
                                Satu sistem untuk pengelolaan aset yang lebih baik.
                            </h3>

                            <p className="mt-4 max-w-sm text-xs leading-6 text-neutral-300">
                                Mendukung pengelolaan fasilitas fakultas
                                melalui proses digital yang terstruktur.
                            </p>

                            <div className="mt-7 flex items-center gap-3">
                                <div className="h-px w-10 bg-white/60" />
                                <span className="text-[9px] tracking-[0.2em] text-neutral-400">
                                    MANAGE SMARTER
                                </span>
                            </div>
                        </div>

                        {/* Corner Decorations */}
                        <div className="absolute left-5 top-5 h-5 w-5 border-l border-t border-white/40" />
                        <div className="absolute right-5 top-5 h-5 w-5 border-r border-t border-white/40" />
                        <div className="absolute bottom-5 left-5 h-5 w-5 border-b border-l border-white/40" />
                        <div className="absolute bottom-5 right-5 h-5 w-5 border-b border-r border-white/40" />

                        {/* Floating Label 1 */}
                        <div className="fams-float absolute left-5 top-[27%] z-20 rounded-xl border border-white/20 bg-neutral-900/75 px-4 py-3 shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl md:left-8">
                            <div className="text-[9px] tracking-[0.18em] text-neutral-400">
                                MANAGEMENT
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-xs font-medium text-white">
                                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10">
                                    <span className="text-[11px]">01</span>
                                </span>
                                Asset Management
                            </div>
                        </div>

                        {/* Floating Label 2 */}
                        <div className="fams-float-delayed absolute bottom-[29%] right-5 z-20 rounded-xl border border-white/20 bg-neutral-900/80 px-4 py-3 shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl md:right-8">
                            <div className="text-[9px] tracking-[0.18em] text-neutral-400">
                                MONITORING
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-xs font-medium text-white">
                                <span className="h-1.5 w-1.5 rounded-full bg-white fams-pulse" />
                                Real-time Monitoring
                            </div>
                        </div>
                    </div>

                    {/* Bottom Caption */}
                    <div className="mt-5 flex items-center justify-between px-1 text-[9px] tracking-[0.2em] text-neutral-500">
                        <span>BUILDING BETTER FACILITIES</span>
                        <span>FAMS — 2026</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
