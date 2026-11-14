import Icon from '../components/Icon';

const principles = [
    {
        number: '01',
        title: 'Transparansi informasi',
        text: 'Status, lokasi, dan kondisi aset dirancang agar lebih mudah ditelusuri.',
    },
    {
        number: '02',
        title: 'Proses yang terstruktur',
        text: 'Peminjaman, pengembalian, dan perawatan memiliki alur yang jelas.',
    },
    {
        number: '03',
        title: 'Teknologi yang terintegrasi',
        text: 'RFID dipertimbangkan sebagai pendukung identifikasi aset sesuai kesiapan perangkat.',
    },
];

export default function AboutSection() {
    return (
        <section
            id="tentang"
            className="landing-section relative isolate overflow-hidden bg-surface-warm px-space-lg py-space-section sm:py-space-section-lg lg:px-space-2xl"
        >
            {/* BACKGROUND TEXTURE */}
            <div
                className="pointer-events-none absolute inset-0 -z-10 opacity-[0.045]"
                style={{
                    backgroundImage:
                        'radial-gradient(#C2410C 0.8px, transparent 0.8px)',
                    backgroundSize: '22px 22px',
                    maskImage:
                        'linear-gradient(to bottom right, black, transparent 85%)',
                }}
            />

            {/* SOFT BACKGROUND ACCENTS */}
            <div className="pointer-events-none absolute -top-32 -right-32 -z-10 h-[420px] w-[420px] rounded-full bg-orange-200/40 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[400px] w-[400px] rounded-full bg-white/80 blur-3xl" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
                {/* LEFT: PROJECT IMAGE */}
                <div className="relative mx-auto w-full max-w-xl">
                    {/* ORANGE OFFSET SHAPE */}
                    <div className="absolute -right-5 -bottom-5 h-[75%] w-[78%] rounded-[2.5rem] bg-[#F97316] sm:-right-7 sm:-bottom-7" />

                    {/* SECOND DECORATIVE SHAPE */}
                    <div className="absolute top-12 -left-5 h-24 w-24 rounded-full bg-[#FED7AA]" />

                    {/* MAIN IMAGE */}
                    <div className="group relative z-10 overflow-hidden rounded-[2rem] bg-[#E7E5E4] shadow-[0_24px_60px_rgba(0,0,0,0.12)] sm:rounded-[2.5rem]">
                        <img
                            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85"
                            alt="Ilustrasi ruang kerja dan fasilitas"
                            loading="lazy"
                            className="aspect-[4/5] w-full object-cover grayscale transition duration-700 group-hover:scale-105"
                        />

                        {/* IMAGE OVERLAY */}
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/75 via-transparent to-transparent" />

                        {/* IMAGE LABEL */}
                        <div className="absolute top-6 left-6 rounded-full bg-white px-4 py-2 text-micro font-semibold tracking-wider text-[#171717] shadow-lg sm:top-8 sm:left-8">
                            NOVENTRA PROJECT
                        </div>

                        {/* IMAGE TEXT */}
                        <div className="absolute right-6 bottom-7 left-6 text-white sm:right-8 sm:bottom-9 sm:left-8">
                            <p className="text-micro font-semibold tracking-[0.2em] text-orange-300">
                                OUR PROJECT
                            </p>

                            <h3 className="mt-3 max-w-sm text-display-sm leading-tight font-semibold sm:text-display-md">
                                Faculty Asset Management System
                            </h3>

                            <p className="mt-3 text-caption text-gray-200">
                                A smarter approach to faculty asset management.
                            </p>
                        </div>
                    </div>

                    {/* PROJECT INFORMATION */}
                    <div className="relative z-10 mt-9 ml-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <p className="text-micro font-semibold tracking-[0.2em] text-[#EA580C]">
                                PROYEK KOLABORATIF
                            </p>

                            <p className="mt-2 text-body font-semibold text-[#171717]">
                                Kelompok Noventra
                            </p>

                            <p className="mt-1 text-caption text-gray-500">
                                Informatika 5A
                            </p>
                        </div>

                        <div className="flex items-center gap-2 self-start rounded-full bg-[#FFF0E5] px-4 py-2 sm:self-auto">
                            <span className="h-2 w-2 rounded-full bg-[#F97316]" />
                            <span className="text-micro font-semibold text-[#C2410C]">
                                FAMS · 2026
                            </span>
                        </div>
                    </div>
                </div>

                {/* RIGHT: ABOUT CONTENT */}
                <div className="relative">
                    {/* SECTION LABEL */}
                    <div className="inline-flex items-center gap-3 rounded-full border border-orange-200/70 bg-white/70 px-4 py-2">
                        <span className="h-2 w-2 rounded-full bg-[#F97316]" />
                        <p className="text-micro font-semibold tracking-[0.2em] text-[#C2410C]">
                            TENTANG FAMS
                        </p>
                    </div>

                    {/* HEADING */}
                    <h2 className="mt-7 max-w-xl text-display-sm leading-tight font-semibold tracking-tight text-[#171717] sm:text-display-md lg:text-display-lg">
                        Mengelola fasilitas dengan cara yang lebih{' '}
                        <span className="text-[#EA580C]">terarah.</span>
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="mt-6 max-w-xl text-body leading-8 text-gray-600 sm:text-body">
                        FAMS dirancang untuk membantu fakultas mengelola barang
                        dan ruangan, memantau proses peminjaman, mencatat
                        pengembalian, serta menindaklanjuti kerusakan dan
                        perawatan.
                    </p>

                    {/* PRINCIPLES */}
                    <div className="mt-12">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-caption font-semibold tracking-[0.15em] text-[#171717]">
                                PRINSIP PENGEMBANGAN
                            </h3>

                            <span className="text-micro font-medium text-gray-400">
                                03 PRINCIPLES
                            </span>
                        </div>

                        <div className="space-y-3">
                            {principles.map((item) => (
                                <div
                                    key={item.number}
                                    className="group flex gap-5 rounded-2xl border border-orange-200/80 bg-white px-4 py-5 shadow-[0_3px_14px_rgba(194,65,12,0.035)] transition duration-300 hover:-translate-y-0.5 hover:border-[#F97316] hover:shadow-[0_8px_24px_rgba(194,65,12,0.09)] sm:px-5"
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF0E5] text-caption font-bold text-[#EA580C] transition duration-300 group-hover:bg-[#F97316] group-hover:text-white">
                                        {item.number}
                                    </div>

                                    <div className="flex-1">
                                        <h4 className="text-body font-semibold text-[#171717] transition-colors group-hover:text-[#EA580C]">
                                            {item.title}
                                        </h4>

                                        <p className="mt-2 text-body leading-6 text-gray-600">
                                            {item.text}
                                        </p>
                                    </div>

                                    <div className="hidden shrink-0 items-center text-gray-300 transition duration-300 group-hover:translate-x-1 group-hover:text-[#F97316] sm:flex">
                                        <Icon name="arrow-up-right" size={18} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <a
                        href="#fitur"
                        className="group mt-9 inline-flex items-center gap-3 rounded-full bg-charcoal-900 px-6 py-3.5 text-body font-semibold text-white transition duration-300 hover:bg-[#F97316]"
                    >
                        Kenali fitur FAMS
                        <Icon name="arrow-right" size={17} />
                    </a>
                </div>
            </div>
        </section>
    );
}
