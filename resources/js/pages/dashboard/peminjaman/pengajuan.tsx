import {
    useEffect,
    useMemo,
    useState,
    type ReactNode,
    type FormEvent,
} from 'react';
import { createPortal } from 'react-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Icon, { type IconName } from '@/components/Icon';
import AssetManagementBanner from '@/components/dashboard/AssetManagementBanner';

type BorrowingStatus =
    | 'Menunggu'
    | 'Disetujui'
    | 'Ditolak'
    | 'Dipinjam'
    | 'Selesai';

type AssetType = 'Barang' | 'Ruangan';
type BorrowingAssetType = AssetType | 'Campuran';

type Borrowing = {
    id: number;
    code: string;
    borrower: string;
    identity: string;
    borrowerType: string;
    organization: string;
    asset: string;
    assets?: BorrowingAsset[];
    assetType: BorrowingAssetType;
    quantity: number;
    purpose: string;
    borrowDate: string;
    returnDate: string;
    status: BorrowingStatus;
    submittedAt: string;
    notes: string;
};

type BorrowingAsset = {
    id: number;
    code: string;
    name: string;
    type: AssetType;
    image: string;
    location: string;
    condition: string;
    availableQuantity: number;
    summary: string;
    quantity: number;
};

const BORROWABLE_ASSETS: Omit<BorrowingAsset, 'quantity'>[] = [
    {
        id: 1,
        code: 'FAMS-BRG-001',
        name: 'Laptop Lenovo ThinkPad',
        type: 'Barang',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85',
        location: 'Gedung Fakultas Teknologi Informasi',
        condition: 'Baik',
        availableQuantity: 8,
        summary: 'Laptop untuk kegiatan akademik dan pengerjaan proyek.',
    },
    {
        id: 2,
        code: 'FAMS-BRG-002',
        name: 'Proyektor Epson',
        type: 'Barang',
        image: 'https://images.unsplash.com/photo-1528395874238-34ebe249b3f2?auto=format&fit=crop&w=900&q=85',
        location: 'Ruang Administrasi',
        condition: 'Baik',
        availableQuantity: 4,
        summary: 'Proyektor untuk presentasi, perkuliahan, dan seminar.',
    },
    {
        id: 3,
        code: 'FAMS-BRG-003',
        name: 'Kamera DSLR Canon',
        type: 'Barang',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85',
        location: 'Ruang Media',
        condition: 'Baik',
        availableQuantity: 3,
        summary: 'Kamera dokumentasi untuk kegiatan fakultas.',
    },
    {
        id: 4,
        code: 'FAMS-BRG-004',
        name: 'Printer Epson L3210',
        type: 'Barang',
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=900&q=85',
        location: 'Ruang Administrasi',
        condition: 'Baik',
        availableQuantity: 2,
        summary: 'Printer multifungsi untuk kebutuhan dokumen.',
    },
    {
        id: 5,
        code: 'FAMS-BRG-005',
        name: 'Perangkat Audio',
        type: 'Barang',
        image: 'https://images.unsplash.com/photo-1593078166031-9e8e9c4e3a9e?auto=format&fit=crop&w=900&q=85',
        location: 'Ruang Serbaguna',
        condition: 'Baik',
        availableQuantity: 2,
        summary: 'Perangkat audio untuk acara dan kegiatan fakultas.',
    },
    {
        id: 6,
        code: 'FAMS-BRG-006',
        name: 'Tablet Samsung Galaxy',
        type: 'Barang',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=85',
        location: 'Laboratorium',
        condition: 'Baik',
        availableQuantity: 5,
        summary: 'Tablet untuk presentasi dan pendukung kegiatan belajar.',
    },
    {
        id: 7,
        code: 'FAMS-RNG-001',
        name: 'Laboratorium Komputer',
        type: 'Ruangan',
        image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=85',
        location: 'Gedung Laboratorium, Lantai 2',
        condition: 'Baik',
        availableQuantity: 3,
        summary: 'Laboratorium dengan fasilitas komputer untuk praktikum.',
    },
    {
        id: 8,
        code: 'FAMS-RNG-002',
        name: 'Ruang Kelas 301',
        type: 'Ruangan',
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85',
        location: 'Gedung Fakultas, Lantai 3',
        condition: 'Baik',
        availableQuantity: 4,
        summary: 'Ruang kelas untuk perkuliahan dan kegiatan akademik.',
    },
    {
        id: 9,
        code: 'FAMS-RNG-003',
        name: 'Ruang Seminar FTI',
        type: 'Ruangan',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85',
        location: 'Gedung Fakultas, Lantai 1',
        condition: 'Baik',
        availableQuantity: 2,
        summary: 'Ruang seminar untuk presentasi dan kegiatan organisasi.',
    },
    {
        id: 10,
        code: 'FAMS-RNG-004',
        name: 'Ruang Rapat Fakultas',
        type: 'Ruangan',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85',
        location: 'Gedung Fakultas, Lantai 2',
        condition: 'Baik',
        availableQuantity: 2,
        summary: 'Ruang rapat untuk koordinasi dan diskusi tim.',
    },
    {
        id: 11,
        code: 'FAMS-RNG-005',
        name: 'Ruang Diskusi',
        type: 'Ruangan',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85',
        location: 'Gedung Fakultas, Lantai 2',
        condition: 'Baik',
        availableQuantity: 3,
        summary: 'Ruang diskusi untuk kerja kelompok dan konsultasi.',
    },
    {
        id: 12,
        code: 'FAMS-RNG-006',
        name: 'Ruang Serbaguna',
        type: 'Ruangan',
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85',
        location: 'Gedung Fakultas, Lantai 1',
        condition: 'Baik',
        availableQuantity: 2,
        summary: 'Ruang fleksibel untuk berbagai kegiatan fakultas.',
    },
];

const ASSET_CAROUSEL_PAGE_SIZE = 3;

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const initialBorrowings: Borrowing[] = [
    {
        id: 1,
        code: 'PJM-2026-001',
        borrower: 'Rendra Nur Yuliadi',
        identity: '240160121104',
        borrowerType: 'Mahasiswa',
        organization: 'UKM TahuNgoding',
        asset: 'Proyektor Epson',
        assetType: 'Barang',
        quantity: 1,
        purpose: 'Kegiatan workshop teknologi',
        borrowDate: '2026-11-04',
        returnDate: '2026-11-05',
        status: 'Menunggu',
        submittedAt: '2026-11-01',
        notes: 'Digunakan untuk kegiatan workshop.',
    },
    {
        id: 2,
        code: 'PJM-2026-002',
        borrower: 'Amelia Puji Lestari',
        identity: '240160121007',
        borrowerType: 'Mahasiswa',
        organization: 'Individu',
        asset: 'Laboratorium Komputer 1',
        assetType: 'Ruangan',
        quantity: 1,
        purpose: 'Praktikum pemrograman',
        borrowDate: '2026-11-02',
        returnDate: '2026-11-03',
        status: 'Disetujui',
        submittedAt: '2026-10-30',
        notes: 'Untuk praktikum laboratorium.',
    },
    {
        id: 3,
        code: 'PJM-2026-003',
        borrower: 'Herliana Tri Cahyanti',
        identity: '240160121044',
        borrowerType: 'Mahasiswa',
        organization: 'Himpunan Mahasiswa',
        asset: 'Kamera DSLR',
        assetType: 'Barang',
        quantity: 1,
        purpose: 'Dokumentasi kegiatan',
        borrowDate: '2026-10-29',
        returnDate: '2026-10-30',
        status: 'Dipinjam',
        submittedAt: '2026-10-27',
        notes: 'Dikembalikan setelah kegiatan selesai.',
    },
    {
        id: 4,
        code: 'PJM-2026-004',
        borrower: 'Wulan Nurfitriani',
        identity: '240160121116',
        borrowerType: 'Mahasiswa',
        organization: 'UKM TahuNgoding',
        asset: 'Ruang Seminar FTI',
        assetType: 'Ruangan',
        quantity: 1,
        purpose: 'Acara internal organisasi',
        borrowDate: '2026-10-25',
        returnDate: '2026-10-26',
        status: 'Selesai',
        submittedAt: '2026-10-22',
        notes: 'Ruangan telah selesai digunakan.',
    },
    {
        id: 5,
        code: 'PJM-2026-005',
        borrower: 'Jajang Didin',
        identity: '240160121088',
        borrowerType: 'Mahasiswa',
        organization: 'UKM TahuNgoding',
        asset: 'Laptop Lenovo ThinkPad',
        assetType: 'Barang',
        quantity: 1,
        purpose: 'Pengerjaan proyek',
        borrowDate: '2026-10-24',
        returnDate: '2026-10-25',
        status: 'Ditolak',
        submittedAt: '2026-10-21',
        notes: 'Jadwal penggunaan aset tidak tersedia.',
    },
];

const statusStyles: Record<BorrowingStatus, string> = {
    Menunggu: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    Disetujui: 'bg-neutral-200 text-neutral-800 border-neutral-300',
    Ditolak: 'bg-neutral-300 text-neutral-900 border-neutral-400',
    Dipinjam: 'bg-neutral-100 text-neutral-800 border-neutral-300',
    Selesai: 'bg-black text-white border-black',
};

const statusIcons: Record<BorrowingStatus, IconName> = {
    Menunggu: 'clock',
    Disetujui: 'check-circle',
    Ditolak: 'x-circle',
    Dipinjam: 'package',
    Selesai: 'check-check',
};

const assetTypeStyles: Record<BorrowingAssetType, string> = {
    Barang: 'bg-neutral-100 text-neutral-800 border-neutral-200',
    Ruangan: 'bg-neutral-200 text-neutral-800 border-neutral-300',
    Campuran: 'bg-neutral-100 text-neutral-700 border-neutral-200',
};

const formatDate = (date: string) =>
    date
        ? new Date(`${date}T00:00:00`).toLocaleDateString('id-ID', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
          })
        : '-';

const getBorrowingQuantityLabel = (assets?: BorrowingAsset[]) => {
    if (!assets?.length) return '';

    const itemQuantity = assets
          .filter((asset) => asset.type === 'Barang')
          .reduce((total, asset) => total + asset.quantity, 0);
    const roomQuantity = assets
          .filter((asset) => asset.type === 'Ruangan')
          .reduce((total, asset) => total + asset.quantity, 0);

    return [
          itemQuantity > 0 ? `${itemQuantity} unit` : '',
          roomQuantity > 0 ? `${roomQuantity} ruangan` : '',
    ]
          .filter(Boolean)
          .join(' · ');
};

const formatFileSize = (bytes: number) => {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const inputClass =
    'w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100';

const emptyForm = {
    // Step 1: Identitas
    photo: null as File | null,
    borrower: '',
    borrowerType: 'Mahasiswa',
    identity: '',
    faculty: 'Fakultas Teknologi Informasi',
    studyProgram: 'Informatika',
    position: '',
    phone: '',
    email: '',
    address: '',

    // Step 2: Organisasi dan kegiatan
    borrowingCategory: 'Individu',
    organization: '',
    activityName: '',
    activityPosition: '',
    responsiblePerson: '',
    responsiblePhone: '',

    // Step 3: Aset
    assetType: 'Barang' as AssetType,
    asset: '',
    selectedAssets: [] as BorrowingAsset[],
    quantity: 1,
    purpose: '',
    usageLocation: '',
    participantCount: '',

    // Step 4: Jadwal
    borrowDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    returnDate: '',
    notes: '',

    // Step 5: Dokumen
    identityDocument: null as File | null,
    applicationLetter: null as File | null,
    proposalDocument: null as File | null,
    organizationLetter: null as File | null,
    otherDocument: null as File | null,

    // Step 6: Konfirmasi
    agreement: false,
};

type BorrowingForm = typeof emptyForm;

const steps = [
    {
        title: 'Identitas Peminjam',
        description: 'Informasi pribadi peminjam',
        icon: 'user' as IconName,
    },
    {
        title: 'Organisasi & Kegiatan',
        description: 'Konteks penggunaan aset',
        icon: 'users' as IconName,
    },
    {
        title: 'Pilih Aset',
        description: 'Aset yang akan dipinjam',
        icon: 'package' as IconName,
    },
    {
        title: 'Jadwal Peminjaman',
        description: 'Waktu penggunaan aset',
        icon: 'calendar-days' as IconName,
    },
    {
        title: 'Dokumen Pendukung',
        description: 'Unggah dokumen persyaratan',
        icon: 'file-text' as IconName,
    },
    {
        title: 'Konfirmasi Pengajuan',
        description: 'Periksa dan kirim pengajuan',
        icon: 'clipboard-check' as IconName,
    },
];

function StatusBadge({ status }: { status: BorrowingStatus }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
        >
            <Icon name={statusIcons[status]} size={13} />
            {status}
        </span>
    );
}

function AssetTypeBadge({ type }: { type: BorrowingAssetType }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${assetTypeStyles[type]}`}
        >
            <Icon
                name={
                    type === 'Barang'
                        ? 'package'
                        : type === 'Ruangan'
                          ? 'building-2'
                          : 'layers'
                }
                size={13}
            />
            {type}
        </span>
    );
}

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
        <label className="block space-y-1.5">
            <span className="text-sm font-medium text-gray-700">
                {label}
                {required && <span className="ml-1 text-neutral-500">*</span>}
            </span>
            {children}
        </label>
    );
}

function DetailItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="min-w-0 space-y-1">
            <p className="text-xs text-gray-400">{label}</p>
            <p className="break-words text-sm font-medium text-gray-700">
                {value || '-'}
            </p>
        </div>
    );
}

function FileThumbnail({
    file,
    className = '',
}: {
    file: File | null;
    className?: string;
}) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!file?.type.startsWith('image/')) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [file]);

    return (
        <div
            className={`flex shrink-0 items-center justify-center overflow-hidden bg-gray-100 text-gray-400 ${className}`}
        >
            {previewUrl ? (
                <img
                    src={previewUrl}
                    alt={file?.name ?? 'Pratinjau foto'}
                    className="h-full w-full object-cover"
                />
            ) : (
                <Icon
                    name={file ? 'file-check' : 'user-round'}
                    size={file ? 20 : 28}
                />
            )}
        </div>
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

/**
 * File upload:
 * - Hanya menerima PDF, JPG, JPEG, PNG.
 * - Maksimal 10 MB per file.
 * - Jika terlalu besar, file langsung ditolak.
 * - Peringatan muncul langsung di bawah area upload.
 */
function FileUpload({
    label,
    file,
    onChange,
    required = false,
}: {
    label: string;
    file: File | null;
    onChange: (file: File | null) => void;
    required?: boolean;
}) {
    const [error, setError] = useState('');

    const handleFileChange = (selectedFile?: File) => {
        setError('');

        if (!selectedFile) {
            return;
        }

        const allowedTypes = [
            'application/pdf',
            'image/jpeg',
            'image/png',
        ];

        const allowedExtensions = /\.(pdf|jpg|jpeg|png)$/i;

        if (
            !allowedTypes.includes(selectedFile.type) &&
            !allowedExtensions.test(selectedFile.name)
        ) {
            setError('Format file tidak didukung. Gunakan PDF, JPG, atau PNG.');
            return;
        }

        if (selectedFile.size > MAX_FILE_SIZE) {
            setError(
                `File terlalu besar (${formatFileSize(selectedFile.size)}). Maksimal ukuran file adalah 10 MB.`,
            );
            return;
        }

        onChange(selectedFile);
    };

    const handleRemove = () => {
        onChange(null);
        setError('');
    };

    return (
        <Field label={label} required={required}>
            <div
                className={`rounded-xl border border-dashed p-4 transition ${
                    error
                        ? 'border-neutral-500 bg-neutral-100'
                        : 'border-gray-300 bg-gray-50 hover:border-gray-500 hover:bg-gray-100'
                }`}
            >
                <label className="flex cursor-pointer items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm">
                        <Icon name="upload-cloud" size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-700">
                            {file
                                ? file.name
                                : 'Pilih file untuk diunggah'}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                            PDF, JPG, PNG (maks. 10 MB)
                        </p>

                        {file && (
                            <p className="mt-1 text-xs text-neutral-700">
                                <Icon
                                    name="check-circle"
                                    size={12}
                                    className="inline-block align-middle"
                                />{' '}
                                {formatFileSize(file.size)} · File berhasil
                                dipilih
                            </p>
                        )}
                    </div>

                    <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                        className="hidden"
                        onChange={(event) => {
                            handleFileChange(event.target.files?.[0]);
                            event.target.value = '';
                        }}
                    />
                </label>

                {file && (
                    <div className="mt-3 flex justify-end border-t border-gray-200 pt-3">
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-black"
                        >
                            <Icon name="trash-2" size={13} />
                            Hapus file
                        </button>
                    </div>
                )}

                {error && (
                    <div className="mt-3 flex items-start gap-2 rounded-lg border border-neutral-300 bg-neutral-100 p-3 text-xs leading-5 text-neutral-700">
                        <Icon
                            name="alert-circle"
                            size={16}
                            className="mt-0.5 shrink-0"
                        />
                        <span>{error}</span>
                    </div>
                )}
            </div>
        </Field>
    );
}

export default function PengajuanPeminjaman() {
    const [borrowings, setBorrowings] = useState(initialBorrowings);
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('Semua Status');
    const [typeFilter, setTypeFilter] = useState('Semua Tipe Aset');
    const [currentPage, setCurrentPage] = useState(1);

    const [modalOpen, setModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [detailItem, setDetailItem] = useState<Borrowing | null>(null);
    const [form, setForm] = useState<BorrowingForm>({ ...emptyForm });
    const [formError, setFormError] = useState('');
    const [assetCarouselPage, setAssetCarouselPage] = useState(0);

    const perPage = 5;

    const filteredItems = useMemo(() => {
        return borrowings.filter((item) => {
            const keyword = search.toLowerCase();

            const matchesSearch =
                item.code.toLowerCase().includes(keyword) ||
                item.borrower.toLowerCase().includes(keyword) ||
                item.asset.toLowerCase().includes(keyword) ||
                item.identity.toLowerCase().includes(keyword);

            const matchesStatus =
                statusFilter === 'Semua Status' ||
                item.status === statusFilter;

            const matchesType =
                typeFilter === 'Semua Tipe Aset' ||
                item.assetType === typeFilter ||
                item.assets?.some((asset) => asset.type === typeFilter);

            return matchesSearch && matchesStatus && matchesType;
        });
    }, [borrowings, search, statusFilter, typeFilter]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredItems.length / perPage),
    );

    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage,
    );

    const borrowableAssets = useMemo(
        () =>
            BORROWABLE_ASSETS.filter(
                (asset) => asset.type === form.assetType,
            ),
        [form.assetType],
    );
    const assetCarouselPages = Math.ceil(
        borrowableAssets.length / ASSET_CAROUSEL_PAGE_SIZE,
    );
    const visibleBorrowableAssets = borrowableAssets.slice(
        assetCarouselPage * ASSET_CAROUSEL_PAGE_SIZE,
        (assetCarouselPage + 1) * ASSET_CAROUSEL_PAGE_SIZE,
    );
    const selectedAssetTypes = Array.from(
        new Set(form.selectedAssets.map((asset) => asset.type)),
    );
    const hasSelectedItems = selectedAssetTypes.includes('Barang');
    const hasSelectedRooms = selectedAssetTypes.includes('Ruangan');
    const selectedBorrowingType: BorrowingAssetType =
        selectedAssetTypes.length > 1
            ? 'Campuran'
            : selectedAssetTypes[0] ?? form.assetType;
    const selectedItemQuantity = form.selectedAssets
        .filter((asset) => asset.type === 'Barang')
        .reduce((total, asset) => total + asset.quantity, 0);
    const selectedRoomQuantity = form.selectedAssets
        .filter((asset) => asset.type === 'Ruangan')
        .reduce((total, asset) => total + asset.quantity, 0);

    const stats = [
        {
            label: 'Total Peminjaman',
            value: borrowings.length,
            icon: 'clipboard-list' as IconName,
            card: 'border-gray-900 bg-gray-950 text-white',
            labelColor: 'text-gray-300',
            valueColor: 'text-white',
            descriptionColor: 'text-gray-400',
            iconColor: 'bg-white/10 text-white',
            texture: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,.14) 1px, transparent 0)',
            description: 'Seluruh pengajuan',
        },
        {
            label: 'Menunggu Persetujuan',
            value: borrowings.filter((item) => item.status === 'Menunggu')
                .length,
            icon: 'clock' as IconName,
            card: 'border-gray-700 bg-gray-800 text-white',
            labelColor: 'text-gray-300',
            valueColor: 'text-white',
            descriptionColor: 'text-gray-400',
            iconColor: 'bg-white/10 text-gray-100',
            texture: 'repeating-linear-gradient(135deg, rgba(255,255,255,.055) 0px, rgba(255,255,255,.055) 1px, transparent 1px, transparent 10px)',
            description: 'Perlu ditinjau',
        },
        {
            label: 'Sedang Dipinjam',
            value: borrowings.filter((item) => item.status === 'Dipinjam')
                .length,
            icon: 'package' as IconName,
            card: 'border-gray-300 bg-gray-200 text-gray-950',
            labelColor: 'text-gray-600',
            valueColor: 'text-gray-950',
            descriptionColor: 'text-gray-600',
            iconColor: 'bg-white/70 text-gray-800',
            texture: 'radial-gradient(circle at 1px 1px, rgba(17,24,39,.11) 1px, transparent 0)',
            description: 'Belum dikembalikan',
        },
        {
            label: 'Selesai',
            value: borrowings.filter((item) => item.status === 'Selesai')
                .length,
            icon: 'check-circle' as IconName,
            card: 'border-gray-200 bg-white text-gray-950',
            labelColor: 'text-gray-500',
            valueColor: 'text-gray-950',
            descriptionColor: 'text-gray-500',
            iconColor: 'bg-gray-100 text-gray-700',
            texture: 'repeating-linear-gradient(45deg, rgba(17,24,39,.035) 0px, rgba(17,24,39,.035) 1px, transparent 1px, transparent 9px)',
            description: 'Telah dikembalikan',
        },
    ];

    const updateForm = <K extends keyof BorrowingForm>(
        key: K,
        value: BorrowingForm[K],
    ) => {
        setForm((previous) => ({
            ...previous,
            [key]: value,
        }));
    };

    const updateSelectedAssets = (selectedAssets: BorrowingAsset[]) => {
        setForm((previous) => ({
            ...previous,
            selectedAssets,
            asset: selectedAssets.map((asset) => asset.name).join(', '),
            quantity: selectedAssets.reduce(
                (total, asset) => total + asset.quantity,
                0,
            ),
        }));
    };

    const changeAssetType = (type: AssetType) => {
        setForm((previous) => ({ ...previous, assetType: type }));
        setFormError('');
        setAssetCarouselPage(0);
    };

    const addBorrowableAsset = (
        asset: Omit<BorrowingAsset, 'quantity'>,
    ) => {
        if (form.selectedAssets.some((selected) => selected.id === asset.id)) {
            return;
        }

        updateSelectedAssets([
            ...form.selectedAssets,
            {
                ...asset,
                quantity: 1,
            },
        ]);
        setFormError('');
    };

    const removeBorrowableAsset = (assetId: number) => {
        updateSelectedAssets(
            form.selectedAssets.filter((asset) => asset.id !== assetId),
        );
    };

    const changeBorrowableAssetQuantity = (
        assetId: number,
        quantity: number,
    ) => {
        updateSelectedAssets(
            form.selectedAssets.map((asset) =>
                asset.id === assetId
                    ? {
                          ...asset,
                          quantity: Math.max(
                              1,
                              Math.min(quantity, asset.availableQuantity),
                          ),
                      }
                    : asset,
            ),
        );
    };

    const openCreateModal = () => {
        setForm({ ...emptyForm });
        setCurrentStep(0);
        setCompletedSteps([]);
        setFormError('');
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentStep(0);
        setCompletedSteps([]);
        setFormError('');
    };

    const validateStep = (step: number) => {
        let message = '';

        if (step === 0) {
            if (!form.photo) {
                message = 'Foto profil peminjam wajib diunggah.';
            } else if (!form.borrower.trim()) {
                message = 'Nama lengkap wajib diisi.';
            } else if (!form.identity.trim()) {
                message = 'NIM/NIP/NIK wajib diisi.';
            } else if (!form.phone.trim()) {
                message = 'Nomor HP wajib diisi.';
            } else if (!form.email.trim()) {
                message = 'Email wajib diisi.';
            } else if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
            ) {
                message = 'Format email tidak valid.';
            } else if (
                form.borrowerType === 'Mahasiswa' &&
                !form.studyProgram.trim()
            ) {
                message = 'Program studi wajib diisi.';
            } else if (
                form.borrowerType === 'Staff' &&
                !form.position.trim()
            ) {
                message = 'Jabatan wajib diisi.';
            }
        }

        if (step === 1) {
            if (
                form.borrowingCategory !== 'Individu' &&
                !form.organization.trim()
            ) {
                message = 'Nama organisasi wajib diisi.';
            } else if (!form.activityName.trim()) {
                message = 'Nama kegiatan wajib diisi.';
            } else if (!form.responsiblePerson.trim()) {
                message = 'Nama penanggung jawab wajib diisi.';
            } else if (!form.responsiblePhone.trim()) {
                message = 'Nomor penanggung jawab wajib diisi.';
            }
        }

        if (step === 2) {
            if (form.selectedAssets.length === 0) {
                message = 'Pilih minimal satu aset dari katalog.';
            } else if (!form.purpose.trim()) {
                message = 'Tujuan penggunaan wajib diisi.';
            } else if (form.quantity < 1) {
                message = 'Jumlah minimal 1.';
            } else if (hasSelectedRooms && !form.usageLocation.trim()) {
                message = 'Lokasi penggunaan wajib diisi.';
            }
        }

        if (step === 3) {
            if (
                !form.borrowDate ||
                !form.startTime ||
                !form.endDate ||
                !form.endTime
            ) {
                message = 'Lengkapi tanggal dan jam peminjaman.';
            } else if (form.endDate < form.borrowDate) {
                message =
                    'Tanggal selesai tidak boleh sebelum tanggal mulai.';
            } else if (
                form.endDate === form.borrowDate &&
                form.endTime <= form.startTime
            ) {
                message = 'Jam selesai harus setelah jam mulai.';
            } else if (hasSelectedItems && !form.returnDate) {
                message =
                    'Tanggal rencana pengembalian wajib diisi.';
            } else if (hasSelectedItems && form.returnDate < form.endDate) {
                message =
                    'Tanggal pengembalian tidak boleh sebelum jadwal selesai.';
            }
        }

        if (step === 4) {
            if (!form.applicationLetter) {
                message =
                    'Surat pengajuan peminjaman wajib diunggah.';
            } else if (!form.identityDocument) {
                message = 'Kartu identitas wajib diunggah.';
            } else if (
                form.borrowingCategory !== 'Individu' &&
                !form.organizationLetter
            ) {
                message = 'Surat pengantar organisasi wajib diunggah.';
            }

            const files = [
                form.photo,
                form.identityDocument,
                form.applicationLetter,
                form.proposalDocument,
                form.organizationLetter,
                form.otherDocument,
            ].filter(Boolean) as File[];

            if (
                !message &&
                files.some((file) => file.size > MAX_FILE_SIZE)
            ) {
                message = 'Ukuran setiap file maksimal 10 MB.';
            }
        }

        if (step === 5 && !form.agreement) {
            message =
                'Anda harus menyetujui pernyataan tanggung jawab.';
        }

        setFormError(message);
        return !message;
    };

    const goNext = () => {
        if (!validateStep(currentStep)) return;

        setCompletedSteps((completed) =>
            completed.includes(currentStep)
                ? completed
                : [...completed, currentStep],
        );
        setCurrentStep((step) =>
            Math.min(step + 1, steps.length - 1),
        );
        setFormError('');
    };

    const goPrevious = () => {
        setCurrentStep((step) => Math.max(step - 1, 0));
        setFormError('');
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateStep(5)) return;

        setCompletedSteps(steps.map((_, index) => index));
        const newItem: Borrowing = {
            id: Date.now(),
            code: `PJM-${new Date().getFullYear()}-${String(
                borrowings.length + 1,
            ).padStart(3, '0')}`,
            borrower: form.borrower,
            identity: form.identity,
            borrowerType: form.borrowerType,
            organization:
                form.borrowingCategory === 'Individu'
                    ? 'Individu'
                    : form.organization,
            asset: form.selectedAssets
                .map(
                    (asset) =>
                        `${asset.name} (${asset.quantity} ${
                            asset.type === 'Barang' ? 'unit' : 'ruangan'
                        })`,
                )
                .join(', '),
            assets: form.selectedAssets.map((asset) => ({ ...asset })),
            assetType: selectedBorrowingType,
            quantity: form.selectedAssets.reduce(
                (total, asset) => total + asset.quantity,
                0,
            ),
            purpose: form.purpose,
            borrowDate: form.borrowDate,
            returnDate:
                hasSelectedItems
                    ? form.returnDate
                    : form.endDate,
            status: 'Menunggu',
            submittedAt: new Date().toISOString().slice(0, 10),
            notes: form.notes,
        };

        setBorrowings((previous) => [newItem, ...previous]);
        setSubmissionMessage(`Pengajuan ${newItem.code} berhasil dibuat dan berstatus Menunggu.`);
        setForm({ ...emptyForm });
        setCompletedSteps([]);
        setCurrentStep(0);
        setFormError('');
    };

    const updateStatus = (
        id: number,
        status: BorrowingStatus,
    ) => {
        setBorrowings((previous) =>
            previous.map((item) =>
                item.id === id ? { ...item, status } : item,
            ),
        );

        setDetailItem((previous) =>
            previous?.id === id
                ? { ...previous, status }
                : previous,
        );
    };

    const resetFilters = () => {
        setSearch('');
        setStatusFilter('Semua Status');
        setTypeFilter('Semua Tipe Aset');
        setCurrentPage(1);
    };

    const confirmationDocuments: {
        label: string;
        file: File | null;
    }[] = [
        { label: 'Surat Pengajuan', file: form.applicationLetter },
        { label: 'Kartu Identitas', file: form.identityDocument },
        { label: 'Proposal Kegiatan', file: form.proposalDocument },
        { label: 'Surat Organisasi', file: form.organizationLetter },
        { label: 'Dokumen Lainnya', file: form.otherDocument },
    ];

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div>
                        <SectionHeading
                            title="Identitas Peminjam"
                            description="Lengkapi informasi pribadi orang yang bertanggung jawab atas peminjaman."
                        />

                        <div className="mb-5 flex flex-col items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-5 sm:flex-row">
                            <FileThumbnail
                                file={form.photo}
                                className="h-20 w-20 rounded-full border border-gray-200 bg-white"
                            />

                            <div className="flex-1 text-center sm:text-left">
                                <p className="text-sm font-semibold text-gray-800">
                                    Foto Profil Peminjam{' '}
                                    <span className="text-neutral-500">*</span>
                                </p>
                                <p className="mt-1 text-xs text-gray-400">
                                    Gunakan foto yang jelas. Format JPG atau
                                    PNG. Maksimal 10 MB.
                                </p>

                                <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50">
                                    <Icon name="upload" size={14} />
                                    Pilih Foto
                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file =
                                                e.target.files?.[0];
                                            if (!file) return;

                                            if (
                                                file.size > MAX_FILE_SIZE
                                            ) {
                                                setFormError(
                                                    `Foto terlalu besar (${formatFileSize(file.size)}). Maksimal 10 MB.`,
                                                );
                                                e.target.value = '';
                                                return;
                                            }

                                            updateForm('photo', file);
                                            setFormError('');
                                        }}
                                    />
                                </label>

                                {form.photo && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateForm('photo', null)
                                        }
                                        className="ml-2 text-xs text-neutral-600"
                                    >
                                        Hapus
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Tipe Peminjam" required>
                                <select
                                    value={form.borrowerType}
                                    onChange={(e) =>
                                        updateForm(
                                            'borrowerType',
                                            e.target.value,
                                        )
                                    }
                                    className={inputClass}
                                >
                                    <option>Mahasiswa</option>
                                    <option>Dosen</option>
                                    <option>Staff</option>
                                    <option>Pihak Eksternal</option>
                                </select>
                            </Field>

                            <Field label="Nama Lengkap" required>
                                <input
                                    value={form.borrower}
                                    onChange={(e) =>
                                        updateForm(
                                            'borrower',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Masukkan nama lengkap"
                                    className={inputClass}
                                />
                            </Field>

                            <Field label="NIM / NIP / NIK" required>
                                <input
                                    value={form.identity}
                                    onChange={(e) =>
                                        updateForm(
                                            'identity',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Masukkan nomor identitas"
                                    className={inputClass}
                                />
                            </Field>

                            <Field label="Fakultas / Instansi">
                                <input
                                    value={form.faculty}
                                    onChange={(e) =>
                                        updateForm(
                                            'faculty',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Nama fakultas atau instansi"
                                    className={inputClass}
                                />
                            </Field>

                            {(form.borrowerType === 'Mahasiswa' ||
                                form.borrowerType === 'Dosen') && (
                                <Field
                                    label="Program Studi"
                                    required={
                                        form.borrowerType === 'Mahasiswa'
                                    }
                                >
                                    <input
                                        value={form.studyProgram}
                                        onChange={(e) =>
                                            updateForm(
                                                'studyProgram',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Contoh: Informatika"
                                        className={inputClass}
                                    />
                                </Field>
                            )}

                            {(form.borrowerType === 'Staff' ||
                                form.borrowerType === 'Dosen') && (
                                <Field label="Jabatan">
                                    <input
                                        value={form.position}
                                        onChange={(e) =>
                                            updateForm(
                                                'position',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Masukkan jabatan"
                                        className={inputClass}
                                    />
                                </Field>
                            )}

                            <Field label="Nomor HP / WhatsApp" required>
                                <input
                                    value={form.phone}
                                    onChange={(e) =>
                                        updateForm('phone', e.target.value)
                                    }
                                    placeholder="08xxxxxxxxxx"
                                    className={inputClass}
                                />
                            </Field>

                            <Field label="Email Aktif" required>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) =>
                                        updateForm('email', e.target.value)
                                    }
                                    placeholder="nama@email.com"
                                    className={inputClass}
                                />
                            </Field>

                            <div className="sm:col-span-2">
                                <Field label="Alamat">
                                    <textarea
                                        rows={2}
                                        value={form.address}
                                        onChange={(e) =>
                                            updateForm(
                                                'address',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Alamat domisili atau instansi"
                                        className={inputClass}
                                    />
                                </Field>
                            </div>
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div>
                        <SectionHeading
                            title="Organisasi dan Kegiatan"
                            description="Jelaskan konteks peminjaman dan kegiatan yang akan dilaksanakan."
                        />

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Jenis Peminjaman" required>
                                <select
                                    value={form.borrowingCategory}
                                    onChange={(e) =>
                                        updateForm(
                                            'borrowingCategory',
                                            e.target.value,
                                        )
                                    }
                                    className={inputClass}
                                >
                                    <option>Individu</option>
                                    <option>Organisasi</option>
                                    <option>Kepanitiaan</option>
                                </select>
                            </Field>

                            {form.borrowingCategory !== 'Individu' && (
                                <Field
                                    label="Nama Organisasi / Kepanitiaan"
                                    required
                                >
                                    <input
                                        value={form.organization}
                                        onChange={(e) =>
                                            updateForm(
                                                'organization',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Contoh: UKM TahuNgoding"
                                        className={inputClass}
                                    />
                                </Field>
                            )}

                            <div className="sm:col-span-2">
                                <Field label="Nama Kegiatan" required>
                                    <input
                                        value={form.activityName}
                                        onChange={(e) =>
                                            updateForm(
                                                'activityName',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Contoh: Workshop Teknologi"
                                        className={inputClass}
                                    />
                                </Field>
                            </div>

                            {form.borrowingCategory !== 'Individu' && (
                                <Field label="Jabatan dalam Kegiatan">
                                    <input
                                        value={form.activityPosition}
                                        onChange={(e) =>
                                            updateForm(
                                                'activityPosition',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Contoh: Koordinator Logistik"
                                        className={inputClass}
                                    />
                                </Field>
                            )}

                            <Field
                                label="Nama Penanggung Jawab"
                                required
                            >
                                <input
                                    value={form.responsiblePerson}
                                    onChange={(e) =>
                                        updateForm(
                                            'responsiblePerson',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Nama penanggung jawab kegiatan"
                                    className={inputClass}
                                />
                            </Field>

                            <Field
                                label="Nomor HP Penanggung Jawab"
                                required
                            >
                                <input
                                    value={form.responsiblePhone}
                                    onChange={(e) =>
                                        updateForm(
                                            'responsiblePhone',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="08xxxxxxxxxx"
                                    className={inputClass}
                                />
                            </Field>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div>
                        <SectionHeading
                            title="Pilih Aset"
                            description="Pilih barang dan ruangan sekaligus. Atur jumlah setiap aset secara terpisah."
                        />

                        <div className="mb-5 grid grid-cols-2 gap-3">
                            {(['Barang', 'Ruangan'] as AssetType[]).map(
                                (type) => (
                                    <button
                                        type="button"
                                        key={type}
                                        onClick={() => changeAssetType(type)}
                                        className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                                            form.assetType === type
                                                ? 'border-gray-900 bg-gray-50 ring-1 ring-gray-900'
                                                : 'border-gray-200 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-600 shadow-sm">
                                            <Icon
                                                name={
                                                    type === 'Barang'
                                                        ? 'package'
                                                        : 'building-2'
                                                }
                                                size={20}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">
                                                {type}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-400">
                                                {type === 'Barang'
                                                    ? 'Peralatan dan inventaris'
                                                    : 'Ruangan dan fasilitas'}
                                            </p>
                                        </div>
                                    </button>
                                ),
                            )}
                        </div>

                        <div className="mb-4 flex items-center justify-between gap-3">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-800">
                                    Katalog {form.assetType}
                                </h4>
                                <p className="mt-1 text-xs text-gray-400">
                                    Pilih aset yang ingin dimasukkan ke
                                    pengajuan.
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    aria-label="Aset sebelumnya"
                                    disabled={assetCarouselPage === 0}
                                    onClick={() =>
                                        setAssetCarouselPage((page) =>
                                            Math.max(0, page - 1),
                                        )
                                    }
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <Icon name="chevron-left" size={17} />
                                </button>
                                <button
                                    type="button"
                                    aria-label="Aset berikutnya"
                                    disabled={
                                        assetCarouselPage >=
                                        assetCarouselPages - 1
                                    }
                                    onClick={() =>
                                        setAssetCarouselPage((page) =>
                                            Math.min(
                                                assetCarouselPages - 1,
                                                page + 1,
                                            ),
                                        )
                                    }
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <Icon name="chevron-right" size={17} />
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {visibleBorrowableAssets.map((asset) => {
                                const selectedAsset =
                                    form.selectedAssets.find(
                                        (selected) =>
                                            selected.id === asset.id,
                                    );

                                return (
                                    <article
                                        key={asset.id}
                                        className={`overflow-hidden rounded-2xl border bg-white transition ${
                                            selectedAsset
                                                ? 'border-gray-900 ring-1 ring-gray-900 shadow-md'
                                                : 'border-gray-200 hover:border-gray-400 hover:shadow-md'
                                        }`}
                                    >
                                        <div className="relative h-40 overflow-hidden bg-gray-100">
                                            <img
                                                src={asset.image}
                                                alt={asset.name}
                                                className="h-full w-full object-cover transition duration-500 hover:scale-105"
                                            />
                                            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-gray-700 shadow-sm">
                                                {asset.type}
                                            </span>
                                            <span className="absolute right-3 top-3 rounded-full bg-gray-950/85 px-2.5 py-1 text-[10px] font-semibold text-white">
                                                Tersedia
                                            </span>
                                        </div>

                                        <div className="space-y-3 p-4">
                                            <div>
                                                <p className="text-[10px] font-medium tracking-wide text-gray-400">
                                                    {asset.code}
                                                </p>
                                                <h5 className="mt-1 line-clamp-1 text-sm font-semibold text-gray-900">
                                                    {asset.name}
                                                </h5>
                                                <p className="mt-1 line-clamp-2 min-h-9 text-xs leading-5 text-gray-500">
                                                    {asset.summary}
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 rounded-xl bg-gray-50 p-3 text-[10px]">
                                                <div className="min-w-0">
                                                    <p className="text-gray-400">
                                                        Lokasi
                                                    </p>
                                                    <p className="mt-1 truncate font-medium text-gray-700">
                                                        {asset.location}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-400">
                                                        Kondisi
                                                    </p>
                                                    <p className="mt-1 font-medium text-gray-700">
                                                        {asset.condition}
                                                    </p>
                                                </div>
                                                <div className="col-span-2">
                                                    <p className="text-gray-400">
                                                        {form.assetType ===
                                                        'Barang'
                                                            ? 'Stok tersedia'
                                                            : 'Kapasitas peminjaman'}
                                                    </p>
                                                    <p className="mt-1 font-medium text-gray-700">
                                                        {form.assetType ===
                                                        'Barang'
                                                            ? `${asset.availableQuantity} unit`
                                                            : '1 ruangan'}
                                                    </p>
                                                </div>
                                            </div>

                                            {selectedAsset ? (
                                                <div className="flex items-center justify-between gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            aria-label={`Kurangi ${asset.name}`}
                                                            onClick={() =>
                                                                changeBorrowableAssetQuantity(
                                                                    asset.id,
                                                                    selectedAsset.quantity -
                                                                        1,
                                                                )
                                                            }
                                                            disabled={
                                                                selectedAsset.quantity <=
                                                                1
                                                            }
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-700 disabled:opacity-40"
                                                        >
                                                            <Icon
                                                                name="minus"
                                                                size={14}
                                                            />
                                                        </button>
                                                        <span className="min-w-16 text-center text-xs font-semibold text-gray-800">
                                                            {
                                                                selectedAsset.quantity
                                                            }{' '}
                                                            {asset.type ===
                                                            'Barang'
                                                                ? 'unit'
                                                                : 'ruangan'}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            aria-label={`Tambah ${asset.name}`}
                                                            onClick={() =>
                                                                changeBorrowableAssetQuantity(
                                                                    asset.id,
                                                                    selectedAsset.quantity +
                                                                        1,
                                                                )
                                                            }
                                                            disabled={
                                                                selectedAsset.quantity >=
                                                                asset.availableQuantity
                                                            }
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-700 disabled:opacity-40"
                                                        >
                                                            <Icon
                                                                name="plus"
                                                                size={14}
                                                            />
                                                        </button>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeBorrowableAsset(
                                                                asset.id,
                                                            )
                                                        }
                                                        className="text-xs font-semibold text-gray-500 underline underline-offset-2 hover:text-gray-900"
                                                    >
                                                        Batalkan
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        addBorrowableAsset(
                                                            asset,
                                                        )
                                                    }
                                                    className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-gray-950 text-xs font-semibold text-white transition hover:bg-gray-700"
                                                >
                                                    <Icon
                                                        name="plus"
                                                        size={15}
                                                    />
                                                    Pinjam aset
                                                </button>
                                            )}
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                            <span>
                                Menampilkan{' '}
                                {assetCarouselPage *
                                    ASSET_CAROUSEL_PAGE_SIZE +
                                    1}
                                –
                                {Math.min(
                                    (assetCarouselPage + 1) *
                                        ASSET_CAROUSEL_PAGE_SIZE,
                                    borrowableAssets.length,
                                )}{' '}
                                dari {borrowableAssets.length} aset
                            </span>
                            <span>
                                Halaman {assetCarouselPage + 1} dari{' '}
                                {assetCarouselPages}
                            </span>
                        </div>

                        <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
                            <div className="flex items-start gap-3">
                                <Icon
                                    name="clipboard-list"
                                    size={18}
                                    className="mt-0.5 shrink-0 text-gray-600"
                                />
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <p className="text-sm font-semibold text-gray-800">
                                            Aset yang dipilih
                                        </p>
                                        <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-gray-600">
                                            {form.selectedAssets.length} aset ·{' '}
                                            {selectedItemQuantity > 0 &&
                                                `${selectedItemQuantity} unit`}
                                            {selectedItemQuantity > 0 &&
                                                selectedRoomQuantity > 0 &&
                                                ' · '}
                                            {selectedRoomQuantity > 0 &&
                                                `${selectedRoomQuantity} ruangan`}
                                            {form.selectedAssets.length ===
                                                0 && 'belum dipilih'}
                                        </span>
                                    </div>
                                    {form.selectedAssets.length > 0 ? (
                                        <ul className="mt-3 space-y-2">
                                            {form.selectedAssets.map(
                                                (asset) => (
                                                    <li
                                                        key={asset.id}
                                                        className="flex items-center justify-between gap-3 text-xs text-gray-600"
                                                    >
                                                        <span className="min-w-0 truncate">
                                                            {asset.name}
                                                        </span>
                                                        <span className="shrink-0 font-semibold text-gray-800">
                                                            {asset.quantity}{' '}
                                                            {asset.type ===
                                                            'Barang'
                                                                ? 'unit'
                                                                : 'ruangan'}
                                                        </span>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    ) : (
                                        <p className="mt-2 text-xs text-gray-500">
                                            Belum ada aset dipilih.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <Field label="Tujuan Penggunaan" required>
                                    <textarea
                                        rows={3}
                                        value={form.purpose}
                                        onChange={(e) =>
                                            updateForm(
                                                'purpose',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Jelaskan tujuan penggunaan aset secara rinci..."
                                        className={inputClass}
                                    />
                                </Field>
                            </div>

                            <Field
                                label="Lokasi Penggunaan"
                                required={hasSelectedRooms}
                            >
                                <input
                                    value={form.usageLocation}
                                    onChange={(e) =>
                                        updateForm(
                                            'usageLocation',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Contoh: Gedung FTI Lantai 2"
                                    className={inputClass}
                                />
                            </Field>

                            {hasSelectedRooms && (
                                <Field label="Perkiraan Jumlah Peserta">
                                    <input
                                        type="number"
                                        min={1}
                                        value={form.participantCount}
                                        onChange={(e) =>
                                            updateForm(
                                                'participantCount',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Contoh: 30"
                                        className={inputClass}
                                    />
                                </Field>
                            )}
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div>
                        <SectionHeading
                            title="Jadwal Peminjaman"
                            description="Tentukan waktu mulai dan selesai penggunaan aset."
                        />

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Tanggal Mulai" required>
                                <input
                                    type="date"
                                    value={form.borrowDate}
                                    onChange={(e) =>
                                        updateForm(
                                            'borrowDate',
                                            e.target.value,
                                        )
                                    }
                                    className={inputClass}
                                />
                            </Field>

                            <Field label="Jam Mulai" required>
                                <input
                                    type="time"
                                    value={form.startTime}
                                    onChange={(e) =>
                                        updateForm(
                                            'startTime',
                                            e.target.value,
                                        )
                                    }
                                    className={inputClass}
                                />
                            </Field>

                            <Field label="Tanggal Selesai" required>
                                <input
                                    type="date"
                                    min={form.borrowDate || undefined}
                                    value={form.endDate}
                                    onChange={(e) =>
                                        updateForm(
                                            'endDate',
                                            e.target.value,
                                        )
                                    }
                                    className={inputClass}
                                />
                            </Field>

                            <Field label="Jam Selesai" required>
                                <input
                                    type="time"
                                    value={form.endTime}
                                    onChange={(e) =>
                                        updateForm('endTime', e.target.value)
                                    }
                                    className={inputClass}
                                />
                            </Field>

                            {hasSelectedItems && (
                                <div className="sm:col-span-2">
                                    <Field
                                        label="Rencana Tanggal Pengembalian Barang"
                                        required
                                    >
                                        <input
                                            type="date"
                                            min={
                                                form.endDate ||
                                                form.borrowDate ||
                                                undefined
                                            }
                                            value={form.returnDate}
                                            onChange={(e) =>
                                                updateForm(
                                                    'returnDate',
                                                    e.target.value,
                                                )
                                            }
                                            className={inputClass}
                                        />
                                    </Field>
                                </div>
                            )}

                            <div className="sm:col-span-2">
                                <Field label="Catatan Tambahan">
                                    <textarea
                                        rows={3}
                                        value={form.notes}
                                        onChange={(e) =>
                                            updateForm('notes', e.target.value)
                                        }
                                        placeholder="Informasi tambahan terkait jadwal atau penggunaan aset..."
                                        className={inputClass}
                                    />
                                </Field>
                            </div>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div>
                        <SectionHeading
                            title="Dokumen Pendukung"
                            description="Unggah dokumen untuk membantu proses verifikasi pengajuan."
                        />

                        <div className="space-y-4">
                            <FileUpload
                                label="Surat Pengajuan Peminjaman"
                                file={form.applicationLetter}
                                onChange={(file) =>
                                    updateForm('applicationLetter', file)
                                }
                                required
                            />

                            <FileUpload
                                label="Kartu Identitas (KTM / KTP / Kartu Pegawai)"
                                file={form.identityDocument}
                                onChange={(file) =>
                                    updateForm('identityDocument', file)
                                }
                                required
                            />

                            <FileUpload
                                label="Proposal Kegiatan"
                                file={form.proposalDocument}
                                onChange={(file) =>
                                    updateForm('proposalDocument', file)
                                }
                            />

                            {form.borrowingCategory !== 'Individu' && (
                                <FileUpload
                                    label="Surat Pengantar Organisasi"
                                    file={form.organizationLetter}
                                    onChange={(file) =>
                                        updateForm(
                                            'organizationLetter',
                                            file,
                                        )
                                    }
                                    required
                                />
                            )}

                            <FileUpload
                                label="Dokumen Pendukung Lainnya"
                                file={form.otherDocument}
                                onChange={(file) =>
                                    updateForm('otherDocument', file)
                                }
                            />
                        </div>

                        <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
                            <div className="flex items-start gap-3">
                                <Icon
                                    name="file-check"
                                    size={18}
                                    className="mt-0.5 shrink-0 text-gray-500"
                                />

                                <div>
                                    <p className="text-sm font-medium text-gray-700">
                                        Ketentuan dokumen
                                    </p>

                                    <ul className="mt-2 space-y-1 text-xs leading-5 text-gray-500">
                                        <li>
                                            Format yang diterima PDF, JPG, dan
                                            PNG.
                                        </li>
                                        <li>
                                            Ukuran maksimal 10 MB untuk setiap
                                            file.
                                        </li>
                                        <li>
                                            Jika file melebihi 10 MB, file
                                            otomatis ditolak dan akan muncul
                                            peringatan.
                                        </li>
                                        <li>
                                            Pastikan dokumen dapat dibaca
                                            dengan jelas.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div>
                        <SectionHeading
                            title="Konfirmasi Pengajuan"
                            description="Periksa kembali data yang telah diisi sebelum mengirim pengajuan."
                        />

                        <div className="space-y-5">
                            <div className="rounded-xl border border-gray-200 p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <h4 className="text-sm font-semibold text-gray-800">
                                        Identitas Peminjam
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={() => setCurrentStep(0)}
                                        className="text-xs font-medium text-gray-500 hover:text-gray-900"
                                    >
                                        Ubah
                                    </button>
                                </div>

                                <div className="mb-4 flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                                    <FileThumbnail
                                        file={form.photo}
                                        className="h-16 w-16 rounded-full border border-gray-200"
                                    />
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold text-gray-700">
                                            Foto profil
                                        </p>
                                        <p className="mt-1 truncate text-xs text-gray-500">
                                            {form.photo?.name ??
                                                'Tidak ada foto yang diunggah'}
                                        </p>
                                        {form.photo && (
                                            <p className="mt-0.5 text-[10px] text-gray-400">
                                                {formatFileSize(
                                                    form.photo.size,
                                                )}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <DetailItem
                                        label="Nama Lengkap"
                                        value={form.borrower}
                                    />
                                    <DetailItem
                                        label="Tipe Peminjam"
                                        value={form.borrowerType}
                                    />
                                    <DetailItem
                                        label="NIM / NIP / NIK"
                                        value={form.identity}
                                    />
                                    <DetailItem
                                        label="Fakultas / Instansi"
                                        value={form.faculty}
                                    />
                                    <DetailItem
                                        label="Program Studi"
                                        value={form.studyProgram}
                                    />
                                    <DetailItem
                                        label="Nomor HP"
                                        value={form.phone}
                                    />
                                    <DetailItem
                                        label="Email"
                                        value={form.email}
                                    />
                                    <DetailItem
                                        label="Jabatan"
                                        value={form.position}
                                    />
                                    <div className="sm:col-span-2">
                                        <DetailItem
                                            label="Alamat"
                                            value={form.address}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-200 p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <h4 className="text-sm font-semibold text-gray-800">
                                        Organisasi dan Kegiatan
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={() => setCurrentStep(1)}
                                        className="text-xs font-medium text-gray-500 hover:text-gray-900"
                                    >
                                        Ubah
                                    </button>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <DetailItem
                                        label="Jenis Peminjaman"
                                        value={form.borrowingCategory}
                                    />
                                    <DetailItem
                                        label="Organisasi"
                                        value={
                                            form.organization || 'Individu'
                                        }
                                    />
                                    <DetailItem
                                        label="Nama Kegiatan"
                                        value={form.activityName}
                                    />
                                    <DetailItem
                                        label="Jabatan dalam Kegiatan"
                                        value={form.activityPosition}
                                    />
                                    <DetailItem
                                        label="Penanggung Jawab"
                                        value={form.responsiblePerson}
                                    />
                                    <DetailItem
                                        label="Nomor Penanggung Jawab"
                                        value={form.responsiblePhone}
                                    />
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-200 p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <h4 className="text-sm font-semibold text-gray-800">
                                        Aset dan Jadwal
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={() => setCurrentStep(2)}
                                        className="text-xs font-medium text-gray-500 hover:text-gray-900"
                                    >
                                        Ubah
                                    </button>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <DetailItem
                                        label="Tipe Aset"
                                        value={selectedBorrowingType}
                                    />
                                    <DetailItem
                                        label="Nama Aset"
                                        value={`${form.selectedAssets.length} aset dipilih`}
                                    />
                                    <DetailItem
                                        label="Jumlah"
                                        value={
                                            getBorrowingQuantityLabel(
                                                form.selectedAssets,
                                            ) || '0'
                                        }
                                    />
                                    <DetailItem
                                        label="Tujuan Penggunaan"
                                        value={form.purpose}
                                    />
                                    <DetailItem
                                        label="Tanggal Mulai"
                                        value={formatDate(form.borrowDate)}
                                    />
                                    <DetailItem
                                        label="Jam Mulai"
                                        value={form.startTime}
                                    />
                                    <DetailItem
                                        label="Tanggal Selesai"
                                        value={formatDate(form.endDate)}
                                    />
                                    <DetailItem
                                        label="Jam Selesai"
                                        value={form.endTime}
                                    />

                                    {hasSelectedItems && (
                                        <DetailItem
                                            label="Rencana Pengembalian"
                                            value={formatDate(
                                                form.returnDate,
                                            )}
                                        />
                                    )}
                                    {hasSelectedRooms && (
                                        <DetailItem
                                            label="Perkiraan Jumlah Peserta"
                                            value={form.participantCount}
                                        />
                                    )}
                                    <DetailItem
                                        label="Lokasi Penggunaan"
                                        value={form.usageLocation}
                                    />
                                    <div className="sm:col-span-2">
                                        <DetailItem
                                            label="Catatan Tambahan"
                                            value={form.notes}
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                    {form.selectedAssets.map((asset) => (
                                        <div
                                            key={asset.id}
                                            className="flex min-w-0 gap-3 rounded-xl border border-gray-100 p-3"
                                        >
                                            <img
                                                src={asset.image}
                                                alt={asset.name}
                                                className="h-20 w-24 shrink-0 rounded-lg bg-gray-100 object-cover"
                                            />
                                            <div className="min-w-0">
                                                <p className="text-[10px] font-medium text-gray-400">
                                                    {asset.code}
                                                </p>
                                                <p className="mt-1 truncate text-xs font-semibold text-gray-800">
                                                    {asset.name}
                                                </p>
                                                <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-gray-500">
                                                    {asset.summary}
                                                </p>
                                                <p className="mt-1 text-[10px] text-gray-500">
                                                    {asset.quantity}{' '}
                                                    {asset.type === 'Barang'
                                                        ? 'unit'
                                                        : 'ruangan'}{' '}
                                                    · {asset.location}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-200 p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <h4 className="text-sm font-semibold text-gray-800">
                                        Dokumen Terlampir
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={() => setCurrentStep(4)}
                                        className="text-xs font-medium text-gray-500 hover:text-gray-900"
                                    >
                                        Ubah
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {confirmationDocuments
                                        .filter(
                                            (
                                                document,
                                            ): document is {
                                                label: string;
                                                file: File;
                                            } => document.file !== null,
                                        )
                                        .map(({ label, file }) => (
                                            <div
                                                key={label}
                                                className="flex min-w-0 items-center gap-3 rounded-xl bg-gray-50 p-3"
                                            >
                                                <FileThumbnail
                                                    file={file}
                                                    className="h-14 w-16 rounded-lg border border-gray-200"
                                                />
                                                <div className="min-w-0">
                                                    <p className="text-[10px] font-medium text-gray-400">
                                                        {label}
                                                    </p>
                                                    <p className="mt-1 truncate text-xs font-semibold text-gray-700">
                                                        {file.name}
                                                    </p>
                                                    <p className="mt-0.5 text-[10px] text-gray-400">
                                                        {formatFileSize(
                                                            file.size,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                                <input
                                    type="checkbox"
                                    checked={form.agreement}
                                    onChange={(e) =>
                                        updateForm(
                                            'agreement',
                                            e.target.checked,
                                        )
                                    }
                                    className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-gray-900"
                                />
                                <span className="text-xs leading-5 text-gray-600">
                                    Saya menyatakan bahwa seluruh data yang
                                    diberikan benar. Saya bersedia
                                    bertanggung jawab atas aset yang
                                    dipinjam, menjaga kondisi dan keamanan
                                    aset, mengikuti ketentuan fakultas,
                                    serta mengembalikan aset sesuai jadwal
                                    yang telah ditentukan.
                                </span>
                            </label>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-[1500px] space-y-6 pb-10">
                <AssetManagementBanner
                    title="Pengajuan Peminjaman."
                    description="Ajukan peminjaman barang dan ruangan fakultas melalui satu alur yang terarah. Lengkapi setiap tahap agar pengajuan dapat ditinjau pengelola."
                    contextLabel="Layanan peminjaman"
                    icon="clipboard-list"
                    statusLabel="Formulir pengajuan"
                    metrics={[
                        { label: 'Tahapan pengajuan', value: '06' },
                        { label: 'Ukuran dokumen', value: '10 MB' },
                    ]}
                />

                {submissionMessage && (
                    <div role="status" className="flex items-start gap-3 rounded-xl border border-gray-300 bg-gray-100 p-4 text-sm text-gray-800">
                        <Icon name="check-circle" size={18} className="mt-0.5 shrink-0" />
                        <div className="min-w-0 flex-1">
                            <p className="font-semibold">Pengajuan berhasil dikirim</p>
                            <p className="mt-1 text-xs text-gray-600">{submissionMessage}</p>
                        </div>
                        <button type="button" onClick={() => setSubmissionMessage('')} aria-label="Tutup notifikasi" className="rounded-lg p-1 text-gray-500 hover:bg-gray-200">
                            <Icon name="x" size={16} />
                        </button>
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                    <span>Dashboard</span>
                    <Icon name="chevron-right" size={13} />
                    <span>Peminjaman</span>
                    <Icon name="chevron-right" size={13} />
                    <span className="font-semibold text-gray-700">Pengajuan Peminjaman</span>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">Formulir layanan aset</p>
                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">Buat Pengajuan Baru</h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">Isi informasi secara bertahap. Data yang sudah dimasukkan akan tetap tersimpan selama halaman ini terbuka.</p>
                    </div>
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600">
                        <span className="h-2 w-2 rounded-full bg-gray-900" />
                        Tahap {currentStep + 1} dari {steps.length}
                    </div>
                </div>

                <div className="grid items-start gap-5 xl:grid-cols-[290px_minmax(0,1fr)]">
                    {/* Step navigation */}
                    <aside className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm xl:sticky xl:top-5">
                        <div className="border-b border-gray-100 bg-gray-950 p-5 text-white">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">Progress pengajuan</span>
                                <Icon name="list-checks" size={18} className="text-gray-300" />
                            </div>
                            <p className="mt-3 text-3xl font-bold">{Math.round(((currentStep + 1) / steps.length) * 100)}%</p>
                            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/15">
                                <div className="h-full rounded-full bg-white transition-all duration-300" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
                            </div>
                            <p className="mt-2 text-xs text-gray-400">Lengkapi seluruh tahapan untuk mengirim permohonan.</p>
                        </div>
                        <nav className="p-3">
                            {steps.map((step, index) => {
                                const active = currentStep === index;
                                const completed = completedSteps.includes(index);
                                return (
                                    <button
                                        key={step.title}
                                        type="button"
                                        disabled={index > currentStep && !completedSteps.includes(index - 1)}
                                        onClick={() => {
                                            if (index <= currentStep || completedSteps.includes(index - 1)) {
                                                setCurrentStep(index);
                                                setFormError('');
                                            }
                                        }}
                                        className={`group flex w-full items-start gap-3 rounded-xl p-3 text-left transition ${active ? 'bg-gray-950 text-white shadow-sm' : completed ? 'bg-gray-50 text-gray-800 hover:bg-gray-100' : 'text-gray-400 disabled:cursor-not-allowed'}`}
                                    >
                                        <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${active ? 'border-white/20 bg-white/10 text-white' : completed ? 'border-gray-300 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-400'}`}>
                                            {completed ? <Icon name="check" size={16} /> : <Icon name={step.icon} size={16} />}
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className={`block text-sm font-semibold ${active ? 'text-white' : 'text-gray-800'}`}>{step.title}</span>
                                            <span className={`mt-1 block text-[11px] leading-4 ${active ? 'text-gray-400' : 'text-gray-400'}`}>{step.description}</span>
                                        </span>
                                        {active && <Icon name="arrow-right" size={15} className="mt-2 shrink-0" />}
                                    </button>
                                );
                            })}
                        </nav>
                        <div className="border-t border-gray-100 p-4">
                            <div className="flex items-start gap-2 rounded-xl bg-gray-50 p-3">
                                <Icon name="shield-check" size={16} className="mt-0.5 shrink-0 text-gray-500" />
                                <p className="text-[11px] leading-5 text-gray-500">Pastikan informasi dan dokumen yang dikirim benar. Pengajuan akan berstatus menunggu setelah dikirim.</p>
                            </div>
                        </div>
                    </aside>

                    {/* Main form */}
                    <section className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-5 sm:px-7">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-950 text-white">
                                    <Icon name={steps[currentStep].icon} size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">Tahap {String(currentStep + 1).padStart(2, '0')}</p>
                                    <h2 className="mt-0.5 text-lg font-bold text-gray-900">{steps[currentStep].title}</h2>
                                </div>
                            </div>
                            <span className="rounded-full border border-gray-200 px-3 py-1.5 text-[11px] font-medium text-gray-500">{steps[currentStep].description}</span>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="min-h-[480px] px-5 py-6 sm:px-7 sm:py-7">
                                {formError && (
                                    <div role="alert" className="mb-5 flex items-start gap-3 rounded-xl border border-gray-300 bg-gray-100 p-4 text-sm text-gray-800">
                                        <Icon name="alert-circle" size={18} className="mt-0.5 shrink-0" />
                                        <p>{formError}</p>
                                    </div>
                                )}
                                {renderStepContent()}
                            </div>

                            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (currentStep === 0) {
                                            setForm({ ...emptyForm });
                                            setCompletedSteps([]);
                                            setFormError('');
                                        } else goPrevious();
                                    }}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-gray-400 hover:text-gray-950"
                                >
                                    <Icon name={currentStep === 0 ? 'rotate-ccw' : 'arrow-left'} size={16} />
                                    {currentStep === 0 ? 'Kosongkan Form' : 'Kembali'}
                                </button>
                                <div className="flex flex-col-reverse gap-2 sm:flex-row">
                                    {currentStep < steps.length - 1 ? (
                                        <button type="button" onClick={goNext} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700">
                                            Simpan & Lanjutkan <Icon name="arrow-right" size={16} />
                                        </button>
                                    ) : (
                                        <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700">
                                            <Icon name="send" size={16} /> Kirim Pengajuan
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </section>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
                        <Icon name="file-check-2" size={19} className="text-gray-500" />
                        <div><p className="text-xs font-semibold text-gray-800">Dokumen valid</p><p className="mt-0.5 text-[11px] text-gray-400">PDF, JPG, atau PNG</p></div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
                        <Icon name="hard-drive" size={19} className="text-gray-500" />
                        <div><p className="text-xs font-semibold text-gray-800">Batas ukuran file</p><p className="mt-0.5 text-[11px] text-gray-400">Maksimal 10 MB per file</p></div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
                        <Icon name="clipboard-check" size={19} className="text-gray-500" />
                        <div><p className="text-xs font-semibold text-gray-800">Verifikasi pengelola</p><p className="mt-0.5 text-[11px] text-gray-400">Status awal: Menunggu</p></div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
