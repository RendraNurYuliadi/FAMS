
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Icon, { type IconName } from '@/components/Icon';
import AssetManagementBanner from '@/components/dashboard/AssetManagementBanner';

type InspectionStatus =
    | 'Menunggu'
    | 'Sedang Diperiksa'
    | 'Selesai'
    | 'Bermasalah';

type AssetCondition =
    | 'Baik'
    | 'Rusak Ringan'
    | 'Rusak Berat'
    | 'Tidak Lengkap'
    | 'Hilang';

type InspectionDecision = 'Layak Digunakan' | 'Perlu Perbaikan' | 'Tidak Layak';

type Inspection = {
    id: number;
    code: string;
    borrower: string;
    identity: string;
    borrowerType: string;
    organization: string;
    asset: string;
    assetCode: string;
    assetType: 'Barang' | 'Ruangan';
    quantity: number;
    borrowDate: string;
    returnDate: string;
    actualReturnDate: string;
    status: InspectionStatus;
    condition: AssetCondition;
    decision: InspectionDecision | '';
    completeness: boolean;
    physical: boolean;
    function: boolean;
    cleanliness: boolean;
    notes: string;
    inspector: string;
    inspectedAt: string;
};

const PER_PAGE = 5;

const initialInspections: Inspection[] = [
    {
        id: 1,
        code: 'PJM-2026-001',
        borrower: 'Rendra Nur Yuliadi',
        identity: '240160121104',
        borrowerType: 'Mahasiswa',
        organization: 'UKM TahuNgoding',
        asset: 'Proyektor Epson',
        assetCode: 'FAMS-BRG-002',
        assetType: 'Barang',
        quantity: 1,
        borrowDate: '2026-11-10',
        returnDate: '2026-11-12',
        actualReturnDate: '2026-11-12',
        status: 'Menunggu',
        condition: 'Baik',
        decision: '',
        completeness: false,
        physical: false,
        function: false,
        cleanliness: false,
        notes: '',
        inspector: '-',
        inspectedAt: '',
    },
    {
        id: 2,
        code: 'PJM-2026-002',
        borrower: 'Amelia Puji Lestari',
        identity: '240160121007',
        borrowerType: 'Mahasiswa',
        organization: 'Individu',
        asset: 'Laptop Lenovo ThinkPad',
        assetCode: 'FAMS-BRG-001',
        assetType: 'Barang',
        quantity: 1,
        borrowDate: '2026-11-09',
        returnDate: '2026-11-11',
        actualReturnDate: '2026-11-11',
        status: 'Sedang Diperiksa',
        condition: 'Baik',
        decision: '',
        completeness: true,
        physical: false,
        function: false,
        cleanliness: false,
        notes: '',
        inspector: 'Admin',
        inspectedAt: '',
    },
    {
        id: 3,
        code: 'PJM-2026-003',
        borrower: 'Herliana Tri Cahyanti',
        identity: '240160121044',
        borrowerType: 'Mahasiswa',
        organization: 'Himpunan Mahasiswa',
        asset: 'Kamera DSLR Canon',
        assetCode: 'FAMS-BRG-003',
        assetType: 'Barang',
        quantity: 1,
        borrowDate: '2026-11-07',
        returnDate: '2026-11-09',
        actualReturnDate: '2026-11-09',
        status: 'Bermasalah',
        condition: 'Rusak Ringan',
        decision: 'Perlu Perbaikan',
        completeness: true,
        physical: true,
        function: true,
        cleanliness: true,
        notes: 'Terdapat goresan pada bagian bodi kamera.',
        inspector: 'Admin',
        inspectedAt: '2026-11-09',
    },
    {
        id: 4,
        code: 'PJM-2026-004',
        borrower: 'Wulan Nurfitriani',
        identity: '240160121116',
        borrowerType: 'Mahasiswa',
        organization: 'UKM TahuNgoding',
        asset: 'Ruang Seminar FTI',
        assetCode: 'FAMS-RNG-003',
        assetType: 'Ruangan',
        quantity: 1,
        borrowDate: '2026-11-05',
        returnDate: '2026-11-06',
        actualReturnDate: '2026-11-06',
        status: 'Selesai',
        condition: 'Baik',
        decision: 'Layak Digunakan',
        completeness: true,
        physical: true,
        function: true,
        cleanliness: true,
        notes: 'Ruangan telah dikembalikan dalam kondisi bersih.',
        inspector: 'Admin',
        inspectedAt: '2026-11-06',
    },
    {
        id: 5,
        code: 'PJM-2026-005',
        borrower: 'Jajang Didin',
        identity: '240160121088',
        borrowerType: 'Mahasiswa',
        organization: 'UKM TahuNgoding',
        asset: 'Laptop Lenovo ThinkPad',
        assetCode: 'FAMS-BRG-001',
        assetType: 'Barang',
        quantity: 1,
        borrowDate: '2026-11-03',
        returnDate: '2026-11-04',
        actualReturnDate: '2026-11-04',
        status: 'Selesai',
        condition: 'Baik',
        decision: 'Layak Digunakan',
        completeness: true,
        physical: true,
        function: true,
        cleanliness: true,
        notes: 'Aset lengkap dan berfungsi normal.',
        inspector: 'Admin',
        inspectedAt: '2026-11-04',
    },
];

const statusStyles: Record<InspectionStatus, string> = {
    Menunggu: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    'Sedang Diperiksa': 'bg-neutral-200 text-neutral-800 border-neutral-300',
    Selesai: 'bg-black text-white border-black',
    Bermasalah: 'bg-neutral-300 text-neutral-900 border-neutral-400',
};

const statusIcons: Record<InspectionStatus, IconName> = {
    Menunggu: 'clock',
    'Sedang Diperiksa': 'clipboard-check',
    Selesai: 'check-check',
    Bermasalah: 'alert-circle',
};

const conditionStyles: Record<AssetCondition, string> = {
    Baik: 'bg-neutral-100 text-neutral-800 border-neutral-200',
    'Rusak Ringan': 'bg-neutral-200 text-neutral-800 border-neutral-300',
    'Rusak Berat': 'bg-neutral-300 text-neutral-900 border-neutral-400',
    'Tidak Lengkap': 'bg-neutral-200 text-neutral-800 border-neutral-300',
    Hilang: 'bg-black text-white border-black',
};

const inputClass =
    'w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100';

const formatDate = (date: string) =>
    date
        ? new Date(`${date}T00:00:00`).toLocaleDateString('id-ID', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
          })
        : '-';

function StatusBadge({ status }: { status: InspectionStatus }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
        >
            <Icon name={statusIcons[status]} size={13} />
            {status}
        </span>
    );
}

function ConditionBadge({ condition }: { condition: AssetCondition }) {
    return (
        <span
            className={`inline-flex items-center whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium ${conditionStyles[condition]}`}
        >
            {condition}
        </span>
    );
}

function SectionHeading({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="mb-5">
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-400">{description}</p>
        </div>
    );
}

function DetailItem({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="min-w-0 space-y-1">
            <p className="text-xs text-gray-400">{label}</p>
            <p className="break-words text-sm font-medium text-gray-700">
                {value || '-'}
            </p>
        </div>
    );
}

export default function PemeriksaanPengembalian() {
    const [inspections, setInspections] = useState(initialInspections);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('Semua Status');
    const [conditionFilter, setConditionFilter] = useState('Semua Kondisi');
    const [currentPage, setCurrentPage] = useState(1);

    const [detailItem, setDetailItem] = useState<Inspection | null>(null);
    const [inspectionItem, setInspectionItem] = useState<Inspection | null>(null);

    const [checklist, setChecklist] = useState({
        completeness: false,
        physical: false,
        function: false,
        cleanliness: false,
    });

    const [condition, setCondition] = useState<AssetCondition>('Baik');
    const [decision, setDecision] = useState<InspectionDecision | ''>('');
    const [notes, setNotes] = useState('');
    const [formError, setFormError] = useState('');

    const stats = [
        {
            label: 'Total Pengembalian',
            value: inspections.length,
            icon: 'clipboard-list' as IconName,
            card: 'border-gray-900 bg-gray-950 text-white',
            labelColor: 'text-gray-300',
            valueColor: 'text-white',
            descriptionColor: 'text-gray-400',
            iconColor: 'bg-white/10 text-white',
            texture: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,.14) 1px, transparent 0)',
            description: 'Seluruh transaksi',
        },
        {
            label: 'Menunggu Pemeriksaan',
            value: inspections.filter((item) => item.status === 'Menunggu')
                .length,
            icon: 'clock' as IconName,
            card: 'border-gray-700 bg-gray-800 text-white',
            labelColor: 'text-gray-300',
            valueColor: 'text-white',
            descriptionColor: 'text-gray-400',
            iconColor: 'bg-white/10 text-gray-100',
            texture: 'repeating-linear-gradient(135deg, rgba(255,255,255,.055) 0px, rgba(255,255,255,.055) 1px, transparent 1px, transparent 10px)',
            description: 'Perlu diperiksa',
        },
        {
            label: 'Sedang Diperiksa',
            value: inspections.filter(
                (item) => item.status === 'Sedang Diperiksa',
            ).length,
            icon: 'clipboard-check' as IconName,
            card: 'border-gray-300 bg-gray-200 text-gray-950',
            labelColor: 'text-gray-600',
            valueColor: 'text-gray-950',
            descriptionColor: 'text-gray-600',
            iconColor: 'bg-white/70 text-gray-800',
            texture: 'radial-gradient(circle at 1px 1px, rgba(17,24,39,.11) 1px, transparent 0)',
            description: 'Dalam proses',
        },
        {
            label: 'Selesai / Bermasalah',
            value: inspections.filter(
                (item) =>
                    item.status === 'Selesai' ||
                    item.status === 'Bermasalah',
            ).length,
            icon: 'check-circle' as IconName,
            card: 'border-gray-200 bg-white text-gray-950',
            labelColor: 'text-gray-500',
            valueColor: 'text-gray-950',
            descriptionColor: 'text-gray-500',
            iconColor: 'bg-gray-100 text-gray-700',
            texture: 'repeating-linear-gradient(45deg, rgba(17,24,39,.035) 0px, rgba(17,24,39,.035) 1px, transparent 1px, transparent 9px)',
            description: 'Sudah ditindaklanjuti',
        },
    ];

    const filteredItems = useMemo(() => {
        return inspections.filter((item) => {
            const keyword = search.toLowerCase();

            const matchesSearch =
                item.code.toLowerCase().includes(keyword) ||
                item.borrower.toLowerCase().includes(keyword) ||
                item.identity.toLowerCase().includes(keyword) ||
                item.asset.toLowerCase().includes(keyword) ||
                item.assetCode.toLowerCase().includes(keyword);

            const matchesStatus =
                statusFilter === 'Semua Status' ||
                item.status === statusFilter;

            const matchesCondition =
                conditionFilter === 'Semua Kondisi' ||
                item.condition === conditionFilter;

            return matchesSearch && matchesStatus && matchesCondition;
        });
    }, [inspections, search, statusFilter, conditionFilter]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredItems.length / PER_PAGE),
    );

    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * PER_PAGE,
        currentPage * PER_PAGE,
    );

    const resetFilters = () => {
        setSearch('');
        setStatusFilter('Semua Status');
        setConditionFilter('Semua Kondisi');
        setCurrentPage(1);
    };

    const openInspection = (item: Inspection) => {
        setInspectionItem(item);
        setChecklist({
            completeness: item.completeness,
            physical: item.physical,
            function: item.function,
            cleanliness: item.cleanliness,
        });
        setCondition(item.condition);
        setDecision(item.decision);
        setNotes(item.notes);
        setFormError('');

        setInspections((previous) =>
            previous.map((inspection) =>
                inspection.id === item.id &&
                inspection.status === 'Menunggu'
                    ? { ...inspection, status: 'Sedang Diperiksa' }
                    : inspection,
            ),
        );
    };

    const closeInspection = () => {
        setInspectionItem(null);
        setFormError('');
    };

    const updateChecklist = (
        key: keyof typeof checklist,
        value: boolean,
    ) => {
        setChecklist((previous) => ({
            ...previous,
            [key]: value,
        }));
    };

    const handleSaveInspection = () => {
        if (!inspectionItem) return;

        const allChecked = Object.values(checklist).every(Boolean);

        if (!allChecked) {
            setFormError('Selesaikan seluruh checklist pemeriksaan terlebih dahulu.');
            return;
        }

        if (!decision) {
            setFormError('Pilih keputusan akhir pemeriksaan aset.');
            return;
        }

        if (
            (condition === 'Rusak Ringan' ||
                condition === 'Rusak Berat' ||
                condition === 'Tidak Lengkap' ||
                condition === 'Hilang') &&
            !notes.trim()
        ) {
            setFormError('Tambahkan catatan untuk menjelaskan kondisi aset.');
            return;
        }

        const nextStatus: InspectionStatus =
            decision === 'Layak Digunakan' ? 'Selesai' : 'Bermasalah';

        const today = new Date().toISOString().slice(0, 10);

        const updatedItem: Inspection = {
            ...inspectionItem,
            status: nextStatus,
            condition,
            decision,
            completeness: checklist.completeness,
            physical: checklist.physical,
            function: checklist.function,
            cleanliness: checklist.cleanliness,
            notes,
            inspector: 'Admin',
            inspectedAt: today,
        };

        setInspections((previous) =>
            previous.map((item) =>
                item.id === inspectionItem.id ? updatedItem : item,
            ),
        );

        setInspectionItem(null);
        setFormError('');
    };

    const checklistItems: {
        key: keyof typeof checklist;
        title: string;
        description: string;
    }[] = [
        {
            key: 'completeness',
            title: 'Kelengkapan Aset',
            description:
                'Pastikan seluruh komponen, aksesori, dan perlengkapan dikembalikan.',
        },
        {
            key: 'physical',
            title: 'Kondisi Fisik',
            description:
                'Periksa apakah terdapat goresan, retak, pecah, atau kerusakan.',
        },
        {
            key: 'function',
            title: 'Fungsi Aset',
            description:
                'Pastikan aset masih dapat digunakan sesuai fungsinya.',
        },
        {
            key: 'cleanliness',
            title: 'Kebersihan Aset',
            description:
                'Pastikan aset atau ruangan dikembalikan dalam kondisi bersih.',
        },
    ];

    return (
        <DashboardLayout>
            <div className="w-full min-w-0 space-y-6 pb-8">
                <AssetManagementBanner
                    title="Pemeriksaan Pengembalian Aset."
                    description="Periksa kondisi barang dan ruangan yang telah dikembalikan, catat hasil pemeriksaan, serta tentukan kelayakan aset untuk digunakan kembali."
                    contextLabel="Pemeriksaan pengembalian"
                    icon="clipboard-check"
                    statusLabel="Pemeriksaan aset dipantau"
                    metrics={[
                        {
                            label: 'Total pengembalian',
                            value: inspections.length,
                        },
                        {
                            label: 'Menunggu pemeriksaan',
                            value: inspections.filter(
                                (item) => item.status === 'Menunggu',
                            ).length,
                        },
                    ]}
                />

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>Dashboard</span>
                    <Icon name="chevron-right" size={13} />
                    <a
                        href="/dashboard/pengembalian"
                        className="transition hover:text-gray-700"
                    >
                        Pengembalian
                    </a>
                    <Icon name="chevron-right" size={13} />
                    <span className="font-medium text-gray-600">
                        Pemeriksaan
                    </span>
                </div>

                {/* Statistics */}
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className={`group relative isolate overflow-hidden rounded-2xl border p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${stat.card}`}
                        >
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 -z-10 opacity-70 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
                                style={{
                                    backgroundImage: stat.texture,
                                    backgroundSize:
                                        stat.label === 'Total Pengembalian'
                                            ? '14px 14px'
                                            : 'auto',
                                }}
                            />
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -right-10 -top-12 -z-10 h-36 w-36 rounded-full border border-current opacity-[0.08] transition duration-300 group-hover:scale-110"
                            />
                            <div className="relative flex min-h-28 items-start justify-between gap-3">
                                <div className="flex min-h-28 flex-col">
                                    <p
                                        className={`text-sm font-medium ${stat.labelColor}`}
                                    >
                                        {stat.label}
                                    </p>
                                    <p
                                        className={`mt-2 text-4xl font-bold tracking-tight ${stat.valueColor}`}
                                    >
                                        {stat.value}
                                    </p>
                                    <div className="mt-auto flex items-center gap-2 pt-2">
                                        <span className="h-px w-5 bg-current opacity-30" />
                                        <p
                                            className={`text-xs ${stat.descriptionColor}`}
                                        >
                                            {stat.description}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={`rounded-xl p-3 shadow-sm ring-1 ring-current/5 transition duration-300 group-hover:rotate-3 group-hover:scale-105 ${stat.iconColor}`}
                                >
                                    <Icon name={stat.icon} size={21} />
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Table */}
                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-base font-semibold text-gray-900">
                                Daftar Pemeriksaan Pengembalian
                            </h2>
                            <p className="mt-1 text-xs text-gray-400">
                                Data aset yang telah dikembalikan dan perlu diperiksa pengelola.
                            </p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col gap-3 border-b border-gray-100 p-5 lg:flex-row">
                        <div className="relative flex-1">
                            <Icon
                                name="search"
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                value={search}
                                onChange={(event) => {
                                    setSearch(event.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder="Cari nama peminjam, aset, atau kode..."
                                className={`${inputClass} pl-10`}
                            />
                        </div>

                        <select
                            value={conditionFilter}
                            onChange={(event) => {
                                setConditionFilter(event.target.value);
                                setCurrentPage(1);
                            }}
                            className={`${inputClass} lg:w-48`}
                        >
                            <option>Semua Kondisi</option>
                            <option>Baik</option>
                            <option>Rusak Ringan</option>
                            <option>Rusak Berat</option>
                            <option>Tidak Lengkap</option>
                            <option>Hilang</option>
                        </select>

                        <select
                            value={statusFilter}
                            onChange={(event) => {
                                setStatusFilter(event.target.value);
                                setCurrentPage(1);
                            }}
                            className={`${inputClass} lg:w-48`}
                        >
                            <option>Semua Status</option>
                            <option>Menunggu</option>
                            <option>Sedang Diperiksa</option>
                            <option>Selesai</option>
                            <option>Bermasalah</option>
                        </select>

                        <button
                            onClick={resetFilters}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-500 transition hover:bg-gray-50"
                        >
                            <Icon name="rotate-ccw" size={15} />
                            Reset
                        </button>
                    </div>

                    {/* Table Content */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1050px] text-left">
                            <thead className="bg-gray-50/80">
                                <tr className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    <th className="px-5 py-4">Nama Peminjam</th>
                                    <th className="px-5 py-4">Aset Dikembalikan</th>
                                    <th className="px-5 py-4">Tanggal Kembali</th>
                                    <th className="px-5 py-4">Kondisi</th>
                                    <th className="px-5 py-4">Status Pemeriksaan</th>
                                    <th className="px-5 py-4 text-center">Aksi</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {paginatedItems.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="transition hover:bg-gray-50/70"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-sm font-semibold text-gray-600">
                                                    {item.borrower
                                                        .split(' ')
                                                        .slice(0, 2)
                                                        .map((word) => word[0])
                                                        .join('')
                                                        .toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-800">
                                                        {item.borrower}
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-400">
                                                        {item.code}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="text-sm font-medium text-gray-700">
                                                {item.asset}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-400">
                                                {item.assetCode} · {item.quantity}{' '}
                                                {item.assetType === 'Barang'
                                                    ? 'unit'
                                                    : 'ruangan'}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="text-xs text-gray-700">
                                                {formatDate(item.actualReturnDate)}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-400">
                                                Rencana: {formatDate(item.returnDate)}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <ConditionBadge condition={item.condition} />
                                        </td>

                                        <td className="px-5 py-4">
                                            <StatusBadge status={item.status} />
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-center gap-1">
                                                <button
                                                    onClick={() => setDetailItem(item)}
                                                    title="Lihat detail"
                                                    className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
                                                >
                                                    <Icon name="eye" size={17} />
                                                </button>

                                                {item.status !== 'Selesai' &&
                                                    item.status !== 'Bermasalah' && (
                                                        <button
                                                            onClick={() => openInspection(item)}
                                                            title="Periksa aset"
                                                            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
                                                        >
                                                            <Icon
                                                                name="clipboard-check"
                                                                size={17}
                                                            />
                                                        </button>
                                                    )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {paginatedItems.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-5 py-14 text-center"
                                        >
                                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                                                <Icon
                                                    name="clipboard-list"
                                                    size={23}
                                                />
                                            </div>
                                            <p className="mt-3 text-sm font-semibold text-gray-700">
                                                Data pemeriksaan tidak ditemukan
                                            </p>
                                            <p className="mt-1 text-xs text-gray-400">
                                                Coba ubah kata kunci atau filter pencarian.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-gray-400">
                            Menampilkan{' '}
                            <span className="font-semibold text-gray-700">
                                {filteredItems.length === 0
                                    ? 0
                                    : (currentPage - 1) * PER_PAGE + 1}
                                {' - '}
                                {Math.min(
                                    currentPage * PER_PAGE,
                                    filteredItems.length,
                                )}
                            </span>{' '}
                            dari{' '}
                            <span className="font-semibold text-gray-700">
                                {filteredItems.length}
                            </span>{' '}
                            data
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage((page) => page - 1)
                                }
                                className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <Icon name="chevron-left" size={16} />
                            </button>

                            <span className="px-2 text-xs text-gray-500">
                                Halaman {currentPage} dari {totalPages}
                            </span>

                            <button
                                disabled={currentPage >= totalPages}
                                onClick={() =>
                                    setCurrentPage((page) => page + 1)
                                }
                                className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <Icon name="chevron-right" size={16} />
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* Inspection Modal */}
            {inspectionItem &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget) {
                                closeInspection();
                            }
                        }}
                    >
                        <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Pemeriksaan Aset
                                    </h2>
                                    <p className="mt-1 text-xs text-gray-400">
                                        {inspectionItem.code}
                                    </p>
                                </div>

                                <button
                                    onClick={closeInspection}
                                    className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
                                >
                                    <Icon name="x" size={19} />
                                </button>
                            </div>

                            <div className="flex-1 space-y-7 overflow-y-auto p-6">
                                <section>
                                    <SectionHeading
                                        title="Informasi Pengembalian"
                                        description="Informasi peminjam dan aset yang dikembalikan."
                                    />

                                    <div className="grid gap-5 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:grid-cols-2">
                                        <DetailItem
                                            label="Nama Peminjam"
                                            value={inspectionItem.borrower}
                                        />
                                        <DetailItem
                                            label="NIM / NIP / NIK"
                                            value={inspectionItem.identity}
                                        />
                                        <DetailItem
                                            label="Organisasi"
                                            value={inspectionItem.organization}
                                        />
                                        <DetailItem
                                            label="Kode Transaksi"
                                            value={inspectionItem.code}
                                        />
                                        <DetailItem
                                            label="Nama Aset"
                                            value={inspectionItem.asset}
                                        />
                                        <DetailItem
                                            label="Kode Aset"
                                            value={inspectionItem.assetCode}
                                        />
                                        <DetailItem
                                            label="Tanggal Peminjaman"
                                            value={formatDate(inspectionItem.borrowDate)}
                                        />
                                        <DetailItem
                                            label="Tanggal Pengembalian"
                                            value={formatDate(inspectionItem.actualReturnDate)}
                                        />
                                    </div>
                                </section>

                                <section>
                                    <SectionHeading
                                        title="Checklist Pemeriksaan"
                                        description="Pastikan seluruh bagian aset telah diperiksa sebelum menyimpan hasil."
                                    />

                                    <div className="space-y-3">
                                        {checklistItems.map((item) => (
                                            <label
                                                key={item.key}
                                                className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={checklist[item.key]}
                                                    onChange={(event) =>
                                                        updateChecklist(
                                                            item.key,
                                                            event.target.checked,
                                                        )
                                                    }
                                                    className="mt-1 h-4 w-4 rounded border-gray-300 accent-gray-900"
                                                />

                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-semibold text-gray-800">
                                                        {item.title}
                                                    </p>
                                                    <p className="mt-1 text-xs leading-5 text-gray-400">
                                                        {item.description}
                                                    </p>
                                                </div>

                                                {checklist[item.key] && (
                                                    <Icon
                                                        name="check-circle"
                                                        size={17}
                                                        className="text-gray-700"
                                                    />
                                                )}
                                            </label>
                                        ))}
                                    </div>

                                    <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                                        <span>
                                            {Object.values(checklist).filter(Boolean).length} dari 4 pemeriksaan selesai
                                        </span>
                                        <span>
                                            {Math.round(
                                                (Object.values(checklist).filter(Boolean).length / 4) * 100,
                                            )}%
                                        </span>
                                    </div>
                                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
                                        <div
                                            className="h-full rounded-full bg-gray-900 transition-all"
                                            style={{
                                                width: `${
                                                    (Object.values(checklist).filter(Boolean).length / 4) * 100
                                                }%`,
                                            }}
                                        />
                                    </div>
                                </section>

                                <section>
                                    <SectionHeading
                                        title="Kondisi Aset"
                                        description="Pilih kondisi aktual berdasarkan pemeriksaan fisik."
                                    />

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {(
                                            [
                                                'Baik',
                                                'Rusak Ringan',
                                                'Rusak Berat',
                                                'Tidak Lengkap',
                                                'Hilang',
                                            ] as AssetCondition[]
                                        ).map((item) => (
                                            <button
                                                type="button"
                                                key={item}
                                                onClick={() => {
                                                    setCondition(item);
                                                    if (item === 'Baik') {
                                                        setDecision('Layak Digunakan');
                                                    } else if (item === 'Hilang') {
                                                        setDecision('Tidak Layak');
                                                    } else {
                                                        setDecision('Perlu Perbaikan');
                                                    }
                                                }}
                                                className={`flex items-center justify-between rounded-xl border p-3 text-left transition ${
                                                    condition === item
                                                        ? 'border-gray-500 bg-gray-100 ring-1 ring-gray-300'
                                                        : 'border-gray-200 hover:bg-gray-50'
                                                }`}
                                            >
                                                <span className="text-sm font-medium text-gray-700">
                                                    {item}
                                                </span>
                                                {condition === item && (
                                                    <Icon
                                                        name="check-circle"
                                                        size={16}
                                                        className="text-gray-800"
                                                    />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <SectionHeading
                                        title="Catatan Pemeriksaan"
                                        description="Tambahkan catatan jika terdapat kerusakan, kekurangan, atau informasi lain."
                                    />

                                    <textarea
                                        rows={3}
                                        value={notes}
                                        onChange={(event) =>
                                            setNotes(event.target.value)
                                        }
                                        placeholder="Tuliskan hasil pemeriksaan aset..."
                                        className={`${inputClass} resize-none`}
                                    />
                                </section>

                                <section>
                                    <SectionHeading
                                        title="Keputusan Pemeriksaan"
                                        description="Tentukan tindak lanjut berdasarkan kondisi aset."
                                    />

                                    <div className="grid gap-3 sm:grid-cols-3">
                                        {(
                                            [
                                                {
                                                    value: 'Layak Digunakan',
                                                    icon: 'check-circle',
                                                    description: 'Aset dapat digunakan kembali.',
                                                },
                                                {
                                                    value: 'Perlu Perbaikan',
                                                    icon: 'wrench',
                                                    description: 'Aset perlu diperbaiki terlebih dahulu.',
                                                },
                                                {
                                                    value: 'Tidak Layak',
                                                    icon: 'alert-triangle',
                                                    description: 'Aset tidak dapat digunakan.',
                                                },
                                            ] as {
                                                value: InspectionDecision;
                                                icon: IconName;
                                                description: string;
                                            }[]
                                        ).map((item) => (
                                            <button
                                                type="button"
                                                key={item.value}
                                                onClick={() => setDecision(item.value)}
                                                className={`rounded-xl border p-4 text-left transition ${
                                                    decision === item.value
                                                        ? 'border-gray-500 bg-gray-100 ring-1 ring-gray-300'
                                                        : 'border-gray-200 hover:bg-gray-50'
                                                }`}
                                            >
                                                <Icon
                                                    name={item.icon}
                                                    size={19}
                                                    className="text-gray-700"
                                                />
                                                <p className="mt-3 text-sm font-semibold text-gray-800">
                                                    {item.value}
                                                </p>
                                                <p className="mt-1 text-xs leading-5 text-gray-400">
                                                    {item.description}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                {formError && (
                                    <div className="flex items-start gap-2 rounded-xl border border-gray-300 bg-gray-100 p-3 text-xs leading-5 text-gray-700">
                                        <Icon
                                            name="alert-circle"
                                            size={16}
                                            className="mt-0.5 shrink-0"
                                        />
                                        <span>{formError}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col-reverse gap-2 border-t border-gray-100 bg-white px-6 py-4 sm:flex-row sm:justify-end">
                                <button
                                    onClick={closeInspection}
                                    className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                                >
                                    Batal
                                </button>

                                <button
                                    onClick={handleSaveInspection}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
                                >
                                    <Icon name="save" size={15} />
                                    Simpan Pemeriksaan
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body,
                )}

            {/* Detail Modal */}
            {detailItem &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget) {
                                setDetailItem(null);
                            }
                        }}
                    >
                        <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Detail Pemeriksaan
                                    </h2>
                                    <p className="mt-1 text-xs text-gray-400">
                                        {detailItem.code}
                                    </p>
                                </div>

                                <button
                                    onClick={() => setDetailItem(null)}
                                    className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
                                >
                                    <Icon name="x" size={19} />
                                </button>
                            </div>

                            <div className="space-y-6 p-6">
                                <div className="flex flex-wrap items-center gap-2">
                                    <StatusBadge status={detailItem.status} />
                                    <ConditionBadge condition={detailItem.condition} />
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <DetailItem
                                        label="Nama Peminjam"
                                        value={detailItem.borrower}
                                    />
                                    <DetailItem
                                        label="Identitas"
                                        value={detailItem.identity}
                                    />
                                    <DetailItem
                                        label="Organisasi"
                                        value={detailItem.organization}
                                    />
                                    <DetailItem
                                        label="Nama Aset"
                                        value={detailItem.asset}
                                    />
                                    <DetailItem
                                        label="Kode Aset"
                                        value={detailItem.assetCode}
                                    />
                                    <DetailItem
                                        label="Jumlah"
                                        value={`${detailItem.quantity} ${
                                            detailItem.assetType === 'Barang'
                                                ? 'unit'
                                                : 'ruangan'
                                        }`}
                                    />
                                    <DetailItem
                                        label="Tanggal Kembali"
                                        value={formatDate(detailItem.actualReturnDate)}
                                    />
                                    <DetailItem
                                        label="Petugas Pemeriksa"
                                        value={detailItem.inspector}
                                    />
                                </div>

                                <div className="border-t border-gray-100 pt-5">
                                    <p className="mb-3 text-sm font-semibold text-gray-800">
                                        Hasil Checklist
                                    </p>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {checklistItems.map((item) => (
                                            <div
                                                key={item.key}
                                                className="flex items-center gap-2 text-xs text-gray-600"
                                            >
                                                <Icon
                                                    name={
                                                        detailItem[item.key]
                                                            ? 'check-circle'
                                                            : 'circle'
                                                    }
                                                    size={15}
                                                    className="text-gray-600"
                                                />
                                                {item.title}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                    <p className="text-xs text-gray-400">
                                        Keputusan Akhir
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-gray-800">
                                        {detailItem.decision || 'Belum ditentukan'}
                                    </p>

                                    <p className="mt-4 text-xs text-gray-400">
                                        Catatan Pemeriksaan
                                    </p>
                                    <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                                        {detailItem.notes || 'Tidak ada catatan.'}
                                    </p>

                                    {detailItem.inspectedAt && (
                                        <p className="mt-4 text-xs text-gray-400">
                                            Diperiksa pada {formatDate(detailItem.inspectedAt)}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end border-t border-gray-100 px-6 py-4">
                                <button
                                    onClick={() => setDetailItem(null)}
                                    className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body,
                )}
        </DashboardLayout>
    );
}
