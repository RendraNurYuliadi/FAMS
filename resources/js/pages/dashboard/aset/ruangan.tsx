
import { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import Icon from '../../../components/Icon';
import type { IconName } from '../../../components/Icon';
import AssetManagementBanner from '../../../components/dashboard/AssetManagementBanner';
import ImagePreviewModal from '../../../components/dashboard/ImagePreviewModal';
import type { ImagePreviewState } from '../../../components/dashboard/ImagePreviewModal';

type RoomType =
    | 'Ruang Kelas'
    | 'Laboratorium'
    | 'Ruang Rapat'
    | 'Ruang Dosen'
    | 'Ruang Administrasi'
    | 'Lainnya';

type Room = {
    id: number;
    code: string;
    name: string;
    type: RoomType;
    locationId: number;
    floor: string;
    roomNumber: string;
    capacity: number;
    area: number;
    responsiblePerson: string;
    facilities: string[];
    description: string;
    images: string[];
    imageNames: string[];
    createdAt: string;
};

type RoomForm = {
    code: string;
    name: string;
    type: RoomType;
    locationId: string;
    floor: string;
    roomNumber: string;
    capacity: string;
    area: string;
    responsiblePerson: string;
    facilities: string;
    description: string;
    images: string[];
    imageNames: string[];
};

const MAX_IMAGES = 10;
const PER_PAGE = 5;

const roomTypeStyles: Record<RoomType, string> = {
    'Ruang Kelas': 'bg-sky-50 text-sky-700',
    Laboratorium: 'bg-violet-50 text-violet-700',
    'Ruang Rapat': 'bg-amber-50 text-amber-700',
    'Ruang Dosen': 'bg-emerald-50 text-emerald-700',
    'Ruang Administrasi': 'bg-rose-50 text-rose-700',
    Lainnya: 'bg-neutral-100 text-neutral-600',
};

const masterLocations = [
    { id: 1, name: 'Gedung Fakultas Teknologi Informasi' },
    { id: 2, name: 'Gedung Rektorat' },
    { id: 3, name: 'Gedung Laboratorium' },
];

const initialRooms: Room[] = [
    {
        id: 1,
        code: 'FAMS-RNG-001',
        name: 'Laboratorium Komputer',
        type: 'Laboratorium',
        locationId: 1,
        floor: '2',
        roomNumber: '201',
        capacity: 30,
        area: 72,
        responsiblePerson: 'Rendra Nur Yuliadi',
        facilities: ['Komputer', 'Proyektor', 'AC', 'Whiteboard'],
        description: 'Laboratorium komputer untuk kegiatan praktikum mahasiswa Fakultas Teknologi Informasi.',
        images: [
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
        ],
        imageNames: ['laboratorium-1.jpg', 'laboratorium-2.jpg'],
        createdAt: '2024-08-01',
    },
    {
        id: 2,
        code: 'FAMS-RNG-002',
        name: 'Ruang Kelas 301',
        type: 'Ruang Kelas',
        locationId: 1,
        floor: '3',
        roomNumber: '301',
        capacity: 40,
        area: 80,
        responsiblePerson: 'Bagian Akademik',
        facilities: ['Meja', 'Kursi', 'Proyektor', 'AC'],
        description: 'Ruang perkuliahan untuk kegiatan belajar mengajar.',
        images: [
            'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800',
        ],
        imageNames: ['ruang-kelas.jpg'],
        createdAt: '2024-08-01',
    },
    {
        id: 3,
        code: 'FAMS-RNG-003',
        name: 'Ruang Rapat Fakultas',
        type: 'Ruang Rapat',
        locationId: 1,
        floor: '1',
        roomNumber: '105',
        capacity: 20,
        area: 45,
        responsiblePerson: 'Bagian Tata Usaha',
        facilities: ['Meja Rapat', 'Kursi', 'TV', 'AC'],
        description: 'Ruangan untuk rapat internal fakultas dan kegiatan koordinasi.',
        images: [],
        imageNames: [],
        createdAt: '2024-09-10',
    },
    {
        id: 4,
        code: 'FAMS-RNG-004',
        name: 'Ruang Dosen',
        type: 'Ruang Dosen',
        locationId: 1,
        floor: '2',
        roomNumber: '205',
        capacity: 15,
        area: 50,
        responsiblePerson: 'Bagian Akademik',
        facilities: ['Meja Kerja', 'Kursi', 'AC', 'Lemari'],
        description: 'Ruang kerja dosen Fakultas Teknologi Informasi.',
        images: [
            'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800',
        ],
        imageNames: ['ruang-dosen.jpg'],
        createdAt: '2024-10-15',
    },
    {
        id: 5,
        code: 'FAMS-RNG-005',
        name: 'Ruang Administrasi',
        type: 'Ruang Administrasi',
        locationId: 2,
        floor: '1',
        roomNumber: '102',
        capacity: 10,
        area: 35,
        responsiblePerson: 'Staff Administrasi',
        facilities: ['Komputer', 'Printer', 'Meja', 'AC'],
        description: 'Ruang pelayanan administrasi dan pengelolaan dokumen.',
        images: [],
        imageNames: [],
        createdAt: '2025-01-20',
    },
];

const emptyForm: RoomForm = {
    code: '',
    name: '',
    type: 'Ruang Kelas',
    locationId: '',
    floor: '',
    roomNumber: '',
    capacity: '',
    area: '',
    responsiblePerson: '',
    facilities: '',
    description: '',
    images: [],
    imageNames: [],
};

const roomTypes: RoomType[] = [
    'Ruang Kelas',
    'Laboratorium',
    'Ruang Rapat',
    'Ruang Dosen',
    'Ruang Administrasi',
    'Lainnya',
];

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

export default function DataRuangan() {
    const [rooms, setRooms] = useState<Room[]>(initialRooms);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('Semua');
    const [locationFilter, setLocationFilter] = useState('Semua');
    const [currentPage, setCurrentPage] = useState(1);

    const [modalOpen, setModalOpen] = useState(false);
    const [detailRoom, setDetailRoom] = useState<Room | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<RoomForm>(emptyForm);
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

    const filteredRooms = useMemo(() => {
        return rooms.filter((room) => {
            const keyword = search.toLowerCase().trim();

            const matchesSearch =
                room.name.toLowerCase().includes(keyword) ||
                room.code.toLowerCase().includes(keyword) ||
                room.roomNumber.toLowerCase().includes(keyword) ||
                room.responsiblePerson.toLowerCase().includes(keyword);

            const matchesType =
                typeFilter === 'Semua' || room.type === typeFilter;

            const matchesLocation =
                locationFilter === 'Semua' ||
                room.locationId.toString() === locationFilter;

            return matchesSearch && matchesType && matchesLocation;
        });
    }, [rooms, search, typeFilter, locationFilter]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredRooms.length / PER_PAGE),
    );

    const safeCurrentPage = Math.min(currentPage, totalPages);

    const paginatedRooms = filteredRooms.slice(
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
            label: 'Total Ruangan',
            value: rooms.length,
            icon: 'building',
            iconStyle: 'bg-sky-100 text-sky-700',
        },
        {
            label: 'Jenis Ruangan',
            value: new Set(rooms.map((room) => room.type)).size,
            icon: 'tag',
            iconStyle: 'bg-violet-100 text-violet-700',
        },
        {
            label: 'Total Kapasitas',
            value: rooms.reduce((total, room) => total + room.capacity, 0),
            icon: 'users',
            iconStyle: 'bg-emerald-100 text-emerald-700',
        },
        {
            label: 'Total Dokumentasi',
            value: rooms.reduce(
                (total, room) => total + room.images.length,
                0,
            ),
            icon: 'image',
            iconStyle: 'bg-amber-100 text-amber-700',
        },
    ];

    function getLocationName(id: number) {
        return (
            masterLocations.find((location) => location.id === id)?.name ??
            '-'
        );
    }

    function openCreateModal() {
        setEditingId(null);
        setForm({
            ...emptyForm,
            code: `FAMS-RNG-${String(
                Math.max(0, ...rooms.map((room) => room.id)) + 1,
            ).padStart(3, '0')}`,
        });
        setModalOpen(true);
    }

    function openEditModal(room: Room) {
        setEditingId(room.id);

        setForm({
            code: room.code,
            name: room.name,
            type: room.type,
            locationId: room.locationId.toString(),
            floor: room.floor,
            roomNumber: room.roomNumber,
            capacity: room.capacity.toString(),
            area: room.area.toString(),
            responsiblePerson: room.responsiblePerson,
            facilities: room.facilities.join(', '),
            description: room.description,
            images: [...room.images],
            imageNames: [...room.imageNames],
        });

        setModalOpen(true);
    }

    function updateForm<K extends keyof RoomForm>(
        key: K,
        value: RoomForm[K],
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
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        const files = Array.from(event.target.files ?? []);
        event.target.value = '';

        if (files.length === 0) return;

        const remainingSlots = MAX_IMAGES - form.images.length;

        if (remainingSlots <= 0) {
            alert(`Maksimal ${MAX_IMAGES} gambar untuk satu ruangan.`);
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

    function saveRoom(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!form.responsiblePerson.trim()) {
            alert('Penanggung jawab ruangan wajib diisi.');
            return;
        }

        const roomNumberExists = rooms.some(
            (room) =>
                room.id !== editingId &&
                room.locationId === Number(form.locationId) &&
                room.roomNumber.trim().toLowerCase() ===
                    form.roomNumber.trim().toLowerCase(),
        );

        if (roomNumberExists) {
            alert('Nomor ruangan tersebut sudah digunakan pada gedung ini.');
            return;
        }

        const payload: Room = {
            id: editingId ?? Date.now(),
            code: form.code.trim(),
            name: form.name.trim(),
            type: form.type,
            locationId: Number(form.locationId),
            floor: form.floor.trim(),
            roomNumber: form.roomNumber.trim(),
            capacity: Number(form.capacity || 0),
            area: Number(form.area || 0),
            responsiblePerson: form.responsiblePerson.trim(),
            facilities: form.facilities
                .split(',')
                .map((facility) => facility.trim())
                .filter(Boolean),
            description: form.description.trim(),
            images: [...form.images],
            imageNames: [...form.imageNames],
            createdAt:
                editingId !== null
                    ? rooms.find((room) => room.id === editingId)?.createdAt ??
                      new Date().toISOString().slice(0, 10)
                    : new Date().toISOString().slice(0, 10),
        };

        if (editingId !== null) {
            setRooms((previous) =>
                previous.map((room) =>
                    room.id === editingId ? payload : room,
                ),
            );
        } else {
            setRooms((previous) => [payload, ...previous]);
            setCurrentPage(1);
        }

        setModalOpen(false);
        setEditingId(null);
        setForm(emptyForm);
    }

    function confirmDelete() {
        if (deleteId === null) return;

        setRooms((previous) =>
            previous.filter((room) => room.id !== deleteId),
        );

        setDeleteId(null);
        setDetailRoom(null);
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
                    title="Kelola Data Ruangan."
                    description="Atur informasi ruangan, kapasitas, fasilitas, dan dokumentasi untuk mendukung inventaris fakultas."
                    contextLabel="Data ruangan"
                    icon="building"
                    statusLabel="Fasilitas terorganisir"
                    metrics={[
                        { label: 'Total ruangan', value: rooms.length },
                        {
                            label: 'Total kapasitas',
                            value: rooms.reduce(
                                (total, room) => total + room.capacity,
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
                                Data Ruangan
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
                            Data Ruangan
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
                            Kelola data master ruangan, informasi gedung,
                            kapasitas, fasilitas, dan dokumentasi ruangan
                            fakultas.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                        <Icon name="plus" size={17} />
                        Tambah Ruangan
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
                                {stat.value.toLocaleString('id-ID')}
                            </p>
                        </div>
                    ))}
                </div>

                {/* MAIN TABLE */}
                <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                    <div className="flex flex-col gap-4 border-b border-neutral-100 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="font-bold text-neutral-900">
                                Daftar Ruangan
                            </h2>
                            <p className="mt-1 text-xs text-neutral-500">
                                Seluruh data master ruangan yang terdaftar.
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
                                    placeholder="Cari kode atau nama ruangan..."
                                    className={`${inputClass} pl-9 sm:w-64`}
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
                                {roomTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={locationFilter}
                                onChange={(event) => {
                                    setLocationFilter(event.target.value);
                                    setCurrentPage(1);
                                }}
                                className={inputClass}
                            >
                                <option value="Semua">Semua Gedung</option>
                                {masterLocations.map((location) => (
                                    <option
                                        key={location.id}
                                        value={location.id}
                                    >
                                        {location.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px] text-left text-sm">
                            <thead className="bg-neutral-50 text-xs text-neutral-500">
                                <tr>
                                    <th className="px-5 py-4 font-semibold">
                                        Ruangan
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Jenis
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Gedung / Lokasi
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Lantai
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Kapasitas
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Luas
                                    </th>
                                    <th className="px-5 py-4 text-right font-semibold">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-neutral-100">
                                {paginatedRooms.map((room) => (
                                    <tr
                                        key={room.id}
                                        className="transition hover:bg-neutral-50/70"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (room.images[0]) {
                                                            setImagePreview({
                                                                images: room.images,
                                                                imageNames: room.imageNames,
                                                                index: 0,
                                                                entityName: room.name,
                                                            });
                                                        }
                                                    }}
                                                    className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100"
                                                    title="Lihat foto ruangan"
                                                >
                                                    {room.images[0] ? (
                                                        <img
                                                            src={room.images[0]}
                                                            alt={room.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <Icon
                                                            name="building"
                                                            size={18}
                                                            className="text-neutral-400"
                                                        />
                                                    )}
                                                </button>

                                                <div>
                                                    <p className="font-semibold text-neutral-900">
                                                        {room.name}
                                                    </p>
                                                    <p className="mt-1 text-xs text-neutral-400">
                                                        {room.code}
                                                    </p>
                                                    <p className="mt-1 text-[10px] text-neutral-400">
                                                        No. {room.roomNumber}
                                                        {' · '}
                                                        {room.images.length} foto
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className={`rounded-lg px-2.5 py-1.5 text-xs font-medium ${roomTypeStyles[room.type]}`}>
                                                {room.type}
                                            </span>
                                        </td>

                                        <td className="max-w-48 px-5 py-4 text-xs leading-5 text-neutral-600">
                                            {getLocationName(room.locationId)}
                                        </td>

                                        <td className="px-5 py-4 text-neutral-700">
                                            {room.floor}
                                        </td>

                                        <td className="px-5 py-4 text-neutral-700">
                                            {room.capacity} orang
                                        </td>

                                        <td className="px-5 py-4 text-neutral-700">
                                            {room.area} m²
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-1">
                                                <button
                                                    type="button"
                                                    title="Detail"
                                                    onClick={() =>
                                                        setDetailRoom(room)
                                                    }
                                                    className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                                                >
                                                    <Icon name="eye" size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    title="Edit"
                                                    onClick={() =>
                                                        openEditModal(room)
                                                    }
                                                    className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                                                >
                                                    <Icon
                                                        name="pencil"
                                                        size={16}
                                                    />
                                                </button>

                                                <button
                                                    type="button"
                                                    title="Hapus"
                                                    onClick={() =>
                                                        setDeleteId(room.id)
                                                    }
                                                    className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                                                >
                                                    <Icon
                                                        name="trash-2"
                                                        size={16}
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {paginatedRooms.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-5 py-14 text-center"
                                        >
                                            <Icon
                                                name="building"
                                                size={30}
                                                className="mx-auto mb-3 text-neutral-300"
                                            />

                                            <p className="font-semibold text-neutral-700">
                                                Ruangan tidak ditemukan
                                            </p>

                                            <p className="mt-1 text-xs text-neutral-400">
                                                Ubah kata kunci atau filter
                                                pencarian.
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
                            {filteredRooms.length > 0
                                ? (safeCurrentPage - 1) * PER_PAGE + 1
                                : 0}{' '}
                            -{' '}
                            {Math.min(
                                safeCurrentPage * PER_PAGE,
                                filteredRooms.length,
                            )}{' '}
                            dari {filteredRooms.length} ruangan
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
                        onSubmit={saveRoom}
                        className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                    >
                        <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4 sm:px-7">
                            <div>
                                <h2 className="text-lg font-bold text-neutral-950">
                                    {editingId !== null
                                        ? 'Edit Data Ruangan'
                                        : 'Tambah Ruangan Baru'}
                                </h2>

                                <p className="mt-1 text-xs text-neutral-500">
                                    Lengkapi informasi master ruangan fakultas.
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
                                <h3 className="border-b border-neutral-100 pb-3 text-sm font-bold text-neutral-900">
                                    Informasi Ruangan
                                </h3>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field label="Kode Ruangan" required>
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
                                            placeholder="Contoh: FAMS-RNG-001"
                                        />
                                    </Field>

                                    <Field label="Nama Ruangan" required>
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
                                            placeholder="Contoh: Laboratorium Komputer"
                                        />
                                    </Field>

                                    <Field label="Jenis Ruangan" required>
                                        <select
                                            required
                                            value={form.type}
                                            onChange={(event) =>
                                                updateForm(
                                                    'type',
                                                    event.target.value as RoomType,
                                                )
                                            }
                                            className={inputClass}
                                        >
                                            {roomTypes.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>

                                    <Field label="Gedung / Lokasi" required>
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
                                                Pilih gedung
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

                                    <Field label="Lantai" required>
                                        <input
                                            required
                                            value={form.floor}
                                            onChange={(event) =>
                                                updateForm(
                                                    'floor',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Contoh: 2"
                                        />
                                    </Field>

                                    <Field label="Nomor Ruangan" required>
                                        <input
                                            required
                                            value={form.roomNumber}
                                            onChange={(event) =>
                                                updateForm(
                                                    'roomNumber',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Contoh: 201"
                                        />
                                    </Field>
                                </div>
                            </section>

                            {/* ROOM CAPACITY */}
                            <section className="space-y-4">
                                <h3 className="border-b border-neutral-100 pb-3 text-sm font-bold text-neutral-900">
                                    Kapasitas dan Penanggung Jawab
                                </h3>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field label="Kapasitas (Orang)" required>
                                        <input
                                            type="number"
                                            min="1"
                                            required
                                            value={form.capacity}
                                            onChange={(event) =>
                                                updateForm(
                                                    'capacity',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Contoh: 30"
                                        />
                                    </Field>

                                    <Field label="Luas Ruangan (m²)">
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={form.area}
                                            onChange={(event) =>
                                                updateForm(
                                                    'area',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Contoh: 72"
                                        />
                                    </Field>

                                    <div className="sm:col-span-2">
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
                                                placeholder="Nama penanggung jawab ruangan"
                                            />
                                        </Field>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <Field label="Fasilitas Ruangan">
                                            <input
                                                value={form.facilities}
                                                onChange={(event) =>
                                                    updateForm(
                                                        'facilities',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                                placeholder="Contoh: AC, Proyektor, Whiteboard, Komputer"
                                            />
                                            <p className="text-[11px] text-neutral-400">
                                                Pisahkan setiap fasilitas dengan
                                                tanda koma.
                                            </p>
                                        </Field>
                                    </div>
                                </div>
                            </section>

                            {/* ROOM IMAGES */}
                            <section className="space-y-4">
                                <h3 className="border-b border-neutral-100 pb-3 text-sm font-bold text-neutral-900">
                                    Dokumentasi Ruangan
                                </h3>

                                <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-white">
                                            {form.images[0] ? (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setImagePreview({
                                                            images: form.images,
                                                            imageNames: form.imageNames,
                                                            index: 0,
                                                            entityName: form.name || 'Ruangan',
                                                        })
                                                    }
                                                    className="h-full w-full cursor-zoom-in"
                                                >
                                                    <img
                                                        src={form.images[0]}
                                                        alt="Preview ruangan"
                                                        className="h-full w-full object-cover"
                                                    />
                                                </button>
                                            ) : (
                                                <Icon
                                                    name="building"
                                                    size={32}
                                                    className="text-neutral-300"
                                                />
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <p className="text-sm font-semibold text-neutral-900">
                                                    Foto Ruangan
                                                </p>

                                                <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-neutral-500">
                                                    {form.images.length}/{MAX_IMAGES}{' '}
                                                    foto
                                                </span>
                                            </div>

                                            <p className="mt-1 text-xs leading-5 text-neutral-500">
                                                Unggah foto tampak depan,
                                                interior, dan fasilitas ruangan.
                                                Maksimal 10 foto.
                                            </p>

                                            <div className="mt-3 flex flex-wrap items-center gap-3">
                                                {form.images.length < MAX_IMAGES && (
                                                    <label
                                                        htmlFor="room-images"
                                                        className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
                                                    >
                                                        <Icon
                                                            name="image-plus"
                                                            size={14}
                                                        />
                                                        Tambah Foto
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
                                                id="room-images"
                                                type="file"
                                                accept="image/jpeg,image/png,image/webp"
                                                multiple
                                                className="sr-only"
                                                disabled={
                                                    form.images.length >=
                                                    MAX_IMAGES
                                                }
                                                onChange={handleImageUpload}
                                            />

                                            <p className="mt-2 text-[10px] text-neutral-400">
                                                Format JPG, PNG, atau WEBP.
                                            </p>
                                        </div>
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
                                                            entityName: form.name || 'Ruangan',
                                                        })
                                                    }
                                                    className="h-full w-full cursor-zoom-in"
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`Foto ruangan ${index + 1}`}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeImage(index)
                                                    }
                                                    title="Hapus foto"
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
                                    Keterangan
                                </h3>

                                <Field label="Deskripsi Ruangan">
                                    <textarea
                                        rows={4}
                                        value={form.description}
                                        onChange={(event) =>
                                            updateForm(
                                                'description',
                                                event.target.value,
                                            )
                                        }
                                        className={inputClass}
                                        placeholder="Tambahkan deskripsi atau informasi ruangan..."
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
                                    : 'Simpan Ruangan'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* DETAIL MODAL */}
            {detailRoom && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setDetailRoom(null);
                        }
                    }}
                >
                    <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-5">
                            <div>
                                <h2 className="font-bold text-neutral-950">
                                    Detail Ruangan
                                </h2>

                                <p className="mt-1 text-xs text-neutral-500">
                                    {detailRoom.code}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setDetailRoom(null)}
                                className="rounded-xl p-2 hover:bg-neutral-100"
                            >
                                <Icon name="x" size={19} />
                            </button>
                        </div>

                        <div className="max-h-[75vh] space-y-5 overflow-y-auto p-6">
                            {/* DETAIL IMAGES */}
                            {detailRoom.images.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-neutral-700">
                                        Foto Ruangan ({detailRoom.images.length})
                                    </p>

                                    <div className="grid grid-cols-3 gap-2">
                                        {detailRoom.images.map((image, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() =>
                                                    setImagePreview({
                                                        images: detailRoom.images,
                                                        imageNames: detailRoom.imageNames,
                                                        index,
                                                        entityName: detailRoom.name,
                                                    })
                                                }
                                                className="aspect-square overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100"
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Foto ${index + 1} ${detailRoom.name}`}
                                                    className="h-full w-full object-cover transition hover:scale-105"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <p className="text-xs text-neutral-500">
                                    Nama Ruangan
                                </p>

                                <h3 className="mt-1 text-xl font-bold text-neutral-950">
                                    {detailRoom.name}
                                </h3>

                                <span className={`mt-2 inline-flex rounded-lg px-2.5 py-1.5 text-xs font-medium ${roomTypeStyles[detailRoom.type]}`}>
                                    {detailRoom.type}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    [
                                        'Kode Ruangan',
                                        detailRoom.code,
                                    ],
                                    [
                                        'Gedung',
                                        getLocationName(detailRoom.locationId),
                                    ],
                                    [
                                        'Lantai',
                                        detailRoom.floor,
                                    ],
                                    [
                                        'Nomor Ruangan',
                                        detailRoom.roomNumber,
                                    ],
                                    [
                                        'Kapasitas',
                                        `${detailRoom.capacity} orang`,
                                    ],
                                    [
                                        'Luas Ruangan',
                                        `${detailRoom.area} m²`,
                                    ],
                                    [
                                        'Penanggung Jawab',
                                        detailRoom.responsiblePerson || '-',
                                    ],
                                    [
                                        'Tanggal Dibuat',
                                        new Date(
                                            `${detailRoom.createdAt}T00:00:00`,
                                        ).toLocaleDateString('id-ID', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        }),
                                    ],
                                ].map(([label, value]) => (
                                    <div
                                        key={label}
                                        className="rounded-xl bg-neutral-50 p-3"
                                    >
                                        <p className="text-[11px] text-neutral-500">
                                            {label}
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-neutral-800">
                                            {value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-neutral-700">
                                    Fasilitas Ruangan
                                </p>

                                {detailRoom.facilities.length > 0 ? (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {detailRoom.facilities.map(
                                            (facility) => (
                                                <span
                                                    key={facility}
                                                    className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-700"
                                                >
                                                    {facility}
                                                </span>
                                            ),
                                        )}
                                    </div>
                                ) : (
                                    <p className="mt-1 text-sm text-neutral-500">
                                        Belum ada fasilitas.
                                    </p>
                                )}
                            </div>

                            <div>
                                <p className="text-xs text-neutral-500">
                                    Deskripsi
                                </p>

                                <p className="mt-1 text-sm leading-6 text-neutral-700">
                                    {detailRoom.description ||
                                        'Tidak ada deskripsi.'}
                                </p>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const room = detailRoom;
                                        setDetailRoom(null);
                                        openEditModal(room);
                                    }}
                                    className="rounded-xl bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white"
                                >
                                    Edit Ruangan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ImagePreviewModal
                preview={imagePreview}
                heading="Preview Foto Ruangan"
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
                            Hapus ruangan?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-neutral-500">
                            Data master ruangan yang dihapus akan hilang dari
                            daftar tampilan ini. Pastikan ruangan tersebut
                            tidak sedang digunakan oleh data aset.
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
