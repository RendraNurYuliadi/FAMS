
import { useMemo, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import Icon from '../../../components/Icon';
import type { IconName } from '../../../components/Icon';
import AssetManagementBanner from '../../../components/dashboard/AssetManagementBanner';
import DashboardMetricCard from '../../../components/dashboard/DashboardMetricCard';

type ComplaintStatus =
    | 'Menunggu'
    | 'Diproses'
    | 'Selesai'
    | 'Ditolak';

type ComplaintPriority = 'Rendah' | 'Sedang' | 'Tinggi' | 'Darurat';

type Complaint = {
    id: number;
    code: string;
    reporter: string;
    reporterId: string;
    assetCode: string;
    assetName: string;
    category: string;
    location: string;
    priority: ComplaintPriority;
    status: ComplaintStatus;
    title: string;
    description: string;
    reportedAt: string;
    updatedAt: string;
    handler: string;
    followUp: string;
};

type ComplaintForm = {
    status: ComplaintStatus;
    priority: ComplaintPriority;
    handler: string;
    followUp: string;
};

type CreateComplaintForm = {
    reporter: string;
    reporterId: string;
    assetCode: string;
    assetName: string;
    category: string;
    location: string;
    priority: ComplaintPriority;
    title: string;
    description: string;
};

const PER_PAGE = 5;

const inputClass =
    'w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100';

const initialComplaints: Complaint[] = [
    {
        id: 1,
        code: 'ADU-2026-001',
        reporter: 'Andi Setiawan',
        reporterId: '240160121001',
        assetCode: 'BRG-001',
        assetName: 'Laptop Lenovo ThinkPad',
        category: 'Elektronik',
        location: 'Ruang Dosen FTI',
        priority: 'Tinggi',
        status: 'Menunggu',
        title: 'Laptop tidak dapat dinyalakan',
        description:
            'Laptop tiba-tiba mati saat digunakan dan tidak dapat dinyalakan kembali. Lampu indikator pengisian daya juga tidak menyala meskipun charger sudah terpasang.',
        reportedAt: '2026-11-12',
        updatedAt: '2026-11-12',
        handler: '',
        followUp: '',
    },
    {
        id: 2,
        code: 'ADU-2026-002',
        reporter: 'Siti Nurhaliza',
        reporterId: '240160121015',
        assetCode: 'BRG-002',
        assetName: 'Proyektor Epson',
        category: 'Peralatan Multimedia',
        location: 'Ruang Kelas 204',
        priority: 'Sedang',
        status: 'Diproses',
        title: 'Tampilan proyektor kurang jelas',
        description:
            'Hasil proyeksi terlihat buram dan terdapat bayangan pada layar. Sudah dilakukan pengaturan fokus, tetapi hasilnya masih belum maksimal.',
        reportedAt: '2026-11-11',
        updatedAt: '2026-11-13',
        handler: 'Pengelola Barang',
        followUp: 'Sedang dilakukan pemeriksaan pada lensa dan lampu proyektor.',
    },
    {
        id: 3,
        code: 'ADU-2026-003',
        reporter: 'Muhammad Rizky',
        reporterId: '240160121023',
        assetCode: 'BRG-003',
        assetName: 'Kursi Kuliah',
        category: 'Furniture',
        location: 'Ruang Kelas 101',
        priority: 'Rendah',
        status: 'Selesai',
        title: 'Kaki kursi mengalami kerusakan',
        description:
            'Salah satu kaki kursi mengalami kerusakan sehingga kursi menjadi tidak stabil ketika digunakan.',
        reportedAt: '2026-11-08',
        updatedAt: '2026-11-10',
        handler: 'Pengelola Barang',
        followUp: 'Kursi sudah diperbaiki dan dapat digunakan kembali.',
    },
    {
        id: 4,
        code: 'ADU-2026-004',
        reporter: 'Dewi Anggraini',
        reporterId: '240160121030',
        assetCode: 'BRG-004',
        assetName: 'Meja Komputer',
        category: 'Furniture',
        location: 'Laboratorium Komputer',
        priority: 'Sedang',
        status: 'Menunggu',
        title: 'Permukaan meja rusak',
        description:
            'Permukaan meja komputer mengalami kerusakan pada bagian sudut dan terdapat bagian yang mulai terkelupas.',
        reportedAt: '2026-11-13',
        updatedAt: '2026-11-13',
        handler: '',
        followUp: '',
    },
    {
        id: 5,
        code: 'ADU-2026-005',
        reporter: 'Fajar Maulana',
        reporterId: '240160121042',
        assetCode: 'BRG-005',
        assetName: 'Printer Epson L3210',
        category: 'Peralatan Kantor',
        location: 'Ruang Administrasi',
        priority: 'Darurat',
        status: 'Diproses',
        title: 'Printer tidak dapat mencetak',
        description:
            'Printer tidak merespons perintah cetak dari komputer. Lampu indikator berkedip dan kertas tidak dapat ditarik oleh printer.',
        reportedAt: '2026-11-10',
        updatedAt: '2026-11-13',
        handler: 'Teknisi',
        followUp: 'Pemeriksaan mekanisme penarik kertas dan sistem tinta sedang dilakukan.',
    },
    {
        id: 6,
        code: 'ADU-2026-006',
        reporter: 'Rina Amelia',
        reporterId: '240160121050',
        assetCode: 'BRG-001',
        assetName: 'Laptop Lenovo ThinkPad',
        category: 'Elektronik',
        location: 'Ruang Dosen FTI',
        priority: 'Rendah',
        status: 'Ditolak',
        title: 'Permintaan penggantian perangkat',
        description:
            'Melaporkan perangkat yang dianggap sudah lambat dan mengajukan permintaan penggantian unit.',
        reportedAt: '2026-11-07',
        updatedAt: '2026-11-09',
        handler: 'Pengelola Barang',
        followUp:
            'Laporan tidak termasuk kerusakan aset. Silakan mengajukan permintaan penggantian melalui prosedur pengadaan.',
    },
];

const emptyForm: ComplaintForm = {
    status: 'Menunggu',
    priority: 'Sedang',
    handler: 'Pengelola Barang',
    followUp: '',
};

const emptyCreateForm: CreateComplaintForm = {
    reporter: '',
    reporterId: '',
    assetCode: '',
    assetName: '',
    category: '',
    location: '',
    priority: 'Sedang',
    title: '',
    description: '',
};

const statusStyles: Record<ComplaintStatus, string> = {
    Menunggu: 'bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200',
    Diproses: 'bg-neutral-200 text-neutral-800 ring-1 ring-neutral-300',
    Selesai: 'bg-neutral-950 text-white',
    Ditolak: 'bg-neutral-100 text-neutral-500 ring-1 ring-neutral-200',
};

const priorityStyles: Record<ComplaintPriority, string> = {
    Rendah: 'bg-neutral-100 text-neutral-600',
    Sedang: 'bg-neutral-200 text-neutral-700',
    Tinggi: 'bg-neutral-300 text-neutral-800',
    Darurat: 'bg-neutral-950 text-white',
};

function formatDate(value: string) {
    if (!value) return '-';

    return new Date(`${value}T00:00:00`).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

function Field({
    label,
    children,
}: {
    label: string;
    children: ReactNode;
}) {
    return (
        <label className="block min-w-0 space-y-2">
            <span className="text-xs font-semibold text-neutral-700">
                {label}
            </span>
            {children}
        </label>
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
                {value || '-'}
            </p>
        </div>
    );
}

export default function PengaduanIndex() {
    const [complaints, setComplaints] =
        useState<Complaint[]>(initialComplaints);

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('Semua');
    const [priorityFilter, setPriorityFilter] = useState('Semua');
    const [currentPage, setCurrentPage] = useState(1);

    const [detailComplaint, setDetailComplaint] =
        useState<Complaint | null>(null);

    const [editingComplaint, setEditingComplaint] =
        useState<Complaint | null>(null);

    const [deleteId, setDeleteId] = useState<number | null>(null);

    const [form, setForm] = useState<ComplaintForm>(emptyForm);

    // CREATE COMPLAINT
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createForm, setCreateForm] =
        useState<CreateComplaintForm>(emptyCreateForm);

    const filteredComplaints = useMemo(() => {
        const keyword = search.toLowerCase().trim();

        return complaints.filter((complaint) => {
            const matchesSearch =
                complaint.code.toLowerCase().includes(keyword) ||
                complaint.reporter.toLowerCase().includes(keyword) ||
                complaint.assetName.toLowerCase().includes(keyword) ||
                complaint.assetCode.toLowerCase().includes(keyword) ||
                complaint.title.toLowerCase().includes(keyword) ||
                complaint.location.toLowerCase().includes(keyword);

            const matchesStatus =
                statusFilter === 'Semua' ||
                complaint.status === statusFilter;

            const matchesPriority =
                priorityFilter === 'Semua' ||
                complaint.priority === priorityFilter;

            return matchesSearch && matchesStatus && matchesPriority;
        });
    }, [complaints, search, statusFilter, priorityFilter]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredComplaints.length / PER_PAGE),
    );

    const safeCurrentPage = Math.min(currentPage, totalPages);

    const paginatedComplaints = filteredComplaints.slice(
        (safeCurrentPage - 1) * PER_PAGE,
        safeCurrentPage * PER_PAGE,
    );

    const stats: {
        label: string;
        value: number;
        icon: IconName;
    }[] = [
        {
            label: 'Total Pengaduan',
            value: complaints.length,
            icon: 'clipboard-list',
        },
        {
            label: 'Menunggu',
            value: complaints.filter((item) => item.status === 'Menunggu')
                .length,
            icon: 'clock',
        },
        {
            label: 'Diproses',
            value: complaints.filter((item) => item.status === 'Diproses')
                .length,
            icon: 'clock',
        },
        {
            label: 'Selesai',
            value: complaints.filter((item) => item.status === 'Selesai')
                .length,
            icon: 'check-circle',
        },
    ];

    function updateForm<K extends keyof ComplaintForm>(
        key: K,
        value: ComplaintForm[K],
    ) {
        setForm((previous) => ({
            ...previous,
            [key]: value,
        }));
    }

    function updateCreateForm<K extends keyof CreateComplaintForm>(
        key: K,
        value: CreateComplaintForm[K],
    ) {
        setCreateForm((previous) => ({
            ...previous,
            [key]: value,
        }));
    }

    function openCreateModal() {
        setCreateForm(emptyCreateForm);
        setIsCreateModalOpen(true);
    }

    function closeCreateModal() {
        setIsCreateModalOpen(false);
        setCreateForm(emptyCreateForm);
    }

    function saveNewComplaint(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const nextId =
            Math.max(0, ...complaints.map((item) => item.id)) + 1;

        const currentDate = new Date().toISOString().slice(0, 10);
        const currentYear = new Date().getFullYear();

        const yearComplaints = complaints.filter((item) =>
            item.code.startsWith(`ADU-${currentYear}-`),
        );

        const nextNumber = yearComplaints.length + 1;

        const newComplaint: Complaint = {
            id: nextId,
            code: `ADU-${currentYear}-${String(nextNumber).padStart(3, '0')}`,
            reporter: createForm.reporter.trim(),
            reporterId: createForm.reporterId.trim(),
            assetCode: createForm.assetCode.trim(),
            assetName: createForm.assetName.trim(),
            category: createForm.category.trim(),
            location: createForm.location.trim(),
            priority: createForm.priority,
            status: 'Menunggu',
            title: createForm.title.trim(),
            description: createForm.description.trim(),
            reportedAt: currentDate,
            updatedAt: currentDate,
            handler: '',
            followUp: '',
        };

        setComplaints((previous) => [newComplaint, ...previous]);

        setSearch('');
        setStatusFilter('Semua');
        setPriorityFilter('Semua');
        setCurrentPage(1);

        closeCreateModal();
    }

    function openUpdateModal(complaint: Complaint) {
        setEditingComplaint(complaint);
        setForm({
            status: complaint.status,
            priority: complaint.priority,
            handler: complaint.handler || 'Pengelola Barang',
            followUp: complaint.followUp,
        });
    }

    function closeUpdateModal() {
        setEditingComplaint(null);
        setForm(emptyForm);
    }

    function saveUpdate(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!editingComplaint) return;

        if (
            (form.status === 'Selesai' || form.status === 'Ditolak') &&
            !form.followUp.trim()
        ) {
            alert('Catatan tindak lanjut wajib diisi untuk status ini.');
            return;
        }

        const updatedComplaint: Complaint = {
            ...editingComplaint,
            status: form.status,
            priority: form.priority,
            handler: form.handler.trim(),
            followUp: form.followUp.trim(),
            updatedAt: new Date().toISOString().slice(0, 10),
        };

        setComplaints((previous) =>
            previous.map((item) =>
                item.id === editingComplaint.id
                    ? updatedComplaint
                    : item,
            ),
        );

        if (detailComplaint?.id === editingComplaint.id) {
            setDetailComplaint(updatedComplaint);
        }

        closeUpdateModal();
    }

    function confirmDelete() {
        if (deleteId === null) return;

        setComplaints((previous) =>
            previous.filter((item) => item.id !== deleteId),
        );

        if (detailComplaint?.id === deleteId) {
            setDetailComplaint(null);
        }

        setDeleteId(null);
    }

    return (
        <DashboardLayout>
            <div className="w-full min-w-0 space-y-6">
                <AssetManagementBanner
                    title="Kelola Pengaduan."
                    description="Pantau laporan kerusakan aset dan tindak lanjuti setiap pengaduan untuk menjaga kondisi inventaris fakultas."
                    contextLabel="Manajemen pengaduan"
                    icon="clipboard-list"
                    statusLabel="Laporan kerusakan aset"
                    metrics={[
                        {
                            label: 'Total pengaduan',
                            value: complaints.length,
                        },
                        {
                            label: 'Belum ditangani',
                            value: complaints.filter(
                                (item) => item.status === 'Menunggu',
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
                                Pengaduan
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
                            Laporan Kerusakan
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
                            Kelola laporan kerusakan aset yang diajukan pengguna,
                            mulai dari pemeriksaan hingga penyelesaian.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                        <Icon name="plus" size={17} />
                        Buat Pengaduan
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
                                Daftar Pengaduan
                            </h2>
                            <p className="mt-1 text-xs text-neutral-500">
                                Daftar laporan kerusakan dan tindak lanjut pengelola.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
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
                                    placeholder="Cari laporan..."
                                    className={`${inputClass} pl-9 sm:w-64`}
                                />
                            </div>

                            <select
                                value={statusFilter}
                                onChange={(event) => {
                                    setStatusFilter(event.target.value);
                                    setCurrentPage(1);
                                }}
                                className={inputClass}
                            >
                                <option value="Semua">Semua Status</option>
                                <option value="Menunggu">Menunggu</option>
                                <option value="Diproses">Diproses</option>
                                <option value="Selesai">Selesai</option>
                                <option value="Ditolak">Ditolak</option>
                            </select>

                            <select
                                value={priorityFilter}
                                onChange={(event) => {
                                    setPriorityFilter(event.target.value);
                                    setCurrentPage(1);
                                }}
                                className={inputClass}
                            >
                                <option value="Semua">Semua Prioritas</option>
                                <option value="Rendah">Rendah</option>
                                <option value="Sedang">Sedang</option>
                                <option value="Tinggi">Tinggi</option>
                                <option value="Darurat">Darurat</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1050px] text-left text-sm">
                            <thead className="bg-neutral-50 text-xs text-neutral-500">
                                <tr>
                                    <th className="px-5 py-4 font-semibold">
                                        Kode / Pengaduan
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Pelapor
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Aset
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Tanggal
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Prioritas
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
                                {paginatedComplaints.map((complaint) => (
                                    <tr
                                        key={complaint.id}
                                        className="transition hover:bg-neutral-50/70"
                                    >
                                        <td className="px-5 py-4">
                                            <p className="text-xs font-semibold text-neutral-800">
                                                {complaint.code}
                                            </p>
                                            <p className="mt-1 max-w-[220px] truncate text-xs text-neutral-500">
                                                {complaint.title}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="text-xs font-semibold text-neutral-800">
                                                {complaint.reporter}
                                            </p>
                                            <p className="mt-1 text-xs text-neutral-400">
                                                {complaint.reporterId}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="text-xs font-semibold text-neutral-800">
                                                {complaint.assetName}
                                            </p>
                                            <p className="mt-1 text-xs text-neutral-400">
                                                {complaint.assetCode}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4 text-xs text-neutral-600">
                                            {formatDate(complaint.reportedAt)}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex rounded-lg px-2.5 py-1.5 text-xs font-medium ${priorityStyles[complaint.priority]}`}
                                            >
                                                {complaint.priority}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex rounded-lg px-2.5 py-1.5 text-xs font-medium ${statusStyles[complaint.status]}`}
                                            >
                                                {complaint.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-1">
                                                <button
                                                    type="button"
                                                    title="Detail"
                                                    onClick={() =>
                                                        setDetailComplaint(complaint)
                                                    }
                                                    className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                                                >
                                                    <Icon name="eye" size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    title="Tindak lanjuti"
                                                    onClick={() =>
                                                        openUpdateModal(complaint)
                                                    }
                                                    className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                                                >
                                                    <Icon name="pencil" size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    title="Hapus"
                                                    onClick={() =>
                                                        setDeleteId(complaint.id)
                                                    }
                                                    className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                                                >
                                                    <Icon name="trash-2" size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {paginatedComplaints.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-5 py-14 text-center"
                                        >
                                            <Icon
                                                name="clipboard-list"
                                                size={30}
                                                className="mx-auto mb-3 text-neutral-300"
                                            />
                                            <p className="font-semibold text-neutral-700">
                                                Pengaduan tidak ditemukan
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
                            {filteredComplaints.length > 0
                                ? (safeCurrentPage - 1) * PER_PAGE + 1
                                : 0}{' '}
                            -{' '}
                            {Math.min(
                                safeCurrentPage * PER_PAGE,
                                filteredComplaints.length,
                            )}{' '}
                            dari {filteredComplaints.length} pengaduan
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
                    Data pengaduan saat ini masih berupa ilustrasi frontend.
                    Penambahan, perubahan status, dan penghapusan hanya berlaku
                    selama halaman digunakan.
                </p>
            </div>

            {/* CREATE COMPLAINT MODAL */}
            {isCreateModalOpen && (
                <div
                    className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-6"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            closeCreateModal();
                        }
                    }}
                >
                    <form
                        onSubmit={saveNewComplaint}
                        className="flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                    >
                        {/* HEADER */}
                        <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-5 py-4 sm:px-6">
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100">
                                        <Icon
                                            name="clipboard-list"
                                            size={18}
                                            className="text-neutral-700"
                                        />
                                    </div>

                                    <div>
                                        <h2 className="font-bold text-neutral-950">
                                            Buat Pengaduan
                                        </h2>
                                        <p className="mt-0.5 text-xs text-neutral-500">
                                            Tambahkan laporan kerusakan aset baru.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={closeCreateModal}
                                className="rounded-xl p-2 text-neutral-500 transition hover:bg-neutral-100"
                            >
                                <Icon name="x" size={19} />
                            </button>
                        </div>

                        {/* FORM CONTENT */}
                        <div className="space-y-6 overflow-y-auto p-5 sm:p-6">
                            {/* REPORTER */}
                            <section>
                                <div className="mb-4">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                                        Informasi Pelapor
                                    </h3>
                                    <p className="mt-1 text-xs text-neutral-400">
                                        Identitas pengguna yang melaporkan kerusakan.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Field label="Nama Pelapor">
                                        <input
                                            required
                                            value={createForm.reporter}
                                            onChange={(event) =>
                                                updateCreateForm(
                                                    'reporter',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Masukkan nama pelapor"
                                        />
                                    </Field>

                                    <Field label="NIM / ID Pengguna">
                                        <input
                                            required
                                            value={createForm.reporterId}
                                            onChange={(event) =>
                                                updateCreateForm(
                                                    'reporterId',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Contoh: 240160121001"
                                        />
                                    </Field>
                                </div>
                            </section>

                            {/* ASSET */}
                            <section>
                                <div className="mb-4">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                                        Informasi Aset
                                    </h3>
                                    <p className="mt-1 text-xs text-neutral-400">
                                        Masukkan informasi barang yang mengalami kerusakan.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Field label="Kode Aset">
                                        <input
                                            required
                                            value={createForm.assetCode}
                                            onChange={(event) =>
                                                updateCreateForm(
                                                    'assetCode',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Contoh: BRG-001"
                                        />
                                    </Field>

                                    <Field label="Nama Aset">
                                        <input
                                            required
                                            value={createForm.assetName}
                                            onChange={(event) =>
                                                updateCreateForm(
                                                    'assetName',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Contoh: Laptop Lenovo"
                                        />
                                    </Field>

                                    <Field label="Kategori Aset">
                                        <select
                                            required
                                            value={createForm.category}
                                            onChange={(event) =>
                                                updateCreateForm(
                                                    'category',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                        >
                                            <option value="">
                                                Pilih kategori
                                            </option>
                                            <option value="Elektronik">
                                                Elektronik
                                            </option>
                                            <option value="Peralatan Multimedia">
                                                Peralatan Multimedia
                                            </option>
                                            <option value="Furniture">
                                                Furniture
                                            </option>
                                            <option value="Peralatan Kantor">
                                                Peralatan Kantor
                                            </option>
                                            <option value="Peralatan Laboratorium">
                                                Peralatan Laboratorium
                                            </option>
                                            <option value="Lainnya">
                                                Lainnya
                                            </option>
                                        </select>
                                    </Field>

                                    <Field label="Lokasi Aset">
                                        <input
                                            required
                                            value={createForm.location}
                                            onChange={(event) =>
                                                updateCreateForm(
                                                    'location',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Contoh: Ruang Kelas 204"
                                        />
                                    </Field>
                                </div>
                            </section>

                            {/* COMPLAINT */}
                            <section>
                                <div className="mb-4">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                                        Detail Kerusakan
                                    </h3>
                                    <p className="mt-1 text-xs text-neutral-400">
                                        Jelaskan permasalahan yang terjadi pada aset.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <Field label="Judul Pengaduan">
                                        <input
                                            required
                                            maxLength={150}
                                            value={createForm.title}
                                            onChange={(event) =>
                                                updateCreateForm(
                                                    'title',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Contoh: Laptop tidak dapat dinyalakan"
                                        />
                                    </Field>

                                    <Field label="Kronologi / Deskripsi Kerusakan">
                                        <textarea
                                            required
                                            rows={5}
                                            maxLength={2000}
                                            value={createForm.description}
                                            onChange={(event) =>
                                                updateCreateForm(
                                                    'description',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Jelaskan kondisi kerusakan, kapan terjadi, dan informasi lain yang diperlukan..."
                                        />
                                        <p className="text-right text-[11px] text-neutral-400">
                                            {createForm.description.length}/2000 karakter
                                        </p>
                                    </Field>

                                    <Field label="Prioritas Penanganan">
                                        <select
                                            required
                                            value={createForm.priority}
                                            onChange={(event) =>
                                                updateCreateForm(
                                                    'priority',
                                                    event.target.value as ComplaintPriority,
                                                )
                                            }
                                            className={inputClass}
                                        >
                                            <option value="Rendah">Rendah</option>
                                            <option value="Sedang">Sedang</option>
                                            <option value="Tinggi">Tinggi</option>
                                            <option value="Darurat">Darurat</option>
                                        </select>
                                    </Field>
                                </div>
                            </section>

                            {/* INFORMATION */}
                            <div className="flex gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                                <Icon
                                    name="info"
                                    size={17}
                                    className="mt-0.5 shrink-0 text-neutral-500"
                                />
                                <div>
                                    <p className="text-xs font-semibold text-neutral-700">
                                        Informasi Pengaduan
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-neutral-500">
                                        Pengaduan baru akan memiliki status
                                        Menunggu. Pengelola dapat melakukan
                                        pemeriksaan dan memperbarui status melalui
                                        menu tindak lanjut.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-neutral-100 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                            <button
                                type="button"
                                onClick={closeCreateModal}
                                className="rounded-xl border border-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-50"
                            >
                                Batal
                            </button>

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                            >
                                <Icon name="plus" size={16} />
                                Simpan Pengaduan
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* DETAIL MODAL */}
            {detailComplaint && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-6"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setDetailComplaint(null);
                        }
                    }}
                >
                    <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                        <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-5 py-4 sm:px-6">
                            <div>
                                <h2 className="font-bold text-neutral-950">
                                    Detail Pengaduan
                                </h2>
                                <p className="mt-1 text-xs text-neutral-500">
                                    {detailComplaint.code}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setDetailComplaint(null)}
                                className="rounded-xl p-2 text-neutral-500 hover:bg-neutral-100"
                            >
                                <Icon name="x" size={19} />
                            </button>
                        </div>

                        <div className="space-y-5 overflow-y-auto p-5 sm:p-6">
                            <section>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span
                                        className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ${statusStyles[detailComplaint.status]}`}
                                    >
                                        {detailComplaint.status}
                                    </span>

                                    <span
                                        className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ${priorityStyles[detailComplaint.priority]}`}
                                    >
                                        Prioritas {detailComplaint.priority}
                                    </span>
                                </div>

                                <h3 className="mt-3 text-xl font-bold text-neutral-950">
                                    {detailComplaint.title}
                                </h3>

                                <p className="mt-1 text-xs text-neutral-400">
                                    Dilaporkan pada{' '}
                                    {formatDate(detailComplaint.reportedAt)}
                                </p>
                            </section>

                            <section>
                                <h4 className="mb-3 border-b border-neutral-100 pb-3 text-xs font-bold uppercase tracking-wider text-neutral-800">
                                    Informasi Pelapor
                                </h4>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <DetailBox
                                        label="Nama Pelapor"
                                        value={detailComplaint.reporter}
                                    />
                                    <DetailBox
                                        label="NIM / ID Pengguna"
                                        value={detailComplaint.reporterId}
                                    />
                                    <DetailBox
                                        label="Tanggal Pengaduan"
                                        value={formatDate(detailComplaint.reportedAt)}
                                    />
                                    <DetailBox
                                        label="Kode Pengaduan"
                                        value={detailComplaint.code}
                                    />
                                </div>
                            </section>

                            <section>
                                <h4 className="mb-3 border-b border-neutral-100 pb-3 text-xs font-bold uppercase tracking-wider text-neutral-800">
                                    Informasi Aset
                                </h4>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <DetailBox
                                        label="Nama Aset"
                                        value={detailComplaint.assetName}
                                    />
                                    <DetailBox
                                        label="Kode Aset"
                                        value={detailComplaint.assetCode}
                                    />
                                    <DetailBox
                                        label="Kategori"
                                        value={detailComplaint.category}
                                    />
                                    <DetailBox
                                        label="Lokasi Aset"
                                        value={detailComplaint.location}
                                    />
                                </div>
                            </section>

                            <section>
                                <h4 className="mb-3 border-b border-neutral-100 pb-3 text-xs font-bold uppercase tracking-wider text-neutral-800">
                                    Kronologi / Deskripsi Kerusakan
                                </h4>

                                <div className="rounded-xl bg-neutral-50 p-4">
                                    <p className="whitespace-pre-line text-sm leading-6 text-neutral-600">
                                        {detailComplaint.description}
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h4 className="mb-3 border-b border-neutral-100 pb-3 text-xs font-bold uppercase tracking-wider text-neutral-800">
                                    Tindak Lanjut Pengelola
                                </h4>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <DetailBox
                                        label="Petugas Penanganan"
                                        value={detailComplaint.handler || 'Belum ditentukan'}
                                    />
                                    <DetailBox
                                        label="Terakhir Diperbarui"
                                        value={formatDate(detailComplaint.updatedAt)}
                                    />
                                </div>

                                <div className="mt-3 rounded-xl bg-neutral-50 p-4">
                                    <p className="text-[11px] font-medium text-neutral-500">
                                        Catatan Tindak Lanjut
                                    </p>
                                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-neutral-700">
                                        {detailComplaint.followUp ||
                                            'Belum ada catatan tindak lanjut.'}
                                    </p>
                                </div>
                            </section>
                        </div>

                        <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-neutral-100 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                            <button
                                type="button"
                                onClick={() => setDetailComplaint(null)}
                                className="rounded-xl border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-600 hover:bg-neutral-50"
                            >
                                Tutup
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    const complaint = detailComplaint;
                                    setDetailComplaint(null);
                                    openUpdateModal(complaint);
                                }}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
                            >
                                <Icon name="pencil" size={15} />
                                Tindak Lanjuti
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* UPDATE STATUS MODAL */}
            {editingComplaint && (
                <div
                    className="fixed inset-0 z-[105] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-6"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            closeUpdateModal();
                        }
                    }}
                >
                    <form
                        onSubmit={saveUpdate}
                        className="flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                    >
                        <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-5 py-4 sm:px-6">
                            <div>
                                <h2 className="font-bold text-neutral-950">
                                    Tindak Lanjuti Pengaduan
                                </h2>
                                <p className="mt-1 text-xs text-neutral-500">
                                    {editingComplaint.code}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeUpdateModal}
                                className="rounded-xl p-2 text-neutral-500 hover:bg-neutral-100"
                            >
                                <Icon name="x" size={19} />
                            </button>
                        </div>

                        <div className="space-y-5 overflow-y-auto p-5 sm:p-6">
                            <div className="rounded-xl bg-neutral-50 p-4">
                                <p className="text-xs font-semibold text-neutral-800">
                                    {editingComplaint.title}
                                </p>
                                <p className="mt-1 text-xs text-neutral-500">
                                    {editingComplaint.assetName} ·{' '}
                                    {editingComplaint.reporter}
                                </p>
                            </div>

                            <Field label="Status Pengaduan">
                                <select
                                    required
                                    value={form.status}
                                    onChange={(event) =>
                                        updateForm(
                                            'status',
                                            event.target.value as ComplaintStatus,
                                        )
                                    }
                                    className={inputClass}
                                >
                                    <option value="Menunggu">Menunggu</option>
                                    <option value="Diproses">Diproses</option>
                                    <option value="Selesai">Selesai</option>
                                    <option value="Ditolak">Ditolak</option>
                                </select>
                            </Field>

                            <Field label="Prioritas Penanganan">
                                <select
                                    required
                                    value={form.priority}
                                    onChange={(event) =>
                                        updateForm(
                                            'priority',
                                            event.target.value as ComplaintPriority,
                                        )
                                    }
                                    className={inputClass}
                                >
                                    <option value="Rendah">Rendah</option>
                                    <option value="Sedang">Sedang</option>
                                    <option value="Tinggi">Tinggi</option>
                                    <option value="Darurat">Darurat</option>
                                </select>
                            </Field>

                            <Field label="Petugas Penanganan">
                                <input
                                    value={form.handler}
                                    onChange={(event) =>
                                        updateForm('handler', event.target.value)
                                    }
                                    className={inputClass}
                                    placeholder="Nama petugas atau pengelola"
                                />
                            </Field>

                            <Field label="Catatan Tindak Lanjut">
                                <textarea
                                    rows={4}
                                    value={form.followUp}
                                    onChange={(event) =>
                                        updateForm('followUp', event.target.value)
                                    }
                                    className={inputClass}
                                    placeholder="Tuliskan hasil pemeriksaan, tindakan perbaikan, atau alasan penolakan..."
                                />
                            </Field>

                            <p className="text-[11px] leading-5 text-neutral-400">
                                Catatan tindak lanjut wajib diisi ketika status
                                diubah menjadi Selesai atau Ditolak.
                            </p>
                        </div>

                        <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-neutral-100 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                            <button
                                type="button"
                                onClick={closeUpdateModal}
                                className="rounded-xl border border-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-600 hover:bg-neutral-50"
                            >
                                Batal
                            </button>

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
                            >
                                <Icon name="save" size={15} />
                                Simpan Perubahan
                            </button>
                        </div>
                    </form>
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
                            Hapus pengaduan?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-neutral-500">
                            Data laporan pengaduan ini akan dihapus dari daftar
                            tampilan. Tindakan ini tidak dapat dibatalkan.
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
