
import type { Asset } from '../data/landing';
import Icon from './Icon';

type Props = {
    asset: Asset;
    onSelect: (asset: Asset) => void;
};

export default function AssetCard({ asset, onSelect }: Props) {
    const statusStyle = {
        Tersedia: 'bg-neutral-100 text-neutral-800',
        'Perlu Pemeriksaan': 'bg-neutral-200 text-neutral-700',
        Maintenance: 'bg-neutral-950 text-white',
    };

    return (
        <button
            type="button"
            onClick={() => onSelect(asset)}
            className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left transition duration-300 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-xl hover:shadow-neutral-200/50"
        >
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                <img
                    src={asset.image}
                    alt={asset.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-semibold ${statusStyle[asset.status]}`}
                >
                    {asset.status}
                </span>
                <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-950 shadow-sm transition group-hover:bg-black group-hover:text-white">
                    <Icon name="arrow-up-right" size={17} />
                </span>
            </div>

            <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
                        {asset.category}
                    </span>
                    <span className="text-[10px] text-neutral-400">
                        {asset.code}
                    </span>
                </div>

                <h3 className="mt-3 text-lg font-semibold tracking-tight">
                    {asset.name}
                </h3>

                <p className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
                    <Icon name="map-pin" size={14} />
                    {asset.location}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
                    <span className="text-xs text-neutral-500">
                        Lihat detail
                    </span>
                    <Icon name="arrow-right" size={16} className="text-neutral-500" />
                </div>
            </div>
        </button>
    );
}
