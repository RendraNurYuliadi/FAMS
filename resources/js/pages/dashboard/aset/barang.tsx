
import { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import Icon from '../../../components/Icon';
import type { IconName } from '../../../components/Icon';
import AssetManagementBanner from '../../../components/dashboard/AssetManagementBanner';
import DashboardMetricCard from '../../../components/dashboard/DashboardMetricCard';
import ImagePreviewModal from '../../../components/dashboard/ImagePreviewModal';
import type { ImagePreviewState } from '../../../components/dashboard/ImagePreviewModal';

type ItemStatus = 'Aktif' | 'Tidak Aktif';

type Item = {
    id: number;
    code: string;
    name: string;
    category: string;
    brand: string;
    model: string;
    specification: string;
    unit: string;
    responsiblePerson: string;
    description: string;
    status: ItemStatus;
    images: string[];
    imageNames: string[];
    createdAt: string;
};

type ItemForm = {
    code: string;
    name: string;
    category: string;
    brand: string;
    model: string;
    specification: string;
    unit: string;
    responsiblePerson: string;
    description: string;
    status: ItemStatus;
    images: string[];
    imageNames: string[];
};

const MAX_IMAGES = 10;
const PER_PAGE = 5;

const masterCategories = [
    'Elektronik',
    'Peralatan Komputer',
    'Peralatan Kantor',
    'Furniture',
    'Peralatan Laboratorium',
    'Peralatan Multimedia',
    'Peralatan Kebersihan',
    'Lainnya',
];

const initialItems: Item[] = [
    {
        id: 1,
        code: 'BRG-001',
        name: 'Laptop Lenovo ThinkPad',
        category: 'Elektronik',
        brand: 'Lenovo',
        model: 'ThinkPad E14',
        specification: 'Intel Core i5, RAM 16GB, SSD 512GB, layar 14 inci.',
        unit: 'Unit',
        responsiblePerson: 'Pengelola Barang',
        description: 'Laptop untuk menunjang kegiatan akademik, administrasi, dan operasional fakultas.',
        status: 'Aktif',
        images: [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
        ],
        imageNames: ['Laptop Lenovo.jpg', 'Laptop Lenovo 2.jpg'],
        createdAt: '2025-01-15',
    },
    {
        id: 2,
        code: 'BRG-002',
        name: 'Proyektor Epson',
        category: 'Peralatan Multimedia',
        brand: 'Epson',
        model: 'EB-E01',
        specification: 'Resolusi XGA, teknologi 3LCD, konektivitas HDMI.',
        unit: 'Unit',
        responsiblePerson: 'Pengelola Barang',
        description: 'Proyektor untuk kegiatan presentasi, perkuliahan, seminar, dan kegiatan fakultas.',
        status: 'Aktif',
        images: [
            'https://images.unsplash.com/photo-1528395874238-34ebe249b3f2?w=800',
        ],
        imageNames: ['Proyektor Epson.jpg'],
        createdAt: '2025-03-10',
    },
    {
        id: 3,
        code: 'BRG-003',
        name: 'Kursi Kuliah',
        category: 'Furniture',
        brand: 'Olympic',
        model: 'Kursi Kuliah Standar',
        specification: 'Rangka besi, dudukan dan sandaran berbahan kayu.',
        unit: 'Unit',
        responsiblePerson: 'Pengelola Barang',
        description: 'Kursi untuk menunjang kegiatan belajar mengajar di ruang kelas.',
        status: 'Aktif',
        images: [
            'https://images.unsplash.com/photo-1503602642458-232111445657?w=800',
        ],
        imageNames: ['Kursi Kuliah.jpg'],
        createdAt: '2025-02-01',
    },
    {
        id: 4,
        code: 'BRG-004',
        name: 'Meja Komputer',
        category: 'Furniture',
        brand: 'Lokal',
        model: 'Meja Komputer Standar',
        specification: 'Meja berbahan kayu dengan rangka besi.',
        unit: 'Unit',
        responsiblePerson: 'Pengelola Barang',
        description: 'Meja untuk penempatan komputer dan perlengkapan praktikum.',
        status: 'Aktif',
        images: [],
        imageNames: [],
        createdAt: '2025-02-10',
    },
    {
        id: 5,
        code: 'BRG-005',
        name: 'Printer Epson L3210',
        category: 'Peralatan Kantor',
        brand: 'Epson',
        model: 'EcoTank L3210',
        specification: 'Printer multifungsi print, scan, dan copy dengan sistem ink tank.',
        unit: 'Unit',
        responsiblePerson: 'Pengelola Barang',
        description: 'Printer untuk kebutuhan pencetakan dokumen administrasi fakultas.',
        status: 'Tidak Aktif',
        images: [
            'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800',
        ],
        imageNames: ['Printer Epson.jpg'],
        createdAt: '2024-11-20',
    },
];

const emptyForm: ItemForm = {
    code: '',
    name: '',
    category: '',
    brand: '',
    model: '',
    specification: '',
    unit: 'Unit',
    responsiblePerson: '',
    description: '',
    status: 'Aktif',
    images: [],
    imageNames: [],
};

const inputClass =
    'w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100';

const statusStyles: Record<ItemStatus, string> = {
    Aktif: 'bg-neutral-100 text-neutral-800 ring-1 ring-neutral-200',
    'Tidak Aktif': 'bg-neutral-200 text-neutral-700 ring-1 ring-neutral-300',
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

function formatDate(value: string) {
    if (!value) return '-';

    return new Date(`${value}T00:00:00`).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

export default function DataBarang() {
    const [items, setItems] = useState<Item[]>(initialItems);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('Semua');
    const [statusFilter, setStatusFilter] = useState('Semua');
    const [currentPage, setCurrentPage] = useState(1);

    const [modalOpen, setModalOpen] = useState(false);
    const [detailItem, setDetailItem] = useState<Item | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const [form, setForm] = useState<ItemForm>(emptyForm);
    const [imagePreview, setImagePreview] =
        useState<ImagePreviewState | null>(null);

    useEffect(() => {
        if (!modalOpen && !detailItem && !deleteId && !imagePreview) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                if (imagePreview) {
                    setImagePreview(null);
                } else if (deleteId !== null) {
                    setDeleteId(null);
                } else if (modalOpen) {
                    closeModal();
                } else {
                    setDetailItem(null);
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [modalOpen, detailItem, deleteId, imagePreview]);

    const filteredItems = useMemo(() => {
        const keyword = search.toLowerCase().trim();

        return items.filter((item) => {
            const matchesSearch =
                item.name.toLowerCase().includes(keyword) ||
                item.code.toLowerCase().includes(keyword) ||
                item.brand.toLowerCase().includes(keyword) ||
                item.model.toLowerCase().includes(keyword);

            const matchesCategory =
                categoryFilter === 'Semua' ||
                item.category === categoryFilter;

            const matchesStatus =
                statusFilter === 'Semua' ||
                item.status === statusFilter;

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [items, search, categoryFilter, statusFilter]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredItems.length / PER_PAGE),
    );

    const safeCurrentPage = Math.min(currentPage, totalPages);

    const paginatedItems = filteredItems.slice(
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
            label: 'Total Barang',
            value: items.length,
            icon: 'package',
            iconStyle: 'bg-neutral-100 text-neutral-800',
        },
        {
            label: 'Kategori',
            value: new Set(items.map((item) => item.category)).size,
            icon: 'layers',
            iconStyle: 'bg-neutral-200 text-neutral-800',
        },
        {
            label: 'Barang Aktif',
            value: items.filter((item) => item.status === 'Aktif').length,
            icon: 'check-circle',
            iconStyle: 'bg-neutral-100 text-neutral-700',
        },
        {
            label: 'Tidak Aktif',
            value: items.filter((item) => item.status === 'Tidak Aktif').length,
            icon: 'alert-circle',
            iconStyle: 'bg-neutral-200 text-neutral-700',
        },
    ];

    function updateForm<K extends keyof ItemForm>(
        key: K,
        value: ItemForm[K],
    ) {
        setForm((previous) => ({
            ...previous,
            [key]: value,
        }));
    }

    function openCreateModal() {
        setEditingId(null);
        setForm({
            ...emptyForm,
            code: `BRG-${String(Date.now()).slice(-6)}`,
        });
        setModalOpen(true);
    }

    function openEditModal(item: Item) {
        setEditingId(item.id);

        setForm({
            code: item.code,
            name: item.name,
            category: item.category,
            brand: item.brand,
            model: item.model,
            specification: item.specification,
            unit: item.unit,
            responsiblePerson: item.responsiblePerson,
            description: item.description,
            status: item.status,
            images: [...item.images],
            imageNames: [...item.imageNames],
        });

        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setEditingId(null);
        setForm(emptyForm);
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
            alert(`Maksimal ${MAX_IMAGES} gambar untuk satu barang.`);
            return;
        }

        const validFiles = files.filter((file) =>
            ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
        );

        if (validFiles.length !== files.length) {
            alert('Format gambar harus JPG, PNG, atau WEBP.');
        }

        const selectedFiles = validFiles.slice(0, remainingSlots);

        if (validFiles.length > remainingSlots) {
            alert(`Maksimal ${MAX_IMAGES} gambar. Hanya ${remainingSlots} gambar yang dapat ditambahkan.`);
        }

        if (selectedFiles.length === 0) return;

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

    function saveItem(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!form.name.trim()) {
            alert('Nama barang wajib diisi.');
            return;
        }

        if (!form.category) {
            alert('Silakan pilih kategori barang.');
            return;
        }

        if (!form.responsiblePerson.trim()) {
            alert('Penanggung jawab barang wajib diisi.');
            return;
        }

        const duplicateCode = items.some(
            (item) =>
                item.code.toLowerCase() === form.code.trim().toLowerCase() &&
                item.id !== editingId,
        );

        if (duplicateCode) {
            alert('Kode barang sudah digunakan. Silakan gunakan kode lain.');
            return;
        }

        const payload: Item = {
            id: editingId ?? Date.now(),
            code: form.code.trim(),
            name: form.name.trim(),
            category: form.category,
            brand: form.brand.trim(),
            model: form.model.trim(),
            specification: form.specification.trim(),
            unit: form.unit,
            responsiblePerson: form.responsiblePerson.trim(),
            description: form.description.trim(),
            status: form.status,
            images: [...form.images],
            imageNames: [...form.imageNames],
            createdAt:
                editingId !== null
                    ? items.find((item) => item.id === editingId)?.createdAt ??
                      new Date().toISOString().slice(0, 10)
                    : new Date().toISOString().slice(0, 10),
        };

        if (editingId !== null) {
            setItems((previous) =>
                previous.map((item) =>
                    item.id === editingId ? payload : item,
                ),
            );
        } else {
            setItems((previous) => [payload, ...previous]);
            setCurrentPage(1);
        }

        closeModal();
    }

    function confirmDelete() {
        if (deleteId === null) return;

        setItems((previous) =>
            previous.filter((item) => item.id !== deleteId),
        );

        if (detailItem?.id === deleteId) {
            setDetailItem(null);
        }

        setDeleteId(null);
    }

    return (
        <DashboardLayout>
            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                <AssetManagementBanner
                    title="Kelola Data Barang."
                    description="Atur referensi barang dengan rapi untuk mendukung pencatatan inventaris aset fakultas."
                    contextLabel="Data master barang"
                    icon="package"
                    statusLabel="Referensi inventaris"
                    metrics={[
                        { label: 'Total barang', value: items.length },
                        {
                            label: 'Kategori',
                            value: new Set(items.map((item) => item.category))
                                .size,
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
                                Data Barang
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
                            Data Barang
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
                            Kelola data master jenis barang yang akan digunakan
                            sebagai referensi saat pembuatan aset.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                        <Icon name="plus" size={17} />
                        Tambah Barang
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
                                Daftar Master Barang
                            </h2>
                            <p className="mt-1 text-xs text-neutral-500">
                                Data referensi barang untuk kebutuhan inventaris aset.
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
                                    placeholder="Cari kode atau nama barang..."
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
                                {masterCategories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
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
                                <option value="Aktif">Aktif</option>
                                <option value="Tidak Aktif">Tidak Aktif</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px] text-left text-sm">
                            <thead className="bg-neutral-50 text-xs text-neutral-500">
                                <tr>
                                    <th className="px-5 py-4 font-semibold">Foto / Barang</th>
                                    <th className="px-5 py-4 font-semibold">Kode</th>
                                    <th className="px-5 py-4 font-semibold">Kategori</th>
                                    <th className="px-5 py-4 font-semibold">Merek / Model</th>
                                    <th className="px-5 py-4 font-semibold">Satuan</th>
                                    <th className="px-5 py-4 font-semibold">Status</th>
                                    <th className="px-5 py-4 text-right font-semibold">Aksi</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-neutral-100">
                                {paginatedItems.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="transition hover:bg-neutral-50/70"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (item.images[0]) {
                                                            setImagePreview({
                                                                images: item.images,
                                                                imageNames: item.imageNames,
                                                                index: 0,
                                                                entityName: item.name,
                                                            });
                                                        }
                                                    }}
                                                    className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100"
                                                    title="Lihat gambar barang"
                                                >
                                                    {item.images[0] ? (
                                                        <img
                                                            src={item.images[0]}
                                                            alt={item.name}
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
                                                        {item.name}
                                                    </p>
                                                    <p className="mt-1 text-xs text-neutral-400">
                                                        {item.images.length} foto
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 text-xs font-medium text-neutral-600">
                                            {item.code}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="rounded-lg bg-neutral-100 px-2.5 py-1.5 text-xs font-medium text-neutral-600">
                                                {item.category}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="text-xs font-medium text-neutral-700">
                                                {item.brand || '-'}
                                            </p>
                                            <p className="mt-1 text-xs text-neutral-400">
                                                {item.model || '-'}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4 text-xs text-neutral-600">
                                            {item.unit}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className={`inline-flex rounded-lg px-2.5 py-1.5 text-xs font-medium ${statusStyles[item.status]}`}>
                                                {item.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-1">
                                                <button
                                                    type="button"
                                                    title="Detail"
                                                    onClick={() => setDetailItem(item)}
                                                    className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                                                >
                                                    <Icon name="eye" size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    title="Edit"
                                                    onClick={() => openEditModal(item)}
                                                    className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                                                >
                                                    <Icon name="pencil" size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    title="Hapus"
                                                    onClick={() => setDeleteId(item.id)}
                                                    className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                                                >
                                                    <Icon name="trash-2" size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {paginatedItems.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-5 py-14 text-center">
                                            <Icon
                                                name="package"
                                                size={30}
                                                className="mx-auto mb-3 text-neutral-300"
                                            />
                                            <p className="font-semibold text-neutral-700">
                                                Barang tidak ditemukan
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
                            {filteredItems.length > 0
                                ? (safeCurrentPage - 1) * PER_PAGE + 1
                                : 0}{' '}
                            -{' '}
                            {Math.min(
                                safeCurrentPage * PER_PAGE,
                                filteredItems.length,
                            )}{' '}
                            dari {filteredItems.length} barang
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
                    Data master barang menjadi referensi saat membuat data aset.
                    Data saat ini masih berupa ilustrasi frontend.
                </p>
            </div>

            {/* CREATE / EDIT MODAL */}
            {modalOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-6"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) closeModal();
                    }}
                >
                    <form
                        onSubmit={saveItem}
                        className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                    >
                        <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4 sm:px-7">
                            <div>
                                <h2 className="text-lg font-bold text-neutral-950">
                                    {editingId !== null
                                        ? 'Edit Data Barang'
                                        : 'Tambah Barang Baru'}
                                </h2>
                                <p className="mt-1 text-xs text-neutral-500">
                                    Lengkapi informasi master barang.
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
                            {/* BASIC INFORMATION */}
                            <section className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-bold text-neutral-900">
                                        Informasi Barang
                                    </h3>
                                    <p className="mt-1 text-xs text-neutral-500">
                                        Identitas dasar barang yang akan digunakan sebagai referensi aset.
                                    </p>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field label="Kode Barang" required>
                                        <input
                                            required
                                            value={form.code}
                                            onChange={(event) =>
                                                updateForm('code', event.target.value)
                                            }
                                            className={inputClass}
                                            placeholder="Contoh: BRG-001"
                                        />
                                    </Field>

                                    <Field label="Nama Barang" required>
                                        <input
                                            required
                                            value={form.name}
                                            onChange={(event) =>
                                                updateForm('name', event.target.value)
                                            }
                                            className={inputClass}
                                            placeholder="Contoh: Laptop Lenovo ThinkPad"
                                        />
                                    </Field>

                                    <Field label="Kategori Barang" required>
                                        <select
                                            required
                                            value={form.category}
                                            onChange={(event) =>
                                                updateForm('category', event.target.value)
                                            }
                                            className={inputClass}
                                        >
                                            <option value="">Pilih kategori</option>
                                            {masterCategories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>

                                    <Field label="Satuan" required>
                                        <select
                                            required
                                            value={form.unit}
                                            onChange={(event) =>
                                                updateForm('unit', event.target.value)
                                            }
                                            className={inputClass}
                                        >
                                            <option value="Unit">Unit</option>
                                            <option value="Buah">Buah</option>
                                            <option value="Set">Set</option>
                                            <option value="Pasang">Pasang</option>
                                            <option value="Paket">Paket</option>
                                            <option value="Lusin">Lusin</option>
                                            <option value="Meter">Meter</option>
                                            <option value="Roll">Roll</option>
                                            <option value="Lainnya">Lainnya</option>
                                        </select>
                                    </Field>

                                    <Field label="Merek">
                                        <input
                                            value={form.brand}
                                            onChange={(event) =>
                                                updateForm('brand', event.target.value)
                                            }
                                            className={inputClass}
                                            placeholder="Contoh: Lenovo"
                                        />
                                    </Field>

                                    <Field label="Model / Tipe">
                                        <input
                                            value={form.model}
                                            onChange={(event) =>
                                                updateForm('model', event.target.value)
                                            }
                                            className={inputClass}
                                            placeholder="Contoh: ThinkPad E14"
                                        />
                                    </Field>

                                    <Field label="Penanggung Jawab" required>
                                        <input
                                            required
                                            value={form.responsiblePerson}
                                            onChange={(event) =>
                                                updateForm(
                                                    'responsiblePerson',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Nama penanggung jawab barang"
                                        />
                                    </Field>
                                </div>
                            </section>

                            {/* IMAGE UPLOAD */}
                            <section className="space-y-3">
                                <div>
                                    <h3 className="text-sm font-bold text-neutral-900">
                                        Foto Barang
                                    </h3>
                                    <p className="mt-1 text-xs text-neutral-500">
                                        Tambahkan dokumentasi foto barang, maksimal 10 gambar.
                                    </p>
                                </div>

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
                                                        entityName: form.name || 'Barang',
                                                    })
                                                }
                                                className="h-full w-full"
                                            >
                                                <img
                                                    src={form.images[0]}
                                                    alt="Preview barang"
                                                    className="h-full w-full object-cover"
                                                />
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
                                                Dokumentasi Barang
                                            </p>
                                            <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-neutral-500">
                                                {form.images.length}/{MAX_IMAGES} foto
                                            </span>
                                        </div>

                                        <p className="mt-1 text-xs leading-5 text-neutral-500">
                                            Format JPG, PNG, atau WEBP.
                                        </p>

                                        <div className="mt-3 flex flex-wrap items-center gap-3">
                                            {form.images.length < MAX_IMAGES && (
                                                <label
                                                    htmlFor="item-images"
                                                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:border-neutral-950"
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
                                                    className="text-xs font-medium text-neutral-500 hover:text-neutral-950"
                                                >
                                                    Hapus semua foto
                                                </button>
                                            )}
                                        </div>

                                        <input
                                            id="item-images"
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            multiple
                                            className="sr-only"
                                            disabled={form.images.length >= MAX_IMAGES}
                                            onChange={handleImageUpload}
                                        />
                                    </div>
                                </div>

                                {form.images.length > 0 && (
                                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                                        {form.images.map((image, index) => (
                                            <div
                                                key={`${image.slice(0, 30)}-${index}`}
                                                className="group relative aspect-square overflow-hidden rounded-xl border border-neutral-200 bg-white"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setImagePreview({
                                                            images: form.images,
                                                            imageNames: form.imageNames,
                                                            index,
                                                            entityName: form.name || 'Barang',
                                                        })
                                                    }
                                                    className="h-full w-full"
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`Foto barang ${index + 1}`}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    title="Hapus foto"
                                                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-neutral-800 shadow transition hover:bg-neutral-200"
                                                >
                                                    <Icon name="x" size={13} />
                                                </button>

                                                <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-1 text-[9px] text-white">
                                                    Foto {index + 1}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                            {/* SPECIFICATION */}
                            <section className="space-y-4">
                                <div>
                                    <h3 className="border-b border-neutral-100 pb-3 text-sm font-bold text-neutral-900">
                                        Spesifikasi Barang
                                    </h3>
                                </div>

                                <Field label="Spesifikasi">
                                    <textarea
                                        rows={3}
                                        value={form.specification}
                                        onChange={(event) =>
                                            updateForm('specification', event.target.value)
                                        }
                                        className={inputClass}
                                        placeholder="Contoh: Intel Core i5, RAM 16GB, SSD 512GB..."
                                    />
                                </Field>

                                <Field label="Deskripsi / Keterangan">
                                    <textarea
                                        rows={3}
                                        value={form.description}
                                        onChange={(event) =>
                                            updateForm('description', event.target.value)
                                        }
                                        className={inputClass}
                                        placeholder="Tambahkan informasi atau kegunaan barang..."
                                    />
                                </Field>
                            </section>

                            {/* STATUS */}
                            <section className="space-y-3">
                                <h3 className="border-b border-neutral-100 pb-3 text-sm font-bold text-neutral-900">
                                    Status Data
                                </h3>

                                <Field label="Status Barang">
                                    <select
                                        value={form.status}
                                        onChange={(event) =>
                                            updateForm(
                                                'status',
                                                event.target.value as ItemStatus,
                                            )
                                        }
                                        className={inputClass}
                                    >
                                        <option value="Aktif">Aktif</option>
                                        <option value="Tidak Aktif">Tidak Aktif</option>
                                    </select>
                                </Field>

                                <p className="text-[11px] leading-5 text-neutral-400">
                                    Barang berstatus tidak aktif tidak disarankan untuk dipilih saat membuat aset baru.
                                </p>
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
                                {editingId !== null ? 'Simpan Perubahan' : 'Simpan Barang'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* DETAIL MODAL */}
            {detailItem && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-6"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setDetailItem(null);
                        }
                    }}
                >
                    <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                        <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-5 py-4 sm:px-6">
                            <div>
                                <h2 className="font-bold text-neutral-950">
                                    Detail Barang
                                </h2>
                                <p className="mt-1 text-xs text-neutral-500">
                                    {detailItem.code}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setDetailItem(null)}
                                className="rounded-xl p-2 text-neutral-500 hover:bg-neutral-100"
                            >
                                <Icon name="x" size={19} />
                            </button>
                        </div>

                        <div className="space-y-5 overflow-y-auto p-5 sm:p-6">
                            {/* IMAGES */}
                            <section>
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="text-xs font-bold text-neutral-800">
                                        Foto Barang
                                    </h3>
                                    <span className="text-xs text-neutral-400">
                                        {detailItem.images.length} foto
                                    </span>
                                </div>

                                {detailItem.images.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                        {detailItem.images.map((image, index) => (
                                            <button
                                                key={`${image}-${index}`}
                                                type="button"
                                                onClick={() =>
                                                    setImagePreview({
                                                        images: detailItem.images,
                                                        imageNames: detailItem.imageNames,
                                                        index,
                                                        entityName: detailItem.name,
                                                    })
                                                }
                                                className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100"
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${detailItem.name} ${index + 1}`}
                                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                />
                                                <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-1 text-[10px] text-white">
                                                    Foto {index + 1}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex h-36 flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-neutral-50 text-neutral-400">
                                        <Icon name="image" size={28} />
                                        <p className="mt-2 text-xs">
                                            Belum ada foto barang
                                        </p>
                                    </div>
                                )}
                            </section>

                            {/* ITEM NAME */}
                            <section>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="rounded-lg bg-neutral-100 px-2.5 py-1.5 text-[11px] font-semibold text-neutral-700">
                                        {detailItem.category}
                                    </span>
                                    <span className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ${statusStyles[detailItem.status]}`}>
                                        {detailItem.status}
                                    </span>
                                </div>

                                <h3 className="mt-3 text-xl font-bold text-neutral-950">
                                    {detailItem.name}
                                </h3>
                                <p className="mt-1 text-xs text-neutral-400">
                                    Ditambahkan {formatDate(detailItem.createdAt)}
                                </p>
                            </section>

                            {/* DETAILS */}
                            <section>
                                <h4 className="mb-3 border-b border-neutral-100 pb-3 text-xs font-bold uppercase tracking-wider text-neutral-800">
                                    Informasi Umum
                                </h4>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <DetailBox label="Kode Barang" value={detailItem.code} />
                                    <DetailBox label="Nama Barang" value={detailItem.name} />
                                    <DetailBox label="Kategori" value={detailItem.category} />
                                    <DetailBox label="Satuan" value={detailItem.unit} />
                                    <DetailBox label="Merek" value={detailItem.brand || '-'} />
                                    <DetailBox label="Model / Tipe" value={detailItem.model || '-'} />
                                    <DetailBox label="Penanggung Jawab" value={detailItem.responsiblePerson} />
                                    <DetailBox label="Status" value={detailItem.status} />
                                    <DetailBox label="Tanggal Dibuat" value={formatDate(detailItem.createdAt)} />
                                </div>
                            </section>

                            {/* SPECIFICATION */}
                            <section>
                                <h4 className="mb-3 border-b border-neutral-100 pb-3 text-xs font-bold uppercase tracking-wider text-neutral-800">
                                    Spesifikasi
                                </h4>

                                <p className="whitespace-pre-line text-sm leading-6 text-neutral-600">
                                    {detailItem.specification || 'Belum ada spesifikasi barang.'}
                                </p>
                            </section>

                            {/* DESCRIPTION */}
                            <section>
                                <h4 className="mb-3 border-b border-neutral-100 pb-3 text-xs font-bold uppercase tracking-wider text-neutral-800">
                                    Deskripsi
                                </h4>

                                <p className="whitespace-pre-line text-sm leading-6 text-neutral-600">
                                    {detailItem.description || 'Tidak ada deskripsi barang.'}
                                </p>
                            </section>
                        </div>

                        <div className="flex shrink-0 justify-end gap-2 border-t border-neutral-100 bg-white px-5 py-4 sm:px-6">
                            <button
                                type="button"
                                onClick={() => {
                                    const item = detailItem;
                                    setDetailItem(null);
                                    openEditModal(item);
                                }}
                                className="inline-flex items-center gap-2 rounded-xl bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
                            >
                                <Icon name="pencil" size={15} />
                                Edit Barang
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ImagePreviewModal
                preview={imagePreview}
                heading="Preview Foto Barang"
                onClose={() => setImagePreview(null)}
                onIndexChange={(index) =>
                    setImagePreview((current) =>
                        current ? { ...current, index } : current,
                    )
                }
            />

            {/* DELETE CONFIRMATION */}
            {deleteId !== null && (
                <div
                    className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setDeleteId(null);
                        }
                    }}
                >
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100">
                            <Icon name="trash-2" size={21} />
                        </div>

                        <h2 className="text-lg font-bold text-neutral-950">
                            Hapus barang?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-neutral-500">
                            Data master barang ini akan dihapus dari daftar tampilan.
                            Pastikan barang tersebut tidak sedang digunakan sebagai referensi aset.
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

function DetailBox({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl bg-neutral-50 p-3">
            <p className="text-[11px] text-neutral-500">{label}</p>
            <p className="mt-1 break-words text-sm font-semibold text-neutral-800">
                {value}
            </p>
        </div>
    );
}
