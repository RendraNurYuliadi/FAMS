import Icon from '../Icon';
import type { IconName } from '../Icon';

type Props = {
    title: string;
    description: string;
    contextLabel: string;
    icon: IconName;
    statusLabel: string;
    metrics: {
        label: string;
        value: number;
    }[];
};

export default function AssetManagementBanner({
    title,
    description,
    contextLabel,
    icon,
    statusLabel,
    metrics,
}: Props) {
    return (
        <section className="relative isolate min-h-[230px] overflow-hidden rounded-2xl bg-neutral-950 text-white">
            <div
                className="absolute inset-0 -z-20 bg-cover bg-center opacity-35"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=85')",
                }}
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-neutral-950/30" />

            <div className="absolute -top-20 -right-12 size-64 rounded-full border border-white/10" />
            <div className="absolute -top-10 -right-2 size-44 rounded-full border border-white/10" />
            <div className="absolute right-[20%] bottom-[-90px] size-52 rounded-full bg-white/5 blur-2xl" />

            <div className="relative flex min-h-[230px] flex-col justify-between gap-8 p-6 sm:p-8 lg:flex-row lg:items-center">
                <div className="max-w-xl">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                        <span className="size-1.5 rounded-full bg-teal-300" />
                        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/80">
                            Faculty Asset Management System
                        </span>
                    </div>

                    <p className="text-sm font-medium text-white/60">
                        Manajemen Aset
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                        {title}
                    </h2>
                    <p className="mt-3 max-w-lg text-xs leading-6 text-white/65 sm:text-sm">
                        {description}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-[10px] font-semibold text-neutral-950 shadow-lg">
                            <Icon name={icon} size={14} />
                            {contextLabel}
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-[10px] font-medium text-white/90 backdrop-blur-sm">
                            <span className="size-1.5 rounded-full bg-teal-300" />
                            {statusLabel}
                        </span>
                    </div>
                </div>

                <div className="hidden shrink-0 flex-col items-end gap-3 lg:flex">
                    <div className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-md">
                        <div className="flex items-center gap-3">
                            <div className="flex size-12 items-center justify-center rounded-xl bg-white text-neutral-950">
                                <Icon name={icon} size={25} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold tracking-[0.12em]">
                                    FAMS
                                </p>
                                <p className="text-[9px] tracking-[0.18em] text-white/60">
                                    ASSET MANAGEMENT
                                </p>
                            </div>
                        </div>
                        <div className="mt-5 flex items-center justify-between gap-8 border-t border-white/15 pt-4">
                            {metrics.slice(0, 2).map((metric) => (
                                <div key={metric.label}>
                                    <p className="text-[9px] text-white/50">
                                        {metric.label}
                                    </p>
                                    <p className="mt-1 text-lg font-bold">
                                        {metric.value.toLocaleString('id-ID')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[9px] font-medium tracking-wider text-white/50 backdrop-blur-sm">
                        MANAGE · ORGANIZE · TRACK
                    </span>
                </div>
            </div>
        </section>
    );
}
