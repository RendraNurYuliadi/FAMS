
import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
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

type HistoryEvent = {
    status: ComplaintStatus;
    date: string;
    time: string;
    description: string;
    handler: string;
};

type ComplaintHistory = {
    id: number;
    code: string;
    title: string;
    reporter: string;
    reporterId: string;
    assetCode: string;
    assetName: string;
    category: string;
    location: string;
    priority: ComplaintPriority;
    status: ComplaintStatus;
    description: string;
    reportedAt: string;
    updatedAt: string;
    handler: string;
    followUp: string;
    history: HistoryEvent[];
};

const inputClass =
    'w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100';

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

const initialHistory: ComplaintHistory[] = [
    {
        id: 1,
        code: 'ADU-2026-001',
        title: 'Laptop tidak dapat dinyalakan',
        reporter: 'Andi Setiawan',
        reporterId: '240160121001',
        assetCode: 'BRG-001',
        assetName: 'Laptop Lenovo ThinkPad',
        category: 'Elektronik',
        location: 'Ruang Dosen FTI',
        priority: 'Tinggi',
        status: 'Menunggu',
        description:
            'Laptop tiba-tiba mati saat digunakan dan tidak dapat dinyalakan kembali. Lampu indikator pengisian daya juga tidak menyala meskipun charger sudah terpasang.',
        reportedAt: '2026-11-12',
        updatedAt: '2026-11-12',
        handler: '',
        followUp: '',
        history: [
            {
                status: 'Menunggu',
                date: '2026-11-12',
                time: '09:15',
                description:
                    'Pengaduan kerusakan berhasil dikirim dan menunggu pemeriksaan pengelola.',
                handler: 'Andi Setiawan',
            },
        ],
    },
    {
        id: 2,
        code: 'ADU-2026-002',
        title: 'Tampilan proyektor kurang jelas',
        reporter: 'Siti Nurhaliza',
        reporterId: '240160121015',
        assetCode: 'BRG-002',
        assetName: 'Proyektor Epson',
        category: 'Peralatan Multimedia',
        location: 'Ruang Kelas 204',
        priority: 'Sedang',
        status: 'Diproses',
        description:
            'Hasil proyeksi terlihat buram dan terdapat bayangan pada layar. Sudah dilakukan pengaturan fokus, tetapi hasilnya masih belum maksimal.',
        reportedAt: '2026-11-11',
        updatedAt: '2026-11-13',
        handler: 'Pengelola Barang',
        followUp: 'Sedang dilakukan pemeriksaan pada lensa dan lampu proyektor.',
        history: [
            {
                status: 'Menunggu',
                date: '2026-11-11',
                time: '08:30',
                description: 'Pengaduan berhasil dikirim oleh pelapor.',
                handler: 'Siti Nurhaliza',
            },
            {
                status: 'Diproses',
                date: '2026-11-13',
                time: '10:20',
                description:
                    'Pengelola mulai melakukan pemeriksaan terhadap lensa dan lampu proyektor.',
                handler: 'Pengelola Barang',
            },
        ],
    },
    {
        id: 3,
        code: 'ADU-2026-003',
        title: 'Kaki kursi mengalami kerusakan',
        reporter: 'Muhammad Rizky',
        reporterId: '240160121023',
        assetCode: 'BRG-003',
        assetName: 'Kursi Kuliah',
        category: 'Furniture',
        location: 'Ruang Kelas 101',
        priority: 'Rendah',
        status: 'Selesai',
        description:
            'Salah satu kaki kursi mengalami kerusakan sehingga kursi menjadi tidak stabil ketika digunakan.',
        reportedAt: '2026-11-08',
        updatedAt: '2026-11-10',
        handler: 'Pengelola Barang',
        followUp: 'Kursi sudah diperbaiki dan dapat digunakan kembali.',
        history: [
            {
                status: 'Menunggu',
                date: '2026-11-08',
                time: '13:10',
                description: 'Pengaduan kerusakan kursi berhasil dikirim.',
                handler: 'Muhammad Rizky',
            },
            {
                status: 'Diproses',
                date: '2026-11-09',
                time: '09:00',
                description:
                    'Pengelola melakukan pemeriksaan kondisi kaki kursi.',
                handler: 'Pengelola Barang',
            },
            {
                status: 'Selesai',
                date: '2026-11-10',
                time: '14:30',
                description:
                    'Perbaikan selesai dilakukan. Kursi sudah dapat digunakan kembali.',
                handler: 'Pengelola Barang',
            },
        ],
    },
    {
        id: 4,
        code: 'ADU-2026-004',
        title: 'Permukaan meja rusak',
        reporter: 'Dewi Anggraini',
        reporterId: '240160121030',
        assetCode: 'BRG-004',
        assetName: 'Meja Komputer',
        category: 'Furniture',
        location: 'Laboratorium Komputer',
        priority: 'Sedang',
        status: 'Menunggu',
        description:
            'Permukaan meja komputer mengalami kerusakan pada bagian sudut dan terdapat bagian yang mulai terkelupas.',
        reportedAt: '2026-11-13',
        updatedAt: '2026-11-13',
        handler: '',
        followUp: '',
        history: [
            {
                status: 'Menunggu',
                date: '2026-11-13',
                time: '11:45',
                description:
                    'Pengaduan kerusakan meja berhasil dikirim dan menunggu pemeriksaan.',
                handler: 'Dewi Anggraini',
            },
        ],
    },
    {
        id: 5,
        code: 'ADU-2026-005',
        title: 'Printer tidak dapat mencetak',
        reporter: 'Fajar Maulana',
        reporterId: '240160121042',
        assetCode: 'BRG-005',
        assetName: 'Printer Epson L3210',
        category: 'Peralatan Kantor',
        location: 'Ruang Administrasi',
        priority: 'Darurat',
        status: 'Diproses',
        description:
            'Printer tidak merespons perintah cetak dari komputer. Lampu indikator berkedip dan kertas tidak dapat ditarik oleh printer.',
        reportedAt: '2026-11-10',
        updatedAt: '2026-11-13',
        handler: 'Teknisi',
        followUp:
            'Pemeriksaan mekanisme penarik kertas dan sistem tinta sedang dilakukan.',
        history: [
            {
                status: 'Menunggu',
                date: '2026-11-10',
                time: '08:15',
                description: 'Pengaduan printer berhasil dikirim.',
                handler: 'Fajar Maulana',
            },
            {
                status: 'Diproses',
                date: '2026-11-13',
                time: '09:40',
                description:
                    'Teknisi melakukan pemeriksaan pada mekanisme penarik kertas dan sistem tinta.',
                handler: 'Teknisi',
            },
        ],
    },
    {
        id: 6,
        code: 'ADU-2026-006',
        title: 'Permintaan penggantian perangkat',
        reporter: 'Rina Amelia',
        reporterId: '240160121050',
        assetCode: 'BRG-001',
        assetName: 'Laptop Lenovo ThinkPad',
        category: 'Elektronik',
        location: 'Ruang Dosen FTI',
        priority: 'Rendah',
        status: 'Ditolak',
        description:
            'Melaporkan perangkat yang dianggap sudah lambat dan mengajukan permintaan penggantian unit.',
        reportedAt: '2026-11-07',
        updatedAt: '2026-11-09',
        handler: 'Pengelola Barang',
        followUp:
            'Laporan tidak termasuk kerusakan aset. Silakan mengajukan permintaan penggantian melalui prosedur pengadaan.',
        history: [
            {
                status: 'Menunggu',
                date: '2026-11-07',
                time: '10:00',
                description: 'Pengajuan laporan berhasil diterima.',
                handler: 'Rina Amelia',
            },
            {
                status: 'Ditolak',
                date: '2026-11-09',
                time: '15:00',
                description:
                    'Laporan tidak termasuk kategori kerusakan aset dan diarahkan ke prosedur pengadaan.',
                handler: 'Pengelola Barang',
            },
        ],
    },
];

function formatDate(value: string) {
    if (!value) return '-';

    return new Date(`${value}T00:00:00`).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
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

function getStatusIcon(status: ComplaintStatus): IconName {
    switch (status) {
        case 'Menunggu':
            return 'clock';
        case 'Diproses':
            return 'refresh-cw';
        case 'Selesai':
            return 'check-circle';
        case 'Ditolak':
            return 'x-circle';
    }
}

function getStatusDescription(status: ComplaintStatus) {
    switch (status) {
        case 'Menunggu':
            return 'Laporan telah diterima dan menunggu pemeriksaan.';
        case 'Diproses':
            return 'Pengelola sedang melakukan pemeriksaan atau perbaikan.';
        case 'Selesai':
            return 'Pengaduan telah ditangani dan dinyatakan selesai.';
        case 'Ditolak':
            return 'Pengaduan tidak dapat dilanjutkan.';
    }
}

export default function PengaduanRiwayat() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('Semua');
    const [periodFilter, setPeriodFilter] = useState('Semua');
    const [selectedHistory, setSelectedHistory] =
        useState<ComplaintHistory | null>(null);

    const filteredHistory = useMemo(() => {
        const keyword = search.toLowerCase().trim();

        return initialHistory
            .filter((item) => {
                const matchesSearch =
                    item.code.toLowerCase().includes(keyword) ||
                    item.title.toLowerCase().includes(keyword) ||
                    item.reporter.toLowerCase().includes(keyword) ||
                    item.assetName.toLowerCase().includes(keyword) ||
                    item.assetCode.toLowerCase().includes(keyword) ||
                    item.location.toLowerCase().includes(keyword);

                const matchesStatus =
                    statusFilter === 'Semua' ||
                    item.status === statusFilter;

                const complaintDate = new Date(
                    `${item.reportedAt}T00:00:00`,
                );

                const now = new Date();
                const matchesPeriod =
                    periodFilter === 'Semua' ||
                    (periodFilter === '7 Hari' &&
                        (now.getTime() - complaintDate.getTime()) /
                            (1000 * 60 * 60 * 24) <= 7) ||
                    (periodFilter === '30 Hari' &&
                        (now.getTime() - complaintDate.getTime()) /
                            (1000 * 60 * 60 * 24) <= 30) ||
                    (periodFilter === 'Tahun Ini' &&
                        complaintDate.getFullYear() === now.getFullYear());

                return matchesSearch && matchesStatus && matchesPeriod;
            })
            .sort(
                (a, b) =>
                    new Date(b.reportedAt).getTime() -
                    new Date(a.reportedAt).getTime(),
            );
    }, [search, statusFilter, periodFilter]);

    const stats: {
        label: string;
        value: number;
        icon: IconName;
    }[] = [
        {
            label: 'Total Riwayat',
            value: initialHistory.length,
            icon: 'history',
        },
        {
            label: 'Menunggu',
            value: initialHistory.filter(
                (item) => item.status === 'Menunggu',
            ).length,
            icon: 'clock',
        },
        {
            label: 'Diproses',
            value: initialHistory.filter(
                (item) => item.status === 'Diproses',
            ).length,
            icon: 'refresh-cw',
        },
        {
            label: 'Selesai',
            value: initialHistory.filter(
                (item) => item.status === 'Selesai',
            ).length,
            icon: 'check-circle',
        },
    ];

    return (
        <DashboardLayout>
            <div className="w-full min-w-0 space-y-6">
                {/* TOP BANNER */}
                <AssetManagementBanner
                    title="Riwayat Pengaduan."
                    description="Pantau rekam jejak laporan kerusakan aset, perubahan status, serta tindak lanjut yang telah dilakukan oleh pengelola."
                    contextLabel="Manajemen pengaduan"
                    icon="history"
                    statusLabel="Riwayat laporan kerusakan"
                    metrics={[
                        {
                            label: 'Total riwayat',
                            value: initialHistory.length,
                        },
                        {
                            label: 'Pengaduan selesai',
                            value: initialHistory.filter(
                                (item) => item.status === 'Selesai',
                            ).length,
                        },
                    ]}
                />

                {/* PAGE HEADING */}
                <div>
                    <div className="mb-2 flex items-center gap-2 text-xs text-neutral-400">
                        <span>Manajemen Aset</span>
                        <Icon name="chevron-right" size={13} />
                        <span>Pengaduan</span>
                        <Icon name="chevron-right" size={13} />
                        <span className="font-semibold text-neutral-700">
                            Riwayat
                        </span>
                    </div>

                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
                                Riwayat Pengaduan
                            </h1>
                            <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
                                Lihat seluruh rekam jejak pengaduan aset,
                                termasuk perkembangan penanganan dan hasil
                                penyelesaiannya.
                            </p>
                        </div>

                        <div className="inline-flex items-center gap-2 self-start rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-xs font-medium text-neutral-600 sm:self-auto">
                            <Icon name="history" size={15} />
                            Arsip Pengaduan
                        </div>
                    </div>
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

                {/* HISTORY OVERVIEW */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <section className="rounded-2xl border border-neutral-200 bg-white p-5 lg:col-span-2">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <h2 className="font-bold text-neutral-900">
                                    Ringkasan Aktivitas
                                </h2>
                                <p className="mt-1 text-xs text-neutral-500">
                                    Distribusi status seluruh pengaduan.
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100">
                                <Icon
                                    name="trending-up"
                                    size={19}
                                    className="text-neutral-700"
                                />
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            {(
                                [
                                    'Menunggu',
                                    'Diproses',
                                    'Selesai',
                                    'Ditolak',
                                ] as ComplaintStatus[]
                            ).map((status) => {
                                const count = initialHistory.filter(
                                    (item) => item.status === status,
                                ).length;

                                const percentage =
                                    initialHistory.length > 0
                                        ? (count / initialHistory.length) * 100
                                        : 0;

                                return (
                                    <div key={status}>
                                        <div className="mb-2 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`h-2 w-2 rounded-full ${
                                                        status === 'Selesai'
                                                            ? 'bg-neutral-950'
                                                            : status === 'Diproses'
                                                              ? 'bg-neutral-500'
                                                              : status === 'Ditolak'
                                                                ? 'bg-neutral-300'
                                                                : 'bg-neutral-200'
                                                    }`}
                                                />
                                                <span className="text-xs font-medium text-neutral-700">
                                                    {status}
                                                </span>
                                            </div>

                                            <span className="text-xs font-semibold tabular-nums text-neutral-700">
                                                {count} laporan
                                            </span>
                                        </div>

                                        <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                                            <div
                                                className={`h-full rounded-full ${
                                                    status === 'Selesai'
                                                        ? 'bg-neutral-950'
                                                        : status === 'Diproses'
                                                          ? 'bg-neutral-500'
                                                          : status === 'Ditolak'
                                                            ? 'bg-neutral-300'
                                                            : 'bg-neutral-200'
                                                }`}
                                                style={{
                                                    width: `${percentage}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section className="rounded-2xl border border-neutral-200 bg-white p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="font-bold text-neutral-900">
                                    Aktivitas Terakhir
                                </h2>
                                <p className="mt-1 text-xs text-neutral-500">
                                    Pembaruan pengaduan terbaru.
                                </p>
                            </div>

                            <Icon
                                name="activity"
                                size={19}
                                className="text-neutral-500"
                            />
                        </div>

                        <div className="mt-5 space-y-4">
                            {initialHistory
                                .slice()
                                .sort(
                                    (a, b) =>
                                        new Date(b.updatedAt).getTime() -
                                        new Date(a.updatedAt).getTime(),
                                )
                                .slice(0, 3)
                                .map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setSelectedHistory(item)}
                                        className="flex w-full items-start gap-3 text-left"
                                    >
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100">
                                            <Icon
                                                name={getStatusIcon(item.status)}
                                                size={15}
                                                className="text-neutral-600"
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-xs font-semibold text-neutral-800">
                                                {item.title}
                                            </p>
                                            <p className="mt-1 text-[11px] text-neutral-400">
                                                {formatDate(item.updatedAt)}
                                            </p>
                                        </div>

                                        <Icon
                                            name="chevron-right"
                                            size={14}
                                            className="mt-1 shrink-0 text-neutral-300"
                                        />
                                    </button>
                                ))}
                        </div>
                    </section>
                </div>

                {/* FILTER AND HISTORY LIST */}
                <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                    <div className="border-b border-neutral-100 p-4 sm:p-5">
                        <div className="flex flex-col gap-4">
                            <div>
                                <h2 className="font-bold text-neutral-900">
                                    Rekam Jejak Pengaduan
                                </h2>
                                <p className="mt-1 text-xs text-neutral-500">
                                    Seluruh laporan beserta status terakhir
                                    penanganannya.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                <div className="relative">
                                    <span className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-400">
                                        <Icon name="search" size={16} />
                                    </span>

                                    <input
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(event.target.value)
                                        }
                                        placeholder="Cari kode, pelapor, aset..."
                                        className={`${inputClass} pl-9`}
                                    />
                                </div>

                                <select
                                    value={statusFilter}
                                    onChange={(event) =>
                                        setStatusFilter(event.target.value)
                                    }
                                    className={inputClass}
                                >
                                    <option value="Semua">Semua Status</option>
                                    <option value="Menunggu">Menunggu</option>
                                    <option value="Diproses">Diproses</option>
                                    <option value="Selesai">Selesai</option>
                                    <option value="Ditolak">Ditolak</option>
                                </select>

                                <select
                                    value={periodFilter}
                                    onChange={(event) =>
                                        setPeriodFilter(event.target.value)
                                    }
                                    className={inputClass}
                                >
                                    <option value="Semua">Semua Periode</option>
                                    <option value="7 Hari">7 Hari Terakhir</option>
                                    <option value="30 Hari">30 Hari Terakhir</option>
                                    <option value="Tahun Ini">Tahun Ini</option>
                                </select>
                            </div>
                        </div>

                        {/* STATUS QUICK FILTER */}
                        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                            {[
                                'Semua',
                                'Menunggu',
                                'Diproses',
                                'Selesai',
                                'Ditolak',
                            ].map((status) => (
                                <button
                                    key={status}
                                    type="button"
                                    onClick={() => setStatusFilter(status)}
                                    className={`shrink-0 rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                                        statusFilter === status
                                            ? 'bg-neutral-950 text-white'
                                            : 'border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
                                    }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* HISTORY RESULTS */}
                    <div className="p-4 sm:p-5">
                        <div className="mb-5 flex items-center justify-between">
                            <p className="text-xs text-neutral-500">
                                Menampilkan{' '}
                                <span className="font-semibold text-neutral-800">
                                    {filteredHistory.length}
                                </span>{' '}
                                pengaduan
                            </p>

                            {(search ||
                                statusFilter !== 'Semua' ||
                                periodFilter !== 'Semua') && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch('');
                                        setStatusFilter('Semua');
                                        setPeriodFilter('Semua');
                                    }}
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-950"
                                >
                                    <Icon name="rotate-ccw" size={13} />
                                    Reset Filter
                                </button>
                            )}
                        </div>

                        <div className="space-y-3">
                            {filteredHistory.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-2xl border border-neutral-200 p-4 transition hover:border-neutral-300 hover:bg-neutral-50/50 sm:p-5"
                                >
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                                            <div className="flex min-w-0 gap-3">
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-100">
                                                    <Icon
                                                        name="package"
                                                        size={19}
                                                        className="text-neutral-700"
                                                    />
                                                </div>

                                                <div className="min-w-0">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="text-[11px] font-semibold text-neutral-500">
                                                            {item.code}
                                                        </span>

                                                        <span className="text-[11px] text-neutral-300">
                                                            /
                                                        </span>

                                                        <span className="text-[11px] text-neutral-400">
                                                            {formatDate(item.reportedAt)}
                                                        </span>
                                                    </div>

                                                    <h3 className="mt-1 font-bold text-neutral-900">
                                                        {item.title}
                                                    </h3>

                                                    <p className="mt-1 text-xs text-neutral-500">
                                                        {item.assetName} · {item.assetCode}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
                                                <span
                                                    className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ${priorityStyles[item.priority]}`}
                                                >
                                                    {item.priority}
                                                </span>

                                                <span
                                                    className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ${statusStyles[item.status]}`}
                                                >
                                                    {item.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3 border-t border-neutral-100 pt-4 sm:grid-cols-3">
                                            <div>
                                                <p className="text-[11px] text-neutral-400">
                                                    Pelapor
                                                </p>
                                                <p className="mt-1 text-xs font-semibold text-neutral-700">
                                                    {item.reporter}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-[11px] text-neutral-400">
                                                    Lokasi Aset
                                                </p>
                                                <p className="mt-1 text-xs font-semibold text-neutral-700">
                                                    {item.location}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-[11px] text-neutral-400">
                                                    Terakhir Diperbarui
                                                </p>
                                                <p className="mt-1 text-xs font-semibold text-neutral-700">
                                                    {formatDate(item.updatedAt)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* LATEST STATUS */}
                                        <div className="flex flex-col justify-between gap-3 rounded-xl bg-neutral-50 p-3 sm:flex-row sm:items-center">
                                            <div className="flex items-start gap-2.5">
                                                <Icon
                                                    name={getStatusIcon(item.status)}
                                                    size={16}
                                                    className="mt-0.5 text-neutral-600"
                                                />

                                                <div>
                                                    <p className="text-xs font-semibold text-neutral-800">
                                                        {item.status}
                                                    </p>
                                                    <p className="mt-1 text-[11px] leading-5 text-neutral-500">
                                                        {item.followUp ||
                                                            getStatusDescription(item.status)}
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedHistory(item)
                                                }
                                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100"
                                            >
                                                Lihat Riwayat
                                                <Icon
                                                    name="arrow-up-right"
                                                    size={14}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {filteredHistory.length === 0 && (
                                <div className="rounded-2xl border border-dashed border-neutral-200 px-5 py-14 text-center">
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100">
                                        <Icon
                                            name="search"
                                            size={22}
                                            className="text-neutral-400"
                                        />
                                    </div>

                                    <p className="mt-4 font-semibold text-neutral-700">
                                        Riwayat tidak ditemukan
                                    </p>

                                    <p className="mt-1 text-xs text-neutral-400">
                                        Coba ubah kata kunci atau filter pencarian.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 border-t border-neutral-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-neutral-500">
                            Total {filteredHistory.length} data riwayat pengaduan
                        </p>

                        <p className="text-xs text-neutral-400">
                            Data diurutkan berdasarkan tanggal laporan terbaru.
                        </p>
                    </div>
                </section>

                <p className="text-xs text-neutral-400">
                    Riwayat yang ditampilkan saat ini merupakan ilustrasi
                    frontend. Data belum terhubung dengan database dan belum
                    mengambil riwayat perubahan status secara langsung.
                </p>
            </div>

            {/* HISTORY DETAIL MODAL */}
            {selectedHistory && (
                <div
                    className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-6"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setSelectedHistory(null);
                        }
                    }}
                >
                    <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                        {/* MODAL HEADER */}
                        <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-5 py-4 sm:px-6">
                            <div>
                                <h2 className="font-bold text-neutral-950">
                                    Detail Riwayat Pengaduan
                                </h2>
                                <p className="mt-1 text-xs text-neutral-500">
                                    {selectedHistory.code}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedHistory(null)}
                                className="rounded-xl p-2 text-neutral-500 transition hover:bg-neutral-100"
                            >
                                <Icon name="x" size={19} />
                            </button>
                        </div>

                        {/* MODAL BODY */}
                        <div className="space-y-6 overflow-y-auto p-5 sm:p-6">
                            {/* SUMMARY */}
                            <section>
                                <div className="flex flex-wrap gap-2">
                                    <span
                                        className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ${statusStyles[selectedHistory.status]}`}
                                    >
                                        {selectedHistory.status}
                                    </span>

                                    <span
                                        className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ${priorityStyles[selectedHistory.priority]}`}
                                    >
                                        Prioritas {selectedHistory.priority}
                                    </span>
                                </div>

                                <h3 className="mt-3 text-xl font-bold text-neutral-950">
                                    {selectedHistory.title}
                                </h3>

                                <p className="mt-1 text-xs text-neutral-400">
                                    Dilaporkan pada{' '}
                                    {formatDate(selectedHistory.reportedAt)}
                                </p>
                            </section>

                            {/* REPORTER */}
                            <section>
                                <h4 className="mb-3 border-b border-neutral-100 pb-3 text-xs font-bold uppercase tracking-wider text-neutral-800">
                                    Informasi Pelapor
                                </h4>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <DetailBox
                                        label="Nama Pelapor"
                                        value={selectedHistory.reporter}
                                    />
                                    <DetailBox
                                        label="NIM / ID Pengguna"
                                        value={selectedHistory.reporterId}
                                    />
                                    <DetailBox
                                        label="Kode Pengaduan"
                                        value={selectedHistory.code}
                                    />
                                    <DetailBox
                                        label="Tanggal Pengaduan"
                                        value={formatDate(selectedHistory.reportedAt)}
                                    />
                                </div>
                            </section>

                            {/* ASSET */}
                            <section>
                                <h4 className="mb-3 border-b border-neutral-100 pb-3 text-xs font-bold uppercase tracking-wider text-neutral-800">
                                    Informasi Aset
                                </h4>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <DetailBox
                                        label="Nama Aset"
                                        value={selectedHistory.assetName}
                                    />
                                    <DetailBox
                                        label="Kode Aset"
                                        value={selectedHistory.assetCode}
                                    />
                                    <DetailBox
                                        label="Kategori"
                                        value={selectedHistory.category}
                                    />
                                    <DetailBox
                                        label="Lokasi Aset"
                                        value={selectedHistory.location}
                                    />
                                </div>
                            </section>

                            {/* DESCRIPTION */}
                            <section>
                                <h4 className="mb-3 border-b border-neutral-100 pb-3 text-xs font-bold uppercase tracking-wider text-neutral-800">
                                    Deskripsi Kerusakan
                                </h4>

                                <div className="rounded-xl bg-neutral-50 p-4">
                                    <p className="whitespace-pre-line text-sm leading-6 text-neutral-600">
                                        {selectedHistory.description}
                                    </p>
                                </div>
                            </section>

                            {/* TIMELINE */}
                            <section>
                                <div className="mb-4 flex items-center justify-between">
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                                            Timeline Penanganan
                                        </h4>
                                        <p className="mt-1 text-xs text-neutral-400">
                                            Rekam jejak perubahan status pengaduan.
                                        </p>
                                    </div>

                                    <span className="rounded-lg bg-neutral-100 px-2.5 py-1.5 text-[11px] font-semibold text-neutral-600">
                                        {selectedHistory.history.length} Aktivitas
                                    </span>
                                </div>

                                <div className="relative ml-2 space-y-0">
                                    {selectedHistory.history.map((event, index) => (
                                        <div
                                            key={`${event.status}-${event.date}-${index}`}
                                            className="relative flex gap-4 pb-6 last:pb-0"
                                        >
                                            {index !==
                                                selectedHistory.history.length - 1 && (
                                                <div className="absolute top-8 bottom-0 left-[13px] w-px bg-neutral-200" />
                                            )}

                                            <div
                                                className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-4 ring-white ${
                                                    index ===
                                                    selectedHistory.history.length - 1
                                                        ? 'bg-neutral-950 text-white'
                                                        : 'bg-neutral-200 text-neutral-600'
                                                }`}
                                            >
                                                <Icon
                                                    name={getStatusIcon(event.status)}
                                                    size={13}
                                                />
                                            </div>

                                            <div className="min-w-0 flex-1 rounded-xl border border-neutral-100 bg-neutral-50 p-3">
                                                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                                                    <span
                                                        className={`inline-flex w-fit rounded-lg px-2 py-1 text-[11px] font-semibold ${statusStyles[event.status]}`}
                                                    >
                                                        {event.status}
                                                    </span>

                                                    <span className="text-[11px] text-neutral-400">
                                                        {formatDate(event.date)} · {event.time}
                                                    </span>
                                                </div>

                                                <p className="mt-3 text-xs leading-5 text-neutral-700">
                                                    {event.description}
                                                </p>

                                                <div className="mt-3 flex items-center gap-1.5 border-t border-neutral-200/70 pt-3">
                                                    <Icon
                                                        name="user-round"
                                                        size={12}
                                                        className="text-neutral-400"
                                                    />
                                                    <span className="text-[11px] text-neutral-500">
                                                        {event.handler}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* LATEST FOLLOW UP */}
                            <section>
                                <h4 className="mb-3 border-b border-neutral-100 pb-3 text-xs font-bold uppercase tracking-wider text-neutral-800">
                                    Hasil Tindak Lanjut
                                </h4>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <DetailBox
                                        label="Petugas Penanganan"
                                        value={
                                            selectedHistory.handler ||
                                            'Belum ditentukan'
                                        }
                                    />

                                    <DetailBox
                                        label="Terakhir Diperbarui"
                                        value={formatDate(selectedHistory.updatedAt)}
                                    />
                                </div>

                                <div className="mt-3 rounded-xl bg-neutral-50 p-4">
                                    <p className="text-[11px] font-medium text-neutral-500">
                                        Catatan Pengelola
                                    </p>

                                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-neutral-700">
                                        {selectedHistory.followUp ||
                                            'Belum ada catatan tindak lanjut.'}
                                    </p>
                                </div>
                            </section>
                        </div>

                        {/* MODAL FOOTER */}
                        <div className="flex shrink-0 justify-end border-t border-neutral-100 bg-white px-5 py-4 sm:px-6">
                            <button
                                type="button"
                                onClick={() => setSelectedHistory(null)}
                                className="rounded-xl border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-50"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
