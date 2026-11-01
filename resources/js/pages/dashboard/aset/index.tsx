
import { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import Icon from '../../../components/Icon';
import type { IconName } from '../../../components/Icon';
import AssetManagementBanner from '../../../components/dashboard/AssetManagementBanner';
import ImagePreviewModal from '../../../components/dashboard/ImagePreviewModal';
import type { ImagePreviewState } from '../../../components/dashboard/ImagePreviewModal';

type AssetCategory = 'Barang' | 'Ruangan';
type AssetCondition = 'Baik' | 'Rusak Ringan' | 'Rusak Berat';
type AssetStatus = 'Tersedia' | 'Dipinjam' | 'Maintenance' | 'Tidak Aktif';

type Asset = {
    id: number;
    code: string;
    name: string;
    category: AssetCategory;
    itemId?: number;
    roomId?: number;
    locationId: number;
    quantity: number;
    condition: AssetCondition;
    status: AssetStatus;
    acquisitionDate: string;
    price: number;
    fundingSource: string;
    description: string;
    images: string[];
    imageNames?: string[];
};

type AssetForm = {
    code: string;
    name: string;
    category: AssetCategory;
    itemId: string;
    roomId: string;
    locationId: string;
    quantity: string;
    condition: AssetCondition;
    status: AssetStatus;
    acquisitionDate: string;
    price: string;
    fundingSource: string;
    description: string;
    images: string[];
    imageNames: string[];
};

const MAX_IMAGES = 10;
const PER_PAGE = 5;

const masterItems = [
    { id: 1, name: 'Laptop Lenovo ThinkPad' },
    { id: 2, name: 'Proyektor Epson' },
    { id: 3, name: 'Kursi Kuliah' },
    { id: 4, name: 'Meja Komputer' },
    { id: 5, name: 'Printer Epson L3210' },
];

const masterRooms = [
    { id: 1, name: 'Ruang Laboratorium Komputer' },
    { id: 2, name: 'Ruang Kelas 301' },
    { id: 3, name: 'Ruang Rapat Fakultas' },
    { id: 4, name: 'Ruang Dosen' },
];

const masterLocations = [
    { id: 1, name: 'Gedung Fakultas Teknologi Informasi' },
    { id: 2, name: 'Gedung Rektorat' },
    { id: 3, name: 'Gedung Laboratorium' },
];

const initialAssets: Asset[] = [
    {
        id: 1,
        code: 'FAMS-BRG-001',
        name: 'Laptop Lenovo ThinkPad',
        category: 'Barang',
        itemId: 1,
        locationId: 1,
        quantity: 10,
        condition: 'Baik',
        status: 'Tersedia',
        acquisitionDate: '2025-01-15',
        price: 12500000,
        fundingSource: 'APBN',
        description: 'Laptop operasional untuk kebutuhan akademik.',
        images: [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
        ],
    },
    {
        id: 2,
        code: 'FAMS-BRG-002',
        name: 'Proyektor Epson',
        category: 'Barang',
        itemId: 2,
        locationId: 3,
        quantity: 5,
        condition: 'Baik',
        status: 'Dipinjam',
        acquisitionDate: '2025-03-10',
        price: 6500000,
        fundingSource: 'APBD',
        description: 'Proyektor untuk kegiatan perkuliahan.',
        images: [
            'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
        ],
    },
    {
        id: 3,
        code: 'FAMS-RNG-001',
        name: 'Ruang Laboratorium Komputer',
        category: 'Ruangan',
        roomId: 1,
        locationId: 1,
        quantity: 1,
        condition: 'Baik',
        status: 'Tersedia',
        acquisitionDate: '2024-08-01',
        price: 150000000,
        fundingSource: 'APBN',
        description: 'Laboratorium komputer untuk praktikum mahasiswa.',
        images: [
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
        ],
    },
    {
        id: 4,
        code: 'FAMS-BRG-003',
        name: 'Printer Epson L3210',
        category: 'Barang',
        itemId: 5,
        locationId: 2,
        quantity: 3,
        condition: 'Rusak Ringan',
        status: 'Maintenance',
        acquisitionDate: '2024-11-20',
        price: 2800000,
        fundingSource: 'Hibah',
        description: 'Printer untuk kebutuhan administrasi.',
        images: [],
    },
    {
        id: 5,
        code: 'FAMS-RNG-002',
        name: 'Ruang Kelas 301',
        category: 'Ruangan',
        roomId: 2,
        locationId: 1,
        quantity: 1,
        condition: 'Baik',
        status: 'Tersedia',
        acquisitionDate: '2024-08-01',
        price: 95000000,
        fundingSource: 'APBD',
        description: 'Ruang perkuliahan mahasiswa.',
        images: [
            'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800',
        ],
    },
];

const emptyForm: AssetForm = {
    code: '',
    name: '',
    category: 'Barang',
    itemId: '',
    roomId: '',
    locationId: '',
    quantity: '1',
    condition: 'Baik',
    status: 'Tersedia',
    acquisitionDate: '',
    price: '',
    fundingSource: 'APBN',
    description: '',
    images: [],
    imageNames: [],
};

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value);

const formatDate = (value: string) => {
    if (!value) return '-';

    return new Date(`${value}T00:00:00`).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const statusStyles: Record<AssetStatus, string> = {
    Tersedia: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
    Dipinjam: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
    Maintenance: 'bg-orange-50 text-orange-700 ring-1 ring-orange-100',
    'Tidak Aktif': 'bg-rose-50 text-rose-700 ring-1 ring-rose-100',
};

const conditionStyles: Record<AssetCondition, string> = {
    Baik: 'text-neutral-700',
    'Rusak Ringan': 'text-neutral-500',
    'Rusak Berat': 'font-semibold text-neutral-900',
};

function Field({
    label,
    children,
    required = false,
}: {
    label: string;
    children: React.ReactNode;
    required?: boolean;
}) {
    return (
        <label className="block min-w-0 space-y-2">
            <span className="text-xs font-semibold text-neutral-700">
                {label}
                {required && <span className="ml-1 text-neutral-950">*</span>}
            </span>
            {children}
        </label>
    );
}

const inputClass =
    'w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400';

export default function DataAset() {
    const [assets, setAssets] = useState<Asset[]>(initialAssets);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('Semua');
    const [statusFilter, setStatusFilter] = useState('Semua');
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [detailAsset, setDetailAsset] = useState<Asset | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<AssetForm>(emptyForm);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [imagePreview, setImagePreview] =
        useState<ImagePreviewState | null>(null);

    useEffect(() => {
        if (!imagePreview) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setImagePreview(null);
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [imagePreview]);

    const filteredAssets = useMemo(() => {
        return assets.filter((asset) => {
            const keyword = search.toLowerCase().trim();

            const matchesSearch =
                asset.name.toLowerCase().includes(keyword) ||
                asset.code.toLowerCase().includes(keyword);

            const matchesCategory =
                categoryFilter === 'Semua' ||
                asset.category === categoryFilter;

            const matchesStatus =
                statusFilter === 'Semua' ||
                asset.status === statusFilter;

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [assets, search, categoryFilter, statusFilter]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredAssets.length / PER_PAGE),
    );

    const safeCurrentPage = Math.min(currentPage, totalPages);

    const paginatedAssets = filteredAssets.slice(
        (safeCurrentPage - 1) * PER_PAGE,
        safeCurrentPage * PER_PAGE,
    );

    const stats: {
        label: string;
        value: number;
        icon: IconName;
        iconStyle: string;
    }[] = [
        {
            label: 'Total Aset',
            value: assets.length,
            icon: 'package',
            iconStyle: 'bg-sky-100 text-sky-700',
        },
        {
            label: 'Barang',
            value: assets.filter((asset) => asset.category === 'Barang').length,
            icon: 'box',
            iconStyle: 'bg-violet-100 text-violet-700',
        },
        {
            label: 'Ruangan',
            value: assets.filter((asset) => asset.category === 'Ruangan').length,
            icon: 'building',
            iconStyle: 'bg-amber-100 text-amber-700',
        },
        {
            label: 'Perlu Perhatian',
            value: assets.filter(
                (asset) =>
                    asset.condition !== 'Baik' ||
                    asset.status === 'Maintenance',
            ).length,
            icon: 'alert-circle',
            iconStyle: 'bg-rose-100 text-rose-700',
        },
    ];

    function openCreateModal() {
        setEditingId(null);
        setForm({
            ...emptyForm,
            code: `FAMS-${Date.now().toString().slice(-6)}`,
        });
        setModalOpen(true);
    }

    function openEditModal(asset: Asset) {
        setEditingId(asset.id);

        setForm({
            code: asset.code,
            name: asset.name,
            category: asset.category,
            itemId: asset.itemId?.toString() ?? '',
            roomId: asset.roomId?.toString() ?? '',
            locationId: asset.locationId.toString(),
            quantity: asset.quantity.toString(),
            condition: asset.condition,
            status: asset.status,
            acquisitionDate: asset.acquisitionDate,
            price: asset.price.toString(),
            fundingSource: asset.fundingSource,
            description: asset.description,
            images: [...asset.images],
            imageNames:
                asset.imageNames ??
                asset.images.map((_, index) => `Foto ${index + 1}`),
        });

        setModalOpen(true);
    }

    function updateForm<K extends keyof AssetForm>(
        key: K,
        value: AssetForm[K],
    ) {
        setForm((previous) => ({
            ...previous,
            [key]: value,
        }));
    }

    function handleCategoryChange(category: AssetCategory) {
        setForm((previous) => ({
            ...previous,
            category,
            itemId: '',
            roomId: '',
            name: '',
            quantity: category === 'Ruangan' ? '1' : '1',
        }));
    }

    function handleMasterSelection(value: string) {
        if (form.category === 'Barang') {
            const selected = masterItems.find(
                (item) => item.id.toString() === value,
            );

            setForm((previous) => ({
                ...previous,
                itemId: value,
                name: selected?.name ?? '',
            }));
        } else {
            const selected = masterRooms.find(
                (room) => room.id.toString() === value,
            );

            setForm((previous) => ({
                ...previous,
                roomId: value,
                name: selected?.name ?? '',
            }));
        }
    }

    function readImage(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                } else {
                    reject(new Error('Format gambar tidak valid.'));
                }
            };

            reader.onerror = () => reject(new Error('Gagal membaca gambar.'));
            reader.readAsDataURL(file);
        });
    }

    async function handleImageUpload(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        const files = Array.from(event.target.files ?? []);

        event.target.value = '';

        if (files.length === 0) return;

        const remainingSlots = MAX_IMAGES - form.images.length;

        if (remainingSlots <= 0) {
            alert(`Maksimal ${MAX_IMAGES} gambar untuk satu aset.`);
            return;
        }

        const validFiles = files.filter((file) =>
            ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
        );

        if (validFiles.length !== files.length) {
            alert('Format gambar harus JPG, PNG, atau WEBP.');
        }

        const selectedFiles = validFiles.slice(0, remainingSlots);

        if (selectedFiles.length === 0) return;

        if (validFiles.length > remainingSlots) {
            alert(
                `Hanya ${remainingSlots} gambar yang dapat ditambahkan. Maksimal ${MAX_IMAGES} gambar.`,
            );
        }

        try {
            const imageResults = await Promise.all(
                selectedFiles.map((file) => readImage(file)),
            );

            setForm((previous) => ({
                ...previous,
                images: [...previous.images, ...imageResults].slice(
                    0,
                    MAX_IMAGES,
                ),
                imageNames: [
                    ...previous.imageNames,
                    ...selectedFiles.map((file) => file.name),
                ].slice(0, MAX_IMAGES),
            }));
        } catch {
            alert('Ada gambar yang gagal dibaca. Silakan coba kembali.');
        }
    }

    function removeImage(index: number) {
        setForm((previous) => ({
            ...previous,
            images: previous.images.filter(
                (_, imageIndex) => imageIndex !== index,
            ),
            imageNames: previous.imageNames.filter(
                (_, imageIndex) => imageIndex !== index,
            ),
        }));
    }

    function saveAsset(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!form.locationId) {
            alert('Silakan pilih lokasi aset.');
            return;
        }

        if (form.category === 'Barang' && !form.itemId) {
            alert('Silakan pilih barang.');
            return;
        }

        if (form.category === 'Ruangan' && !form.roomId) {
            alert('Silakan pilih ruangan.');
            return;
        }

        if (form.images.length === 0) {
            alert('Silakan tambahkan minimal satu foto aset.');
            return;
        }

        const selectedMaster =
            form.category === 'Barang'
                ? masterItems.find(
                      (item) => item.id.toString() === form.itemId,
                  )
                : masterRooms.find(
                      (room) => room.id.toString() === form.roomId,
                  );

        const payload: Asset = {
            id: editingId ?? Date.now(),
            code: form.code.trim(),
            name: selectedMaster?.name ?? form.name.trim(),
            category: form.category,
            itemId:
                form.category === 'Barang'
                    ? Number(form.itemId)
                    : undefined,
            roomId:
                form.category === 'Ruangan'
                    ? Number(form.roomId)
                    : undefined,
            locationId: Number(form.locationId),
            quantity:
                form.category === 'Ruangan' ? 1 : Number(form.quantity || 1),
            condition: form.condition,
            status: form.status,
            acquisitionDate: form.acquisitionDate,
            price: Number(form.price || 0),
            fundingSource: form.fundingSource,
            description: form.description.trim(),
            images: [...form.images],
            imageNames: [...form.imageNames],
        };

        if (editingId !== null) {
            setAssets((previous) =>
                previous.map((asset) =>
                    asset.id === editingId ? payload : asset,
                ),
            );
        } else {
            setAssets((previous) => [payload, ...previous]);
            setCurrentPage(1);
        }

        setModalOpen(false);
        setEditingId(null);
        setForm(emptyForm);
    }

    function confirmDelete() {
        if (deleteId === null) return;

        setAssets((previous) =>
            previous.filter((asset) => asset.id !== deleteId),
        );

        setDeleteId(null);
        setDetailAsset(null);
    }

    function closeModal() {
        setModalOpen(false);
        setEditingId(null);
        setForm(emptyForm);
    }

    const getLocationName = (id: number) =>
        masterLocations.find((location) => location.id === id)?.name ?? '-';

    return (
        <DashboardLayout>
            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                <AssetManagementBanner
                    title="Kelola Data Aset."
                    description="Pantau inventaris barang dan ruangan, status penggunaan, serta kondisi aset fakultas."
                    contextLabel="Inventaris aset"
                    icon="package"
                    statusLabel="Status aset terpantau"
                    metrics={[
                        { label: 'Total aset', value: assets.length },
                        {
                            label: 'Aset tersedia',
                            value: assets.filter(
                                (asset) => asset.status === 'Tersedia',
                            ).length,
                        },
                    ]}
                />

                {/* PAGE HEADING */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-xs text-neutral-400">
                            <span>Manajemen Aset</span>
                            <Icon name="chevron-right" size={13} />
                            <span className="font-semibold text-neutral-700">
                                Data Aset
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
                            Data Aset
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
                            Kelola seluruh data inventaris barang dan ruangan
                            yang dimiliki fakultas.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                        <Icon name="plus" size={17} />
                        Tambah Aset
                    </button>
                </div>

                {/* STATISTICS */}
                <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5"
                        >
                            <div className="flex items-center justify-between gap-2">
                                <p className="text-xs font-medium text-neutral-500 sm:text-sm">
                                    {stat.label}
                                </p>

                                <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.iconStyle}`}>
                                    <Icon name={stat.icon} size={17} />
                                </span>
                            </div>

                            <p className="mt-3 text-2xl font-bold text-neutral-950 sm:text-3xl">
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* MAIN TABLE */}
                <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                    <div className="flex flex-col gap-4 border-b border-neutral-100 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="font-bold text-neutral-900">
                                Daftar Inventaris
                            </h2>
                            <p className="mt-1 text-xs text-neutral-500">
                                Informasi seluruh aset terdaftar.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row">
                            <div className="relative">
                                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-400">
                                    <Icon name="search" size={16} />
                                </span>

                                <input
                                    value={search}
                                    onChange={(event) => {
                                        setSearch(event.target.value);
                                        setCurrentPage(1);
                                    }}
                                    placeholder="Cari kode atau nama aset..."
                                    className={`${inputClass} pl-9 sm:w-64`}
                                />
                            </div>

                            <select
                                value={categoryFilter}
                                onChange={(event) => {
                                    setCategoryFilter(event.target.value);
                                    setCurrentPage(1);
                                }}
                                className={inputClass}
                            >
                                <option value="Semua">Semua Kategori</option>
                                <option value="Barang">Barang</option>
                                <option value="Ruangan">Ruangan</option>
                            </select>

                            <select
                                value={statusFilter}
                                onChange={(event) => {
                                    setStatusFilter(event.target.value);
                                    setCurrentPage(1);
                                }}
                                className={inputClass}
                            >
                                <option value="Semua">Semua Status</option>
                                <option value="Tersedia">Tersedia</option>
                                <option value="Dipinjam">Dipinjam</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Tidak Aktif">Tidak Aktif</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px] text-left text-sm">
                            <thead className="bg-neutral-50 text-xs text-neutral-500">
                                <tr>
                                    <th className="px-5 py-4 font-semibold">
                                        Aset
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Kategori
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Lokasi
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Jumlah
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Kondisi
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Status
                                    </th>
                                    <th className="px-5 py-4 text-right font-semibold">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-neutral-100">
                                {paginatedAssets.map((asset) => (
                                    <tr
                                        key={asset.id}
                                        className="transition hover:bg-neutral-50/70"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (asset.images[0]) {
                                                            setImagePreview({
                                                                images: asset.images,
                                                                imageNames: asset.imageNames,
                                                                index: 0,
                                                                entityName: asset.name,
                                                            });
                                                        }
                                                    }}
                                                    className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100"
                                                    title="Lihat gambar aset"
                                                >
                                                    {asset.images[0] ? (
                                                        <img
                                                            src={asset.images[0]}
                                                            alt={asset.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <Icon
                                                            name="image"
                                                            size={18}
                                                            className="mx-auto text-neutral-400"
                                                        />
                                                    )}
                                                </button>

                                                <div>
                                                    <p className="font-semibold text-neutral-900">
                                                        {asset.name}
                                                    </p>

                                                    <p className="mt-1 text-xs text-neutral-400">
                                                        {asset.code}
                                                    </p>

                                                    {asset.images.length > 0 && (
                                                        <p className="mt-1 text-[10px] text-neutral-400">
                                                            {asset.images.length} gambar
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="rounded-lg bg-neutral-100 px-2.5 py-1.5 text-xs font-medium text-neutral-600">
                                                {asset.category}
                                            </span>
                                        </td>

                                        <td className="max-w-48 px-5 py-4 text-xs leading-5 text-neutral-600">
                                            {getLocationName(asset.locationId)}
                                        </td>

                                        <td className="px-5 py-4 text-neutral-700">
                                            {asset.quantity}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`text-xs font-medium ${conditionStyles[asset.condition]}`}
                                            >
                                                {asset.condition}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex rounded-lg px-2.5 py-1.5 text-xs font-medium ${statusStyles[asset.status]}`}
                                            >
                                                {asset.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-1">
                                                <button
                                                    type="button"
                                                    title="Detail"
                                                    onClick={() => setDetailAsset(asset)}
                                                    className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                                                >
                                                    <Icon name="eye" size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    title="Edit"
                                                    onClick={() => openEditModal(asset)}
                                                    className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                                                >
                                                    <Icon name="pencil" size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    title="Hapus"
                                                    onClick={() => setDeleteId(asset.id)}
                                                    className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                                                >
                                                    <Icon name="trash-2" size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {paginatedAssets.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-5 py-14 text-center"
                                        >
                                            <Icon
                                                name="package"
                                                size={30}
                                                className="mx-auto mb-3 text-neutral-300"
                                            />

                                            <p className="font-semibold text-neutral-700">
                                                Aset tidak ditemukan
                                            </p>

                                            <p className="mt-1 text-xs text-neutral-400">
                                                Ubah kata kunci atau filter pencarian.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    <div className="flex flex-col gap-3 border-t border-neutral-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-neutral-500">
                            Menampilkan{' '}
                            {filteredAssets.length > 0
                                ? (safeCurrentPage - 1) * PER_PAGE + 1
                                : 0}{' '}
                            -{' '}
                            {Math.min(
                                safeCurrentPage * PER_PAGE,
                                filteredAssets.length,
                            )}{' '}
                            dari {filteredAssets.length} aset
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={safeCurrentPage === 1}
                                onClick={() =>
                                    setCurrentPage((page) => Math.max(1, page - 1))
                                }
                                className="rounded-lg border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-600 disabled:opacity-40"
                            >
                                Sebelumnya
                            </button>

                            <span className="text-xs text-neutral-500">
                                {safeCurrentPage} / {totalPages}
                            </span>

                            <button
                                type="button"
                                disabled={safeCurrentPage >= totalPages}
                                onClick={() =>
                                    setCurrentPage((page) =>
                                        Math.min(totalPages, page + 1),
                                    )
                                }
                                className="rounded-lg border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-600 disabled:opacity-40"
                            >
                                Berikutnya
                            </button>
                        </div>
                    </div>
                </section>

                <p className="text-xs text-neutral-400">
                    Data saat ini merupakan ilustrasi frontend dan belum tersimpan ke database.
                </p>
            </div>

            {/* CREATE / EDIT MODAL */}
            {modalOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-6"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            closeModal();
                        }
                    }}
                >
                    <form
                        onSubmit={saveAsset}
                        className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                    >
                        <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4 sm:px-7">
                            <div>
                                <h2 className="text-lg font-bold text-neutral-950">
                                    {editingId !== null
                                        ? 'Edit Data Aset'
                                        : 'Tambah Aset Baru'}
                                </h2>

                                <p className="mt-1 text-xs text-neutral-500">
                                    Lengkapi informasi aset fakultas.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="rounded-xl p-2 text-neutral-500 hover:bg-neutral-100"
                            >
                                <Icon name="x" size={20} />
                            </button>
                        </div>

                        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-5 sm:p-7">
                            {/* CATEGORY */}
                            <section className="space-y-3">
                                <div>
                                    <h3 className="text-sm font-bold text-neutral-900">
                                        Kategori Aset
                                    </h3>

                                    <p className="mt-1 text-xs text-neutral-500">
                                        Tentukan jenis aset yang akan didaftarkan.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {(['Barang', 'Ruangan'] as AssetCategory[]).map(
                                        (category) => (
                                            <button
                                                key={category}
                                                type="button"
                                                onClick={() =>
                                                    handleCategoryChange(category)
                                                }
                                                className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                                                    form.category === category
                                                        ? 'border-neutral-950 bg-neutral-50 ring-1 ring-neutral-950'
                                                        : 'border-neutral-200 hover:border-neutral-400'
                                                }`}
                                            >
                                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100">
                                                    <Icon
                                                        name={
                                                            category === 'Barang'
                                                                ? 'package'
                                                                : 'building'
                                                        }
                                                        size={19}
                                                    />
                                                </span>

                                                <span>
                                                    <span className="block text-sm font-semibold text-neutral-900">
                                                        {category}
                                                    </span>

                                                    <span className="mt-1 block text-[11px] text-neutral-500">
                                                        {category === 'Barang'
                                                            ? 'Aset berupa benda'
                                                            : 'Aset berupa ruangan'}
                                                    </span>
                                                </span>
                                            </button>
                                        ),
                                    )}
                                </div>
                            </section>

                            {/* MASTER DATA */}
                            <section className="space-y-4">
                                <h3 className="border-b border-neutral-100 pb-3 text-sm font-bold text-neutral-900">
                                    Referensi Data Master
                                </h3>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    {form.category === 'Barang' ? (
                                        <Field label="Pilih Barang" required>
                                            <select
                                                required
                                                value={form.itemId}
                                                onChange={(event) =>
                                                    handleMasterSelection(
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                            >
                                                <option value="">
                                                    Pilih barang
                                                </option>

                                                {masterItems.map((item) => (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </Field>
                                    ) : (
                                        <Field label="Pilih Ruangan" required>
                                            <select
                                                required
                                                value={form.roomId}
                                                onChange={(event) =>
                                                    handleMasterSelection(
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                            >
                                                <option value="">
                                                    Pilih ruangan
                                                </option>

                                                {masterRooms.map((room) => (
                                                    <option
                                                        key={room.id}
                                                        value={room.id}
                                                    >
                                                        {room.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </Field>
                                    )}

                                    <Field label="Lokasi Penempatan" required>
                                        <select
                                            required
                                            value={form.locationId}
                                            onChange={(event) =>
                                                updateForm(
                                                    'locationId',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                        >
                                            <option value="">
                                                Pilih lokasi
                                            </option>

                                            {masterLocations.map((location) => (
                                                <option
                                                    key={location.id}
                                                    value={location.id}
                                                >
                                                    {location.name}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>
                                </div>
                            </section>

                            {/* ASSET INFORMATION */}
                            <section className="space-y-4">
                                <h3 className="border-b border-neutral-100 pb-3 text-sm font-bold text-neutral-900">
                                    Informasi Aset
                                </h3>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field label="Kode Aset" required>
                                        <input
                                            required
                                            value={form.code}
                                            onChange={(event) =>
                                                updateForm('code', event.target.value)
                                            }
                                            className={inputClass}
                                            placeholder="Contoh: FAMS-BRG-001"
                                        />
                                    </Field>

                                    <div className="space-y-3 sm:col-span-2">
                                        <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 sm:flex-row sm:items-center">
                                            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-white">
                                                {form.images[0] ? (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setImagePreview({
                                                                images: form.images,
                                                                imageNames: form.imageNames,
                                                                index: 0,
                                                                entityName: form.name || 'Aset',
                                                            })
                                                        }
                                                        className="group relative h-full w-full cursor-zoom-in"
                                                        title="Lihat foto aset"
                                                    >
                                                        <img
                                                            src={form.images[0]}
                                                            alt="Preview foto aset"
                                                            className="h-full w-full object-cover"
                                                        />
                                                        <span className="absolute inset-0 flex items-center justify-center bg-neutral-950/0 text-white opacity-0 transition-all duration-200 group-hover:bg-neutral-950/35 group-hover:opacity-100">
                                                            <Icon name="eye" size={22} />
                                                        </span>
                                                    </button>
                                                ) : (
                                                    <Icon
                                                        name="image"
                                                        size={32}
                                                        className="text-neutral-300"
                                                    />
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <p className="text-sm font-semibold text-neutral-900">
                                                        Foto Aset
                                                    </p>
                                                    <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-neutral-500">
                                                        {form.images.length}/{MAX_IMAGES} foto
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-xs leading-5 text-neutral-500">
                                                    Unggah satu atau beberapa foto aset. Maksimal 10 foto.
                                                </p>

                                                <div className="mt-3 flex flex-wrap items-center gap-3">
                                                    {form.images.length < MAX_IMAGES && (
                                                        <label
                                                            htmlFor="asset-images"
                                                            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
                                                        >
                                                            <Icon name="plus" size={14} />
                                                            {form.images.length > 0
                                                                ? 'Tambah Foto'
                                                                : 'Pilih Foto'}
                                                        </label>
                                                    )}

                                                    {form.images.length > 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setForm((previous) => ({
                                                                    ...previous,
                                                                    images: [],
                                                                    imageNames: [],
                                                                }))
                                                            }
                                                            className="text-xs font-medium text-neutral-500 transition hover:text-red-600"
                                                        >
                                                            Hapus semua foto
                                                        </button>
                                                    )}
                                                </div>

                                                <input
                                                    id="asset-images"
                                                    name="asset-images"
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/webp"
                                                    multiple
                                                    className="sr-only"
                                                    disabled={
                                                        form.images.length >= MAX_IMAGES
                                                    }
                                                    onChange={handleImageUpload}
                                                />

                                                <p className="mt-2 text-[10px] text-neutral-400">
                                                    JPG, PNG, atau WEBP.
                                                </p>
                                            </div>
                                        </div>

                                        {form.images.length > 0 && (
                                            <div className="flex flex-wrap gap-3">
                                                {form.images.map((image, index) => (
                                                    <div
                                                        key={`${image.slice(0, 30)}-${index}`}
                                                        className="group relative h-16 w-16 overflow-hidden rounded-lg border border-neutral-200 bg-white"
                                                    >
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setImagePreview({
                                                                    images: form.images,
                                                                    imageNames: form.imageNames,
                                                                    index,
                                                                    entityName: form.name || 'Aset',
                                                                })
                                                            }
                                                            className="h-full w-full cursor-zoom-in"
                                                            title={`Lihat foto ${index + 1}`}
                                                        >
                                                            <img
                                                                src={image}
                                                                alt={`Foto aset ${index + 1}`}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeImage(index)
                                                            }
                                                            title={`Hapus foto ${index + 1}`}
                                                            className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-neutral-800 shadow"
                                                        >
                                                            <Icon name="x" size={12} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <Field label="Nama Aset" required>
                                        <input
                                            required
                                            readOnly
                                            value={form.name}
                                            className={`${inputClass} bg-neutral-50`}
                                            placeholder="Otomatis dari data master"
                                        />
                                    </Field>

                                    <Field label="Jumlah Unit">
                                        <input
                                            type="number"
                                            min="1"
                                            required
                                            disabled={form.category === 'Ruangan'}
                                            value={form.category === 'Ruangan' ? '1' : form.quantity}
                                            onChange={(event) =>
                                                updateForm(
                                                    'quantity',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                        />
                                    </Field>

                                    <Field label="Tanggal Perolehan">
                                        <input
                                            type="date"
                                            value={form.acquisitionDate}
                                            onChange={(event) =>
                                                updateForm(
                                                    'acquisitionDate',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                        />
                                    </Field>

                                    <Field label="Kondisi Aset">
                                        <select
                                            value={form.condition}
                                            onChange={(event) =>
                                                updateForm(
                                                    'condition',
                                                    event.target.value as AssetCondition,
                                                )
                                            }
                                            className={inputClass}
                                        >
                                            <option>Baik</option>
                                            <option>Rusak Ringan</option>
                                            <option>Rusak Berat</option>
                                        </select>
                                    </Field>

                                    <Field label="Status Aset">
                                        <select
                                            value={form.status}
                                            onChange={(event) =>
                                                updateForm(
                                                    'status',
                                                    event.target.value as AssetStatus,
                                                )
                                            }
                                            className={inputClass}
                                        >
                                            <option>Tersedia</option>
                                            <option>Dipinjam</option>
                                            <option>Maintenance</option>
                                            <option>Tidak Aktif</option>
                                        </select>
                                    </Field>

                                    <Field label="Harga Perolehan (Rp)">
                                        <input
                                            type="number"
                                            min="0"
                                            value={form.price}
                                            onChange={(event) =>
                                                updateForm(
                                                    'price',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Contoh: 5000000"
                                        />
                                    </Field>

                                    <Field label="Sumber Dana">
                                        <select
                                            value={form.fundingSource}
                                            onChange={(event) =>
                                                updateForm(
                                                    'fundingSource',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                        >
                                            <option>APBN</option>
                                            <option>APBD</option>
                                            <option>Hibah</option>
                                            <option>Mandiri</option>
                                            <option>Lainnya</option>
                                        </select>
                                    </Field>
                                </div>

                                <Field label="Deskripsi / Keterangan">
                                    <textarea
                                        rows={3}
                                        value={form.description}
                                        onChange={(event) =>
                                            updateForm(
                                                'description',
                                                event.target.value,
                                            )
                                        }
                                        className={inputClass}
                                        placeholder="Tambahkan informasi aset..."
                                    />
                                </Field>
                            </section>

                        </div>

                        <div className="flex flex-col-reverse gap-2 border-t border-neutral-100 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="rounded-xl border border-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-600 hover:bg-neutral-50"
                            >
                                Batal
                            </button>

                            <button
                                type="submit"
                                className="rounded-xl bg-neutral-950 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
                            >
                                {editingId !== null
                                    ? 'Simpan Perubahan'
                                    : 'Simpan Aset'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* DETAIL MODAL */}
            {detailAsset && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setDetailAsset(null);
                        }
                    }}
                >
                    <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-5">
                            <div>
                                <h2 className="font-bold text-neutral-950">
                                    Detail Aset
                                </h2>

                                <p className="mt-1 text-xs text-neutral-500">
                                    {detailAsset.code}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setDetailAsset(null)}
                                className="rounded-xl p-2 hover:bg-neutral-100"
                            >
                                <Icon name="x" size={19} />
                            </button>
                        </div>

                        <div className="max-h-[75vh] space-y-4 overflow-y-auto p-6">
                            {/* DETAIL IMAGES */}
                            {detailAsset.images.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-neutral-700">
                                        Foto Aset ({detailAsset.images.length})
                                    </p>

                                    <div className="grid grid-cols-3 gap-2">
                                        {detailAsset.images.map((image, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() =>
                                                    setImagePreview({
                                                        images: detailAsset.images,
                                                        imageNames: detailAsset.imageNames,
                                                        index,
                                                        entityName: detailAsset.name,
                                                    })
                                                }
                                                className="aspect-square overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100"
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Foto ${index + 1} ${detailAsset.name}`}
                                                    className="h-full w-full object-cover transition hover:scale-105"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <p className="text-xs text-neutral-500">
                                    Nama Aset
                                </p>

                                <h3 className="mt-1 text-xl font-bold text-neutral-950">
                                    {detailAsset.name}
                                </h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    ['Kategori', detailAsset.category],
                                    ['Lokasi', getLocationName(detailAsset.locationId)],
                                    ['Jumlah', `${detailAsset.quantity} unit`],
                                    ['Kondisi', detailAsset.condition],
                                    ['Status', detailAsset.status],
                                    ['Perolehan', formatDate(detailAsset.acquisitionDate)],
                                    ['Harga', formatCurrency(detailAsset.price)],
                                    ['Sumber Dana', detailAsset.fundingSource],
                                ].map(([label, value]) => (
                                    <div
                                        key={label}
                                        className="rounded-xl bg-neutral-50 p-3"
                                    >
                                        <p className="text-[11px] text-neutral-500">
                                            {label}
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-neutral-800">
                                            {value || '-'}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <p className="text-xs text-neutral-500">
                                    Deskripsi
                                </p>

                                <p className="mt-1 text-sm leading-6 text-neutral-700">
                                    {detailAsset.description ||
                                        'Tidak ada deskripsi.'}
                                </p>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const asset = detailAsset;
                                        setDetailAsset(null);
                                        openEditModal(asset);
                                    }}
                                    className="rounded-xl bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white"
                                >
                                    Edit Aset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ImagePreviewModal
                preview={imagePreview}
                heading="Preview Foto Aset"
                onClose={() => setImagePreview(null)}
                onIndexChange={(index) =>
                    setImagePreview((current) =>
                        current ? { ...current, index } : current,
                    )
                }
            />

            {/* DELETE CONFIRMATION */}
            {deleteId !== null && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100">
                            <Icon name="trash-2" size={21} />
                        </div>

                        <h2 className="text-lg font-bold text-neutral-950">
                            Hapus aset?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-neutral-500">
                            Data aset yang dihapus akan hilang dari daftar
                            tampilan ini.
                        </p>

                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setDeleteId(null)}
                                className="rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-semibold"
                            >
                                Batal
                            </button>

                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white"
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
