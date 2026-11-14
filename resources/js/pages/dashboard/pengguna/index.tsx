
import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';

import DashboardLayout from '../../../components/layouts/DashboardLayout';
import Icon from '../../../components/Icon';
import AssetManagementBanner from '../../../components/dashboard/AssetManagementBanner';
import DashboardMetricCard from '../../../components/dashboard/DashboardMetricCard';

type UserRole = 'admin' | 'pengelola' | 'peminjam';

type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    identityNumber: string;
    faculty: string;
    studyProgram: string;
    createdAt: string;
};

type UserForm = Omit<User, 'id' | 'createdAt'>;

const PER_PAGE = 5;

const initialUsers: User[] = [
    {
        id: 1,
        name: 'Rendra Nur Yuliadi',
        email: 'rendra@example.com',
        phone: '081234567890',
        role: 'admin',
        identityNumber: '240160121104',
        faculty: 'Fakultas Teknologi Informasi',
        studyProgram: 'Informatika',
        createdAt: '2026-01-10',
    },
    {
        id: 2,
        name: 'Andi Setiawan',
        email: 'andi@example.com',
        phone: '081234567891',
        role: 'pengelola',
        identityNumber: '1987654321',
        faculty: 'Fakultas Teknologi Informasi',
        studyProgram: 'Informatika',
        createdAt: '2026-01-12',
    },
    {
        id: 3,
        name: 'Siti Nurhaliza',
        email: 'siti@example.com',
        phone: '081234567892',
        role: 'peminjam',
        identityNumber: '240160121105',
        faculty: 'Fakultas Teknologi Informasi',
        studyProgram: 'Sistem Informasi',
        createdAt: '2026-01-15',
    },
    {
        id: 4,
        name: 'Dimas Pratama',
        email: 'dimas@example.com',
        phone: '081234567893',
        role: 'peminjam',
        identityNumber: '240160121106',
        faculty: 'Fakultas Teknologi Informasi',
        studyProgram: 'Informatika',
        createdAt: '2026-02-01',
    },
    {
        id: 5,
        name: 'Rizky Firmansyah',
        email: 'rizky@example.com',
        phone: '081234567894',
        role: 'pengelola',
        identityNumber: '1987654322',
        faculty: 'Fakultas Teknologi Informasi',
        studyProgram: '-',
        createdAt: '2026-02-05',
    },
];

const emptyForm: UserForm = {
    name: '',
    email: '',
    phone: '',
    role: 'peminjam',
    identityNumber: '',
    faculty: '',
    studyProgram: '',
};

const roleLabels: Record<UserRole, string> = {
    admin: 'Admin',
    pengelola: 'Pengelola',
    peminjam: 'Peminjam',
};

const roleStyles: Record<UserRole, string> = {
    admin: 'bg-neutral-900 text-white',
    pengelola: 'bg-neutral-200 text-neutral-800',
    peminjam: 'bg-neutral-100 text-neutral-600',
};

const inputClass =
    'w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100';

export default function ManageUser() {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('Semua');
    const [currentPage, setCurrentPage] = useState(1);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [form, setForm] = useState<UserForm>(emptyForm);

    const filteredUsers = useMemo(() => {
        const keyword = search.toLowerCase().trim();

        return users.filter((user) => {
            const matchesSearch =
                user.name.toLowerCase().includes(keyword) ||
                user.email.toLowerCase().includes(keyword) ||
                user.identityNumber.toLowerCase().includes(keyword);

            const matchesRole =
                roleFilter === 'Semua' || user.role === roleFilter;

            return matchesSearch && matchesRole;
        });
    }, [users, search, roleFilter]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredUsers.length / PER_PAGE),
    );

    const safeCurrentPage = Math.min(currentPage, totalPages);

    const paginatedUsers = filteredUsers.slice(
        (safeCurrentPage - 1) * PER_PAGE,
        safeCurrentPage * PER_PAGE,
    );

    const stats = [
        {
            label: 'Total Pengguna',
            value: users.length,
            icon: 'users' as const,
        },
        {
            label: 'Administrator',
            value: users.filter((user) => user.role === 'admin').length,
            icon: 'users' as const,
        },
        {
            label: 'Pengelola',
            value: users.filter((user) => user.role === 'pengelola').length,
            icon: 'users' as const,
        },
        {
            label: 'Peminjam',
            value: users.filter((user) => user.role === 'peminjam').length,
            icon: 'users' as const,
        },
    ];

    function openCreateModal() {
        setEditingId(null);
        setForm(emptyForm);
        setModalOpen(true);
    }

    function openEditModal(user: User) {
        setEditingId(user.id);

        setForm({
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            identityNumber: user.identityNumber,
            faculty: user.faculty,
            studyProgram: user.studyProgram,
        });

        setModalOpen(true);
    }

    function updateForm<K extends keyof UserForm>(
        key: K,
        value: UserForm[K],
    ) {
        setForm((previous) => ({
            ...previous,
            [key]: value,
        }));
    }

    function saveUser(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const emailExists = users.some(
            (user) =>
                user.id !== editingId &&
                user.email.toLowerCase() === form.email.trim().toLowerCase(),
        );

        if (emailExists) {
            alert('Email sudah digunakan oleh pengguna lain.');
            return;
        }

        const payload: User = {
            ...form,
            id: editingId ?? Date.now(),
            name: form.name.trim(),
            email: form.email.trim().toLowerCase(),
            phone: form.phone.trim(),
            identityNumber: form.identityNumber.trim(),
            faculty: form.faculty.trim(),
            studyProgram: form.studyProgram.trim(),
            createdAt:
                editingId !== null
                    ? users.find((user) => user.id === editingId)?.createdAt ??
                      new Date().toISOString().slice(0, 10)
                    : new Date().toISOString().slice(0, 10),
        };

        if (editingId !== null) {
            setUsers((previous) =>
                previous.map((user) =>
                    user.id === editingId ? payload : user,
                ),
            );
        } else {
            setUsers((previous) => [payload, ...previous]);
            setCurrentPage(1);
        }

        closeModal();
    }

    function confirmDelete() {
        if (deleteId === null) return;

        setUsers((previous) =>
            previous.filter((user) => user.id !== deleteId),
        );

        setDeleteId(null);
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
                    title="Kelola Pengguna."
                    description="Atur akun, informasi, dan hak akses pengguna dalam sistem Faculty Asset Management System."
                    contextLabel="Manajemen pengguna"
                    icon="users"
                    statusLabel="Akses pengguna terorganisir"
                    metrics={[
                        { label: 'Total pengguna', value: users.length },
                        {
                            label: 'Total administrator',
                            value: users.filter(
                                (user) => user.role === 'admin',
                            ).length,
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
                                Data Pengguna
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
                            Data Pengguna
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
                            Kelola data akun pengguna, informasi identitas,
                            serta hak akses dalam sistem FAMS.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                        <Icon name="plus" size={17} />
                        Tambah Pengguna
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

                {/* USER TABLE */}
                <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                    <div className="flex flex-col gap-4 border-b border-neutral-100 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="font-bold text-neutral-900">
                                Daftar Pengguna
                            </h2>
                            <p className="mt-1 text-xs text-neutral-500">
                                Seluruh akun yang terdaftar dalam sistem FAMS.
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
                                    placeholder="Cari nama, email, NIM/NIP..."
                                    className={`${inputClass} pl-9 sm:w-64`}
                                />
                            </div>

                            <select
                                value={roleFilter}
                                onChange={(event) => {
                                    setRoleFilter(event.target.value);
                                    setCurrentPage(1);
                                }}
                                className={`${inputClass} sm:w-44`}
                            >
                                <option value="Semua">Semua Role</option>
                                <option value="admin">Admin</option>
                                <option value="pengelola">Pengelola</option>
                                <option value="peminjam">Peminjam</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-left text-sm">
                            <thead className="bg-neutral-50 text-xs text-neutral-500">
                                <tr>
                                    <th className="px-5 py-4 font-semibold">
                                        Pengguna
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        NIM / NIP
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Fakultas / Program Studi
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Role
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Tanggal Bergabung
                                    </th>
                                    <th className="px-5 py-4 text-right font-semibold">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-neutral-100">
                                {paginatedUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="transition hover:bg-neutral-50/70"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-sm font-bold text-neutral-700">
                                                    {user.name
                                                        .split(' ')
                                                        .slice(0, 2)
                                                        .map((part) =>
                                                            part[0],
                                                        )
                                                        .join('')
                                                        .toUpperCase()}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-neutral-900">
                                                        {user.name}
                                                    </p>
                                                    <p className="mt-1 text-xs text-neutral-400">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 text-neutral-700">
                                            {user.identityNumber || '-'}
                                        </td>

                                        <td className="max-w-52 px-5 py-4">
                                            <p className="text-xs text-neutral-700">
                                                {user.faculty || '-'}
                                            </p>
                                            <p className="mt-1 text-xs text-neutral-400">
                                                {user.studyProgram || '-'}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`rounded-lg px-2.5 py-1.5 text-xs font-medium ${roleStyles[user.role]}`}
                                            >
                                                {roleLabels[user.role]}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-xs text-neutral-600">
                                            {user.createdAt}
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-1">
                                                <button
                                                    type="button"
                                                    title="Edit"
                                                    onClick={() =>
                                                        openEditModal(user)
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
                                                        setDeleteId(user.id)
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

                                {paginatedUsers.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-5 py-14 text-center"
                                        >
                                            <Icon
                                                name="users"
                                                size={30}
                                                className="mx-auto mb-3 text-neutral-300"
                                            />

                                            <p className="font-semibold text-neutral-700">
                                                Pengguna tidak ditemukan
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
                            {filteredUsers.length > 0
                                ? (safeCurrentPage - 1) * PER_PAGE + 1
                                : 0}{' '}
                            -{' '}
                            {Math.min(
                                safeCurrentPage * PER_PAGE,
                                filteredUsers.length,
                            )}{' '}
                            dari {filteredUsers.length} pengguna
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
                        onSubmit={saveUser}
                        className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                    >
                        <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4 sm:px-7">
                            <div>
                                <h2 className="text-lg font-bold text-neutral-950">
                                    {editingId !== null
                                        ? 'Edit Data Pengguna'
                                        : 'Tambah Pengguna Baru'}
                                </h2>
                                <p className="mt-1 text-xs text-neutral-500">
                                    Lengkapi informasi akun dan hak akses
                                    pengguna.
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

                        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-5 sm:p-7">
                            <section className="space-y-4">
                                <h3 className="border-b border-neutral-100 pb-3 text-sm font-bold text-neutral-900">
                                    Informasi Akun
                                </h3>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="block space-y-2">
                                        <span className="text-xs font-semibold text-neutral-700">
                                            Nama Lengkap *
                                        </span>
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
                                            placeholder="Masukkan nama lengkap"
                                        />
                                    </label>

                                    <label className="block space-y-2">
                                        <span className="text-xs font-semibold text-neutral-700">
                                            Email *
                                        </span>
                                        <input
                                            required
                                            type="email"
                                            value={form.email}
                                            onChange={(event) =>
                                                updateForm(
                                                    'email',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="nama@email.com"
                                        />
                                    </label>

                                    <label className="block space-y-2">
                                        <span className="text-xs font-semibold text-neutral-700">
                                            Nomor Telepon
                                        </span>
                                        <input
                                            value={form.phone}
                                            onChange={(event) =>
                                                updateForm(
                                                    'phone',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="08xxxxxxxxxx"
                                        />
                                    </label>

                                    <label className="block space-y-2">
                                        <span className="text-xs font-semibold text-neutral-700">
                                            Role Pengguna *
                                        </span>
                                        <select
                                            required
                                            value={form.role}
                                            onChange={(event) =>
                                                updateForm(
                                                    'role',
                                                    event.target.value as UserRole,
                                                )
                                            }
                                            className={inputClass}
                                        >
                                            <option value="admin">
                                                Admin
                                            </option>
                                            <option value="pengelola">
                                                Pengelola
                                            </option>
                                            <option value="peminjam">
                                                Peminjam
                                            </option>
                                        </select>
                                    </label>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h3 className="border-b border-neutral-100 pb-3 text-sm font-bold text-neutral-900">
                                    Informasi Identitas
                                </h3>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="block space-y-2">
                                        <span className="text-xs font-semibold text-neutral-700">
                                            NIM / NIP
                                        </span>
                                        <input
                                            value={form.identityNumber}
                                            onChange={(event) =>
                                                updateForm(
                                                    'identityNumber',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Masukkan NIM atau NIP"
                                        />
                                    </label>

                                    <label className="block space-y-2">
                                        <span className="text-xs font-semibold text-neutral-700">
                                            Fakultas
                                        </span>
                                        <input
                                            value={form.faculty}
                                            onChange={(event) =>
                                                updateForm(
                                                    'faculty',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Nama fakultas"
                                        />
                                    </label>

                                    <label className="block space-y-2 sm:col-span-2">
                                        <span className="text-xs font-semibold text-neutral-700">
                                            Program Studi
                                        </span>
                                        <input
                                            value={form.studyProgram}
                                            onChange={(event) =>
                                                updateForm(
                                                    'studyProgram',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Nama program studi"
                                        />
                                    </label>
                                </div>
                            </section>
                        </div>

                        <div className="flex justify-end gap-2 border-t border-neutral-100 px-5 py-4 sm:px-7">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-600 hover:bg-neutral-50"
                            >
                                Batal
                            </button>

                            <button
                                type="submit"
                                className="rounded-xl bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
                            >
                                {editingId !== null
                                    ? 'Simpan Perubahan'
                                    : 'Tambah Pengguna'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* DELETE CONFIRMATION */}
            {deleteId !== null && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100">
                            <Icon name="trash-2" size={21} />
                        </div>

                        <h2 className="text-lg font-bold text-neutral-950">
                            Hapus pengguna?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-neutral-500">
                            Pengguna yang dihapus akan hilang dari daftar
                            tampilan ini. Tindakan ini hanya simulasi frontend.
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
