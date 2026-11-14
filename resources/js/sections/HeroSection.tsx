import { useEffect, useState } from 'react';
import Button from '../components/Button';

const heroMessages = [
    'Kelola Aset Lebih Mudah.',
    'Inventaris Tersusun Rapi.',
    'Peminjaman Lebih Terorganisir.',
    'Pantau Kondisi Aset Berkala.',
    'Kelola Fasilitas Terintegrasi.',
    'Data Aset dalam Satu Sistem.',
];

const stats = [
    { value: '01', label: 'Data aset terpusat' },
    { value: '02', label: 'Peminjaman terorganisir' },
    { value: '03', label: 'Pemantauan kondisi' },
];

export default function HeroSection() {
    const [messageIndex, setMessageIndex] = useState(0);
    const [visibleCharacters, setVisibleCharacters] = useState(0);

    useEffect(() => {
        let typingTimer: number;
        let cycleTimer: number;
        let currentIndex = 0;

        const typeMessage = (index: number) => {
            setMessageIndex(index);
            setVisibleCharacters(0);

            let characterIndex = 0;

            typingTimer = window.setInterval(() => {
                characterIndex += 1;
                setVisibleCharacters(characterIndex);

                if (characterIndex >= heroMessages[index].length) {
                    window.clearInterval(typingTimer);
                }
            }, 55);

            cycleTimer = window.setTimeout(() => {
                window.clearInterval(typingTimer);
                currentIndex = (index + 1) % heroMessages.length;
                typeMessage(currentIndex);
            }, 5000);
        };

        typeMessage(currentIndex);

        return () => {
            window.clearInterval(typingTimer);
            window.clearTimeout(cycleTimer);
        };
    }, []);

    return (
        <section
            id="beranda"
            className="landing-section relative overflow-hidden bg-surface-warm"
        >
            {/* Background Decoration */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 right-0 h-full w-[42%] bg-[#FED7AA]" />

                <div className="absolute top-20 right-[34%] h-24 w-24 rounded-full border-[18px] border-[#FDBA74]" />

                <div className="absolute bottom-10 left-10 h-28 w-28 rounded-full border border-[#FDBA74]" />

                <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                        backgroundImage:
                            'linear-gradient(#9A3412 1px, transparent 1px), linear-gradient(90deg, #9A3412 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                        maskImage:
                            'radial-gradient(ellipse at 30% 50%, black 0%, transparent 75%)',
                    }}
                />
            </div>

            <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20 lg:px-space-2xl lg:py-32">
                {/* Left Content */}
                <div className="relative z-10">
                    <div className="mb-7 inline-flex items-center gap-space-sm rounded-pill border border-orange-200 bg-white px-space-lg py-space-sm shadow-sm">
                        <span className="h-2 w-2 rounded-pill bg-[#F97316]" />

                        <span className="text-caption font-medium text-gray-700">
                            Sistem Pengelolaan Aset Fakultas
                        </span>
                    </div>

                    <h1
                        aria-label={heroMessages[messageIndex]}
                        className="max-w-2xl text-display-md leading-[1.15] font-semibold tracking-tight text-[#171717] sm:text-display-lg lg:text-display-xl"
                    >
                        <span className="block min-h-[3.45em] sm:min-h-[2.3em]">
                            <span aria-hidden="true">
                                {heroMessages[messageIndex].slice(
                                    0,
                                    visibleCharacters,
                                )}
                            </span>

                            <span
                                aria-hidden="true"
                                className="ml-space-xs inline-block h-[0.85em] translate-y-[0.08em] animate-pulse border-r-2 border-[#F97316]"
                            />
                        </span>
                    </h1>

                    <p className="mt-7 max-w-xl text-body leading-8 text-gray-600 sm:text-subheading">
                        FAMS membantu fakultas mengelola aset dan fasilitas,
                        memproses peminjaman, memantau kondisi, serta mencatat
                        pengembalian dalam satu sistem terpusat.
                    </p>

                    <div className="mt-9 flex flex-wrap gap-space-md">
                        <Button href="#fitur">
                            Jelajahi FAMS <span aria-hidden="true">→</span>
                        </Button>

                        <Button href="#cara-kerja" variant="secondary">
                            Pelajari Cara Kerja
                        </Button>
                    </div>

                    {/* Statistics */}
                    <div className="mt-12 grid max-w-lg grid-cols-3 gap-space-lg border-t border-orange-200 pt-space-xl">
                        {stats.map((stat) => (
                            <div key={stat.value}>
                                <p className="text-heading font-semibold tracking-tight text-[#171717]">
                                    {stat.value}
                                </p>

                                <p className="mt-space-sm text-caption leading-5 text-gray-500 sm:text-body">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Visual */}
                <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                    {/* Decorative Background */}
                    <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full border-[10px] border-[#F97316] sm:h-40 sm:w-40" />

                    <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-[#EA580C] sm:h-40 sm:w-40" />

                    {/* Main Image Frame - Minimalist */}
                    <div className="relative rounded-[1.5rem] border border-orange-200 bg-white p-2 shadow-[0_15px_40px_rgba(23,23,23,0.10)] sm:rounded-[1.8rem] sm:p-2.5">
                        {/* Inner Image */}
                        <div className="relative overflow-hidden rounded-[1.1rem] bg-[#F5F5F4] sm:rounded-[1.4rem]">
                            <div className="relative aspect-[4/4.2] overflow-hidden">
                                <img
                                    src="/storage/assets/barang/Fams3.jpg"
                                    alt="Ilustrasi aset dan fasilitas FAMS"
                                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                                />

                                {/* Image Overlay */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171717]/75 via-transparent to-[#292524]/10" />

                                {/* Image Label */}
                                <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-space-md sm:right-6 sm:bottom-6 sm:left-6">
                                    <div className="text-white">
                                        <p className="text-micro font-medium tracking-[0.2em] text-orange-200">
                                            FACULTY ASSET MANAGEMENT
                                        </p>

                                        <h2 className="mt-space-sm text-card-title font-semibold tracking-tight sm:text-heading">
                                            Manage Better.
                                            <br />
                                            Work Smarter.
                                        </h2>
                                    </div>

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F97316] text-lg text-white shadow-md sm:h-10 sm:w-10">
                                        ↗
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Frame Detail */}
                        <div className="flex items-center justify-between px-space-sm pt-space-md pb-space-xs sm:px-space-md">
                            <div>
                                <p className="text-micro font-semibold tracking-[0.2em] text-[#171717]">
                                    FAMS SYSTEM
                                </p>

                                <p className="mt-space-xs text-caption font-medium text-gray-500">
                                    Integrated Asset Management
                                </p>
                            </div>

                            <div className="flex items-center gap-space-sm">
                                <span className="h-2 w-2 rounded-pill bg-[#F97316]" />

                                <span className="text-micro font-medium text-gray-500">
                                    SMART MANAGEMENT
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Floating Card - Asset Management */}
                    <div className="absolute top-10 -left-3 hidden rounded-xl border border-orange-100 bg-white p-3 shadow-[0_8px_25px_rgba(23,23,23,0.10)] sm:block lg:-left-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F97316] text-lg text-white">
                                ◈
                            </div>

                            <div>
                                <p className="text-caption font-semibold text-[#171717]">
                                    Asset Tracking
                                </p>

                                <p className="mt-space-xs text-micro text-gray-500">
                                    Pemantauan terintegrasi
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Floating Card - RFID */}
                    <div className="group absolute right-3 -bottom-5 hidden overflow-hidden rounded-xl border border-white/10 bg-charcoal-900 p-3 text-white shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-1 sm:block lg:-right-6">
                        <div className="pointer-events-none absolute -top-9 -right-7 size-24 rounded-full border border-orange-500/40" />

                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F97316] text-lg text-white">
                                ⌁
                            </div>

                            <div>
                                <p className="text-caption font-semibold text-white">
                                    RFID Integration
                                </p>

                                <p className="mt-space-xs text-micro text-gray-400">
                                    Identifikasi aset
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Dots */}
                    <div className="absolute top-1/2 -right-5 hidden grid-cols-3 gap-space-sm sm:grid">
                        {Array.from({ length: 9 }).map((_, index) => (
                            <span
                                key={index}
                                className="h-1.5 w-1.5 rounded-pill bg-[#C2410C]"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
