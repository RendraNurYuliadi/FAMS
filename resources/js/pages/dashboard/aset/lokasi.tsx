
import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import Icon from '../../../components/Icon';
import type { IconName } from '../../../components/Icon';
import AssetManagementBanner from '../../../components/dashboard/AssetManagementBanner';
import DashboardMetricCard from '../../../components/dashboard/DashboardMetricCard';
import ImagePreviewModal from '../../../components/dashboard/ImagePreviewModal';
import type { ImagePreviewState } from '../../../components/dashboard/ImagePreviewModal';

type LocationType = 'Gedung' | 'Area' | 'Kompleks' | 'Lainnya';

type Location = {
    id: number;
    code: string;
    name: string;
    type: LocationType;
    address: string;
    area: string;
    responsible: string;
    phone: string;
    description: string;
    images: string[];
    imageNames?: string[];
};

type LocationForm = {
    code: string;
    name: string;
    type: LocationType;
    address: string;
    area: string;
    responsible: string;
    phone: string;
    description: string;
    images: string[];
    imageNames: string[];
};

const MAX_IMAGES = 10;
const PER_PAGE = 5;

const locationTypeStyles: Record<LocationType, string> = {
    Gedung: 'bg-neutral-100 text-neutral-800',
    Area: 'bg-neutral-200 text-neutral-800',
    Kompleks: 'bg-neutral-300 text-neutral-800',
    Lainnya: 'bg-neutral-100 text-neutral-600',
};

const initialLocations: Location[] = [
    {
        id: 1,
        code: 'FAMS-LKS-001',
        name: 'Gedung Fakultas Teknologi Informasi',
        type: 'Gedung',
        address: 'Jl. Angkrek Situ No. 19, Sumedang, Jawa Barat',
        area: 'Area Kampus Utama',
        responsible: 'Bagian Administrasi FTI',
        phone: '0261-202911',
        description:
            'Gedung utama Fakultas Teknologi Informasi yang digunakan untuk kegiatan akademik, administrasi, dan aktivitas fakultas.',
        images: [
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
        ],
    },
    {
        id: 2,
        code: 'FAMS-LKS-002',
        name: 'Gedung Rektorat',
        type: 'Gedung',
        address: 'Area Kampus Universitas Sebelas April, Sumedang',
        area: 'Area Kampus Utama',
        responsible: 'Bagian Umum Universitas',
        phone: '0261-202911',
        description:
            'Gedung pusat administrasi dan pelayanan universitas.',
        images: [
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
        ],
    },
    {
        id: 3,
        code: 'FAMS-LKS-003',
        name: 'Gedung Laboratorium',
        type: 'Gedung',
        address: 'Area Kampus Universitas Sebelas April, Sumedang',
        area: 'Area Laboratorium',
        responsible: 'Kepala Laboratorium',
        phone: '0812-0000-0003',
        description:
            'Gedung yang digunakan untuk kegiatan praktikum dan pengembangan teknologi.',
        images: [
            'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800',
        ],
    },
    {
        id: 4,
        code: 'FAMS-LKS-004',
        name: 'Area Parkir Fakultas',
        type: 'Area',
        address: 'Halaman depan Gedung Fakultas Teknologi Informasi',
        area: 'Area Kampus Utama',
        responsible: 'Petugas Keamanan',
        phone: '0812-0000-0004',
        description: 'Area parkir kendaraan mahasiswa, dosen, dan staf.',
        images: [],
    },
    {
        id: 5,
        code: 'FAMS-LKS-005',
        name: 'Area Kegiatan Mahasiswa',
        type: 'Area',
        address: 'Lingkungan Fakultas Teknologi Informasi',
        area: 'Area Kampus Utama',
        responsible: 'Bagian Kemahasiswaan',
        phone: '0812-0000-0005',
        description:
            'Area yang digunakan untuk mendukung kegiatan organisasi dan aktivitas mahasiswa.',
        images: [
            'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800',
        ],
    },
];

const emptyForm: LocationForm = {
    code: '',
    name: '',
    type: 'Gedung',
    address: '',
    area: '',
    responsible: '',
    phone: '',
    description: '',
    images: [],
    imageNames: [],
};

const inputClass =
    'w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100';

function Field({
    label,
    children,
    required = false,
}: {
    label: string;
    children: ReactNode;
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

export default function DataLokasi() {
    const [locations, setLocations] = useState<Location[]>(initialLocations);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('Semua');
    const [currentPage, setCurrentPage] = useState(1);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<LocationForm>(emptyForm);

    const [detailLocation, setDetailLocation] =
        useState<Location | null>(null);
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

    const filteredLocations = useMemo(() => {
        return locations.filter((location) => {
            const keyword = search.toLowerCase().trim();

            const matchesSearch =
                location.name.toLowerCase().includes(keyword) ||
                location.code.toLowerCase().includes(keyword) ||
                location.address.toLowerCase().includes(keyword) ||
                location.area.toLowerCase().includes(keyword);

            const matchesType =
                typeFilter === 'Semua' || location.type === typeFilter;

            return matchesSearch && matchesType;
        });
    }, [locations, search, typeFilter]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredLocations.length / PER_PAGE),
    );

    const safeCurrentPage = Math.min(currentPage, totalPages);

    const paginatedLocations = filteredLocations.slice(
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
            label: 'Total Lokasi',
            value: locations.length,
            icon: 'map-pin',
            iconStyle: 'bg-neutral-100 text-neutral-800',
        },
        {
            label: 'Gedung',
            value: locations.filter((item) => item.type === 'Gedung').length,
            icon: 'building',
            iconStyle: 'bg-neutral-200 text-neutral-800',
        },
        {
            label: 'Area',
            value: locations.filter((item) => item.type === 'Area').length,
            icon: 'map',
            iconStyle: 'bg-neutral-100 text-neutral-700',
        },
        {
            label: 'Total Foto',
            value: locations.reduce(
                (total, item) => total + item.images.length,
                0,
            ),
            icon: 'image',
            iconStyle: 'bg-neutral-200 text-neutral-700',
        },
    ];

    function openCreateModal() {
        setEditingId(null);
        setForm({
            ...emptyForm,
            code: `FAMS-LKS-${String(Date.now()).slice(-6)}`,
        });
        setModalOpen(true);
    }

    function openEditModal(location: Location) {
        setEditingId(location.id);

        setForm({
            code: location.code,
            name: location.name,
            type: location.type,
            address: location.address,
            area: location.area,
            responsible: location.responsible,
            phone: location.phone,
            description: location.description,
            images: [...location.images],
            imageNames:
                location.imageNames ??
                location.images.map((_, index) => `Foto ${index + 1}`),
        });

        setModalOpen(true);
    }

    function updateForm<K extends keyof LocationForm>(
        key: K,
        value: LocationForm[K],
    ) {
        setForm((previous) => ({
            ...previous,
            [key]: value,
        }));
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
        event: ChangeEvent<HTMLInputElement>,
    ) {
        const files = Array.from(event.target.files ?? []);
        event.target.value = '';

        if (files.length === 0) return;

        const remainingSlots = MAX_IMAGES - form.images.length;

        if (remainingSlots <= 0) {
            alert(`Maksimal ${MAX_IMAGES} gambar untuk satu lokasi.`);
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

    function saveLocation(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!form.name.trim()) {
            alert('Nama lokasi wajib diisi.');
            return;
        }

        if (!form.address.trim()) {
            alert('Alamat lokasi wajib diisi.');
            return;
        }

        const duplicateCode = locations.some(
            (location) =>
                location.code.toLowerCase() === form.code.trim().toLowerCase() &&
                location.id !== editingId,
        );

        if (duplicateCode) {
            alert('Kode lokasi sudah digunakan. Gunakan kode yang berbeda.');
            return;
        }

        const payload: Location = {
            id: editingId ?? Date.now(),
            code: form.code.trim(),
            name: form.name.trim(),
            type: form.type,
            address: form.address.trim(),
            area: form.area.trim(),
            responsible: form.responsible.trim(),
            phone: form.phone.trim(),
            description: form.description.trim(),
            images: [...form.images],
            imageNames: [...form.imageNames],
        };

        if (editingId !== null) {
            setLocations((previous) =>
                previous.map((location) =>
                    location.id === editingId ? payload : location,
                ),
            );
        } else {
            setLocations((previous) => [payload, ...previous]);
            setCurrentPage(1);
        }

        setModalOpen(false);
        setEditingId(null);
        setForm(emptyForm);
    }

    function confirmDelete() {
        if (deleteId === null) return;

        setLocations((previous) =>
            previous.filter((location) => location.id !== deleteId),
        );

        setDeleteId(null);
        setDetailLocation(null);
    }

    function closeModal() {
        setModalOpen(false);
        setEditingId(null);
        setForm(emptyForm);
    }

    return (
        <DashboardLayout>
            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                <AssetManagementBanner
                    title="Kelola Data Lokasi."
                    description="Atur gedung dan area fakultas sebagai referensi penempatan aset serta ruangan."
                    contextLabel="Data lokasi"
                    icon="map-pin"
                    statusLabel="Lokasi terorganisir"
                    metrics={[
                        { label: 'Total lokasi', value: locations.length },
                        {
                            label: 'Total foto',
                            value: locations.reduce(
                                (total, location) =>
                                    total + location.images.length,
                                0,
                            ),
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
                                Data Lokasi
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
                            Data Lokasi
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
                            Kelola data lokasi gedung dan area fakultas sebagai
                            referensi penempatan aset dan ruangan.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                        <Icon name="plus" size={17} />
                        Tambah Lokasi
                    </button>
                </div>

                {/* STATISTICS */}
                <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                    {stats.map((stat, index) => (
                        <DashboardMetricCard
                            key={stat.label}
                            label={stat.label}
                            value={stat.value}
                            icon={stat.icon}
                            index={index}
                        />
                    ))}
                </div>

                {/* MAIN TABLE */}
                <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                    <div className="flex flex-col gap-4 border-b border-neutral-100 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="font-bold text-neutral-900">
                                Daftar Lokasi
                            </h2>
                            <p className="mt-1 text-xs text-neutral-500">
                                Informasi lokasi yang terdaftar di FAMS.
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
                                    placeholder="Cari kode, nama, atau alamat..."
                                    className={`${inputClass} pl-9 sm:w-72`}
                                />
                            </div>

                            <select
                                value={typeFilter}
                                onChange={(event) => {
                                    setTypeFilter(event.target.value);
                                    setCurrentPage(1);
                                }}
                                className={inputClass}
                            >
                                <option value="Semua">Semua Jenis</option>
                                <option value="Gedung">Gedung</option>
                                <option value="Area">Area</option>
                                <option value="Kompleks">Kompleks</option>
                                <option value="Lainnya">Lainnya</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-left text-sm">
                            <thead className="bg-neutral-50 text-xs text-neutral-500">
                                <tr>
                                    <th className="px-5 py-4 font-semibold">
                                        Lokasi
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Jenis
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Area
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Alamat
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Penanggung Jawab
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Foto
                                    </th>
                                    <th className="px-5 py-4 text-right font-semibold">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-neutral-100">
                                {paginatedLocations.map((location) => (
                                    <tr
                                        key={location.id}
                                        className="transition hover:bg-neutral-50/70"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (location.images[0]) {
                                                            setImagePreview({
                                                                images: location.images,
                                                                imageNames: location.imageNames,
                                                                index: 0,
                                                                entityName: location.name,
                                                            });
                                                        }
                                                    }}
                                                    className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100"
                                                    title="Lihat gambar lokasi"
                                                >
                                                    {location.images[0] ? (
                                                        <img
                                                            src={location.images[0]}
                                                            alt={location.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <Icon
                                                            name="image"
                                                            size={18}
                                                            className="text-neutral-400"
                                                        />
                                                    )}
                                                </button>

                                                <div>
                                                    <p className="font-semibold text-neutral-900">
                                                        {location.name}
                                                    </p>
                                                    <p className="mt-1 text-xs text-neutral-400">
                                                        {location.code}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className={`rounded-lg px-2.5 py-1.5 text-xs font-medium ${locationTypeStyles[location.type]}`}>
                                                {location.type}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-xs text-neutral-600">
                                            {location.area || '-'}
                                        </td>

                                        <td className="max-w-56 px-5 py-4 text-xs leading-5 text-neutral-600">
                                            {location.address}
                                        </td>

                                        <td className="px-5 py-4 text-xs text-neutral-600">
                                            {location.responsible || '-'}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-100 px-2.5 py-1.5 text-xs font-medium text-neutral-600">
                                                <Icon name="image" size={13} />
                                                {location.images.length}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-1">
                                                <button
                                                    type="button"
                                                    title="Detail"
                                                    onClick={() =>
                                                        setDetailLocation(location)
                                                    }
                                                    className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                                                >
                                                    <Icon name="eye" size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    title="Edit"
                                                    onClick={() =>
                                                        openEditModal(location)
                                                    }
                                                    className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                                                >
                                                    <Icon name="pencil" size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    title="Hapus"
                                                    onClick={() =>
                                                        setDeleteId(location.id)
                                                    }
                                                    className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                                                >
                                                    <Icon name="trash-2" size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {paginatedLocations.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-5 py-14 text-center"
                                        >
                                            <Icon
                                                name="map-pin"
                                                size={30}
                                                className="mx-auto mb-3 text-neutral-300"
                                            />
                                            <p className="font-semibold text-neutral-700">
                                                Lokasi tidak ditemukan
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
                            {filteredLocations.length > 0
                                ? (safeCurrentPage - 1) * PER_PAGE + 1
                                : 0}{' '}
                            -{' '}
                            {Math.min(
                                safeCurrentPage * PER_PAGE,
                                filteredLocations.length,
                            )}{' '}
                            dari {filteredLocations.length} lokasi
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={safeCurrentPage === 1}
                                onClick={() =>
                                    setCurrentPage((page) =>
                                        Math.max(1, page - 1),
                                    )
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
                    Data saat ini merupakan ilustrasi frontend dan belum
                    tersimpan ke database.
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
                        onSubmit={saveLocation}
                        className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                    >
                        <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4 sm:px-7">
                            <div>
                                <h2 className="text-lg font-bold text-neutral-950">
                                    {editingId !== null
                                        ? 'Edit Data Lokasi'
                                        : 'Tambah Lokasi Baru'}
                                </h2>
                                <p className="mt-1 text-xs text-neutral-500">
                                    Lengkapi informasi lokasi fakultas.
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
                            {/* LOCATION INFORMATION */}
                            <section className="space-y-4">
                                <h3 className="border-b border-neutral-100 pb-3 text-sm font-bold text-neutral-900">
                                    Informasi Lokasi
                                </h3>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field label="Kode Lokasi" required>
                                        <input
                                            required
                                            value={form.code}
                                            onChange={(event) =>
                                                updateForm(
                                                    'code',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Contoh: FAMS-LKS-001"
                                        />
                                    </Field>

                                    <Field label="Jenis Lokasi" required>
                                        <select
                                            required
                                            value={form.type}
                                            onChange={(event) =>
                                                updateForm(
                                                    'type',
                                                    event.target.value as LocationType,
                                                )
                                            }
                                            className={inputClass}
                                        >
                                            <option value="Gedung">Gedung</option>
                                            <option value="Area">Area</option>
                                            <option value="Kompleks">Kompleks</option>
                                            <option value="Lainnya">Lainnya</option>
                                        </select>
                                    </Field>

                                    <div className="sm:col-span-2">
                                        <Field label="Nama Lokasi" required>
                                            <input
                                                required
                                                value={form.name}
                                                onChange={(event) =>
                                                    updateForm(
                                                        'name',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                                placeholder="Contoh: Gedung Fakultas Teknologi Informasi"
                                            />
                                        </Field>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <Field label="Alamat Lengkap" required>
                                            <textarea
                                                required
                                                rows={2}
                                                value={form.address}
                                                onChange={(event) =>
                                                    updateForm(
                                                        'address',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                                placeholder="Masukkan alamat lengkap lokasi..."
                                            />
                                        </Field>
                                    </div>

                                    <Field label="Area / Wilayah">
                                        <input
                                            value={form.area}
                                            onChange={(event) =>
                                                updateForm(
                                                    'area',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Contoh: Area Kampus Utama"
                                        />
                                    </Field>

                                    <Field label="Penanggung Jawab">
                                        <input
                                            value={form.responsible}
                                            onChange={(event) =>
                                                updateForm(
                                                    'responsible',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Nama bagian atau petugas"
                                        />
                                    </Field>

                                    <Field label="Nomor Telepon">
                                        <input
                                            type="tel"
                                            value={form.phone}
                                            onChange={(event) =>
                                                updateForm(
                                                    'phone',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Contoh: 0261-202911"
                                        />
                                    </Field>
                                </div>
                            </section>

                            {/* LOCATION IMAGES */}
                            <section className="space-y-4">
                                <h3 className="border-b border-neutral-100 pb-3 text-sm font-bold text-neutral-900">
                                    Dokumentasi Lokasi
                                </h3>

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
                                                        entityName: form.name || 'Lokasi',
                                                    })
                                                }
                                                className="group relative h-full w-full cursor-zoom-in"
                                                title="Lihat foto lokasi"
                                            >
                                                <img
                                                    src={form.images[0]}
                                                    alt="Preview foto lokasi"
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
                                                Foto Lokasi
                                            </p>
                                            <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-neutral-500">
                                                {form.images.length}/{MAX_IMAGES} foto
                                            </span>
                                        </div>

                                        <p className="mt-1 text-xs leading-5 text-neutral-500">
                                            Tambahkan foto gedung atau area
                                            sebagai dokumentasi lokasi.
                                            Maksimal 10 foto.
                                        </p>

                                        <div className="mt-3 flex flex-wrap items-center gap-3">
                                            {form.images.length < MAX_IMAGES && (
                                                <label
                                                    htmlFor="location-images"
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
                                                    className="text-xs font-medium text-neutral-500 transition hover:text-neutral-950"
                                                >
                                                    Hapus semua foto
                                                </button>
                                            )}
                                        </div>

                                        <input
                                            id="location-images"
                                            name="location-images"
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
                                            Format JPG, PNG, atau WEBP.
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
                                                            entityName: form.name || 'Lokasi',
                                                        })
                                                    }
                                                    className="h-full w-full cursor-zoom-in"
                                                    title={`Lihat foto ${index + 1}`}
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`Foto lokasi ${index + 1}`}
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
                            </section>

                            {/* DESCRIPTION */}
                            <section className="space-y-4">
                                <h3 className="border-b border-neutral-100 pb-3 text-sm font-bold text-neutral-900">
                                    Keterangan Tambahan
                                </h3>

                                <Field label="Deskripsi Lokasi">
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
                                        placeholder="Tambahkan keterangan mengenai lokasi..."
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
                                    : 'Simpan Lokasi'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* DETAIL MODAL */}
            {detailLocation && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setDetailLocation(null);
                        }
                    }}
                >
                    <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-5">
                            <div>
                                <h2 className="font-bold text-neutral-950">
                                    Detail Lokasi
                                </h2>
                                <p className="mt-1 text-xs text-neutral-500">
                                    {detailLocation.code}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setDetailLocation(null)}
                                className="rounded-xl p-2 hover:bg-neutral-100"
                            >
                                <Icon name="x" size={19} />
                            </button>
                        </div>

                        <div className="max-h-[75vh] space-y-5 overflow-y-auto p-6">
                            {detailLocation.images.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-neutral-700">
                                        Foto Lokasi ({detailLocation.images.length})
                                    </p>

                                    <div className="grid grid-cols-3 gap-2">
                                        {detailLocation.images.map(
                                            (image, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() =>
                                                        setImagePreview({
                                                            images: detailLocation.images,
                                                            imageNames: detailLocation.imageNames,
                                                            index,
                                                            entityName: detailLocation.name,
                                                        })
                                                    }
                                                    className="aspect-square overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100"
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`Foto ${index + 1} ${detailLocation.name}`}
                                                        className="h-full w-full object-cover transition hover:scale-105"
                                                    />
                                                </button>
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}

                            <div>
                                <p className="text-xs text-neutral-500">
                                    Nama Lokasi
                                </p>
                                <h3 className="mt-1 text-xl font-bold text-neutral-950">
                                    {detailLocation.name}
                                </h3>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    ['Kode Lokasi', detailLocation.code],
                                    ['Jenis Lokasi', detailLocation.type],
                                    ['Area / Wilayah', detailLocation.area],
                                    [
                                        'Penanggung Jawab',
                                        detailLocation.responsible,
                                    ],
                                    ['Nomor Telepon', detailLocation.phone],
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
                                    Alamat Lengkap
                                </p>
                                <p className="mt-1 text-sm leading-6 text-neutral-700">
                                    {detailLocation.address || '-'}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-neutral-500">
                                    Deskripsi
                                </p>
                                <p className="mt-1 text-sm leading-6 text-neutral-700">
                                    {detailLocation.description ||
                                        'Tidak ada deskripsi.'}
                                </p>
                            </div>

                            <div className="flex justify-end pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const location = detailLocation;
                                        setDetailLocation(null);
                                        openEditModal(location);
                                    }}
                                    className="rounded-xl bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white"
                                >
                                    Edit Lokasi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ImagePreviewModal
                preview={imagePreview}
                heading="Preview Foto Lokasi"
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
                            Hapus lokasi?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-neutral-500">
                            Data lokasi yang dihapus akan hilang dari daftar
                            tampilan ini. Pastikan lokasi tersebut tidak sedang
                            digunakan sebagai referensi aset atau ruangan.
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
