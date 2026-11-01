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
            className={`relative hidden min-h-full overflow-hidden bg-neutral-950 text-white lg:flex lg:flex-col lg:justify-between lg:p-10 xl:p-12 ${className}`}
        >
            <img
                src="/storage/assets/barang/Fams.png"
                alt="Ilustrasi pengelolaan aset FAMS"
                className="absolute inset-0 h-full w-full object-cover opacity-45"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/35 to-neutral-950" />

            <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                    backgroundImage:
                        'radial-gradient(#ffffff 0.8px, transparent 0.8px)',
                    backgroundSize: '20px 20px',
                }}
            />

            <div className="relative z-10">
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-sm font-bold">
                        F
                    </div>

                    <span className="text-xs font-semibold tracking-[0.18em] text-white/80">
                        FACULTY ASSET MANAGEMENT
                    </span>
                </div>

                <div className="mt-16 max-w-[420px]">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[9px] font-semibold tracking-[0.18em] text-white/80 backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        {badgeLabel}
                    </span>

                    <h2 className="mt-6 text-4xl leading-[1.2] font-semibold tracking-tight xl:text-[42px]">
                        Kelola aset.
                        <br />
                        <span className="text-white/55">
                            Lebih mudah,
                        </span>
                        <br />
                        lebih terorganisir.
                    </h2>

                    <p className="mt-5 max-w-[370px] text-sm leading-7 text-white/65">
                        Satu platform untuk memantau aset, mengelola
                        peminjaman, dan memastikan fasilitas fakultas selalu
                        terkontrol.
                    </p>
                </div>
            </div>

            <div className="relative z-10 mt-12 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                        <Icon name="building" size={18} />
                    </div>

                    <p className="mt-4 text-sm font-semibold">Manajemen Aset</p>

                    <p className="mt-1 text-[11px] leading-5 text-white/55">
                        Data dan kondisi aset terorganisir.
                    </p>
                </div>

                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                        <Icon name="clock" size={18} />
                    </div>

                    <p className="mt-4 text-sm font-semibold">Peminjaman</p>

                    <p className="mt-1 text-[11px] leading-5 text-white/55">
                        Proses pinjam dan pengembalian lebih praktis.
                    </p>
                </div>
            </div>

            <div className="relative z-10 mt-8 flex items-center justify-between border-t border-white/15 pt-5">
                <div>
                    <p className="text-xs font-medium text-white/80">
                        Satu sistem, kendali lebih baik.
                    </p>

                    <p className="mt-1 text-[10px] text-white/40">
                        Faculty Asset Management System
                    </p>
                </div>

                <span className="text-xs font-semibold tracking-[0.2em] text-white/50">
                    FAMS.
                </span>
            </div>
        </aside>
    );
}
