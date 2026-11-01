
import Icon from '../components/Icon';

const stats = [
    {
        icon: 'box' as const,
        label: 'Total Aset',
        value: '120',
        description: 'Seluruh aset terdaftar',
    },
    {
        icon: 'calendar' as const,
        label: 'Dipinjam',
        value: '25',
        description: 'Aset sedang digunakan',
    },
    {
        icon: 'search' as const,
        label: 'Perlu Diperiksa',
        value: '8',
        description: 'Menunggu pemeriksaan',
    },
    {
        icon: 'wrench' as const,
        label: 'Maintenance',
        value: '5',
        description: 'Dalam pemeliharaan',
    },
];

const statTones = [
    {
        card: 'from-white via-neutral-50 to-neutral-200 text-neutral-950',
        value: 'text-neutral-950',
        label: 'text-neutral-800',
        icon: 'bg-neutral-950 text-white',
        arrow: 'text-neutral-500',
        description: 'text-neutral-600',
        motif: 'text-neutral-950',
    },
    {
        card: 'from-neutral-950 via-neutral-800 to-neutral-600 text-white',
        value: 'text-white',
        label: 'text-white',
        icon: 'bg-white/15 text-white ring-1 ring-white/20',
        arrow: 'text-white/60',
        description: 'text-white/65',
        motif: 'text-white',
    },
    {
        card: 'from-neutral-300 via-neutral-200 to-neutral-100 text-neutral-950',
        value: 'text-neutral-950',
        label: 'text-neutral-900',
        icon: 'bg-neutral-700 text-white',
        arrow: 'text-neutral-600',
        description: 'text-neutral-600',
        motif: 'text-neutral-950',
    },
    {
        card: 'from-neutral-800 via-neutral-700 to-neutral-500 text-white',
        value: 'text-white',
        label: 'text-white',
        icon: 'bg-white text-neutral-950',
        arrow: 'text-white/65',
        description: 'text-white/70',
        motif: 'text-white',
    },
];

const additionalStats = [
    {
        icon: 'check' as const,
        label: 'Aset Tersedia',
        value: '82',
    },
    {
        icon: 'clock' as const,
        label: 'Menunggu Persetujuan',
        value: '6',
    },
    {
        icon: 'file' as const,
        label: 'Pengajuan Peminjaman',
        value: '34',
    },
    {
        icon: 'shield' as const,
        label: 'Laporan Kerusakan',
        value: '3',
    },
];

const items = [
    {
        icon: 'box' as const,
        title: 'Inventaris terpusat',
        text: 'Informasi aset dan lokasi dalam satu sistem.',
    },
    {
        icon: 'calendar' as const,
        title: 'Alur peminjaman',
        text: 'Pengajuan, persetujuan, dan jadwal pengembalian.',
    },
    {
        icon: 'shield' as const,
        title: 'Akuntabilitas',
        text: 'Pencatatan kondisi serta riwayat penggunaan.',
    },
];

export default function OverviewSection() {
    return (
        <section
            id="overview"
            className="border-y border-neutral-200 bg-white px-5 py-20 lg:px-8 lg:py-24"
        >
            <div className="mx-auto max-w-7xl">
                {/* Section Introduction */}
                <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                            Satu sistem terintegrasi
                        </p>

                        <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                            Lebih dari sekadar daftar inventaris.
                        </h2>
                    </div>

                    <div className="lg:max-w-xl lg:justify-self-end">
                        <p className="text-sm leading-7 text-neutral-500">
                            Pantau informasi aset, aktivitas peminjaman,
                            ketersediaan fasilitas, hingga kondisi aset
                            melalui satu sistem pengelolaan yang terorganisir.
                        </p>
                    </div>
                </div>

                {/* Asset Dashboard */}
                <div className="mt-12 overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 shadow-[0_15px_45px_rgba(0,0,0,0.04)]">
                    {/* Dashboard Header */}
                    <div className="flex flex-col gap-5 border-b border-neutral-200 bg-white px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-950 text-white">
                                <Icon name="chart" size={23} />
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                                    FAMS WORKSPACE
                                </p>

                                <h3 className="mt-1 text-lg font-semibold tracking-tight text-neutral-950">
                                    Ringkasan Aset
                                </h3>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 self-start rounded-full border border-neutral-200 bg-neutral-50 px-3 py-2 sm:self-center">
                            <span className="h-2 w-2 rounded-full bg-neutral-400" />
                            <span className="text-[10px] font-medium text-neutral-500">
                                DATA DEMONSTRASI
                            </span>
                        </div>
                    </div>

                    <div className="p-5 sm:p-8">
                        {/* Main Statistics */}
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {stats.map((stat, index) => {
                                const tone = statTones[index % statTones.length];

                                return (
                                <article
                                    key={stat.label}
                                    className={`group relative isolate overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-br ${tone.card} p-5 shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,0.16)]`}
                                >
                                    <div
                                        className={`pointer-events-none absolute inset-0 -z-10 opacity-[0.12] transition-opacity duration-300 group-hover:opacity-20 ${tone.motif}`}
                                        style={{
                                            backgroundImage:
                                                'repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 1px, transparent 13px)',
                                            maskImage:
                                                'linear-gradient(135deg, black, transparent 60%)',
                                        }}
                                    />
                                    <div className={`pointer-events-none absolute -right-10 -top-12 -z-10 size-36 rounded-full border border-current opacity-10 transition-transform duration-500 group-hover:scale-125`} />
                                    <div className="pointer-events-none absolute -right-3 -top-5 -z-10 size-24 rounded-full border border-current opacity-10" />
                                    <div className="flex items-center justify-between">
                                        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone.icon} transition group-hover:scale-105`}>
                                            <Icon name={stat.icon} size={20} />
                                        </span>

                                        <span className={`text-xs ${tone.arrow}`}>
                                            ↗
                                        </span>
                                    </div>

                                    <p className={`mt-6 text-3xl font-semibold tracking-tight ${tone.value}`}>
                                        {stat.value}
                                    </p>

                                    <h4 className={`mt-2 text-sm font-semibold ${tone.label}`}>
                                        {stat.label}
                                    </h4>

                                    <p className={`mt-1 text-xs ${tone.description}`}>
                                        {stat.description}
                                    </p>
                                </article>
                                );
                            })}
                        </div>

                        {/* Additional Statistics */}
                        <div className="mt-8">
                            <div className="mb-4 flex items-center justify-between">
                                <h4 className="text-sm font-semibold text-neutral-800">
                                    Informasi Lainnya
                                </h4>

                                <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
                                    Asset Monitoring
                                </span>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                {additionalStats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 transition hover:border-neutral-400"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600">
                                            <Icon name={stat.icon} size={18} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xl font-semibold text-neutral-950">
                                                {stat.value}
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-neutral-500">
                                                {stat.label}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dashboard Footer */}
                        <div className="mt-8 flex flex-col gap-3 border-t border-neutral-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-xs leading-5 text-neutral-400">
                                Contoh ringkasan inventaris dan aktivitas pengelolaan aset fakultas.
                            </p>

                            <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
                                <Icon name="shield" size={15} />
                                Asset Management System
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAMS Advantages */}
                <div className="mt-16 grid gap-8 border-t border-neutral-200 pt-10 sm:grid-cols-3 sm:gap-6">
                    {items.map((item) => (
                        <article
                            key={item.title}
                            className="flex gap-4 sm:flex-col"
                        >
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white">
                                <Icon name={item.icon} />
                            </span>

                            <div>
                                <h3 className="text-sm font-semibold text-neutral-950">
                                    {item.title}
                                </h3>

                                <p className="mt-2 text-xs leading-6 text-neutral-500">
                                    {item.text}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
