import Icon from '../Icon';
import type { IconName } from '../Icon';

type Props = {
    label: string;
    value: number | string;
    icon: IconName;
    index: number;
    description?: string;
    trend?: string;
};

const tones = [
    {
        surface: 'from-white via-primary-50 to-primary-100',
        border: 'border-primary-200',
        label: 'text-primary-800',
        value: 'text-text-primary',
        description: 'text-text-secondary',
        icon: 'bg-primary-500 text-white',
        badge: 'border-primary-200 bg-white/80 text-primary-700',
        trend: 'border-primary-300 text-primary-700',
        motif: 'text-primary-700',
    },
    {
        surface: 'from-primary-400 via-primary-500 to-primary-600',
        border: 'border-primary-500',
        label: 'text-white/85',
        value: 'text-white',
        description: 'text-white/75',
        icon: 'bg-white/15 text-white ring-1 ring-white/20',
        badge: 'border-white/25 bg-white/15 text-white',
        trend: 'border-white/25 text-white/90',
        motif: 'text-white',
    },
    {
        surface: 'from-charcoal-900 via-charcoal-800 to-charcoal-700',
        border: 'border-charcoal-700',
        label: 'text-white/75',
        value: 'text-white',
        description: 'text-white/65',
        icon: 'bg-white/15 text-white ring-1 ring-white/20',
        badge: 'border-white/20 bg-white/10 text-white/70',
        trend: 'border-white/20 text-white/75',
        motif: 'text-white',
    },
    {
        surface: 'from-primary-200 via-primary-100 to-primary-50',
        border: 'border-primary-300',
        label: 'text-primary-800',
        value: 'text-text-primary',
        description: 'text-text-secondary',
        icon: 'bg-charcoal-900 text-white',
        badge: 'border-primary-300 bg-white/70 text-primary-800',
        trend: 'border-primary-300 text-primary-800',
        motif: 'text-primary-800',
    },
];

export default function DashboardMetricCard({
    label,
    value,
    icon,
    index,
    description,
    trend,
}: Props) {
    const tone = tones[index % tones.length];

    return (
        <article
            className={`group relative isolate overflow-hidden rounded-2xl border bg-gradient-to-br ${tone.surface} ${tone.border} p-4 shadow-[0_10px_28px_rgba(0,0,0,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.14)] sm:p-5`}
        >
            <div
                className={`pointer-events-none absolute inset-0 -z-10 opacity-[0.1] transition-opacity group-hover:opacity-[0.16] ${tone.motif}`}
                style={{
                    backgroundImage:
                        'repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 1px, transparent 14px)',
                    maskImage: 'linear-gradient(135deg, black, transparent 65%)',
                }}
            />
            <div className="pointer-events-none absolute -right-8 -top-10 -z-10 size-28 rounded-full border border-current opacity-10 transition-transform duration-500 group-hover:scale-125" />

            <div className="flex items-center justify-between gap-2">
                <p className={`text-xs font-medium sm:text-sm ${tone.label}`}>
                    {label}
                </p>
                <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${tone.icon}`}>
                    <Icon name={icon} size={17} />
                </span>
            </div>

            <p className={`mt-3 text-2xl font-bold tracking-tight sm:text-3xl ${tone.value}`}>
                {typeof value === 'number' ? value.toLocaleString('id-ID') : value}
            </p>

            {description && (
                <p className={`mt-1 text-xs ${tone.description}`}>
                    {description}
                </p>
            )}

            <div className="mt-4 flex items-center justify-between gap-2">
                <span className={`rounded-full border px-2.5 py-1 text-[9px] font-semibold tracking-wide ${tone.badge}`}>
                    FAMS
                </span>
                {trend && (
                    <span className={`truncate rounded-full border px-2.5 py-1 text-[9px] font-medium ${tone.trend}`}>
                        {trend}
                    </span>
                )}
            </div>
        </article>
    );
}
