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
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-space-lg backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="asset-modal-title"
                className="my-auto w-full max-w-2xl overflow-hidden rounded-panel bg-white shadow-2xl"
            >
                <div className="relative aspect-[16/8] bg-gray-100">
                    <img
                        src={asset.image}
                        alt={asset.name}
                        className="h-full w-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Tutup detail aset"
                        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-pill bg-white shadow"
                    >
                        <Icon name="close" />
                    </button>
                </div>

                <div className="p-space-xl sm:p-space-2xl">
                    <p className="text-caption font-semibold tracking-[0.2em] text-gray-500 uppercase">
                        {asset.category} / {asset.code}
                    </p>

                    <h2
                        id="asset-modal-title"
                        className="mt-space-md text-heading font-semibold tracking-tight"
                    >
                        {asset.name}
                    </h2>

                    <p className="mt-space-lg text-body leading-7 text-gray-500">
                        {asset.description}
                    </p>

                    <div className="mt-space-xl grid gap-space-md sm:grid-cols-2">
                        <div className="rounded-card border border-gray-200 p-space-lg">
                            <p className="text-caption text-gray-500">Lokasi</p>
                            <p className="mt-space-sm text-body font-medium">
                                {asset.location}
                            </p>
                        </div>
                        <div className="rounded-card border border-gray-200 p-space-lg">
                            <p className="text-caption text-gray-500">
                                Status simulasi
                            </p>
                            <p className="mt-space-sm text-body font-medium">
                                {asset.status}
                            </p>
                        </div>
                    </div>

                    <p className="mt-5 text-caption leading-6 text-gray-400">
                        Data contoh untuk pratinjau. Status dan ketersediaan
                        aktual harus diverifikasi melalui sistem.
                    </p>

                    <button
                        type="button"
                        onClick={onClose}
                        className="mt-space-xl w-full rounded-pill bg-black px-5 py-space-md text-body font-medium text-white transition hover:bg-gray-700"
                    >
                        Tutup Detail
                    </button>
                </div>
            </section>
        </div>
    );
}
