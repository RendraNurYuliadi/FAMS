
import { useMemo, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import DashboardLayout from '../../../../components/layouts/DashboardLayout';
import Icon from '../../../../components/Icon';
import type { IconName } from '../../../../components/Icon';
import AssetManagementBanner from '../../../../components/dashboard/AssetManagementBanner';
import DashboardMetricCard from '../../../../components/dashboard/DashboardMetricCard';

type OrganizationStatus = 'Aktif' | 'Tidak Aktif';

type Organization = {
    id: number;
    code: string;
    name: string;
    type: string;
    faculty: string;
    leader: string;
    email: string;
    phone: string;
    memberCount: number;
    description: string;
    status: OrganizationStatus;
    createdAt: string;
};

type OrganizationForm = Omit<Organization, 'id' | 'createdAt' | 'memberCount'> & {
    memberCount: number;
};

const PER_PAGE = 5;

const organizationTypes = [
    'Organisasi Mahasiswa',
    'Unit Kegiatan Mahasiswa',
    'Himpunan Mahasiswa',
    'Badan Eksekutif Mahasiswa',
    'Dewan Perwakilan Mahasiswa',
    'Komunitas',
    'Lainnya',
];

const initialOrganizations: Organization[] = [
    {
        id: 1,
        code: 'ORG-001',
        name: 'BEM Fakultas',
        type: 'Badan Eksekutif Mahasiswa',
        faculty: 'Fakultas Teknologi Informasi',
        leader: 'Andi Saputra',
        email: 'bem.fti@kampus.ac.id',
        phone: '081234567801',
        memberCount: 35,
        description: 'Organisasi eksekutif mahasiswa tingkat fakultas yang menjalankan program kerja dan kegiatan kemahasiswaan.',
        status: 'Aktif',
        createdAt: '2025-01-15',
    },
    {
        id: 2,
        code: 'ORG-002',
        name: 'Himpunan Mahasiswa Informatika',
        type: 'Himpunan Mahasiswa',
        faculty: 'Fakultas Teknologi Informasi',
        leader: 'Rizky Ramadhan',
        email: 'hima.informatika@kampus.ac.id',
        phone: '081234567802',
        memberCount: 48,
        description: 'Organisasi mahasiswa program studi Informatika.',
        status: 'Aktif',
        createdAt: '2025-02-10',
    },
    {
        id: 3,
        code: 'ORG-003',
        name: 'TahuNgoding',
        type: 'Komunitas',
        faculty: 'Fakultas Teknologi Informasi',
        leader: 'Rendra Yuliadi',
        email: 'tahungoding@kampus.ac.id',
        phone: '081234567803',
        memberCount: 25,
        description: 'Komunitas pembelajaran teknologi dan pengembangan perangkat lunak.',
        status: 'Aktif',
        createdAt: '2025-03-01',
    },
    {
        id: 4,
        code: 'ORG-004',
        name: 'UKM Olahraga',
        type: 'Unit Kegiatan Mahasiswa',
        faculty: 'Universitas',
        leader: 'Dimas Pratama',
        email: 'ukm.olahraga@kampus.ac.id',
        phone: '081234567804',
        memberCount: 32,
        description: 'Unit kegiatan mahasiswa di bidang olahraga.',
        status: 'Aktif',
        createdAt: '2025-04-12',
    },
    {
        id: 5,
        code: 'ORG-005',
        name: 'Himpunan Mahasiswa Sistem Informasi',
        type: 'Himpunan Mahasiswa',
        faculty: 'Fakultas Teknologi Informasi',
        leader: 'Fajar Nugraha',
        email: 'hima.si@kampus.ac.id',
        phone: '081234567805',
        memberCount: 0,
        description: 'Organisasi mahasiswa program studi Sistem Informasi.',
        status: 'Tidak Aktif',
        createdAt: '2024-11-20',
    },
];

const emptyForm: OrganizationForm = {
    code: '',
    name: '',
    type: '',
    faculty: '',
    leader: '',
    email: '',
    phone: '',
    memberCount: 0,
    description: '',
    status: 'Aktif',
};

const inputClass =
    'w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100';

const statusStyles: Record<OrganizationStatus, string> = {
    Aktif: 'bg-neutral-100 text-neutral-800 ring-1 ring-neutral-200',
    'Tidak Aktif': 'bg-neutral-200 text-neutral-700 ring-1 ring-neutral-300',
};

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

function formatDate(value: string) {
    if (!value) return '-';

    return new Date(`${value}T00:00:00`).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

export default function DataOrganisasi() {
    const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('Semua');
    const [statusFilter, setStatusFilter] = useState('Semua');
    const [currentPage, setCurrentPage] = useState(1);

    const [modalOpen, setModalOpen] = useState(false);
    const [detailOrganization, setDetailOrganization] = useState<Organization | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const [form, setForm] = useState<OrganizationForm>(emptyForm);

    const filteredOrganizations = useMemo(() => {
        const keyword = search.toLowerCase().trim();

        return organizations.filter((organization) => {
            const matchesSearch =
                organization.name.toLowerCase().includes(keyword) ||
                organization.code.toLowerCase().includes(keyword) ||
                organization.leader.toLowerCase().includes(keyword) ||
                organization.faculty.toLowerCase().includes(keyword);

            const matchesType =
                typeFilter === 'Semua' || organization.type === typeFilter;

            const matchesStatus =
                statusFilter === 'Semua' || organization.status === statusFilter;

            return matchesSearch && matchesType && matchesStatus;
        });
    }, [organizations, search, typeFilter, statusFilter]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredOrganizations.length / PER_PAGE),
    );

    const safeCurrentPage = Math.min(currentPage, totalPages);

    const paginatedOrganizations = filteredOrganizations.slice(
        (safeCurrentPage - 1) * PER_PAGE,
        safeCurrentPage * PER_PAGE,
    );

    const stats: {
        label: string;
        value: number;
        icon: IconName;
    }[] = [
        {
            label: 'Total Organisasi',
            value: organizations.length,
            icon: 'package',
        },
        {
            label: 'Jenis Organisasi',
            value: new Set(organizations.map((item) => item.type)).size,
            icon: 'layers',
        },
        {
            label: 'Organisasi Aktif',
            value: organizations.filter((item) => item.status === 'Aktif').length,
            icon: 'check-circle',
        },
        {
            label: 'Tidak Aktif',
            value: organizations.filter((item) => item.status === 'Tidak Aktif').length,
            icon: 'alert-circle',
        },
    ];

    function updateForm<K extends keyof OrganizationForm>(
        key: K,
        value: OrganizationForm[K],
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
            code: `ORG-${String(Date.now()).slice(-6)}`,
        });
        setModalOpen(true);
    }

    function openEditModal(organization: Organization) {
        setEditingId(organization.id);

        setForm({
            code: organization.code,
            name: organization.name,
            type: organization.type,
            faculty: organization.faculty,
            leader: organization.leader,
            email: organization.email,
            phone: organization.phone,
            memberCount: organization.memberCount,
            description: organization.description,
            status: organization.status,
        });

        setDetailOrganization(null);
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setEditingId(null);
        setForm(emptyForm);
    }

    function saveOrganization(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!form.name.trim()) {
            alert('Nama organisasi wajib diisi.');
            return;
        }

        if (!form.type) {
            alert('Silakan pilih jenis organisasi.');
            return;
        }

        if (!form.faculty.trim()) {
            alert('Fakultas atau unit organisasi wajib diisi.');
            return;
        }

        if (!form.leader.trim()) {
            alert('Nama ketua organisasi wajib diisi.');
            return;
        }

        const duplicateCode = organizations.some(
            (organization) =>
                organization.code.toLowerCase() === form.code.trim().toLowerCase() &&
                organization.id !== editingId,
        );

        if (duplicateCode) {
            alert('Kode organisasi sudah digunakan.');
            return;
        }

        const payload: Organization = {
            ...form,
            id: editingId ?? Date.now(),
            code: form.code.trim(),
            name: form.name.trim(),
            faculty: form.faculty.trim(),
            leader: form.leader.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            description: form.description.trim(),
            createdAt:
                editingId !== null
                    ? organizations.find((item) => item.id === editingId)?.createdAt ??
                      new Date().toISOString().slice(0, 10)
                    : new Date().toISOString().slice(0, 10),
        };

        if (editingId !== null) {
            setOrganizations((previous) =>
                previous.map((item) => item.id === editingId ? payload : item),
            );
        } else {
            setOrganizations((previous) => [payload, ...previous]);
            setCurrentPage(1);
        }

        closeModal();
    }

    function confirmDelete() {
        if (deleteId === null) return;

        setOrganizations((previous) =>
            previous.filter((item) => item.id !== deleteId),
        );

        if (detailOrganization?.id === deleteId) {
            setDetailOrganization(null);
        }

        setDeleteId(null);
    }

    return (
        <DashboardLayout>
            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                <AssetManagementBanner
                    title="Kelola Data Organisasi."
                    description="Atur data organisasi dan unit kegiatan untuk mendukung pengelolaan peminjaman aset fakultas."
                    contextLabel="Manajemen pengguna"
                    icon="package"
                    statusLabel="Referensi organisasi"
                    metrics={[
                        { label: 'Total organisasi', value: organizations.length },
                        {
                            label: 'Organisasi aktif',
                            value: organizations.filter((item) => item.status === 'Aktif').length,
                        },
                    ]}
                />

                {/* PAGE HEADING */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-xs text-neutral-400">
                            <span>Manajemen Pengguna</span>
                            <Icon name="chevron-right" size={13} />
                            <span className="font-semibold text-neutral-700">
                                Organisasi
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
                            Data Organisasi
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
                            Kelola informasi organisasi, himpunan, dan unit kegiatan
                            yang terdaftar dalam sistem peminjaman aset fakultas.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                        <Icon name="plus" size={17} />
                        Tambah Organisasi
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
                                Daftar Organisasi
                            </h2>
                            <p className="mt-1 text-xs text-neutral-500">
                                Data organisasi yang terdaftar dalam sistem.
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
                                    placeholder="Cari organisasi atau ketua..."
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
                                {organizationTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
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
                        <table className="w-full min-w-[950px] text-left text-sm">
                            <thead className="bg-neutral-50 text-xs text-neutral-500">
                                <tr>
                                    <th className="px-5 py-4 font-semibold">Organisasi</th>
                                    <th className="px-5 py-4 font-semibold">Kode</th>
                                    <th className="px-5 py-4 font-semibold">Jenis Organisasi</th>
                                    <th className="px-5 py-4 font-semibold">Fakultas / Unit</th>
                                    <th className="px-5 py-4 font-semibold">Ketua</th>
                                    <th className="px-5 py-4 font-semibold">Anggota</th>
                                    <th className="px-5 py-4 font-semibold">Status</th>
                                    <th className="px-5 py-4 text-right font-semibold">Aksi</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-neutral-100">
                                {paginatedOrganizations.map((organization) => (
                                    <tr
                                        key={organization.id}
                                        className="transition hover:bg-neutral-50/70"
                                    >
                                        <td className="px-5 py-4">
                                            <p className="font-semibold text-neutral-900">
                                                {organization.name}
                                            </p>
                                            <p className="mt-1 text-xs text-neutral-400">
                                                {organization.email || 'Email belum tersedia'}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4 text-xs font-medium text-neutral-600">
                                            {organization.code}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="rounded-lg bg-neutral-100 px-2.5 py-1.5 text-xs font-medium text-neutral-600">
                                                {organization.type}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-xs text-neutral-600">
                                            {organization.faculty}
                                        </td>

                                        <td className="px-5 py-4 text-xs font-medium text-neutral-700">
                                            {organization.leader}
                                        </td>

                                        <td className="px-5 py-4 text-xs text-neutral-600">
                                            {organization.memberCount} orang
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className={`inline-flex rounded-lg px-2.5 py-1.5 text-xs font-medium ${statusStyles[organization.status]}`}>
                                                {organization.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-1">
                                                <button
                                                    type="button"
                                                    title="Detail"
                                                    onClick={() => setDetailOrganization(organization)}
                                                    className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                                                >
                                                    <Icon name="eye" size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    title="Edit"
                                                    onClick={() => openEditModal(organization)}
                                                    className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                                                >
                                                    <Icon name="pencil" size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    title="Hapus"
                                                    onClick={() => setDeleteId(organization.id)}
                                                    className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                                                >
                                                    <Icon name="trash-2" size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {paginatedOrganizations.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="px-5 py-14 text-center">
                                            <Icon
                                                name="package"
                                                size={30}
                                                className="mx-auto mb-3 text-neutral-300"
                                            />
                                            <p className="font-semibold text-neutral-700">
                                                Organisasi tidak ditemukan
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
                            {filteredOrganizations.length > 0
                                ? (safeCurrentPage - 1) * PER_PAGE + 1
                                : 0}{' '}
                            -{' '}
                            {Math.min(
                                safeCurrentPage * PER_PAGE,
                                filteredOrganizations.length,
                            )}{' '}
                            dari {filteredOrganizations.length} organisasi
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={safeCurrentPage === 1}
                                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
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
                                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                                className="rounded-lg border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-600 disabled:opacity-40"
                            >
                                Berikutnya
                            </button>
                        </div>
                    </div>
                </section>

                <p className="text-xs text-neutral-400">
                    Data organisasi digunakan sebagai referensi identitas peminjam
                    ketika mengajukan peminjaman aset. Data saat ini masih berupa ilustrasi frontend.
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
                        onSubmit={saveOrganization}
                        className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                    >
                        <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4 sm:px-7">
                            <div>
                                <h2 className="text-lg font-bold text-neutral-950">
                                    {editingId !== null ? 'Edit Organisasi' : 'Tambah Organisasi Baru'}
                                </h2>
                                <p className="mt-1 text-xs text-neutral-500">
                                    Lengkapi informasi organisasi.
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
                            <section className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-bold text-neutral-900">
                                        Informasi Organisasi
                                    </h3>
                                    <p className="mt-1 text-xs text-neutral-500">
                                        Identitas dasar organisasi yang terdaftar.
                                    </p>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field label="Kode Organisasi" required>
                                        <input
                                            required
                                            value={form.code}
                                            onChange={(event) => updateForm('code', event.target.value)}
                                            className={inputClass}
                                            placeholder="Contoh: ORG-001"
                                        />
                                    </Field>

                                    <Field label="Nama Organisasi" required>
                                        <input
                                            required
                                            value={form.name}
                                            onChange={(event) => updateForm('name', event.target.value)}
                                            className={inputClass}
                                            placeholder="Nama organisasi"
                                        />
                                    </Field>

                                    <Field label="Jenis Organisasi" required>
                                        <select
                                            required
                                            value={form.type}
                                            onChange={(event) => updateForm('type', event.target.value)}
                                            className={inputClass}
                                        >
                                            <option value="">Pilih jenis organisasi</option>
                                            {organizationTypes.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>

                                    <Field label="Fakultas / Unit" required>
                                        <input
                                            required
                                            value={form.faculty}
                                            onChange={(event) => updateForm('faculty', event.target.value)}
                                            className={inputClass}
                                            placeholder="Contoh: Fakultas Teknologi Informasi"
                                        />
                                    </Field>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <div>
                                    <h3 className="border-b border-neutral-100 pb-3 text-sm font-bold text-neutral-900">
                                        Informasi Pengurus
                                    </h3>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field label="Nama Ketua" required>
                                        <input
                                            required
                                            value={form.leader}
                                            onChange={(event) => updateForm('leader', event.target.value)}
                                            className={inputClass}
                                            placeholder="Nama ketua organisasi"
                                        />
                                    </Field>

                                    <Field label="Jumlah Anggota">
                                        <input
                                            type="number"
                                            min="0"
                                            value={form.memberCount}
                                            onChange={(event) => updateForm('memberCount', Math.max(0, Number(event.target.value)))}
                                            className={inputClass}
                                            placeholder="Jumlah anggota"
                                        />
                                    </Field>

                                    <Field label="Email Organisasi">
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={(event) => updateForm('email', event.target.value)}
                                            className={inputClass}
                                            placeholder="organisasi@kampus.ac.id"
                                        />
                                    </Field>

                                    <Field label="Nomor Kontak">
                                        <input
                                            value={form.phone}
                                            onChange={(event) => updateForm('phone', event.target.value)}
                                            className={inputClass}
                                            placeholder="08xxxxxxxxxx"
                                        />
                                    </Field>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h3 className="border-b border-neutral-100 pb-3 text-sm font-bold text-neutral-900">
                                    Keterangan Organisasi
                                </h3>

                                <Field label="Deskripsi">
                                    <textarea
                                        rows={4}
                                        value={form.description}
                                        onChange={(event) => updateForm('description', event.target.value)}
                                        className={inputClass}
                                        placeholder="Jelaskan profil dan kegiatan organisasi..."
                                    />
                                </Field>
                            </section>

                            <section className="space-y-3">
                                <h3 className="border-b border-neutral-100 pb-3 text-sm font-bold text-neutral-900">
                                    Status Organisasi
                                </h3>

                                <Field label="Status">
                                    <select
                                        value={form.status}
                                        onChange={(event) => updateForm('status', event.target.value as OrganizationStatus)}
                                        className={inputClass}
                                    >
                                        <option value="Aktif">Aktif</option>
                                        <option value="Tidak Aktif">Tidak Aktif</option>
                                    </select>
                                </Field>

                                <p className="text-[11px] leading-5 text-neutral-400">
                                    Organisasi tidak aktif tidak disarankan untuk dipilih
                                    sebagai identitas peminjam saat pengajuan peminjaman.
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
                                {editingId !== null ? 'Simpan Perubahan' : 'Simpan Organisasi'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* DETAIL MODAL */}
            {detailOrganization && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-6"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setDetailOrganization(null);
                        }
                    }}
                >
                    <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                        <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-5 py-4 sm:px-6">
                            <div>
                                <h2 className="font-bold text-neutral-950">
                                    Detail Organisasi
                                </h2>
                                <p className="mt-1 text-xs text-neutral-500">
                                    {detailOrganization.code}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setDetailOrganization(null)}
                                className="rounded-xl p-2 text-neutral-500 hover:bg-neutral-100"
                            >
                                <Icon name="x" size={19} />
                            </button>
                        </div>

                        <div className="space-y-5 overflow-y-auto p-5 sm:p-6">
                            <section>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="rounded-lg bg-neutral-100 px-2.5 py-1.5 text-[11px] font-semibold text-neutral-700">
                                        {detailOrganization.type}
                                    </span>
                                    <span className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ${statusStyles[detailOrganization.status]}`}>
                                        {detailOrganization.status}
                                    </span>
                                </div>

                                <h3 className="mt-3 text-xl font-bold text-neutral-950">
                                    {detailOrganization.name}
                                </h3>
                                <p className="mt-1 text-xs text-neutral-400">
                                    Terdaftar {formatDate(detailOrganization.createdAt)}
                                </p>
                            </section>

                            <section>
                                <h4 className="mb-3 border-b border-neutral-100 pb-3 text-xs font-bold uppercase tracking-wider text-neutral-800">
                                    Informasi Umum
                                </h4>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <DetailBox label="Kode Organisasi" value={detailOrganization.code} />
                                    <DetailBox label="Nama Organisasi" value={detailOrganization.name} />
                                    <DetailBox label="Jenis Organisasi" value={detailOrganization.type} />
                                    <DetailBox label="Fakultas / Unit" value={detailOrganization.faculty} />
                                    <DetailBox label="Nama Ketua" value={detailOrganization.leader} />
                                    <DetailBox label="Jumlah Anggota" value={`${detailOrganization.memberCount} orang`} />
                                    <DetailBox label="Email" value={detailOrganization.email || '-'} />
                                    <DetailBox label="Nomor Kontak" value={detailOrganization.phone || '-'} />
                                    <DetailBox label="Status" value={detailOrganization.status} />
                                    <DetailBox label="Tanggal Terdaftar" value={formatDate(detailOrganization.createdAt)} />
                                </div>
                            </section>

                            <section>
                                <h4 className="mb-3 border-b border-neutral-100 pb-3 text-xs font-bold uppercase tracking-wider text-neutral-800">
                                    Deskripsi Organisasi
                                </h4>

                                <p className="whitespace-pre-line text-sm leading-6 text-neutral-600">
                                    {detailOrganization.description || 'Belum ada deskripsi organisasi.'}
                                </p>
                            </section>
                        </div>

                        <div className="flex shrink-0 justify-end gap-2 border-t border-neutral-100 bg-white px-5 py-4 sm:px-6">
                            <button
                                type="button"
                                onClick={() => openEditModal(detailOrganization)}
                                className="inline-flex items-center gap-2 rounded-xl bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
                            >
                                <Icon name="pencil" size={15} />
                                Edit Organisasi
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                            Hapus organisasi?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-neutral-500">
                            Data organisasi ini akan dihapus dari daftar tampilan.
                            Pastikan organisasi tersebut tidak sedang digunakan
                            pada data peminjaman.
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
