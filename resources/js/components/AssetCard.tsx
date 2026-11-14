import type { Asset } from '../data/landing';
import Icon from './Icon';

type Props = {
    asset: Asset;
    onSelect: (asset: Asset) => void;
};

const cardTones = [
    {
        surface: 'from-white via-gray-50 to-gray-200',
        border: 'border-gray-200',
        category: 'text-gray-700',
        code: 'text-gray-500',
        name: 'text-gray-950',
        detail: 'text-gray-600',
        footer: 'border-gray-200',
        badge: 'bg-gray-950 text-white',
        pattern: 'text-gray-950',
    },
    {
        surface: 'from-gray-50 via-gray-100 to-gray-200',
        border: 'border-gray-200',
        category: 'text-gray-700',
        code: 'text-gray-500',
        name: 'text-gray-950',
        detail: 'text-gray-600',
        footer: 'border-gray-300',
        badge: 'bg-gray-800 text-white',
        pattern: 'text-gray-950',
    },
    {
        surface: 'from-gray-200 via-gray-300 to-gray-400',
        border: 'border-gray-300',
        category: 'text-gray-800',
        code: 'text-gray-700',
        name: 'text-gray-950',
        detail: 'text-gray-800',
        footer: 'border-gray-400',
        badge: 'bg-gray-950 text-white',
        pattern: 'text-gray-950',
    },
    {
        surface: 'from-gray-500 via-gray-600 to-gray-700',
        border: 'border-gray-500',
        category: 'text-white/85',
        code: 'text-white/65',
        name: 'text-white',
        detail: 'text-white/80',
        footer: 'border-white/30',
        badge: 'bg-white text-gray-950',
        pattern: 'text-white',
    },
];

export default function AssetCard({ asset, onSelect }: Props) {
    const tone = cardTones[(asset.id - 1) % cardTones.length];

    return (
        <button
            type="button"
            onClick={() => onSelect(asset)}
            className={`group relative isolate overflow-hidden rounded-card border ${tone.border} bg-gradient-to-br ${tone.surface} text-left shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(0,0,0,0.18)]`}
        >
            <div
                className={`pointer-events-none absolute inset-0 -z-10 opacity-[0.12] ${tone.pattern}`}
                style={{
                    backgroundImage:
                        'repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 1px, transparent 14px)',
                    maskImage:
                        'linear-gradient(135deg, black, transparent 65%)',
                }}
            />
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                    src={asset.image}
                    alt={asset.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-70 transition-opacity group-hover:opacity-90" />
                <span
                    className={`absolute top-4 left-4 rounded-pill px-space-md py-1.5 text-micro font-semibold shadow-sm backdrop-blur-md ${tone.badge}`}
                >
                    {asset.status}
                </span>
                <span className="absolute right-4 bottom-4 flex h-9 w-9 items-center justify-center rounded-pill border border-white/60 bg-white/90 text-gray-950 shadow-sm backdrop-blur-md transition group-hover:scale-105 group-hover:bg-gray-950 group-hover:text-white">
                    <Icon name="arrow-up-right" size={17} />
                </span>
            </div>

            <div className="p-5">
                <div className="flex items-center justify-between gap-space-md">
                    <span
                        className={`text-micro font-semibold tracking-[0.15em] uppercase ${tone.category}`}
                    >
                        {asset.category}
                    </span>
                    <span className={`text-micro ${tone.code}`}>
                        {asset.code}
                    </span>
                </div>

                <h3
                    className={`mt-space-md text-subheading font-semibold tracking-tight ${tone.name}`}
                >
                    {asset.name}
                </h3>

                <p
                    className={`mt-space-sm flex items-center gap-space-sm text-caption ${tone.detail}`}
                >
                    <Icon name="map-pin" size={14} />
                    {asset.location}
                </p>

                <div
                    className={`mt-5 flex items-center justify-between border-t pt-space-lg ${tone.footer}`}
                >
                    <span className={`text-caption ${tone.detail}`}>
                        Lihat detail
                    </span>
                    <Icon
                        name="arrow-right"
                        size={16}
                        className={tone.detail}
                    />
                </div>
            </div>
        </button>
    );
}
