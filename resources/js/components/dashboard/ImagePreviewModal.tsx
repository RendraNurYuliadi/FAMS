import { useEffect } from 'react';
import Icon from '../Icon';

export type ImagePreviewState = {
    images: string[];
    imageNames?: string[];
    index: number;
    entityName: string;
};

type Props = {
    preview: ImagePreviewState | null;
    heading: string;
    onClose: () => void;
    onIndexChange: (index: number) => void;
};

export default function ImagePreviewModal({
    preview,
    heading,
    onClose,
    onIndexChange,
}: Props) {
    useEffect(() => {
        if (!preview) return;

        const activePreview = preview;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            } else if (
                event.key === 'ArrowLeft' &&
                activePreview.images.length > 1
            ) {
                onIndexChange(
                    (activePreview.index - 1 + activePreview.images.length) %
                        activePreview.images.length,
                );
            } else if (
                event.key === 'ArrowRight' &&
                activePreview.images.length > 1
            ) {
                onIndexChange(
                    (activePreview.index + 1) % activePreview.images.length,
                );
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onIndexChange, preview]);

    if (!preview) return null;

    const activePreview = preview;
    const imageName =
        activePreview.imageNames?.[activePreview.index] ||
        `${activePreview.entityName} - Foto ${activePreview.index + 1}`;

    function changeIndex(offset: number) {
        onIndexChange(
            (activePreview.index + offset + activePreview.images.length) %
                activePreview.images.length,
        );
    }

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-neutral-950/80 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
            role="dialog"
            aria-modal="true"
            aria-label={heading}
        >
            <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-white p-3 shadow-2xl sm:p-4">
                <div className="flex items-center justify-between gap-3 px-1 pb-3">
                    <div className="min-w-0">
                        <h2 className="text-sm font-semibold text-neutral-950">
                            {heading}
                        </h2>
                        <p className="mt-0.5 truncate text-[11px] text-neutral-500">
                            {imageName}
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                        {activePreview.images.length > 1 && (
                            <span className="text-[11px] font-medium text-neutral-500">
                                {activePreview.index + 1} / {activePreview.images.length}
                            </span>
                        )}
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 transition hover:bg-neutral-200 hover:text-neutral-950"
                            aria-label="Tutup preview"
                        >
                            <Icon name="close" size={18} />
                        </button>
                    </div>
                </div>

                <div className="relative flex max-h-[75vh] min-h-[200px] items-center justify-center overflow-hidden rounded-xl bg-neutral-100">
                    <img
                        src={activePreview.images[activePreview.index]}
                        alt={imageName}
                        className="max-h-[75vh] max-w-full object-contain"
                    />

                    {activePreview.images.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={() => changeIndex(-1)}
                                aria-label="Foto sebelumnya"
                                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-md transition hover:bg-white"
                            >
                                <Icon name="chevron-left" size={20} />
                            </button>
                            <button
                                type="button"
                                onClick={() => changeIndex(1)}
                                aria-label="Foto berikutnya"
                                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-md transition hover:bg-white"
                            >
                                <Icon name="chevron-right" size={20} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
