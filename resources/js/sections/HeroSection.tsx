
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
            className="relative overflow-hidden bg-gradient-to-br from-white via-neutral-100 to-neutral-300"
        >
            {/* Background Decoration */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_22%,rgba(255,255,255,0.95),transparent_38%),radial-gradient(ellipse_at_88%_72%,rgba(64,64,64,0.16),transparent_42%)]" />
            <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(23,23,23,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,0.05) 1px, transparent 1px)',
                    backgroundSize: '44px 44px',
                    maskImage:
                        'radial-gradient(ellipse at 70% 50%, black 0%, transparent 75%)',
                }}
            />
            <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-white/70 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-neutral-400/40 blur-3xl" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-32">

                {/* Left Content */}
                <div className="relative z-10">
                    <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-black" />
                        <span className="text-xs font-medium text-neutral-600">
                            Sistem Pengelolaan Aset Fakultas
                        </span>
                    </div>

                    <h1
                        aria-label={heroMessages[messageIndex]}
                        className="max-w-2xl text-4xl font-semibold leading-[1.15] tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl"
                    >
                        <span className="block min-h-[3.45em] sm:min-h-[2.3em]">
                            <span aria-hidden="true">
                                {heroMessages[messageIndex].slice(0, visibleCharacters)}
                            </span>
                            <span
                                aria-hidden="true"
                                className="ml-1 inline-block h-[0.85em] translate-y-[0.08em] animate-pulse border-r-2 border-neutral-500"
                            />
                        </span>
                    </h1>

                    <p className="mt-7 max-w-xl text-base leading-8 text-neutral-500 sm:text-lg">
                        FAMS membantu fakultas mengelola aset dan fasilitas,
                        memproses peminjaman, memantau kondisi, serta mencatat
                        pengembalian dalam satu sistem terpusat.
                    </p>

                    <div className="mt-9 flex flex-wrap gap-3">
                        <Button href="#fitur">
                            Jelajahi FAMS{' '}
                            <span aria-hidden="true">→</span>
                        </Button>

                        <Button href="#cara-kerja" variant="secondary">
                            Pelajari Cara Kerja
                        </Button>
                    </div>

                    {/* Statistics */}
                    <div className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-neutral-200 pt-6">
                        {stats.map((stat) => (
                            <div key={stat.value}>
                                <p className="text-2xl font-semibold tracking-tight">
                                    {stat.value}
                                </p>
                                <p className="mt-2 text-xs leading-5 text-neutral-500 sm:text-sm">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Visual */}
                <div className="relative mx-auto w-full max-w-xl lg:max-w-none">

                    {/* Decorative Background */}
                    <div className="absolute -right-5 -top-5 h-40 w-40 rounded-full border border-neutral-200 sm:-right-8 sm:-top-8 sm:h-52 sm:w-52" />

                    <div className="absolute -bottom-8 -left-8 h-44 w-44 rounded-full bg-neutral-300/70 blur-2xl" />

                    {/* Embossed Outer Frame */}
                    <div className="relative rounded-[2rem] border border-white/80 bg-gradient-to-br from-white via-neutral-200 to-neutral-400 p-3 shadow-[12px_12px_40px_rgba(0,0,0,0.14),-8px_-8px_24px_rgba(255,255,255,0.8)] sm:rounded-[2.5rem] sm:p-5">

                        {/* Inner Frame */}
                        <div className="relative overflow-hidden rounded-[1.5rem] border border-white bg-white p-2 shadow-inner sm:rounded-[2rem] sm:p-3">

                            {/* Main Image */}
                            <div className="relative aspect-[4/4.2] overflow-hidden rounded-[1.2rem] bg-neutral-200 sm:rounded-[1.6rem]">
                                <img
                                    src="/storage/assets/barang/Fams3.jpg"
                                    alt="Ilustrasi aset dan fasilitas FAMS"
                                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                                />

                                {/* Image Overlay */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/10" />

                                {/* Image Label */}
                                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 sm:bottom-7 sm:left-7 sm:right-7">
                                    <div className="text-white">
                                        <p className="text-[10px] font-medium tracking-[0.2em] text-white/70">
                                            FACULTY ASSET MANAGEMENT
                                        </p>
                                        <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                                            Manage Better.
                                            <br />
                                            Work Smarter.
                                        </h2>
                                    </div>

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/15 text-xl text-white shadow-lg backdrop-blur-md">
                                        ↗
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Frame Detail */}
                        <div className="flex items-center justify-between px-2 pb-1 pt-4 sm:px-3">
                            <div>
                                <p className="text-[10px] font-semibold tracking-[0.2em] text-neutral-400">
                                    FAMS SYSTEM
                                </p>
                                <p className="mt-1 text-xs font-medium text-neutral-700">
                                    Integrated Asset Management
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-neutral-950" />
                                <span className="text-[10px] font-medium text-neutral-500">
                                    SMART MANAGEMENT
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Floating Card - Asset Management */}
                    <div className="absolute -left-3 top-10 hidden rounded-2xl border border-neutral-200 bg-white/95 p-4 shadow-[0_12px_35px_rgba(0,0,0,0.12)] backdrop-blur-md sm:block lg:-left-10">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 text-lg text-white">
                                ◈
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-neutral-900">
                                    Asset Tracking
                                </p>
                                <p className="mt-1 text-[10px] text-neutral-500">
                                    Pemantauan terintegrasi
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Floating Card - RFID */}
                    <div className="group absolute -bottom-5 right-3 hidden overflow-hidden rounded-2xl border border-neutral-700 bg-gradient-to-br from-neutral-950 via-neutral-800 to-neutral-600 p-4 text-white shadow-[0_18px_45px_rgba(0,0,0,0.3)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.35)] sm:block lg:-right-7">
                        <div
                            className="pointer-events-none absolute inset-0 opacity-20"
                            style={{
                                backgroundImage:
                                    'repeating-linear-gradient(135deg, white 0, white 1px, transparent 1px, transparent 12px)',
                                maskImage:
                                    'linear-gradient(135deg, black, transparent 65%)',
                            }}
                        />
                        <div className="pointer-events-none absolute -right-7 -top-9 size-24 rounded-full border border-white/20" />
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-xl text-white shadow-inner">
                                ⌁
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-white">
                                    RFID Integration
                                </p>
                                <p className="mt-1 text-[10px] text-white/65">
                                    Identifikasi aset
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Dots */}
                    <div className="absolute -right-5 top-1/2 hidden grid-cols-3 gap-2 sm:grid">
                        {Array.from({ length: 9 }).map((_, index) => (
                            <span
                                key={index}
                                className="h-1.5 w-1.5 rounded-full bg-neutral-300"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
