
import { useMemo, useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import AssetCard from '../components/AssetCard';
import AssetDetailModal from '../components/AssetDetailModal';
import Pagination from '../components/Pagination';
import Icon from '../components/Icon';
import { assets, type Asset } from '../data/landing';

const PAGE_SIZE = 6;

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

    function resetFilters() {
        setSearch('');
        setCategory('Semua Kategori');
        setStatus('Semua Status');
        setPage(1);
    }

    return (
        <section id="aset" className="bg-white px-5 py-24 sm:py-28 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
                    <SectionHeading
                        eyebrow="Katalog Aset"
                        title="Temukan fasilitas yang kamu butuhkan."
                        description="Jelajahi contoh katalog aset FAMS. Cari berdasarkan nama atau lokasi, lalu gunakan filter untuk mempersempit pilihan."
                        centered={false}
                    />

                    <span className="shrink-0 rounded-full border border-neutral-200 px-4 py-2 text-xs text-neutral-500">
                        {assets.length} item demo
                    </span>
                </div>

                <div className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 sm:p-5">
                    <div className="grid gap-3 md:grid-cols-[1fr_210px_210px_auto]">
                        <label className="relative block">
                            <span className="sr-only">Cari aset</span>
                            <Icon
                                name="search"
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                            />
                            <input
                                value={search}
                                onChange={(event) => {
                                    setSearch(event.target.value);
                                    setPage(1);
                                }}
                                placeholder="Cari nama, kode, atau lokasi..."
                                className="h-12 w-full rounded-xl border border-neutral-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200"
                            />
                        </label>

                        <label className="relative">
                            <span className="sr-only">Filter kategori</span>
                            <select
                                value={category}
                                onChange={(event) => {
                                    setCategory(event.target.value);
                                    setPage(1);
                                }}
                                className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none focus:border-neutral-500"
                            >
                                <option>Semua Kategori</option>
                                <option>Elektronik</option>
                                <option>Ruangan</option>
                                <option>Peralatan</option>
                            </select>
                        </label>

                        <label className="relative">
                            <span className="sr-only">Filter status</span>
                            <select
                                value={status}
                                onChange={(event) => {
                                    setStatus(event.target.value);
                                    setPage(1);
                                }}
                                className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none focus:border-neutral-500"
                            >
                                <option>Semua Status</option>
                                <option>Tersedia</option>
                                <option>Perlu Pemeriksaan</option>
                                <option>Maintenance</option>
                            </select>
                        </label>

                        <button
                            type="button"
                            onClick={resetFilters}
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-sm font-medium transition hover:bg-neutral-100"
                        >
                            <Icon name="filter" size={16} />
                            Reset
                        </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3 text-xs text-neutral-500">
                        <span>
                            Menampilkan {visibleAssets.length} dari {filteredAssets.length} aset
                        </span>
                        <span className="hidden sm:inline">
                            Pilih kartu untuk melihat detail
                        </span>
                    </div>
                </div>

                {visibleAssets.length > 0 ? (
                    <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {visibleAssets.map((asset) => (
                            <AssetCard
                                key={asset.id}
                                asset={asset}
                                onSelect={setSelectedAsset}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 px-6 py-16 text-center">
                        <Icon name="search" size={30} className="mx-auto text-neutral-400" />
                        <h3 className="mt-4 font-semibold">Aset tidak ditemukan</h3>
                        <p className="mt-2 text-sm text-neutral-500">
                            Coba kata kunci atau filter yang berbeda.
                        </p>
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="mt-5 text-sm font-semibold underline underline-offset-4"
                        >
                            Hapus semua filter
                        </button>
                    </div>
                )}

                <Pagination
                    page={currentPage}
                    totalPages={totalPages}
                    onChange={setPage}
                />

                <p className="mt-8 text-center text-xs leading-6 text-neutral-400">
                    Katalog ini merupakan pratinjau antarmuka. Status ketersediaan
                    dan informasi aset belum terhubung ke data fakultas.
                </p>
            </div>

            <AssetDetailModal
                asset={selectedAsset}
                onClose={() => setSelectedAsset(null)}
            />
        </section>
    );
}
