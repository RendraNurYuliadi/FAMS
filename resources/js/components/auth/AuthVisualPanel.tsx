import Icon from '../Icon';

type AuthVisualPanelProps = {
    badgeLabel?: string;
    className?: string;
};

export default function AuthVisualPanel({
    badgeLabel = 'SMART FACULTY MANAGEMENT',
    className = '',
}: AuthVisualPanelProps) {
    return (
        <aside
            className={`relative hidden min-h-full overflow-hidden bg-surface-warm text-text-primary lg:flex lg:flex-col lg:gap-4 lg:p-10 xl:p-12 ${className}`}
        >
            <div className="relative flex min-h-[320px] flex-1 flex-col justify-end overflow-hidden rounded-card border border-primary-200/80 bg-white shadow-sm">
                <img
                    src="/storage/assets/barang/Fams3.jpg"
                    alt="Fasilitas dan aset fakultas"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/30 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/25 to-transparent" />

                <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-md">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white">
                        F
                    </span>
                    <span className="text-[9px] font-semibold tracking-[0.12em] text-text-primary">
                        FACULTY ASSET MANAGEMENT
                    </span>
                </div>

                <div className="relative z-10 p-6 xl:p-8">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[9px] font-semibold tracking-[0.16em] text-white backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
                        {badgeLabel}
                    </span>

                    <h2 className="mt-5 text-3xl leading-[1.2] font-semibold tracking-tight text-white xl:text-4xl">
                        Kelola aset.
                        <br />
                        <span className="text-white/75">Lebih mudah,</span>
                        <br />
                        lebih terorganisir.
                    </h2>

                    <p className="mt-4 max-w-[370px] text-sm leading-6 text-white/80">
                        Satu platform untuk memantau aset, mengelola peminjaman,
                        dan memastikan fasilitas fakultas selalu terkontrol.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="rounded-card border border-primary-200/80 bg-white p-4 shadow-sm">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary-600">
                        <Icon name="building" size={18} />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-text-primary">
                        Manajemen Aset
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-gray-500">
                        Data dan kondisi aset terorganisir.
                    </p>
                </div>

                <div className="rounded-card border border-primary-200/80 bg-white p-4 shadow-sm">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary-600">
                        <Icon name="clock" size={18} />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-text-primary">
                        Peminjaman
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-gray-500">
                        Proses pinjam dan pengembalian lebih praktis.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between border-t border-primary-200/80 pt-4">
                <div>
                    <p className="text-xs font-medium text-text-primary">
                        Satu sistem, kendali lebih baik.
                    </p>

                    <p className="mt-1 text-[10px] text-gray-500">
                        Faculty Asset Management System
                    </p>
                </div>

                <span className="text-xs font-semibold tracking-[0.2em] text-primary-600">
                    FAMS.
                </span>
            </div>
        </aside>
    );
}
