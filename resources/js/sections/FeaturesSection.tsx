import SectionHeading from '../components/SectionHeading';
import Icon from '../components/Icon';

const features = [
    {
        icon: 'box' as const,
        title: 'Manajemen Aset',
        text: 'Kelola identitas, kategori, lokasi, foto, kondisi, dan riwayat aset.',
        number: '01',
        tag: 'INVENTORY',
        accent: 'bg-orange-50 text-orange-600',
    },
    {
        icon: 'calendar' as const,
        title: 'Peminjaman Terstruktur',
        text: 'Atur tujuan, jadwal, penanggung jawab, dan persetujuan peminjaman.',
        number: '02',
        tag: 'BORROWING',
        accent: 'bg-neutral-100 text-neutral-800',
    },
    {
        icon: 'check' as const,
        title: 'Pengembalian',
        text: 'Catat pengembalian dan verifikasi kondisi aset.',
        number: '03',
        tag: 'RETURN',
        accent: 'bg-orange-100 text-orange-700',
    },
    {
        icon: 'rfid' as const,
        title: 'Identifikasi RFID',
        text: 'Dukung identifikasi aset pada proses pengambilan dan pengembalian.',
        number: '04',
        tag: 'IDENTIFICATION',
        accent: 'bg-neutral-900 text-orange-400',
    },
    {
        icon: 'wrench' as const,
        title: 'Perawatan Aset',
        text: 'Catat pengaduan, tindak lanjut, dan riwayat maintenance.',
        number: '05',
        tag: 'MAINTENANCE',
        accent: 'bg-orange-50 text-orange-600',
    },
    {
        icon: 'chart' as const,
        title: 'Laporan Pengelolaan',
        text: 'Siapkan ringkasan aset, transaksi, keterlambatan, dan perawatan.',
        number: '06',
        tag: 'REPORTING',
        accent: 'bg-neutral-100 text-neutral-800',
    },
];

export default function FeaturesSection() {
    return (
        <section
            id="fitur"
            className="landing-section relative overflow-hidden bg-surface-warm px-space-lg py-space-section sm:py-space-section-lg lg:px-space-2xl"
        >
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2">
                            <span className="h-2 w-2 rounded-full bg-[#F97316]" />
                            <span className="text-xs font-semibold tracking-[0.18em] text-orange-700 uppercase">
                                Fitur Sistem
                            </span>
                        </div>

                        <h2 className="text-3xl leading-tight font-bold tracking-tight text-[#171717] sm:text-4xl lg:text-5xl">
                            Dirancang mengikuti kebutuhan{' '}
                            <span className="text-[#F97316]">
                                pengelolaan aset.
                            </span>
                        </h2>
                    </div>

                    <p className="max-w-md text-sm leading-7 text-neutral-600 sm:text-base">
                        Fungsi utama FAMS disusun berdasarkan alur kerja
                        pengelola dan peminjam, bukan sekadar kumpulan menu.
                    </p>
                </div>

                <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <article
                            key={feature.title}
                            className={`group relative flex min-h-[265px] flex-col justify-between overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                                index === 3
                                    ? 'border-charcoal-900 bg-charcoal-900 text-white'
                                    : 'border-orange-100 bg-white text-[#171717] hover:border-orange-300'
                            }`}
                        >
                            <div className="flex items-start justify-between">
                                <div
                                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.accent}`}
                                >
                                    <Icon name={feature.icon} size={25} />
                                </div>

                                <span
                                    className={`text-sm font-semibold tracking-widest ${
                                        index === 3
                                            ? 'text-neutral-600'
                                            : 'text-orange-200'
                                    }`}
                                >
                                    {feature.number}
                                </span>
                            </div>

                            <div className="relative z-10 mt-10">
                                <span
                                    className={`text-[10px] font-bold tracking-[0.2em] ${
                                        index === 3
                                            ? 'text-orange-400'
                                            : 'text-orange-600'
                                    }`}
                                >
                                    {feature.tag}
                                </span>

                                <h3 className="mt-2 text-xl font-bold tracking-tight">
                                    {feature.title}
                                </h3>

                                <p
                                    className={`mt-3 max-w-sm text-sm leading-6 ${
                                        index === 3
                                            ? 'text-neutral-400'
                                            : 'text-neutral-500'
                                    }`}
                                >
                                    {feature.text}
                                </p>
                            </div>

                            {index === 3 && (
                                <div className="pointer-events-none absolute -right-8 -bottom-12 h-40 w-40 rounded-full border-[22px] border-neutral-800" />
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
