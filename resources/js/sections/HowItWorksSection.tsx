
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
    const [selectedStep, setSelectedStep] = useState<(typeof steps)[number] | null>(null);

    // Close modal with Escape key
    useEffect(() => {
        if (!selectedStep) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setSelectedStep(null);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // Prevent background scrolling while modal is open
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [selectedStep]);

    return (
        <section
            id="cara-kerja"
            className="relative overflow-hidden bg-neutral-950 px-5 py-24 text-white sm:py-28 lg:px-8"
        >
            {/* Background Decoration */}
            <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-white/[0.035] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-white/[0.035] blur-3xl" />

            <div className="relative mx-auto max-w-7xl">
                {/* Section Heading */}
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <SectionHeading
                            eyebrow="Alur Penggunaan"
                            title="Dari pengajuan hingga pengembalian."
                            description="Proses peminjaman aset dirancang lebih terstruktur, transparan, dan mudah dipantau melalui satu sistem terintegrasi."
                            centered={false}
                            dark
                        />
                    </div>

                    <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-neutral-950">
                            <Icon name="workflow" size={20} />
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-white">
                                4 Tahapan Utama
                            </p>
                            <p className="mt-1 text-[11px] text-neutral-500">
                                Alur peminjaman FAMS
                            </p>
                        </div>
                    </div>
                </div>

                {/* Process Timeline */}
                <div className="relative mt-10 sm:mt-12">
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step) => (
                            <button
                                key={step.n}
                                type="button"
                                onClick={() => setSelectedStep(step)}
                                aria-label={`Lihat detail ${step.title}`}
                                className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-left transition-all duration-300 hover:-translate-y-2 hover:border-white/35 hover:bg-white/[0.075] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:p-6"
                            >
                                {/* Card Top */}
                                <div className="flex w-full items-center justify-between">
                                    <span className="text-xs font-semibold tracking-[0.2em] text-neutral-500 transition-colors group-hover:text-white">
                                        STEP {step.n}
                                    </span>

                                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-neutral-900 text-neutral-400 transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-neutral-950">
                                        <Icon name="arrow-up-right" size={17} />
                                    </span>
                                </div>

                                {/* Main Icon */}
                                <div className="relative z-10 mt-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-neutral-900 text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:border-white group-hover:bg-white group-hover:text-neutral-950">
                                    <Icon name={step.icon} size={25} />
                                </div>

                                {/* Overview Content */}
                                <div className="mt-7 flex-1">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
                                        {step.subtitle}
                                    </p>

                                    <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">
                                        {step.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-neutral-400">
                                        {step.text}
                                    </p>
                                </div>

                                {/* View Detail */}
                                <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                                    <span className="text-xs font-medium text-neutral-400 transition-colors group-hover:text-white">
                                        Lihat detail proses
                                    </span>

                                    <Icon
                                        name="arrow-right"
                                        size={16}
                                        className="text-neutral-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
                                    />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* RFID Information */}
                <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
                    <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-white">
                                <Icon name="rfid" size={23} />
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-white">
                                    Integrasi RFID & IoT
                                </h3>

                                <p className="mt-2 max-w-2xl text-xs leading-6 text-neutral-400">
                                    Teknologi RFID direncanakan untuk membantu
                                    identifikasi aset, pencatatan serah terima,
                                    dan pemantauan inventaris secara lebih
                                    efisien. Implementasi memerlukan perangkat
                                    serta pengujian teknis.
                                </p>
                            </div>
                        </div>

                        <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-neutral-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
                            Pengembangan
                        </span>
                    </div>
                </div>

                {/* Bottom Note */}
                <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-6 text-neutral-500">
                        Alur konseptual FAMS yang dapat disesuaikan dengan SOP
                        dan kebijakan fakultas.
                    </p>

                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-600">
                        Faculty Asset Management System
                    </p>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedStep && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm animate-in fade-in duration-200 sm:p-6"
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
                        className="relative my-auto w-full max-w-xl overflow-hidden rounded-3xl border border-white/15 bg-neutral-950 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-3 duration-300"
                    >
                        {/* Modal Header */}
                        <div className="relative border-b border-white/10 p-6 sm:p-8">
                            <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/[0.04] blur-3xl" />

                            <div className="relative flex items-start justify-between gap-4">
                                <div>
                                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-semibold tracking-wider text-neutral-400">
                                        TAHAP {selectedStep.n} DARI 04
                                    </span>

                                    <div className="mt-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white text-neutral-950">
                                        <Icon name={selectedStep.icon} size={26} />
                                    </div>

                                    <h3
                                        id="process-modal-title"
                                        className="mt-5 text-2xl font-semibold tracking-tight text-white"
                                    >
                                        {selectedStep.title}
                                    </h3>

                                    <p className="mt-2 text-sm text-neutral-400">
                                        {selectedStep.subtitle}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSelectedStep(null)}
                                    aria-label="Tutup detail proses"
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-400 transition hover:border-white/30 hover:bg-white hover:text-neutral-950"
                                >
                                    <Icon name="close" size={19} />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="max-h-[55vh] overflow-y-auto p-6 sm:p-8">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
                                    Gambaran Proses
                                </p>

                                <p className="mt-3 text-sm leading-7 text-neutral-300">
                                    {selectedStep.text}
                                </p>
                            </div>

                            {/* Detail List */}
                            <div className="mt-8">
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
                                    Langkah-langkah
                                </p>

                                <div className="mt-5 space-y-5">
                                    {selectedStep.details.map((detail, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-4"
                                        >
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-xs font-semibold text-white">
                                                {String(index + 1).padStart(2, '0')}
                                            </div>

                                            <div className="flex-1 border-b border-white/[0.07] pb-5">
                                                <p className="text-sm leading-6 text-neutral-300">
                                                    {detail}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Result */}
                            <div className="mt-7 rounded-2xl border border-white/15 bg-white/[0.045] p-5">
                                <div className="flex items-center gap-2">
                                    <Icon
                                        name="check-circle"
                                        size={18}
                                        className="text-white"
                                    />

                                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                                        Hasil Tahapan
                                    </p>
                                </div>

                                <p className="mt-3 text-sm leading-6 text-white">
                                    {selectedStep.result}
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-white/[0.025] p-5 sm:px-8">
                            <span className="text-xs text-neutral-500">
                                FAMS · Alur Peminjaman
                            </span>

                            <div className="flex gap-2">
                                {selectedStep.n !== '01' && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const previousIndex = steps.findIndex(
                                                (step) => step.n === selectedStep.n,
                                            );

                                            setSelectedStep(steps[previousIndex - 1]);
                                        }}
                                        className="flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2.5 text-xs font-medium text-neutral-300 transition hover:bg-white hover:text-neutral-950"
                                    >
                                        <Icon name="chevron-left" size={15} />
                                        Sebelumnya
                                    </button>
                                )}

                                {selectedStep.n !== '04' ? (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const currentIndex = steps.findIndex(
                                                (step) => step.n === selectedStep.n,
                                            );

                                            setSelectedStep(steps[currentIndex + 1]);
                                        }}
                                        className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200"
                                    >
                                        Selanjutnya
                                        <Icon name="chevron-right" size={15} />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setSelectedStep(null)}
                                        className="rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200"
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
