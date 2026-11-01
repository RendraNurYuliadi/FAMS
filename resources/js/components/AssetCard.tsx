
import type { Asset } from '../data/landing';
import Icon from './Icon';

type Props = {
    asset: Asset;
    onSelect: (asset: Asset) => void;
};

const cardTones = [
    {
        surface: 'from-white via-neutral-50 to-neutral-200',
        border: 'border-neutral-200',
        category: 'text-neutral-700',
        code: 'text-neutral-500',
        name: 'text-neutral-950',
        detail: 'text-neutral-600',
        footer: 'border-neutral-200',
        badge: 'bg-neutral-950 text-white',
        pattern: 'text-neutral-950',
    },
    {
        surface: 'from-neutral-50 via-neutral-100 to-neutral-200',
        border: 'border-neutral-200',
        category: 'text-neutral-700',
        code: 'text-neutral-500',
        name: 'text-neutral-950',
        detail: 'text-neutral-600',
        footer: 'border-neutral-300',
        badge: 'bg-neutral-800 text-white',
        pattern: 'text-neutral-950',
    },
    {
        surface: 'from-neutral-200 via-neutral-300 to-neutral-400',
        border: 'border-neutral-300',
        category: 'text-neutral-800',
        code: 'text-neutral-700',
        name: 'text-neutral-950',
        detail: 'text-neutral-800',
        footer: 'border-neutral-400',
        badge: 'bg-neutral-950 text-white',
        pattern: 'text-neutral-950',
    },
    {
        surface: 'from-neutral-500 via-neutral-600 to-neutral-700',
        border: 'border-neutral-500',
        category: 'text-white/85',
        code: 'text-white/65',
        name: 'text-white',
        detail: 'text-white/80',
        footer: 'border-white/30',
        badge: 'bg-white text-neutral-950',
        pattern: 'text-white',
    },
];

export default function AssetCard({ asset, onSelect }: Props) {
    const tone = cardTones[(asset.id - 1) % cardTones.length];

    return (
        <button
            type="button"
            onClick={() => onSelect(asset)}
            className={`group relative isolate overflow-hidden rounded-2xl border ${tone.border} bg-gradient-to-br ${tone.surface} text-left shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(0,0,0,0.18)]`}
        >
            <div
                className={`pointer-events-none absolute inset-0 -z-10 opacity-[0.12] ${tone.pattern}`}
                style={{
                    backgroundImage:
                        'repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 1px, transparent 14px)',
                    maskImage: 'linear-gradient(135deg, black, transparent 65%)',
                }}
            />
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                <img
                    src={asset.image}
                    alt={asset.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-70 transition-opacity group-hover:opacity-90" />
                <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-semibold shadow-sm backdrop-blur-md ${tone.badge}`}
                >
                    {asset.status}
                </span>
                <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/90 text-neutral-950 shadow-sm backdrop-blur-md transition group-hover:scale-105 group-hover:bg-neutral-950 group-hover:text-white">
                    <Icon name="arrow-up-right" size={17} />
                </span>
            </div>

            <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                    <span className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${tone.category}`}>
                        {asset.category}
                    </span>
                    <span className={`text-[10px] ${tone.code}`}>
                        {asset.code}
                    </span>
                </div>

                <h3 className={`mt-3 text-lg font-semibold tracking-tight ${tone.name}`}>
                    {asset.name}
                </h3>

                <p className={`mt-2 flex items-center gap-2 text-xs ${tone.detail}`}>
                    <Icon name="map-pin" size={14} />
                    {asset.location}
                </p>

                <div className={`mt-5 flex items-center justify-between border-t pt-4 ${tone.footer}`}>
                    <span className={`text-xs ${tone.detail}`}>
                        Lihat detail
                    </span>
                    <Icon name="arrow-right" size={16} className={tone.detail} />
                </div>
            </div>
        </button>
    );
}
