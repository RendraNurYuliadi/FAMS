import { useMemo, useState } from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import Icon from '../../../components/Icon';
import type { IconName } from '../../../components/Icon';
import AssetManagementBanner from '../../../components/dashboard/AssetManagementBanner';
import DashboardMetricCard from '../../../components/dashboard/DashboardMetricCard';

type ApprovalStatus =
    | 'Menunggu Persetujuan'
    | 'Disetujui'
    | 'Ditolak'
    | 'Perlu Revisi';

type LoanRequest = {
    id: number;
    code: string;
    borrower: string;
    identityNumber: string;
    borrowerType: string;
    faculty: string;
    organization?: string;
    assetName: string;
    assetCode: string;
    quantity: number;
    purpose: string;
    borrowingDate: string;
    returnDate: string;
    submittedAt: string;
    status: ApprovalStatus;
    note: string;
};

const initialRequests: LoanRequest[] = [
    {
        id: 1,
        code: 'PJM-2026-001',
        borrower: 'Andi Saputra',
        identityNumber: '240160121101',
        borrowerType: 'Mahasiswa',
        faculty: 'Fakultas Teknologi Informasi',
        assetName: 'Laptop Lenovo ThinkPad',
        assetCode: 'FAMS-BRG-001',
        quantity: 2,
        purpose: 'Kegiatan praktikum dan penyusunan tugas akhir.',
        borrowingDate: '2026-11-15',
        returnDate: '2026-11-18',
        submittedAt: '2026-11-12',
        status: 'Menunggu Persetujuan',
        note: '',
    },
    {
        id: 2,
        code: 'PJM-2026-002',
        borrower: 'Siti Nurhaliza',
        identityNumber: '240160121115',
        borrowerType: 'Mahasiswa',
        faculty: 'Fakultas Teknologi Informasi',
        organization: 'UKM TahuNgoding',
        assetName: 'Proyektor Epson',
        assetCode: 'FAMS-BRG-002',
        quantity: 1,
        purpose: 'Kegiatan seminar dan pelatihan anggota.',
        borrowingDate: '2026-11-16',
        returnDate: '2026-11-16',
        submittedAt: '2026-11-12',
        status: 'Menunggu Persetujuan',
        note: '',
    },
    {
        id: 3,
        code: 'PJM-2026-003',
        borrower: 'Budi Setiawan',
        identityNumber: '240160121120',
        borrowerType: 'Mahasiswa',
        faculty: 'Fakultas Teknologi Informasi',
        assetName: 'Kamera DSLR',
        assetCode: 'FAMS-BRG-008',
        quantity: 1,
        purpose: 'Dokumentasi kegiatan fakultas.',
        borrowingDate: '2026-11-14',
        returnDate: '2026-11-15',
        submittedAt: '2026-11-11',
        status: 'Disetujui',
        note: 'Pastikan kelengkapan kamera saat pengambilan.',
    },
    {
        id: 4,
        code: 'PJM-2026-004',
        borrower: 'Dewi Anggraini',
        identityNumber: '240160121125',
        borrowerType: 'Mahasiswa',
        faculty: 'Fakultas Teknologi Informasi',
        assetName: 'Speaker Portable',
        assetCode: 'FAMS-BRG-010',
        quantity: 2,
        purpose: 'Acara internal organisasi mahasiswa.',
        borrowingDate: '2026-11-17',
        returnDate: '2026-11-17',
        submittedAt: '2026-11-10',
        status: 'Perlu Revisi',
        note: 'Mohon lengkapi detail kegiatan dan penanggung jawab.',
    },
    {
        id: 5,
        code: 'PJM-2026-005',
        borrower: 'Rizky Firmansyah',
        identityNumber: '240160121130',
        borrowerType: 'Mahasiswa',
        faculty: 'Fakultas Teknologi Informasi',
        assetName: 'Proyektor Epson',
        assetCode: 'FAMS-BRG-002',
        quantity: 3,
        purpose: 'Peminjaman untuk kegiatan kelas.',
        borrowingDate: '2026-11-13',
        returnDate: '2026-11-14',
        submittedAt: '2026-11-09',
        status: 'Ditolak',
        note: 'Jumlah aset yang diminta tidak tersedia.',
    },
];

const PER_PAGE = 5;

const inputClass =
    'w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100';

const statusStyles: Record<ApprovalStatus, string> = {
    'Menunggu Persetujuan':
        'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
    Disetujui: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
    Ditolak: 'bg-red-50 text-red-700 ring-1 ring-red-200',
    'Perlu Revisi': 'bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200',
};

const formatDate = (value: string) =>
    new Date(`${value}T00:00:00`).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

function StatusBadge({ status }: { status: ApprovalStatus }) {
    return (
        <span
            className={`inline-flex whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium ${statusStyles[status]}`}
        >
            {status}
        </span>
    );
}

function Field({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-1.5">
            <p className="text-xs font-semibold text-neutral-500">{label}</p>
            <div className="text-sm font-medium text-neutral-900">
                {children}
            </div>
        </div>
    );
}

export default function PersetujuanPeminjaman() {
    const [requests, setRequests] =
        useState<LoanRequest[]>(initialRequests);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('Semua');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRequest, setSelectedRequest] =
        useState<LoanRequest | null>(null);
    const [actionType, setActionType] = useState<
        'Disetujui' | 'Ditolak' | 'Perlu Revisi' | null
    >(null);
    const [actionNote, setActionNote] = useState('');

    const stats: {
        label: string;
        value: number;
        icon: IconName;
    }[] = [
        {
            label: 'Total Pengajuan',
            value: requests.length,
            icon: 'package',
        },
        {
            label: 'Menunggu Persetujuan',
            value: requests.filter(
                (item) => item.status === 'Menunggu Persetujuan',
            ).length,
            icon: 'alert-circle',
        },
        {
            label: 'Disetujui',
            value: requests.filter((item) => item.status === 'Disetujui')
                .length,
            icon: 'box',
        },
        {
            label: 'Perlu Tindak Lanjut',
            value: requests.filter(
                (item) =>
                    item.status === 'Ditolak' ||
                    item.status === 'Perlu Revisi',
            ).length,
            icon: 'building',
        },
    ];

    const filteredRequests = useMemo(() => {
        const keyword = search.toLowerCase().trim();

        return requests.filter((item) => {
            const matchesSearch =
                item.code.toLowerCase().includes(keyword) ||
                item.borrower.toLowerCase().includes(keyword) ||
                item.identityNumber.toLowerCase().includes(keyword) ||
                item.assetName.toLowerCase().includes(keyword);

            const matchesStatus =
                statusFilter === 'Semua' || item.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [requests, search, statusFilter]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredRequests.length / PER_PAGE),
    );

    const safeCurrentPage = Math.min(currentPage, totalPages);

    const paginatedRequests = filteredRequests.slice(
        (safeCurrentPage - 1) * PER_PAGE,
        safeCurrentPage * PER_PAGE,
    );

    function openAction(
        request: LoanRequest,
        action: 'Disetujui' | 'Ditolak' | 'Perlu Revisi',
    ) {
        setSelectedRequest(request);
        setActionType(action);
        setActionNote('');
    }

    function submitAction(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!selectedRequest || !actionType) return;

        if (
            (actionType === 'Ditolak' || actionType === 'Perlu Revisi') &&
            !actionNote.trim()
        ) {
            alert('Alasan atau catatan wajib diisi.');
            return;
        }

        setRequests((previous) =>
            previous.map((item) =>
                item.id === selectedRequest.id
                    ? {
                          ...item,
                          status: actionType,
                          note: actionNote.trim(),
                      }
                    : item,
            ),
        );

        setSelectedRequest(null);
        setActionType(null);
        setActionNote('');
    }

    function closeDetail() {
        setSelectedRequest(null);
        setActionType(null);
        setActionNote('');
    }

    return (
        <DashboardLayout>
            <div className="w-full min-w-0 space-y-6">
                <AssetManagementBanner
                    title="Persetujuan Peminjaman."
                    description="Periksa permohonan peminjaman aset, verifikasi informasi peminjam, dan tentukan keputusan persetujuan."
                    contextLabel="Administrasi peminjaman"
                    icon="clipboard-check"
                    statusLabel="Pengajuan peminjaman"
                    metrics={[
                        {
                            label: 'Menunggu keputusan',
                            value: requests.filter(
                                (item) =>
                                    item.status === 'Menunggu Persetujuan',
                            ).length,
                        },
                        {
                            label: 'Total pengajuan',
                            value: requests.length,
                        },
                    ]}
                />

                {/* PAGE HEADING */}
                <div>
                    <div className="mb-2 flex items-center gap-2 text-xs text-neutral-400">
                        <span>Manajemen Peminjaman</span>
                        <Icon name="chevron-right" size={13} />
                        <span className="font-semibold text-neutral-700">
                            Persetujuan Peminjaman
                        </span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
                        Persetujuan Peminjaman
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
                        Kelola pengajuan peminjaman yang masuk. Periksa detail
                        permohonan sebelum memberikan keputusan.
                    </p>
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

                {/* REQUEST TABLE */}
                <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                    <div className="flex flex-col gap-4 border-b border-neutral-100 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="font-bold text-neutral-900">
                                Daftar Pengajuan
                            </h2>
                            <p className="mt-1 text-xs text-neutral-500">
                                Periksa dan proses permohonan peminjaman aset.
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
                                    placeholder="Cari peminjam, kode, aset..."
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
                                <option value="Menunggu Persetujuan">
                                    Menunggu Persetujuan
                                </option>
                                <option value="Disetujui">Disetujui</option>
                                <option value="Ditolak">Ditolak</option>
                                <option value="Perlu Revisi">Perlu Revisi</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1000px] text-left text-sm">
                            <thead className="bg-neutral-50 text-xs text-neutral-500">
                                <tr>
                                    <th className="px-5 py-4 font-semibold">
                                        Kode Pengajuan
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Peminjam
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Aset
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Tanggal Peminjaman
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Tanggal Pengembalian
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
                                {paginatedRequests.map((request) => (
                                    <tr
                                        key={request.id}
                                        className="transition hover:bg-neutral-50/70"
                                    >
                                        <td className="px-5 py-4">
                                            <p className="font-semibold text-neutral-900">
                                                {request.code}
                                            </p>
                                            <p className="mt-1 text-xs text-neutral-400">
                                                Diajukan{' '}
                                                {formatDate(request.submittedAt)}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="font-semibold text-neutral-900">
                                                {request.borrower}
                                            </p>
                                            <p className="mt-1 text-xs text-neutral-400">
                                                {request.identityNumber}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="font-medium text-neutral-800">
                                                {request.assetName}
                                            </p>
                                            <p className="mt-1 text-xs text-neutral-400">
                                                {request.quantity} unit ·{' '}
                                                {request.assetCode}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4 text-xs text-neutral-600">
                                            {formatDate(request.borrowingDate)}
                                        </td>

                                        <td className="px-5 py-4 text-xs text-neutral-600">
                                            {formatDate(request.returnDate)}
                                        </td>

                                        <td className="px-5 py-4">
                                            <StatusBadge
                                                status={request.status}
                                            />
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-1">
                                                <button
                                                    type="button"
                                                    title="Lihat detail"
                                                    onClick={() =>
                                                        setSelectedRequest(
                                                            request,
                                                        )
                                                    }
                                                    className="rounded-lg p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950"
                                                >
                                                    <Icon
                                                        name="eye"
                                                        size={16}
                                                    />
                                                </button>

                                                {request.status ===
                                                    'Menunggu Persetujuan' && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            title="Setujui"
                                                            onClick={() =>
                                                                openAction(
                                                                    request,
                                                                    'Disetujui',
                                                                )
                                                            }
                                                            className="rounded-lg p-2 text-emerald-700 transition hover:bg-emerald-50"
                                                        >
                                                            <Icon
                                                                name="check"
                                                                size={16}
                                                            />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            title="Tolak"
                                                            onClick={() =>
                                                                openAction(
                                                                    request,
                                                                    'Ditolak',
                                                                )
                                                            }
                                                            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                                                        >
                                                            <Icon
                                                                name="x"
                                                                size={16}
                                                            />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            title="Minta revisi"
                                                            onClick={() =>
                                                                openAction(
                                                                    request,
                                                                    'Perlu Revisi',
                                                                )
                                                            }
                                                            className="rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100"
                                                        >
                                                            <Icon
                                                                name="message"
                                                                size={16}
                                                            />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {paginatedRequests.length === 0 && (
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
                                                Pengajuan tidak ditemukan
                                            </p>
                                            <p className="mt-1 text-xs text-neutral-400">
                                                Coba ubah kata kunci atau filter
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
                            {filteredRequests.length > 0
                                ? (safeCurrentPage - 1) * PER_PAGE + 1
                                : 0}{' '}
                            -{' '}
                            {Math.min(
                                safeCurrentPage * PER_PAGE,
                                filteredRequests.length,
                            )}{' '}
                            dari {filteredRequests.length} pengajuan
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

            {/* DETAIL MODAL */}
            {selectedRequest && !actionType && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-6"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            closeDetail();
                        }
                    }}
                >
                    <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4 sm:px-7">
                            <div>
                                <h2 className="text-lg font-bold text-neutral-950">
                                    Detail Pengajuan
                                </h2>
                                <p className="mt-1 text-xs text-neutral-500">
                                    {selectedRequest.code}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={closeDetail}
                                className="rounded-xl p-2 text-neutral-500 hover:bg-neutral-100"
                            >
                                <Icon name="x" size={20} />
                            </button>
                        </div>

                        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-5 sm:p-7">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs text-neutral-500">
                                        Status pengajuan
                                    </p>
                                    <div className="mt-2">
                                        <StatusBadge
                                            status={selectedRequest.status}
                                        />
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-neutral-500">
                                        Tanggal pengajuan
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-neutral-900">
                                        {formatDate(
                                            selectedRequest.submittedAt,
                                        )}
                                    </p>
                                </div>
                            </div>

                            <section className="space-y-4">
                                <h3 className="border-b border-neutral-100 pb-2 text-sm font-bold text-neutral-900">
                                    Informasi Peminjam
                                </h3>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field label="Nama peminjam">
                                        {selectedRequest.borrower}
                                    </Field>
                                    <Field label="Nomor identitas">
                                        {selectedRequest.identityNumber}
                                    </Field>
                                    <Field label="Jenis peminjam">
                                        {selectedRequest.borrowerType}
                                    </Field>
                                    <Field label="Fakultas">
                                        {selectedRequest.faculty}
                                    </Field>
                                    {selectedRequest.organization && (
                                        <Field label="Organisasi">
                                            {selectedRequest.organization}
                                        </Field>
                                    )}
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h3 className="border-b border-neutral-100 pb-2 text-sm font-bold text-neutral-900">
                                    Detail Aset
                                </h3>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field label="Nama aset">
                                        {selectedRequest.assetName}
                                    </Field>
                                    <Field label="Kode aset">
                                        {selectedRequest.assetCode}
                                    </Field>
                                    <Field label="Jumlah">
                                        {selectedRequest.quantity} unit
                                    </Field>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h3 className="border-b border-neutral-100 pb-2 text-sm font-bold text-neutral-900">
                                    Jadwal dan Keperluan
                                </h3>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field label="Tanggal peminjaman">
                                        {formatDate(
                                            selectedRequest.borrowingDate,
                                        )}
                                    </Field>
                                    <Field label="Tanggal pengembalian">
                                        {formatDate(
                                            selectedRequest.returnDate,
                                        )}
                                    </Field>
                                </div>
                                <Field label="Tujuan peminjaman">
                                    <p className="leading-6 font-normal text-neutral-700">
                                        {selectedRequest.purpose}
                                    </p>
                                </Field>
                            </section>

                            {selectedRequest.note && (
                                <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                                    <p className="text-xs font-semibold text-neutral-600">
                                        Catatan pengelola
                                    </p>
                                    <p className="mt-1 text-sm leading-6 text-neutral-700">
                                        {selectedRequest.note}
                                    </p>
                                </div>
                            )}
                        </div>

                        {selectedRequest.status ===
                            'Menunggu Persetujuan' && (
                            <div className="flex flex-col gap-2 border-t border-neutral-100 p-5 sm:flex-row sm:justify-end sm:px-7">
                                <button
                                    type="button"
                                    onClick={() =>
                                        openAction(
                                            selectedRequest,
                                            'Perlu Revisi',
                                        )
                                    }
                                    className="rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
                                >
                                    Minta Revisi
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        openAction(selectedRequest, 'Ditolak')
                                    }
                                    className="rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
                                >
                                    Tolak Pengajuan
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        openAction(
                                            selectedRequest,
                                            'Disetujui',
                                        )
                                    }
                                    className="rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                                >
                                    Setujui Pengajuan
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* APPROVAL ACTION MODAL */}
            {selectedRequest && actionType && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm">
                    <form
                        onSubmit={submitAction}
                        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
                    >
                        <div className="border-b border-neutral-100 px-5 py-4 sm:px-6">
                            <h2 className="text-lg font-bold text-neutral-950">
                                {actionType === 'Disetujui'
                                    ? 'Setujui Pengajuan?'
                                    : actionType === 'Ditolak'
                                      ? 'Tolak Pengajuan?'
                                      : 'Minta Revisi Pengajuan'}
                            </h2>
                            <p className="mt-1 text-xs text-neutral-500">
                                {selectedRequest.code} ·{' '}
                                {selectedRequest.borrower}
                            </p>
                        </div>

                        <div className="space-y-4 p-5 sm:p-6">
                            <div className="rounded-xl bg-neutral-50 p-4">
                                <p className="text-xs text-neutral-500">
                                    Aset yang diajukan
                                </p>
                                <p className="mt-1 text-sm font-semibold text-neutral-900">
                                    {selectedRequest.assetName}
                                </p>
                                <p className="mt-1 text-xs text-neutral-500">
                                    {selectedRequest.quantity} unit ·{' '}
                                    {formatDate(selectedRequest.borrowingDate)}{' '}
                                    sampai{' '}
                                    {formatDate(selectedRequest.returnDate)}
                                </p>
                            </div>

                            {actionType === 'Disetujui' ? (
                                <p className="text-sm leading-6 text-neutral-600">
                                    Pengajuan akan ditandai disetujui. Pastikan
                                    ketersediaan aset dan jadwal peminjaman
                                    sudah diperiksa.
                                </p>
                            ) : (
                                <label className="block space-y-2">
                                    <span className="text-xs font-semibold text-neutral-700">
                                        {actionType === 'Ditolak'
                                            ? 'Alasan penolakan'
                                            : 'Catatan revisi'}
                                        <span className="ml-1 text-red-500">
                                            *
                                        </span>
                                    </span>
                                    <textarea
                                        value={actionNote}
                                        onChange={(event) =>
                                            setActionNote(event.target.value)
                                        }
                                        required
                                        rows={4}
                                        placeholder={
                                            actionType === 'Ditolak'
                                                ? 'Tuliskan alasan penolakan...'
                                                : 'Tuliskan informasi yang perlu diperbaiki...'
                                        }
                                        className={inputClass}
                                    />
                                </label>
                            )}
                        </div>

                        <div className="flex flex-col-reverse gap-2 border-t border-neutral-100 p-5 sm:flex-row sm:justify-end sm:px-6">
                            <button
                                type="button"
                                onClick={() => setActionType(null)}
                                className="rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                            >
                                {actionType === 'Disetujui'
                                    ? 'Ya, Setujui'
                                    : actionType === 'Ditolak'
                                      ? 'Ya, Tolak'
                                      : 'Kirim Catatan Revisi'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </DashboardLayout>
    );
}
