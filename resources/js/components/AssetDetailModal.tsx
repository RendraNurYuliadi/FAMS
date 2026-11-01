
import { useEffect } from 'react';
import type { Asset } from '../data/landing';
import Icon from './Icon';

type Props = {
    asset: Asset | null;
    onClose: () => void;
};

export default function AssetDetailModal({ asset, onClose }: Props) {
    useEffect(() => {
        if (!asset) return;

        const handleKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [asset, onClose]);

    if (!asset) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="asset-modal-title"
                className="my-auto w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
                <div className="relative aspect-[16/8] bg-neutral-100">
                    <img
                        src={asset.image}
                        alt={asset.name}
                        className="h-full w-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Tutup detail aset"
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow"
                    >
                        <Icon name="close" />
                    </button>
                </div>

                <div className="p-6 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                        {asset.category} / {asset.code}
                    </p>

                    <h2 id="asset-modal-title" className="mt-3 text-2xl font-semibold tracking-tight">
                        {asset.name}
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-neutral-500">
                        {asset.description}
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-neutral-200 p-4">
                            <p className="text-xs text-neutral-500">Lokasi</p>
                            <p className="mt-2 text-sm font-medium">{asset.location}</p>
                        </div>
                        <div className="rounded-xl border border-neutral-200 p-4">
                            <p className="text-xs text-neutral-500">Status simulasi</p>
                            <p className="mt-2 text-sm font-medium">{asset.status}</p>
                        </div>
                    </div>

                    <p className="mt-5 text-xs leading-6 text-neutral-400">
                        Data contoh untuk pratinjau. Status dan ketersediaan
                        aktual harus diverifikasi melalui sistem.
                    </p>

                    <button
                        type="button"
                        onClick={onClose}
                        className="mt-6 w-full rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
                    >
                        Tutup Detail
                    </button>
                </div>
            </section>
        </div>
    );
}
