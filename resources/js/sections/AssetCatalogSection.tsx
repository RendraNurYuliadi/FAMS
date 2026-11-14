import { useEffect, useMemo, useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import Icon, { type IconName } from '../components/Icon';
import { assets, type Asset } from '../data/landing';

const PAGE_SIZE = 6;

// =====================================================
// ASSET IMAGE
// =====================================================

function getAssetImage(asset: Asset): string | null {
    const data = asset as Asset & Record<string, unknown>;

    const imageKeys = [
        'image',
        'imageUrl',
        'image_url',
        'img',
        'photo',
        'photoUrl',
        'photo_url',
        'thumbnail',
        'thumbnailUrl',
        'gambar',
        'foto',
        'src',
    ];

    for (const key of imageKeys) {
        const value = data[key];

        if (typeof value === 'string' && value.trim()) {
            return value;
        }

        if (value && typeof value === 'object') {
            const imageObject = value as Record<string, unknown>;
            const nestedImage =
                imageObject.url ?? imageObject.src ?? imageObject.path;

            if (typeof nestedImage === 'string' && nestedImage.trim()) {
                return nestedImage;
            }
        }
    }

    return null;
}

// =====================================================
// STATUS STYLE
// =====================================================

function getStatusStyle(status: string) {
    switch (status) {
        case 'Tersedia':
            return {
                badge: 'bg-green-50 text-green-700 border-green-200',
                dot: 'bg-green-500',
                label: 'Siap digunakan',
            };

        case 'Perlu Pemeriksaan':
            return {
                badge: 'bg-yellow-50 text-yellow-700 border-yellow-200',
                dot: 'bg-yellow-500',
                label: 'Perlu pengecekan',
            };

        case 'Maintenance':
            return {
                badge: 'bg-red-50 text-red-700 border-red-200',
                dot: 'bg-red-500',
                label: 'Dalam perawatan',
            };

        default:
            return {
                badge: 'bg-gray-50 text-gray-600 border-gray-200',
                dot: 'bg-gray-400',
                label: 'Status aset',
            };
    }
}

// =====================================================
// ASSET CARD
// =====================================================

function AssetCard({
    asset,
    index,
    onSelect,
}: {
    asset: Asset;
    index: number;
    onSelect: (asset: Asset) => void;
}) {
    const statusStyle = getStatusStyle(asset.status);
    const assetImage = getAssetImage(asset);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSelect(asset);
        }
    };

    return (
        <article
            role="button"
            tabIndex={0}
            aria-label={`Lihat detail ${asset.name}`}
            onClick={() => onSelect(asset)}
            onKeyDown={handleKeyDown}
            className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_16px_35px_rgba(23,23,23,0.09)] focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none"
        >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#F3F0EC]">
                {assetImage ? (
                    <img
                        src={assetImage}
                        alt={asset.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-50 to-gray-100">
                        <div className="flex size-16 items-center justify-center rounded-2xl bg-white text-orange-600 shadow-sm">
                            <Icon name="package" size={30} />
                        </div>
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                {/* Category */}
                <span className="absolute top-4 left-4 rounded-md bg-white/95 px-3 py-1.5 text-[10px] font-bold tracking-wider text-gray-700 uppercase backdrop-blur-sm">
                    {asset.category}
                </span>

                {/* Asset number */}
                <span className="absolute right-4 bottom-4 text-[10px] font-bold tracking-[0.16em] text-white/90">
                    NO. {String(index).padStart(2, '0')}
                </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-bold tracking-[0.16em] text-orange-700 uppercase">
                        {asset.code}
                    </span>

                    <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-semibold ${statusStyle.badge}`}
                    >
                        <span
                            className={`size-1.5 rounded-full ${statusStyle.dot}`}
                        />
                        {asset.status}
                    </span>
                </div>

                <h3 className="mt-4 line-clamp-2 text-base leading-snug font-bold text-[#171717] transition-colors group-hover:text-orange-700">
                    {asset.name}
                </h3>

                <div className="mt-5 mt-auto flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                    <div className="flex min-w-0 items-center gap-2 text-xs text-gray-500">
                        <Icon
                            name="map-pin"
                            size={15}
                            className="shrink-0 text-orange-600"
                        />
                        <span className="truncate">{asset.location}</span>
                    </div>

                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-charcoal-900 text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-orange-600">
                        <Icon name="arrow-up-right" size={15} />
                    </span>
                </div>
            </div>
        </article>
    );
}

// =====================================================
// ASSET DETAIL MODAL
// =====================================================

function AssetDetailModal({
    asset,
    onClose,
}: {
    asset: Asset | null;
    onClose: () => void;
}) {
    useEffect(() => {
        if (!asset) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [asset, onClose]);

    if (!asset) return null;

    const statusStyle = getStatusStyle(asset.status);
    const assetImage = getAssetImage(asset);

    const details: Array<{
        label: string;
        value: string;
        icon: IconName;
    }> = [
        { label: 'Nama Aset', value: asset.name, icon: 'package' },
        { label: 'Kode Aset', value: asset.code, icon: 'tag' },
        { label: 'Kategori', value: asset.category, icon: 'layers' },
        { label: 'Lokasi', value: asset.location, icon: 'map-pin' },
    ];

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/65 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
            role="presentation"
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="asset-detail-title"
                className="relative my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
                {/* Header */}
                <div className="relative overflow-hidden bg-charcoal-900 px-6 py-6 text-white sm:px-8">
                    <div className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-orange-500/20 blur-3xl" />

                    <div className="relative flex items-start justify-between gap-4">
                        <div>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-orange-400 uppercase">
                                FAMS / Detail Aset
                            </span>

                            <h2
                                id="asset-detail-title"
                                className="mt-2 text-xl font-bold"
                            >
                                Informasi Aset
                            </h2>

                            <p className="mt-1 text-xs text-gray-400">
                                Informasi lengkap aset yang dipilih
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Tutup detail"
                            className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-gray-300 transition hover:border-orange-400 hover:bg-orange-500 hover:text-white"
                        >
                            <Icon name="x" size={18} />
                        </button>
                    </div>
                </div>

                {/* Asset identity */}
                <div className="border-b border-orange-100 bg-[#FFF7ED] px-6 py-7 sm:px-8">
                    <div className="grid gap-6 sm:grid-cols-[210px_1fr] sm:items-center">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white sm:h-40">
                            {assetImage ? (
                                <img
                                    src={assetImage}
                                    alt={asset.name}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-50 to-gray-100">
                                    <Icon
                                        name="package"
                                        size={38}
                                        className="text-orange-600"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="min-w-0">
                            <span className="text-[10px] font-bold tracking-[0.15em] text-orange-700 uppercase">
                                {asset.code}
                            </span>

                            <h3 className="mt-2 text-xl leading-snug font-bold text-gray-950 sm:text-2xl">
                                {asset.name}
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                {asset.category}
                            </p>

                            <span
                                className={`mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-semibold ${statusStyle.badge}`}
                            >
                                <span
                                    className={`size-1.5 rounded-full ${statusStyle.dot}`}
                                />
                                {asset.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="px-6 py-6 sm:px-8">
                    <div className="mb-4">
                        <h4 className="text-sm font-bold text-gray-950">
                            Rincian Informasi
                        </h4>

                        <p className="mt-1 text-xs text-gray-500">
                            Identitas dan lokasi aset dalam katalog
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-gray-200">
                        {details.map((detail, index) => (
                            <div
                                key={detail.label}
                                className={`flex items-start gap-3 px-4 py-4 ${
                                    index !== details.length - 1
                                        ? 'border-b border-gray-100'
                                        : ''
                                }`}
                            >
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-700">
                                    <Icon name={detail.icon} size={17} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                                        {detail.label}
                                    </p>

                                    <p className="mt-1 text-sm font-semibold break-words text-gray-900">
                                        {detail.value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 flex items-start gap-3 rounded-xl border border-orange-100 bg-orange-50/70 p-4">
                        <Icon
                            name="info"
                            size={17}
                            className="mt-0.5 shrink-0 text-orange-700"
                        />

                        <p className="text-xs leading-5 text-gray-600">
                            {statusStyle.label}. Informasi ini merupakan data
                            pratinjau katalog dan belum terhubung dengan
                            database fakultas.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end border-t border-gray-100 px-6 py-4 sm:px-8">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg bg-charcoal-900 px-6 py-2.5 text-xs font-bold text-white transition hover:bg-orange-600"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}

// =====================================================
// CUSTOM PAGINATION
// =====================================================

function AssetPagination({
    page,
    totalPages,
    onChange,
}: {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
}) {
    if (totalPages <= 1) return null;

    const getPages = () => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, index) => index + 1);
        }

        if (page <= 3) {
            return [1, 2, 3, 4, '...', totalPages] as const;
        }

        if (page >= totalPages - 2) {
            return [
                1,
                '...',
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ] as const;
        }

        return [1, '...', page - 1, page, page + 1, '...', totalPages] as const;
    };

    return (
        <nav
            aria-label="Navigasi halaman katalog aset"
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
        >
            <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="flex size-8 items-center justify-center rounded-lg bg-white text-orange-700">
                    <Icon name="layers" size={15} />
                </span>

                <span>
                    Halaman{' '}
                    <strong className="font-bold text-gray-950">{page}</strong>{' '}
                    dari{' '}
                    <strong className="font-bold text-gray-950">
                        {totalPages}
                    </strong>
                </span>
            </div>

            <div className="flex items-center gap-1.5">
                <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => onChange(page - 1)}
                    aria-label="Halaman sebelumnya"
                    className="flex h-10 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-600 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <Icon name="chevron-left" size={16} />
                    <span className="hidden sm:inline">Prev</span>
                </button>

                {getPages().map((item, index) =>
                    item === '...' ? (
                        <span
                            key={`ellipsis-${index}`}
                            className="flex size-9 items-center justify-center text-sm font-semibold text-gray-400"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={item}
                            type="button"
                            onClick={() => onChange(item)}
                            aria-label={`Halaman ${item}`}
                            aria-current={page === item ? 'page' : undefined}
                            className={`flex size-10 items-center justify-center rounded-xl border text-xs font-bold transition ${
                                page === item
                                    ? 'border-charcoal-900 bg-charcoal-900 text-white'
                                    : 'border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700'
                            }`}
                        >
                            {item}
                        </button>
                    ),
                )}

                <button
                    type="button"
                    disabled={page === totalPages}
                    onClick={() => onChange(page + 1)}
                    aria-label="Halaman berikutnya"
                    className="flex h-10 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-600 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <span className="hidden sm:inline">Next</span>
                    <Icon name="chevron-right" size={16} />
                </button>
            </div>
        </nav>
    );
}

// =====================================================
// ASSET CATALOG SECTION
// =====================================================

export default function AssetCatalogSection() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('Semua Kategori');
    const [status, setStatus] = useState('Semua Status');
    const [page, setPage] = useState(1);
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

    const filteredAssets = useMemo(() => {
        const query = search.trim().toLowerCase();

        return assets.filter((asset) => {
            const matchesSearch =
                asset.name.toLowerCase().includes(query) ||
                asset.code.toLowerCase().includes(query) ||
                asset.location.toLowerCase().includes(query);

            const matchesCategory =
                category === 'Semua Kategori' || asset.category === category;

            const matchesStatus =
                status === 'Semua Status' || asset.status === status;

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [search, category, status]);

    const totalPages = Math.ceil(filteredAssets.length / PAGE_SIZE);

    const currentPage = Math.min(page, Math.max(totalPages, 1));

    const visibleAssets = filteredAssets.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
    );

    function changePage(nextPage: number) {
        const safePage = Math.max(1, Math.min(nextPage, totalPages));

        setPage(safePage);

        document.getElementById('asset-catalog-list')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }

    function resetFilters() {
        setSearch('');
        setCategory('Semua Kategori');
        setStatus('Semua Status');
        setPage(1);
    }

    return (
        <section
            id="aset"
            className="landing-section relative isolate overflow-hidden bg-surface-warm px-space-lg py-space-section sm:py-space-section-lg lg:px-space-2xl"
        >
            {/* Background accents */}
            <div className="pointer-events-none absolute top-0 -right-40 -z-10 size-[480px] rounded-full bg-orange-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 -z-10 size-[420px] rounded-full bg-white/90 blur-3xl" />

            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="grid gap-8 lg:grid-cols-[1fr_300px] lg:items-end">
                    <div>
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2">
                            <span className="size-2 rounded-full bg-orange-500" />
                            <span className="text-[10px] font-bold tracking-[0.18em] text-orange-800 uppercase">
                                Katalog Aset FAMS
                            </span>
                        </div>

                        <SectionHeading
                            eyebrow=""
                            title="Temukan fasilitas yang kamu butuhkan."
                            description="Jelajahi katalog aset FAMS untuk melihat informasi fasilitas, lokasi, dan status ketersediaannya."
                            centered={false}
                        />

                        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-medium text-gray-600">
                            <span className="inline-flex items-center gap-2">
                                <Icon
                                    name="search"
                                    size={15}
                                    className="text-orange-700"
                                />
                                Pencarian aset
                            </span>

                            <span className="inline-flex items-center gap-2">
                                <Icon
                                    name="filter"
                                    size={15}
                                    className="text-orange-700"
                                />
                                Filter kategori
                            </span>

                            <span className="inline-flex items-center gap-2">
                                <Icon
                                    name="mouse-pointer-click"
                                    size={15}
                                    className="text-orange-700"
                                />
                                Detail aset
                            </span>
                        </div>
                    </div>

                    {/* Collection summary */}
                    <div className="relative overflow-hidden rounded-2xl bg-charcoal-900 p-6 text-white">
                        <div className="pointer-events-none absolute -top-16 -right-12 size-48 rounded-full bg-orange-500/20 blur-3xl" />

                        <div className="relative">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold tracking-[0.16em] text-gray-400 uppercase">
                                    Total Koleksi
                                </span>

                                <div className="flex size-10 items-center justify-center rounded-xl bg-orange-500 text-white">
                                    <Icon name="package" size={19} />
                                </div>
                            </div>

                            <div className="mt-5 flex items-end gap-2">
                                <span className="text-5xl font-bold tracking-tight">
                                    {assets.length}
                                </span>

                                <span className="mb-1 text-sm text-orange-300">
                                    item aset
                                </span>
                            </div>

                            <div className="mt-5 border-t border-white/10 pt-4">
                                <p className="text-xs text-gray-400">
                                    Data pratinjau katalog FAMS
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and filter */}
                <div className="mt-14 overflow-hidden rounded-2xl border border-orange-200/80 bg-white shadow-[0_12px_35px_rgba(23,23,23,0.045)]">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-5 sm:px-7">
                        <div className="flex items-center gap-3">
                            <div className="flex size-9 items-center justify-center rounded-lg bg-charcoal-900 text-orange-400">
                                <Icon name="filter" size={17} />
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-gray-950">
                                    Cari dan Filter Aset
                                </h3>

                                <p className="mt-0.5 text-[11px] text-gray-500">
                                    Sesuaikan pencarian berdasarkan kebutuhan
                                </p>
                            </div>
                        </div>

                        <span className="rounded-full bg-orange-50 px-3 py-1.5 text-[11px] font-semibold text-orange-700">
                            {filteredAssets.length} hasil
                        </span>
                    </div>

                    <div className="p-5 sm:p-7">
                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1fr_210px_210px_auto]">
                            {/* Search */}
                            <label className="relative block">
                                <span className="sr-only">Cari aset</span>

                                <Icon
                                    name="search"
                                    size={17}
                                    className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    value={search}
                                    onChange={(event) => {
                                        setSearch(event.target.value);
                                        setPage(1);
                                    }}
                                    placeholder="Cari nama, kode, atau lokasi..."
                                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pr-4 pl-11 text-sm text-gray-900 transition outline-none placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                                />
                            </label>

                            {/* Category */}
                            <label className="relative block">
                                <span className="sr-only">Filter kategori</span>

                                <select
                                    value={category}
                                    onChange={(event) => {
                                        setCategory(event.target.value);
                                        setPage(1);
                                    }}
                                    className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 pr-10 text-sm text-gray-800 transition outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                                >
                                    <option>Semua Kategori</option>
                                    <option>Elektronik</option>
                                    <option>Ruangan</option>
                                    <option>Peralatan</option>
                                </select>

                                <Icon
                                    name="chevron-down"
                                    size={16}
                                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-500"
                                />
                            </label>

                            {/* Status */}
                            <label className="relative block">
                                <span className="sr-only">Filter status</span>

                                <select
                                    value={status}
                                    onChange={(event) => {
                                        setStatus(event.target.value);
                                        setPage(1);
                                    }}
                                    className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 pr-10 text-sm text-gray-800 transition outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                                >
                                    <option>Semua Status</option>
                                    <option>Tersedia</option>
                                    <option>Perlu Pemeriksaan</option>
                                    <option>Maintenance</option>
                                </select>

                                <Icon
                                    name="chevron-down"
                                    size={16}
                                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-500"
                                />
                            </label>

                            {/* Reset */}
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 text-sm font-bold text-white transition hover:bg-charcoal-900 active:scale-[0.98]"
                            >
                                <Icon name="refresh-cw" size={15} />
                                Reset
                            </button>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-5">
                            <p className="text-xs text-gray-500">
                                Menampilkan{' '}
                                <strong className="text-gray-950">
                                    {visibleAssets.length}
                                </strong>{' '}
                                dari{' '}
                                <strong className="text-gray-950">
                                    {filteredAssets.length}
                                </strong>{' '}
                                aset
                            </p>

                            <p className="flex items-center gap-2 text-xs text-gray-500">
                                <Icon
                                    name="mouse-pointer-click"
                                    size={14}
                                    className="text-orange-600"
                                />
                                Klik kartu untuk melihat detail
                            </p>
                        </div>
                    </div>
                </div>

                {/* Catalog heading */}
                <div
                    id="asset-catalog-list"
                    className="mt-16 mb-7 flex scroll-mt-24 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
                >
                    <div>
                        <p className="text-[10px] font-bold tracking-[0.2em] text-orange-700 uppercase">
                            Eksplorasi Fasilitas
                        </p>

                        <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#171717] sm:text-3xl">
                            Daftar Aset
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Pilih salah satu kartu untuk melihat informasi aset.
                        </p>
                    </div>

                    {filteredAssets.length > 0 && (
                        <div className="flex items-center gap-3 self-start rounded-xl bg-white px-4 py-3 sm:self-auto">
                            <div className="flex size-9 items-center justify-center rounded-lg bg-orange-50 text-orange-700">
                                <Icon name="layers" size={17} />
                            </div>

                            <div>
                                <p className="text-xs font-bold text-gray-950">
                                    Halaman {currentPage} / {totalPages}
                                </p>

                                <p className="mt-0.5 text-[10px] text-gray-500">
                                    Navigasi katalog
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Asset cards */}
                {visibleAssets.length > 0 ? (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {visibleAssets.map((asset, index) => (
                            <AssetCard
                                key={asset.id}
                                asset={asset}
                                index={
                                    (currentPage - 1) * PAGE_SIZE + index + 1
                                }
                                onSelect={setSelectedAsset}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-orange-300 bg-white px-6 py-16 text-center">
                        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-700">
                            <Icon name="search-x" size={28} />
                        </div>

                        <h3 className="mt-5 text-lg font-bold text-gray-950">
                            Aset tidak ditemukan
                        </h3>

                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                            Belum ada aset yang sesuai dengan kata kunci atau
                            filter yang kamu pilih.
                        </p>

                        <button
                            type="button"
                            onClick={resetFilters}
                            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-charcoal-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
                        >
                            <Icon name="refresh-cw" size={15} />
                            Hapus semua filter
                        </button>
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-12">
                    <AssetPagination
                        page={currentPage}
                        totalPages={totalPages}
                        onChange={changePage}
                    />
                </div>

                {/* Preview notice */}
                <div className="relative mt-16 overflow-hidden rounded-2xl bg-charcoal-900 px-6 py-6 sm:px-8">
                    <div className="pointer-events-none absolute -top-20 -right-10 size-52 rounded-full bg-orange-500/20 blur-3xl" />

                    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white">
                            <Icon name="info" size={20} />
                        </div>

                        <div>
                            <p className="text-sm font-bold text-white">
                                Informasi Katalog
                            </p>

                            <p className="mt-1 max-w-3xl text-xs leading-6 text-gray-400">
                                Katalog ini merupakan pratinjau antarmuka.
                                Status ketersediaan dan informasi aset belum
                                terhubung ke data fakultas.
                            </p>
                        </div>

                        <span className="text-[10px] font-bold tracking-[0.16em] text-orange-400 uppercase sm:ml-auto">
                            FAMS Preview
                        </span>
                    </div>
                </div>
            </div>

            {/* Asset detail modal */}
            <AssetDetailModal
                asset={selectedAsset}
                onClose={() => setSelectedAsset(null)}
            />
        </section>
    );
}
