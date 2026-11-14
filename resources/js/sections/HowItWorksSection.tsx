import { useEffect, useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import Icon from '../components/Icon';

import type { IconName } from '../components/Icon';

const steps: {
    n: string;
    icon: IconName;
    title: string;
    subtitle: string;
    text: string;
    details: string[];
    result: string;
}[] = [
    {
        n: '01',
        icon: 'search',
        title: 'Cari & Pilih Aset',
        subtitle: 'Temukan kebutuhan fasilitas',
        text: 'Temukan barang atau ruangan yang dibutuhkan dan periksa ketersediaannya sebelum mengajukan peminjaman.',
        details: [
            'Jelajahi katalog barang dan ruangan.',
            'Lihat foto, kategori, lokasi, dan kondisi aset.',
            'Periksa status ketersediaan aset.',
        ],
        result: 'Aset yang sesuai berhasil ditemukan.',
    },
    {
        n: '02',
        icon: 'file',
        title: 'Ajukan Peminjaman',
        subtitle: 'Lengkapi informasi pengajuan',
        text: 'Buat pengajuan dengan mengisi tujuan penggunaan, periode peminjaman, serta informasi penanggung jawab.',
        details: [
            'Pilih aset yang akan dipinjam.',
            'Tentukan tanggal dan durasi peminjaman.',
            'Isi tujuan kegiatan dan data penanggung jawab.',
            'Kirim pengajuan untuk diproses.',
        ],
        result: 'Pengajuan tercatat dan menunggu persetujuan.',
    },
    {
        n: '03',
        icon: 'check',
        title: 'Persetujuan Pengelola',
        subtitle: 'Verifikasi dan konfirmasi',
        text: 'Pengelola memeriksa detail pengajuan, ketersediaan aset, serta kesesuaian dengan kebijakan fakultas.',
        details: [
            'Pengelola menerima notifikasi pengajuan.',
            'Periksa jadwal dan ketersediaan aset.',
            'Evaluasi tujuan dan kelengkapan pengajuan.',
            'Setujui atau tolak pengajuan disertai keterangan.',
        ],
        result: 'Peminjam menerima status keputusan pengajuan.',
    },
    {
        n: '04',
        icon: 'package',
        title: 'Gunakan & Kembalikan',
        subtitle: 'Serah terima dan pemeriksaan',
        text: 'Aset diserahkan kepada peminjam, digunakan sesuai kebutuhan, kemudian dikembalikan untuk diverifikasi kondisinya.',
        details: [
            'Lakukan serah terima dan pemeriksaan awal.',
            'Gunakan aset sesuai tujuan peminjaman.',
            'Kembalikan aset sesuai jadwal.',
            'Pengelola memeriksa kondisi dan mencatat pengembalian.',
        ],
        result: 'Peminjaman selesai dan riwayat tersimpan.',
    },
];

export default function HowItWorksSection() {
    const [selectedStep, setSelectedStep] = useState<
        (typeof steps)[number] | null
    >(null);

    useEffect(() => {
        if (!selectedStep) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setSelectedStep(null);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [selectedStep]);

    return (
        <section
            id="cara-kerja"
            className="landing-section landing-section--dark relative overflow-hidden bg-charcoal-900 px-space-lg py-space-section text-white sm:py-space-section-lg lg:px-space-2xl"
        >
            {/* Background Decoration - Tetap seperti AssetFlowSection */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            <div className="pointer-events-none absolute top-20 -right-40 h-96 w-96 rounded-full bg-orange-500/[0.07] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-orange-600/[0.06] blur-3xl" />

            <div className="relative mx-auto max-w-7xl">
                {/* Section Heading */}
                <div className="flex flex-col gap-space-2xl lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <SectionHeading
                            eyebrow="Alur Penggunaan"
                            title="Dari pengajuan hingga pengembalian."
                            description="Proses peminjaman aset dirancang lebih terstruktur, transparan, dan mudah dipantau melalui satu sistem terintegrasi."
                            centered={false}
                            dark
                        />
                    </div>

                    <div className="flex shrink-0 items-center gap-space-md rounded-xl border border-orange-500/20 bg-orange-500/[0.07] px-5 py-space-lg">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F97316] text-white">
                            <Icon name="workflow" size={21} />
                        </div>

                        <div>
                            <p className="text-caption font-semibold text-white">
                                4 Tahapan Utama
                            </p>
                            <p className="mt-space-xs text-micro text-gray-400">
                                Alur peminjaman FAMS
                            </p>
                        </div>
                    </div>
                </div>

                {/* Process Timeline */}
                <div className="relative mt-10 sm:mt-12">
                    <div className="mb-7 hidden items-center gap-3 lg:flex">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                            START
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-orange-500/60 via-white/10 to-orange-500/60" />
                        <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                            FINISH
                        </span>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step, index) => (
                            <button
                                key={step.n}
                                type="button"
                                onClick={() => setSelectedStep(step)}
                                aria-label={`Lihat detail ${step.title}`}
                                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#202020] p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/50 hover:bg-[#292524] hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
                            >
                                {/* Card Header */}
                                <div className="flex w-full items-center justify-between">
                                    <span className="text-[10px] font-bold tracking-[0.2em] text-orange-400">
                                        STEP {step.n}
                                    </span>

                                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-400 transition-all duration-300 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white">
                                        <Icon name="arrow-up-right" size={17} />
                                    </span>
                                </div>

                                {/* Main Icon */}
                                <div className="relative mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F97316] text-white shadow-lg shadow-orange-950/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                    <Icon name={step.icon} size={25} />
                                </div>

                                {/* Large Number */}
                                <span className="pointer-events-none absolute top-16 right-5 text-6xl leading-none font-black tracking-tighter text-white/[0.035] transition-colors group-hover:text-orange-500/10">
                                    {step.n}
                                </span>

                                {/* Overview Content */}
                                <div className="mt-8 flex-1">
                                    <p className="text-[10px] font-semibold tracking-[0.15em] text-orange-400 uppercase">
                                        {step.subtitle}
                                    </p>

                                    <h3 className="mt-3 text-lg font-bold tracking-tight text-white">
                                        {step.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-gray-400">
                                        {step.text}
                                    </p>
                                </div>

                                {/* View Detail */}
                                <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                                    <span className="text-xs font-medium text-gray-400 transition-colors group-hover:text-orange-400">
                                        Lihat detail proses
                                    </span>

                                    <Icon
                                        name="arrow-right"
                                        size={16}
                                        className="text-orange-500 transition-all duration-300 group-hover:translate-x-1"
                                    />
                                </div>

                                {/* Bottom Accent */}
                                <div
                                    className={`absolute bottom-0 left-0 h-1 bg-[#F97316] transition-all duration-300 ${
                                        index === 0
                                            ? 'w-1/4 group-hover:w-full'
                                            : index === 1
                                              ? 'w-2/4 group-hover:w-full'
                                              : index === 2
                                                ? 'w-3/4 group-hover:w-full'
                                                : 'w-full'
                                    }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* RFID Information */}
                <div className="mt-12 grid overflow-hidden rounded-2xl border border-white/10 bg-[#202020] lg:grid-cols-[auto_1fr_auto] lg:items-center">
                    <div className="flex h-full min-h-36 items-center justify-center bg-[#F97316] px-9 py-7 text-white">
                        <Icon name="rfid" size={38} />
                    </div>

                    <div className="p-6 sm:p-8">
                        <div className="flex items-center gap-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                            <span className="text-[10px] font-bold tracking-[0.18em] text-orange-400 uppercase">
                                Technology Integration
                            </span>
                        </div>

                        <h3 className="mt-3 text-lg font-bold text-white">
                            Integrasi RFID & IoT
                        </h3>

                        <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-400">
                            Teknologi RFID direncanakan untuk membantu
                            identifikasi aset, pencatatan serah terima, dan
                            pemantauan inventaris secara lebih efisien.
                            Implementasi memerlukan perangkat serta pengujian
                            teknis.
                        </p>
                    </div>

                    <div className="px-6 pb-6 lg:px-8 lg:py-8">
                        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/[0.08] px-4 py-2 text-[10px] font-semibold tracking-wider text-orange-400 uppercase">
                            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                            Pengembangan
                        </span>
                    </div>
                </div>

                {/* Bottom Note */}
                <div className="mt-space-2xl flex flex-col gap-space-sm border-t border-white/10 pt-space-xl sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-caption leading-6 text-gray-500">
                        Alur konseptual FAMS yang dapat disesuaikan dengan SOP
                        dan kebijakan fakultas.
                    </p>

                    <p className="text-micro font-medium tracking-[0.15em] text-gray-600 uppercase">
                        Faculty Asset Management System
                    </p>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedStep && (
                <div
                    className="animate-in fade-in fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-space-lg backdrop-blur-sm duration-200 sm:p-space-xl"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setSelectedStep(null);
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="process-modal-title"
                        className="animate-in zoom-in-95 slide-in-from-bottom-3 relative my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#202020] shadow-2xl duration-300"
                    >
                        {/* Modal Header */}
                        <div className="relative overflow-hidden border-b border-white/10 bg-[#292524] p-space-xl sm:p-space-2xl">
                            <div className="absolute -top-20 -right-12 h-52 w-52 rounded-full bg-orange-500/[0.10] blur-3xl" />

                            <div className="relative flex items-start justify-between gap-space-lg">
                                <div>
                                    <span className="inline-flex items-center gap-space-sm rounded-full border border-orange-500/25 bg-orange-500/[0.08] px-space-md py-1.5 text-[10px] font-bold tracking-wider text-orange-400">
                                        TAHAP {selectedStep.n} DARI 04
                                    </span>

                                    <div className="mt-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F97316] text-white shadow-lg shadow-orange-950/30">
                                        <Icon
                                            name={selectedStep.icon}
                                            size={26}
                                        />
                                    </div>

                                    <h3
                                        id="process-modal-title"
                                        className="mt-5 text-heading font-bold tracking-tight text-white"
                                    >
                                        {selectedStep.title}
                                    </h3>

                                    <p className="mt-space-sm text-sm text-gray-400">
                                        {selectedStep.subtitle}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSelectedStep(null)}
                                    aria-label="Tutup detail proses"
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-400 transition hover:border-orange-500/50 hover:bg-orange-500 hover:text-white"
                                >
                                    <Icon name="close" size={19} />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="max-h-[55vh] overflow-y-auto p-space-xl sm:p-space-2xl">
                            <div>
                                <p className="text-[10px] font-bold tracking-[0.18em] text-orange-400 uppercase">
                                    Gambaran Proses
                                </p>

                                <p className="mt-space-md text-sm leading-7 text-gray-300">
                                    {selectedStep.text}
                                </p>
                            </div>

                            {/* Detail List */}
                            <div className="mt-space-2xl">
                                <p className="text-[10px] font-bold tracking-[0.18em] text-orange-400 uppercase">
                                    Langkah-langkah
                                </p>

                                <div className="mt-5 space-y-5">
                                    {selectedStep.details.map(
                                        (detail, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-space-lg"
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-xs font-bold text-orange-400">
                                                    {String(index + 1).padStart(
                                                        2,
                                                        '0',
                                                    )}
                                                </div>

                                                <div className="flex-1 border-b border-white/[0.07] pb-5">
                                                    <p className="text-sm leading-6 text-gray-300">
                                                        {detail}
                                                    </p>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>

                            {/* Result */}
                            <div className="mt-7 rounded-xl border border-orange-500/20 bg-orange-500/[0.06] p-5">
                                <div className="flex items-center gap-space-sm">
                                    <Icon
                                        name="check-circle"
                                        size={18}
                                        className="text-orange-400"
                                    />

                                    <p className="text-[10px] font-bold tracking-wider text-orange-400 uppercase">
                                        Hasil Tahapan
                                    </p>
                                </div>

                                <p className="mt-space-md text-sm leading-6 text-white">
                                    {selectedStep.result}
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-between gap-space-md border-t border-white/10 bg-charcoal-900 p-5 sm:px-space-2xl">
                            <span className="text-xs text-gray-500">
                                FAMS · Alur Peminjaman
                            </span>

                            <div className="flex gap-space-sm">
                                {selectedStep.n !== '01' && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const previousIndex =
                                                steps.findIndex(
                                                    (step) =>
                                                        step.n ===
                                                        selectedStep.n,
                                                );

                                            setSelectedStep(
                                                steps[previousIndex - 1],
                                            );
                                        }}
                                        className="flex items-center gap-space-sm rounded-lg border border-white/15 px-space-md py-2.5 text-xs font-medium text-gray-300 transition hover:border-orange-500/50 hover:text-orange-400"
                                    >
                                        <Icon name="chevron-left" size={15} />
                                        Sebelumnya
                                    </button>
                                )}

                                {selectedStep.n !== '04' ? (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const currentIndex =
                                                steps.findIndex(
                                                    (step) =>
                                                        step.n ===
                                                        selectedStep.n,
                                                );

                                            setSelectedStep(
                                                steps[currentIndex + 1],
                                            );
                                        }}
                                        className="flex items-center gap-space-sm rounded-lg bg-[#F97316] px-space-lg py-2.5 text-xs font-bold text-white transition hover:bg-orange-600"
                                    >
                                        Selanjutnya
                                        <Icon name="chevron-right" size={15} />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setSelectedStep(null)}
                                        className="rounded-lg bg-[#F97316] px-space-lg py-2.5 text-xs font-bold text-white transition hover:bg-orange-600"
                                    >
                                        Selesai
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
