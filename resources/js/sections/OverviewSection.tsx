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
        card: 'from-[#F97316] via-[#EA580C] to-[#C2410C] text-white',
        value: 'text-white',
        label: 'text-white',
        icon: 'bg-white/15 text-white ring-1 ring-white/20',
        arrow: 'text-white/70',
        description: 'text-white/75',
        motif: 'text-white',
    },
    {
        card: 'from-charcoal-900 via-charcoal-800 to-charcoal-700 text-white',
        value: 'text-white',
        label: 'text-white',
        icon: 'bg-white/10 text-[#FDBA74] ring-1 ring-white/15',
        arrow: 'text-white/60',
        description: 'text-white/65',
        motif: 'text-white',
    },
    {
        card: 'from-[#FFF7ED] via-white to-[#FFEDD5] text-[#171717]',
        value: 'text-[#171717]',
        label: 'text-gray-900',
        icon: 'bg-[#F97316] text-white',
        arrow: 'text-orange-500',
        description: 'text-gray-600',
        motif: 'text-orange-600',
    },
    {
        card: 'from-charcoal-800 via-charcoal-700 to-charcoal-600 text-white',
        value: 'text-white',
        label: 'text-white',
        icon: 'bg-white/10 text-[#FDBA74] ring-1 ring-white/20',
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

export default function OverviewSection() {
    return (
        <section
            id="overview"
            className="landing-section relative overflow-hidden border-y border-orange-100 bg-surface-warm px-space-lg py-space-section-sm lg:px-space-2xl lg:py-space-section"
        >
            {/* Background Decoration */}
            <div className="pointer-events-none absolute -top-40 -right-40 size-96 rounded-full bg-orange-200/40 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-40 -left-40 size-96 rounded-full bg-white/80 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">
                {/* Section Introduction */}
                <div className="grid gap-space-2xl lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
                    <div>
                        <p className="text-caption font-semibold tracking-[0.2em] text-orange-600 uppercase">
                            Satu sistem terintegrasi
                        </p>

                        <h2 className="mt-space-lg text-heading leading-snug font-semibold tracking-tight text-[#171717] sm:text-display-sm">
                            Lebih dari sekadar daftar inventaris.
                        </h2>
                    </div>

                    <div className="lg:max-w-xl lg:justify-self-end">
                        <p className="text-body leading-7 text-gray-600">
                            Pantau informasi aset, aktivitas peminjaman,
                            ketersediaan fasilitas, hingga kondisi aset melalui
                            satu sistem pengelolaan yang terorganisir.
                        </p>
                    </div>
                </div>

                {/* Asset Dashboard */}
                <div className="mt-12 overflow-hidden rounded-panel border border-orange-100 bg-[#FAFAF9] shadow-[0_15px_45px_rgba(23,23,23,0.07)]">
                    {/* Dashboard Header */}
                    <div className="flex flex-col gap-5 border-b border-orange-100 bg-white px-5 py-space-xl sm:flex-row sm:items-center sm:justify-between sm:px-space-2xl">
                        <div className="flex items-center gap-space-lg">
                            <div className="flex h-12 w-12 items-center justify-center rounded-card bg-[#F97316] text-white shadow-[0_6px_15px_rgba(249,115,22,0.25)]">
                                <Icon name="chart" size={23} />
                            </div>

                            <div>
                                <p className="text-micro font-semibold tracking-[0.2em] text-orange-600 uppercase">
                                    FAMS WORKSPACE
                                </p>

                                <h3 className="mt-space-xs text-subheading font-semibold tracking-tight text-[#171717]">
                                    Ringkasan Aset
                                </h3>
                            </div>
                        </div>

                        <div className="flex items-center gap-space-sm self-start rounded-pill border border-orange-200 bg-orange-50 px-space-md py-space-sm sm:self-center">
                            <span className="h-2 w-2 rounded-pill bg-[#F97316]" />

                            <span className="text-micro font-medium text-orange-700">
                                DATA DEMONSTRASI
                            </span>
                        </div>
                    </div>

                    <div className="p-5 sm:p-space-2xl">
                        {/* Main Statistics */}
                        <div className="grid gap-space-lg sm:grid-cols-2 xl:grid-cols-4">
                            {stats.map((stat, index) => {
                                const tone =
                                    statTones[index % statTones.length];

                                return (
                                    <article
                                        key={stat.label}
                                        className={`group relative isolate overflow-hidden rounded-card border border-white/50 bg-gradient-to-br ${tone.card} p-5 shadow-[0_12px_35px_rgba(23,23,23,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(23,23,23,0.16)]`}
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

                                        <div className="pointer-events-none absolute -top-12 -right-10 -z-10 size-36 rounded-pill border border-current opacity-10 transition-transform duration-500 group-hover:scale-125" />

                                        <div className="pointer-events-none absolute -top-5 -right-3 -z-10 size-24 rounded-pill border border-current opacity-10" />

                                        <div className="flex items-center justify-between">
                                            <span
                                                className={`flex h-10 w-10 items-center justify-center rounded-card ${tone.icon} transition group-hover:scale-105`}
                                            >
                                                <Icon
                                                    name={stat.icon}
                                                    size={20}
                                                />
                                            </span>

                                            <span
                                                className={`text-caption ${tone.arrow}`}
                                            >
                                                ↗
                                            </span>
                                        </div>

                                        <p
                                            className={`mt-space-xl text-display-sm font-semibold tracking-tight ${tone.value}`}
                                        >
                                            {stat.value}
                                        </p>

                                        <h4
                                            className={`mt-space-sm text-body font-semibold ${tone.label}`}
                                        >
                                            {stat.label}
                                        </h4>

                                        <p
                                            className={`mt-space-xs text-caption ${tone.description}`}
                                        >
                                            {stat.description}
                                        </p>
                                    </article>
                                );
                            })}
                        </div>

                        {/* Additional Statistics */}
                        <div className="mt-space-2xl">
                            <div className="mb-space-lg flex items-center justify-between">
                                <h4 className="text-body font-semibold text-[#171717]">
                                    Informasi Lainnya
                                </h4>

                                <span className="text-micro font-medium tracking-wider text-orange-600 uppercase">
                                    Asset Monitoring
                                </span>
                            </div>

                            <div className="grid gap-space-md sm:grid-cols-2 lg:grid-cols-4">
                                {additionalStats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="flex items-center gap-space-md rounded-card border border-gray-200 bg-white p-space-lg transition duration-300 hover:border-orange-300 hover:shadow-[0_8px_25px_rgba(249,115,22,0.08)]"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card border border-orange-100 bg-orange-50 text-orange-600">
                                            <Icon name={stat.icon} size={18} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-card-title font-semibold text-[#171717]">
                                                {stat.value}
                                            </p>

                                            <p className="mt-space-xs text-caption leading-5 text-gray-500">
                                                {stat.label}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dashboard Footer */}
                        <div className="mt-space-2xl flex flex-col gap-space-md border-t border-orange-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-caption leading-5 text-gray-400">
                                Contoh ringkasan inventaris dan aktivitas
                                pengelolaan aset fakultas.
                            </p>

                            <div className="flex items-center gap-space-sm text-caption font-medium text-gray-700">
                                <Icon name="shield" size={15} />
                                Asset Management System
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
