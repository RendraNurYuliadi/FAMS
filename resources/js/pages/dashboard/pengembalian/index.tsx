
import { useMemo, useState } from 'react';
import { Link } from '@inertiajs/react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import Icon from '../../../components/Icon';
import AssetManagementBanner from '../../../components/dashboard/AssetManagementBanner';

type ReturnStatus =
    | 'Menunggu Pengembalian'
    | 'Menunggu Pemeriksaan'
    | 'Dalam Pemeriksaan'
    | 'Selesai'
    | 'Bermasalah';

type ReturnItem = {
    id: number;
    code: string;
    borrower: string;
    borrowerType: 'Mahasiswa' | 'Dosen' | 'Organisasi' | 'Staf';
    identity: string;
    organization?: string;
    phone: string;
    email: string;
    asset: string;
    assetCode: string;
    category: string;
    quantity: number;
    borrowDate: string;
    dueDate: string;
    returnDate?: string;
    purpose: string;
    status: ReturnStatus;
    notes?: string;
    returnCondition?: string;
    returnProofName?: string;
};

type CalendarDay = {
    day: number;
    date: string;
    outside: boolean;
};

type ReturnForm = {
    transactionId: string;
    returnDate: string;
    condition: string;
    notes: string;
    proof: File | null;
};

const initialReturns: ReturnItem[] = [
    {
        id: 1,
        code: 'PJM-2026-00123',
        borrower: 'Sinta Amelia',
        borrowerType: 'Mahasiswa',
        identity: '240160121106',
        phone: '081234567890',
        email: 'sinta@example.com',
        asset: 'Kamera Canon',
        assetCode: 'AST-003',
        category: 'Elektronik',
        quantity: 1,
        borrowDate: '2026-11-05',
        dueDate: '2026-11-13',
        returnDate: '2026-11-13',
        purpose: 'Dokumentasi kegiatan fakultas.',
        status: 'Menunggu Pemeriksaan',
        notes: 'Barang sudah diterima oleh pengelola.',
    },
    {
        id: 2,
        code: 'PJM-2026-00122',
        borrower: 'Dimas Pratama',
        borrowerType: 'Mahasiswa',
        identity: '240160121107',
        phone: '081234567891',
        email: 'dimas@example.com',
        organization: 'UKM TahuNgoding',
        asset: 'Speaker Portable',
        assetCode: 'AST-004',
        category: 'Audio',
        quantity: 1,
        borrowDate: '2026-11-03',
        dueDate: '2026-11-10',
        returnDate: '2026-11-10',
        purpose: 'Kebutuhan acara TahuConnect.',
        status: 'Dalam Pemeriksaan',
        notes: 'Sedang diperiksa kelengkapannya.',
    },
    {
        id: 3,
        code: 'PJM-2026-00121',
        borrower: 'Rendra Nur Yuliadi',
        borrowerType: 'Mahasiswa',
        identity: '240160121104',
        phone: '081234567892',
        email: 'rendra@example.com',
        asset: 'Laptop ASUS ROG',
        assetCode: 'AST-001',
        category: 'Elektronik',
        quantity: 1,
        borrowDate: '2026-11-12',
        dueDate: '2026-11-17',
        purpose: 'Kebutuhan kegiatan dan dokumentasi UKM.',
        status: 'Menunggu Pengembalian',
    },
    {
        id: 4,
        code: 'PJM-2026-00120',
        borrower: 'Amelia Puji Lestari',
        borrowerType: 'Mahasiswa',
        identity: '240160121007',
        phone: '081234567893',
        email: 'amelia@example.com',
        asset: 'Proyektor Epson',
        assetCode: 'AST-002',
        category: 'Elektronik',
        quantity: 1,
        borrowDate: '2026-11-05',
        dueDate: '2026-11-09',
        purpose: 'Presentasi kegiatan akademik.',
        status: 'Selesai',
        returnDate: '2026-11-09',
        notes: 'Barang dikembalikan dalam kondisi baik.',
    },
    {
        id: 5,
        code: 'PJM-2026-00119',
        borrower: 'UKM TahuNgoding',
        borrowerType: 'Organisasi',
        identity: '-',
        organization: 'UKM TahuNgoding',
        phone: '081234567894',
        email: 'tahungoding@example.com',
        asset: 'Sound System',
        assetCode: 'AST-006',
        category: 'Audio',
        quantity: 1,
        borrowDate: '2026-11-01',
        dueDate: '2026-11-08',
        returnDate: '2026-11-11',
        purpose: 'Kebutuhan kegiatan organisasi.',
        status: 'Bermasalah',
        notes: 'Pengembalian terlambat dan terdapat laporan kerusakan.',
    },
];

const calendarBookings = [
    {
        id: 1,
        asset: 'Laptop ASUS ROG',
        assetCode: 'AST-001',
        category: 'Elektronik',
        borrower: 'Rendra Nur Yuliadi',
        borrowerType: 'Mahasiswa' as const,
        identity: '240160121104',
        phone: '081234567892',
        email: 'rendra@example.com',
        purpose: 'Kebutuhan kegiatan dan dokumentasi UKM.',
        start: '2026-11-12',
        end: '2026-11-17',
        color: '#171717',
        colorLight: '#e5e5e5',
        status: 'Berlangsung',
    },
    {
        id: 2,
        asset: 'Proyektor Epson',
        assetCode: 'AST-002',
        category: 'Elektronik',
        borrower: 'Amelia Puji Lestari',
        borrowerType: 'Mahasiswa' as const,
        identity: '240160121007',
        phone: '081234567893',
        email: 'amelia@example.com',
        purpose: 'Presentasi kegiatan akademik.',
        start: '2026-11-05',
        end: '2026-11-09',
        color: '#525252',
        colorLight: '#f5f5f5',
        status: 'Selesai',
    },
    {
        id: 3,
        asset: 'Kamera Canon',
        assetCode: 'AST-003',
        category: 'Elektronik',
        borrower: 'Sinta Amelia',
        borrowerType: 'Mahasiswa' as const,
        identity: '240160121106',
        phone: '081234567890',
        email: 'sinta@example.com',
        purpose: 'Dokumentasi kegiatan fakultas.',
        start: '2026-11-05',
        end: '2026-11-13',
        color: '#737373',
        colorLight: '#e5e5e5',
        status: 'Menunggu Pemeriksaan',
    },
    {
        id: 4,
        asset: 'Speaker Portable',
        assetCode: 'AST-004',
        category: 'Audio',
        borrower: 'Dimas Pratama',
        borrowerType: 'Mahasiswa' as const,
        identity: '240160121107',
        phone: '081234567891',
        email: 'dimas@example.com',
        purpose: 'Kebutuhan acara TahuConnect.',
        start: '2026-11-03',
        end: '2026-11-10',
        color: '#404040',
        colorLight: '#d4d4d4',
        status: 'Dalam Pemeriksaan',
    },
    {
        id: 5,
        asset: 'Sound System',
        assetCode: 'AST-006',
        category: 'Audio',
        borrower: 'UKM TahuNgoding',
        borrowerType: 'Organisasi' as const,
        identity: '-',
        phone: '081234567894',
        email: 'tahungoding@example.com',
        purpose: 'Kebutuhan kegiatan organisasi.',
        start: '2026-11-01',
        end: '2026-11-08',
        color: '#a3a3a3',
        colorLight: '#f5f5f5',
        status: 'Bermasalah',
    },
];

const monthNames = [
    'Januari', 'Februari', 'Maret', 'April',
    'Mei', 'Juni', 'Juli', 'Agustus',
    'September', 'Oktober', 'November', 'Desember',
];

const weekdays = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

const inputClass =
    'w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100';

function getLocalDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDate(value: string): string {
    return new Date(`${value}T00:00:00`).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

function isOverdue(item: ReturnItem): boolean {
    if (item.status === 'Selesai' || item.returnDate) return false;
    return item.dueDate < getLocalDateString(new Date());
}

function getStatusStyle(status: ReturnStatus): string {
    switch (status) {
        case 'Menunggu Pengembalian':
            return 'border-gray-300 bg-gray-100 text-gray-700';
        case 'Menunggu Pemeriksaan':
            return 'border-gray-400 bg-gray-200 text-gray-800';
        case 'Dalam Pemeriksaan':
            return 'border-gray-500 bg-gray-300 text-gray-900';
        case 'Selesai':
            return 'border-gray-900 bg-gray-900 text-white';
        case 'Bermasalah':
            return 'border-gray-700 bg-gray-700 text-white';
    }
}

function StatusBadge({ status }: { status: ReturnStatus }) {
    return (
        <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium ${getStatusStyle(status)}`}>
            <span className="size-1.5 rounded-full bg-current" />
            {status}
        </span>
    );
}

function SectionHeading({
    eyebrow,
    title,
    description,
}: {
    eyebrow: string;
    title: string;
    description: string;
}) {
    return (
        <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                {eyebrow}
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-gray-900">
                {title}
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
                {description}
            </p>
        </div>
    );
}

function BookingCalendarSection() {
    const [today] = useState(() => getLocalDateString(new Date()));
    const [currentDate, setCurrentDate] = useState(() => new Date());
    const [selectedDate, setSelectedDate] = useState(today);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const calendarDays = useMemo<CalendarDay[]>(() => {
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
        const cells: CalendarDay[] = [];

        for (let i = 0; i < firstDay; i++) {
            cells.push({ day: 0, date: '', outside: true });
        }

        for (let day = 1; day <= totalDays; day++) {
            const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            cells.push({ day, date, outside: false });
        }

        const remaining = (7 - (cells.length % 7)) % 7;
        for (let i = 0; i < remaining; i++) {
            cells.push({ day: 0, date: '', outside: true });
        }

        return cells;
    }, [year, month]);

    const selectedBookings = calendarBookings.filter(
        (booking) => selectedDate >= booking.start && selectedDate <= booking.end,
    );

    const monthlyBookings = calendarBookings.filter((booking) => {
        const bookingStart = new Date(`${booking.start}T00:00:00`);
        const bookingEnd = new Date(`${booking.end}T00:00:00`);
        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(year, month + 1, 0);
        return bookingStart <= monthEnd && bookingEnd >= monthStart;
    });

    const changeMonth = (amount: number) => {
        setCurrentDate(new Date(year, month + amount, 1));
    };

    const changeYear = (amount: number) => {
        setCurrentDate(new Date(year + amount, month, 1));
    };

    const goToToday = () => {
        const now = new Date();
        setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1));
        setSelectedDate(getLocalDateString(now));
    };

    return (
        <section className="space-y-5">
            <SectionHeading
                eyebrow="Jadwal dan aktivitas aset"
                title="Kalender Peminjaman"
                description="Pantau periode peminjaman, batas pengembalian, dan aktivitas aset berdasarkan tanggal."
            />

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
                <div className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-4 sm:p-5">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                                Kalender
                            </p>
                            <h3 className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
                                {monthNames[month]} {year}
                            </h3>
                            <p className="mt-1 text-xs text-gray-400">
                                {monthlyBookings.length} jadwal peminjaman terdaftar
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5">
                            <button type="button" onClick={() => changeYear(-1)} className="flex size-9 items-center justify-center rounded-lg border border-gray-200 text-sm text-gray-600 transition hover:bg-gray-100" aria-label="Tahun sebelumnya">«</button>
                            <button type="button" onClick={() => changeMonth(-1)} className="flex size-9 items-center justify-center rounded-lg border border-gray-200 text-lg text-gray-600 transition hover:bg-gray-100" aria-label="Bulan sebelumnya">‹</button>
                            <button type="button" onClick={() => changeMonth(1)} className="flex size-9 items-center justify-center rounded-lg border border-gray-200 text-lg text-gray-600 transition hover:bg-gray-100" aria-label="Bulan berikutnya">›</button>
                            <button type="button" onClick={() => changeYear(1)} className="flex size-9 items-center justify-center rounded-lg border border-gray-200 text-sm text-gray-600 transition hover:bg-gray-100" aria-label="Tahun berikutnya">»</button>
                            <button type="button" onClick={goToToday} className="ml-1 rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-gray-700">Hari ini</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/70 py-3">
                        {weekdays.map((day) => (
                            <div key={day} className="text-center text-xs font-semibold text-gray-400">{day}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7">
                        {calendarDays.map((cell, index) => {
                            const dayBookings = cell.date
                                ? calendarBookings.filter((booking) => cell.date >= booking.start && cell.date <= booking.end)
                                : [];
                            const isToday = cell.date === today;
                            const isSelected = cell.date === selectedDate;

                            return (
                                <button
                                    key={cell.date || `empty-${index}`}
                                    type="button"
                                    disabled={cell.outside}
                                    onClick={() => setSelectedDate(cell.date)}
                                    className={`group relative min-h-[76px] border-b border-r border-gray-100 p-1 text-left transition sm:min-h-[105px] sm:p-2 ${cell.outside ? 'cursor-default bg-gray-50/50' : 'cursor-pointer hover:bg-gray-50'} ${isSelected ? 'bg-gray-100' : ''}`}
                                >
                                    <div className="flex items-center justify-between gap-1">
                                        <span className={`flex size-7 items-center justify-center rounded-full text-xs font-semibold sm:size-8 sm:text-sm ${isSelected ? 'bg-gray-950 text-white' : isToday ? 'border-2 border-gray-900 bg-white text-gray-900' : 'text-gray-700 group-hover:bg-gray-200'}`}>
                                            {cell.day || ''}
                                        </span>
                                        {isToday && (
                                            <span className="hidden text-[8px] font-bold uppercase tracking-wider text-gray-900 sm:inline">Hari ini</span>
                                        )}
                                    </div>

                                    <div className="mt-2 space-y-1">
                                        {dayBookings.slice(0, 2).map((booking) => (
                                            <div key={booking.id} className="truncate rounded-md px-1 py-1 text-[9px] font-semibold sm:px-1.5 sm:text-[10px]" style={{ backgroundColor: booking.colorLight, color: booking.color }}>
                                                <span className="hidden sm:inline">{booking.asset}</span>
                                                <span className="sm:hidden">●</span>
                                            </div>
                                        ))}
                                        {dayBookings.length > 2 && (
                                            <p className="px-1 text-[9px] font-medium text-gray-400">+{dayBookings.length - 2} lainnya</p>
                                        )}
                                    </div>
                                    {isToday && !isSelected && (
                                        <span className="absolute bottom-1 right-2 size-1.5 rounded-full bg-gray-950" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-gray-100 p-4 sm:p-5">
                        {calendarBookings.map((booking) => (
                            <div key={booking.id} className="flex items-center gap-2">
                                <span className="size-2.5 rounded-full" style={{ backgroundColor: booking.color }} />
                                <span className="text-[10px] text-gray-500">{booking.asset}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <aside className="flex min-w-0 flex-col rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm sm:p-5">
                    <div>
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Detail Peminjaman</p>
                            {selectedDate === today && (
                                <span className="rounded-full bg-gray-900 px-2.5 py-1 text-[9px] font-semibold text-white">Hari Ini</span>
                            )}
                        </div>
                        <h3 className="mt-3 text-lg font-semibold text-gray-900">{formatDate(selectedDate)}</h3>
                        <p className="mt-1 text-xs text-gray-500">{selectedBookings.length} peminjaman pada tanggal ini</p>
                    </div>

                    <div className="my-4 h-px bg-gray-200" />

                    {selectedBookings.length > 0 ? (
                        <div className="space-y-4">
                            {selectedBookings.map((booking) => (
                                <div key={booking.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                                    <div className="border-b border-gray-100 p-3">
                                        <div className="mb-2 flex items-center justify-between gap-2">
                                            <span className="rounded-md px-2 py-1 text-[9px] font-semibold" style={{ backgroundColor: booking.colorLight, color: booking.color }}>{booking.status}</span>
                                            <span className="text-[9px] font-medium text-gray-400">#{String(booking.id).padStart(3, '0')}</span>
                                        </div>
                                        <h4 className="text-sm font-semibold text-gray-900">{booking.asset}</h4>
                                        <p className="mt-1 text-[10px] text-gray-400">{booking.assetCode} · {booking.category}</p>
                                    </div>

                                    <div className="space-y-3 p-3">
                                        <div>
                                            <p className="mb-1.5 text-[9px] font-bold uppercase tracking-wider text-gray-400">Informasi Peminjam</p>
                                            <p className="text-xs font-semibold text-gray-900">{booking.borrower}</p>
                                            <span className="mt-1 inline-flex rounded-md bg-gray-100 px-2 py-1 text-[9px] font-medium text-gray-600">{booking.borrowerType}</span>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-2">
                                            <p className="text-[9px] text-gray-400">NIM / NIP</p>
                                            <p className="mt-1 break-all text-[10px] font-semibold text-gray-700">{booking.identity}</p>
                                        </div>

                                        <div className="space-y-2 border-t border-gray-100 pt-3">
                                            <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Informasi Kontak</p>
                                            <a href={`tel:${booking.phone}`} className="flex items-center gap-2 text-[10px] text-gray-600 transition hover:text-gray-950">
                                                <Icon name="phone" size={13} />{booking.phone}
                                            </a>
                                            <a href={`mailto:${booking.email}`} className="flex min-w-0 items-center gap-2 text-[10px] text-gray-600 transition hover:text-gray-950">
                                                <Icon name="mail" size={13} /><span className="truncate">{booking.email}</span>
                                            </a>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Periode Peminjaman</p>
                                            <div className="mt-2 flex items-center justify-between gap-2">
                                                <div>
                                                    <p className="text-[9px] text-gray-400">Tanggal pinjam</p>
                                                    <p className="mt-1 text-[10px] font-semibold text-gray-800">{formatDate(booking.start)}</p>
                                                </div>
                                                <span className="text-gray-400">→</span>
                                                <div className="text-right">
                                                    <p className="text-[9px] text-gray-400">Batas kembali</p>
                                                    <p className="mt-1 text-[10px] font-semibold text-gray-800">{formatDate(booking.end)}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Keperluan Peminjaman</p>
                                            <p className="mt-1 text-[10px] leading-5 text-gray-600">{booking.purpose}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-5 py-10 text-center">
                            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
                                <Icon name="calendar" size={22} />
                            </div>
                            <h4 className="text-xs font-semibold text-gray-800">Tidak ada peminjaman</h4>
                            <p className="mt-2 max-w-52 text-[10px] leading-5 text-gray-400">
                                Belum ada jadwal peminjaman aset pada tanggal ini. Pilih tanggal lain untuk melihat jadwal.
                            </p>
                        </div>
                    )}

                    <div className="mt-5 border-t border-gray-200 pt-4">
                        <p className="text-[10px] leading-5 text-gray-400">
                            Informasi jadwal membantu pengelola memantau batas waktu peminjaman dan koordinasi pengembalian aset.
                        </p>
                    </div>
                </aside>
            </div>
        </section>
    );
}

export default function PengembalianIndex() {
    const [returns, setReturns] = useState<ReturnItem[]>(initialReturns);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('Semua Status');
    const [dateFilter, setDateFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState<ReturnItem | null>(null);

    const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
    const [returnForm, setReturnForm] = useState<ReturnForm>({
        transactionId: '',
        returnDate: getLocalDateString(new Date()),
        condition: 'Baik',
        notes: '',
        proof: null,
    });
    const [formError, setFormError] = useState('');

    const perPage = 5;

    const availableReturns = returns.filter(
        (item) => item.status === 'Menunggu Pengembalian',
    );

    const selectedLoan = returns.find(
        (item) => item.id === Number(returnForm.transactionId),
    );

    const metrics = useMemo(() => ({
        total: returns.length,
        waiting: returns.filter((item) => item.status === 'Menunggu Pengembalian').length,
        inspection: returns.filter(
            (item) => item.status === 'Menunggu Pemeriksaan' || item.status === 'Dalam Pemeriksaan',
        ).length,
        overdue: returns.filter(isOverdue).length,
    }), [returns]);

    const stats = [
        {
            label: 'Total Pengembalian',
            value: metrics.total,
            icon: 'clipboard-list',
            card: 'border-gray-900 bg-gray-950 text-white',
            labelColor: 'text-gray-300',
            valueColor: 'text-white',
            descriptionColor: 'text-gray-400',
            iconColor: 'bg-white/10 text-white',
            texture: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,.14) 1px, transparent 0)',
            description: 'Seluruh transaksi',
        },
        {
            label: 'Menunggu Pengembalian',
            value: metrics.waiting,
            icon: 'package',
            card: 'border-gray-700 bg-gray-800 text-white',
            labelColor: 'text-gray-300',
            valueColor: 'text-white',
            descriptionColor: 'text-gray-400',
            iconColor: 'bg-white/10 text-gray-100',
            texture: 'repeating-linear-gradient(135deg, rgba(255,255,255,.055) 0px, rgba(255,255,255,.055) 1px, transparent 1px, transparent 10px)',
            description: 'Belum dikembalikan',
        },
        {
            label: 'Menunggu Pemeriksaan',
            value: metrics.inspection,
            icon: 'clipboard-check',
            card: 'border-gray-300 bg-gray-200 text-gray-950',
            labelColor: 'text-gray-600',
            valueColor: 'text-gray-950',
            descriptionColor: 'text-gray-600',
            iconColor: 'bg-white/70 text-gray-800',
            texture: 'radial-gradient(circle at 1px 1px, rgba(17,24,39,.11) 1px, transparent 0)',
            description: 'Perlu ditindaklanjuti',
        },
        {
            label: 'Terlambat',
            value: metrics.overdue,
            icon: 'alert-circle',
            card: 'border-gray-200 bg-white text-gray-950',
            labelColor: 'text-gray-500',
            valueColor: 'text-gray-950',
            descriptionColor: 'text-gray-500',
            iconColor: 'bg-gray-100 text-gray-700',
            texture: 'repeating-linear-gradient(45deg, rgba(17,24,39,.035) 0px, rgba(17,24,39,.035) 1px, transparent 1px, transparent 9px)',
            description: 'Melewati batas waktu',
        },
    ] as const;

    const filteredReturns = useMemo(() => {
        return returns.filter((item) => {
            const keyword = search.toLowerCase();

            const matchesSearch =
                item.code.toLowerCase().includes(keyword) ||
                item.borrower.toLowerCase().includes(keyword) ||
                item.asset.toLowerCase().includes(keyword) ||
                item.assetCode.toLowerCase().includes(keyword) ||
                item.identity.toLowerCase().includes(keyword);

            const matchesStatus =
                statusFilter === 'Semua Status' ||
                (statusFilter === 'Terlambat'
                    ? isOverdue(item)
                    : item.status === statusFilter);

            const matchesDate =
                !dateFilter || item.dueDate === dateFilter || item.returnDate === dateFilter;

            return matchesSearch && matchesStatus && matchesDate;
        });
    }, [returns, search, statusFilter, dateFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredReturns.length / perPage));
    const safePage = Math.min(currentPage, totalPages);
    const paginatedReturns = filteredReturns.slice(
        (safePage - 1) * perPage,
        safePage * perPage,
    );

    const resetFilters = () => {
        setSearch('');
        setStatusFilter('Semua Status');
        setDateFilter('');
        setCurrentPage(1);
    };

    const openReturnForm = () => {
        setReturnForm({
            transactionId: '',
            returnDate: getLocalDateString(new Date()),
            condition: 'Baik',
            notes: '',
            proof: null,
        });
        setFormError('');
        setIsReturnModalOpen(true);
    };

    const closeReturnForm = () => {
        setIsReturnModalOpen(false);
        setFormError('');
    };

    const handleSubmitReturn = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!returnForm.transactionId) {
            setFormError('Pilih transaksi peminjaman terlebih dahulu.');
            return;
        }

        if (!returnForm.returnDate) {
            setFormError('Tanggal pengembalian wajib diisi.');
            return;
        }

        if (!selectedLoan) {
            setFormError('Transaksi peminjaman tidak ditemukan.');
            return;
        }

        if (returnForm.returnDate < selectedLoan.borrowDate) {
            setFormError('Tanggal pengembalian tidak boleh sebelum tanggal peminjaman.');
            return;
        }

        setReturns((previous) =>
            previous.map((item) =>
                item.id === selectedLoan.id
                    ? {
                        ...item,
                        returnDate: returnForm.returnDate,
                        status: 'Menunggu Pemeriksaan',
                        returnCondition: returnForm.condition,
                        notes: returnForm.notes.trim() || 'Tidak ada catatan tambahan.',
                        returnProofName: returnForm.proof?.name,
                    }
                    : item,
            ),
        );

        closeReturnForm();
        setCurrentPage(1);
    };

    return (
        <DashboardLayout>
            <div className="w-full min-w-0 space-y-6 pb-8">
                {/* Banner */}
                <AssetManagementBanner
                    title="Kelola Pengembalian Aset."
                    description="Pantau transaksi pengembalian aset, tindak lanjuti pemeriksaan barang, dan pastikan seluruh aset fakultas dikembalikan sesuai ketentuan."
                    contextLabel="Data pengembalian"
                    icon="clipboard-list"
                    statusLabel="Pengembalian dipantau"
                    metrics={[
                        { label: 'Total pengembalian', value: metrics.total },
                        { label: 'Menunggu pemeriksaan', value: metrics.inspection },
                    ]}
                />

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Link href="/dashboard" className="transition hover:text-gray-900">Dashboard</Link>
                    <Icon name="chevron-right" size={13} />
                    <span className="font-medium text-gray-600">Pengembalian</span>
                </div>

                {/* Statistics */}
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className={`group relative isolate overflow-hidden rounded-2xl border p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${stat.card}`}>
                            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-70 transition duration-300 group-hover:scale-105 group-hover:opacity-100" style={{ backgroundImage: stat.texture, backgroundSize: stat.label === 'Total Pengembalian' ? '14px 14px' : 'auto' }} />
                            <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-12 -z-10 size-36 rounded-full border border-current opacity-[0.08] transition duration-300 group-hover:scale-110" />
                            <div className="relative flex min-h-28 items-start justify-between gap-3">
                                <div className="flex min-h-28 flex-col">
                                    <p className={`text-sm font-medium ${stat.labelColor}`}>{stat.label}</p>
                                    <p className={`mt-2 text-4xl font-bold tracking-tight ${stat.valueColor}`}>{stat.value}</p>
                                    <div className="mt-auto flex items-center gap-2 pt-2">
                                        <span className="h-px w-5 bg-current opacity-30" />
                                        <p className={`text-xs ${stat.descriptionColor}`}>{stat.description}</p>
                                    </div>
                                </div>
                                <div className={`rounded-xl p-3 shadow-sm ring-1 ring-current/5 transition duration-300 group-hover:rotate-3 group-hover:scale-105 ${stat.iconColor}`}>
                                    <Icon name={stat.icon} size={21} />
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Data Pengembalian */}
                <section id="data-pengembalian" className="scroll-mt-6 space-y-5">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                        <SectionHeading
                            eyebrow="Monitoring transaksi"
                            title="Daftar Pengembalian"
                            description="Kelola status pengembalian aset dan tindak lanjuti barang yang sudah diterima."
                        />

                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={openReturnForm}
                                disabled={availableReturns.length === 0}
                                className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <Icon name="plus" size={16} />
                                Form Pengembalian
                            </button>

                            <Link
                                href="/dashboard/pengembalian/pemeriksaan"
                                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                            >
                                <Icon name="clipboard-check" size={16} />
                                Pemeriksaan Barang
                            </Link>
                        </div>
                    </div>

                    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        {/* Filter */}
                        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-base font-semibold text-gray-900">Data Transaksi</h3>
                                <p className="mt-1 text-xs text-gray-400">Daftar seluruh aktivitas pengembalian aset.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-600">
                                    {filteredReturns.length} transaksi
                                </span>
                            </div>
                        </div>

                        <div className="grid gap-3 border-b border-gray-100 bg-gray-50/40 p-4 lg:grid-cols-[minmax(220px,1fr)_220px_190px_auto]">
                            <div className="relative">
                                <Icon name="search" size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    value={search}
                                    onChange={(event) => {
                                        setSearch(event.target.value);
                                        setCurrentPage(1);
                                    }}
                                    placeholder="Cari transaksi, peminjam, atau aset..."
                                    className={`${inputClass} pl-10`}
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
                                <option>Semua Status</option>
                                <option>Menunggu Pengembalian</option>
                                <option>Menunggu Pemeriksaan</option>
                                <option>Dalam Pemeriksaan</option>
                                <option>Selesai</option>
                                <option>Bermasalah</option>
                                <option>Terlambat</option>
                            </select>

                            <input
                                type="date"
                                value={dateFilter}
                                onChange={(event) => {
                                    setDateFilter(event.target.value);
                                    setCurrentPage(1);
                                }}
                                className={inputClass}
                                aria-label="Filter tanggal pengembalian"
                            />

                            <button type="button" onClick={resetFilters} className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-100">
                                <Icon name="rotate-ccw" size={14} />
                                Reset Filter
                            </button>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[950px] text-left">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/70">
                                        <th className="px-5 py-4 text-xs font-semibold text-gray-500">Transaksi</th>
                                        <th className="px-5 py-4 text-xs font-semibold text-gray-500">Peminjam</th>
                                        <th className="px-5 py-4 text-xs font-semibold text-gray-500">Aset</th>
                                        <th className="px-5 py-4 text-xs font-semibold text-gray-500">Batas Kembali</th>
                                        <th className="px-5 py-4 text-xs font-semibold text-gray-500">Status</th>
                                        <th className="px-5 py-4 text-right text-xs font-semibold text-gray-500">Aksi</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {paginatedReturns.map((item) => (
                                        <tr key={item.id} className="transition hover:bg-gray-50/70">
                                            <td className="px-5 py-4">
                                                <p className="text-sm font-semibold text-gray-900">{item.code}</p>
                                                <p className="mt-1 text-xs text-gray-400">Pinjam: {formatDate(item.borrowDate)}</p>
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className="text-sm font-medium text-gray-900">{item.borrower}</p>
                                                <p className="mt-1 text-xs text-gray-400">{item.borrowerType}</p>
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className="text-sm font-medium text-gray-900">{item.asset}</p>
                                                <p className="mt-1 text-xs text-gray-400">{item.assetCode} · {item.quantity} unit</p>
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className="text-sm text-gray-700">{formatDate(item.dueDate)}</p>
                                                {isOverdue(item) && (
                                                    <p className="mt-1 text-xs font-medium text-gray-900">
                                                        <Icon name="alert-circle" size={12} className="mr-1 inline" />
                                                        Melewati batas waktu
                                                    </p>
                                                )}
                                                {item.returnDate && (
                                                    <p className="mt-1 text-xs text-gray-400">Diterima: {formatDate(item.returnDate)}</p>
                                                )}
                                            </td>
                                            <td className="px-5 py-4">
                                                <StatusBadge status={isOverdue(item) ? 'Bermasalah' : item.status} />
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <button type="button" onClick={() => setSelectedItem(item)} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100">
                                                        <Icon name="eye" size={14} />Detail
                                                    </button>
                                                    {(item.status === 'Menunggu Pemeriksaan' || item.status === 'Dalam Pemeriksaan') && (
                                                        <Link href={`/dashboard/pengembalian/pemeriksaan?id=${item.id}`} className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-gray-700">
                                                            <Icon name="clipboard-check" size={14} />Periksa
                                                        </Link>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {paginatedReturns.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-5 py-16 text-center">
                                                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                                                    <Icon name="clipboard-list" size={26} />
                                                </div>
                                                <p className="mt-3 text-sm font-semibold text-gray-800">Data tidak ditemukan</p>
                                                <p className="mt-1 text-xs text-gray-400">Coba ubah kata kunci atau filter pencarian.</p>
                                                <button type="button" onClick={resetFilters} className="mt-4 text-xs font-semibold text-gray-700 underline underline-offset-4 hover:text-black">
                                                    Reset semua filter
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-5 py-4">
                            <p className="text-xs text-gray-500">
                                Menampilkan {filteredReturns.length === 0 ? 0 : (safePage - 1) * perPage + 1}
                                {' - '}{Math.min(safePage * perPage, filteredReturns.length)}
                                {' dari '}{filteredReturns.length} transaksi
                            </p>
                            <div className="flex items-center gap-2">
                                <button type="button" disabled={safePage <= 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40">
                                    <Icon name="chevron-left" size={14} />Sebelumnya
                                </button>
                                <span className="min-w-12 rounded-lg bg-gray-100 px-3 py-2 text-center text-xs font-semibold text-gray-700">{safePage} / {totalPages}</span>
                                <button type="button" disabled={safePage >= totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40">
                                    Berikutnya<Icon name="chevron-right" size={14} />
                                </button>
                            </div>
                        </div>
                    </section>
                </section>

                {/* Calendar */}
                <div id="kalender-peminjaman" className="scroll-mt-6">
                    <BookingCalendarSection />
                </div>
            </div>

            {/* Form Pengembalian Modal */}
            {isReturnModalOpen && (
                <div
                    className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-gray-950/50 p-4 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) closeReturnForm();
                    }}
                >
                    <div className="my-8 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
                        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-gray-100 bg-white p-5 sm:p-6">
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Formulir transaksi</p>
                                <h2 className="mt-1 text-lg font-semibold text-gray-900">Form Pengembalian Aset</h2>
                                <p className="mt-1 text-xs text-gray-500">Lengkapi informasi pengembalian sebelum diteruskan ke pemeriksaan aset.</p>
                            </div>
                            <button type="button" onClick={closeReturnForm} className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900" aria-label="Tutup formulir">
                                <Icon name="x" size={19} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmitReturn}>
                            <div className="space-y-5 p-5 sm:p-6">
                                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-gray-700 shadow-sm">
                                            <Icon name="info" size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">Informasi pengembalian</p>
                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                Pilih transaksi peminjaman yang masih aktif. Setelah formulir dikirim, transaksi akan diteruskan ke menu Pemeriksaan Aset.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {formError && (
                                    <div className="flex items-start gap-2 rounded-xl border border-gray-300 bg-gray-100 p-3 text-xs text-gray-700">
                                        <Icon name="alert-circle" size={16} />
                                        <span>{formError}</span>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-700">
                                        Pilih Transaksi Peminjaman <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        required
                                        value={returnForm.transactionId}
                                        onChange={(event) => {
                                            setReturnForm((previous) => ({ ...previous, transactionId: event.target.value }));
                                            setFormError('');
                                        }}
                                        className={inputClass}
                                    >
                                        <option value="">Pilih transaksi yang akan dikembalikan</option>
                                        {availableReturns.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.code} — {item.asset} ({item.borrower})
                                            </option>
                                        ))}
                                    </select>
                                    {availableReturns.length === 0 && (
                                        <p className="text-xs text-gray-400">Tidak ada transaksi yang menunggu pengembalian.</p>
                                    )}
                                </div>

                                {selectedLoan && (
                                    <div className="rounded-xl border border-gray-200 p-4">
                                        <p className="mb-3 text-xs font-semibold text-gray-800">Ringkasan Peminjaman</p>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div>
                                                <p className="text-xs text-gray-400">Nama peminjam</p>
                                                <p className="mt-1 text-sm font-semibold text-gray-800">{selectedLoan.borrower}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Identitas</p>
                                                <p className="mt-1 text-sm font-medium text-gray-700">{selectedLoan.identity}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Nama aset</p>
                                                <p className="mt-1 text-sm font-semibold text-gray-800">{selectedLoan.asset}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Kode aset</p>
                                                <p className="mt-1 text-sm font-medium text-gray-700">{selectedLoan.assetCode}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Tanggal peminjaman</p>
                                                <p className="mt-1 text-sm font-medium text-gray-700">{formatDate(selectedLoan.borrowDate)}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Batas pengembalian</p>
                                                <p className="mt-1 text-sm font-medium text-gray-700">{formatDate(selectedLoan.dueDate)}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gray-700">
                                            Tanggal Pengembalian <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            min={selectedLoan?.borrowDate}
                                            value={returnForm.returnDate}
                                            onChange={(event) => setReturnForm((previous) => ({ ...previous, returnDate: event.target.value }))}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gray-700">
                                            Kondisi Barang <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            required
                                            value={returnForm.condition}
                                            onChange={(event) => setReturnForm((previous) => ({ ...previous, condition: event.target.value }))}
                                            className={inputClass}
                                        >
                                            <option value="Baik">Baik</option>
                                            <option value="Cukup Baik">Cukup Baik</option>
                                            <option value="Rusak Ringan">Rusak Ringan</option>
                                            <option value="Rusak Berat">Rusak Berat</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-700">Catatan Pengembalian</label>
                                    <textarea
                                        rows={4}
                                        value={returnForm.notes}
                                        onChange={(event) => setReturnForm((previous) => ({ ...previous, notes: event.target.value }))}
                                        placeholder="Tuliskan kondisi barang, kelengkapan, atau informasi tambahan..."
                                        className={`${inputClass} resize-none`}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-700">Foto Bukti Pengembalian</label>
                                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center transition hover:border-gray-500 hover:bg-gray-100">
                                        <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm">
                                            <Icon name="image-plus" size={20} />
                                        </div>
                                        <span className="text-xs font-semibold text-gray-700">
                                            {returnForm.proof ? returnForm.proof.name : 'Pilih foto bukti pengembalian'}
                                        </span>
                                        <span className="mt-1 text-[10px] text-gray-400">PNG, JPG, atau JPEG</span>
                                        <input
                                            type="file"
                                            accept="image/png,image/jpeg,image/jpg"
                                            className="hidden"
                                            onChange={(event) => {
                                                const file = event.target.files?.[0] ?? null;
                                                setReturnForm((previous) => ({ ...previous, proof: file }));
                                            }}
                                        />
                                    </label>
                                    {returnForm.proof && (
                                        <button
                                            type="button"
                                            onClick={() => setReturnForm((previous) => ({ ...previous, proof: null }))}
                                            className="text-xs font-medium text-gray-500 underline underline-offset-4 hover:text-gray-900"
                                        >
                                            Hapus foto
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="sticky bottom-0 flex flex-col-reverse justify-between gap-3 border-t border-gray-100 bg-white p-5 sm:flex-row sm:items-center sm:px-6">
                                <button type="button" onClick={closeReturnForm} className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={availableReturns.length === 0}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <Icon name="send" size={15} />
                                    Kirim Pengembalian
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Detail Modal */}
            {selectedItem && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-gray-950/40 p-4 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) setSelectedItem(null);
                    }}
                >
                    <div className="my-8 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
                        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-gray-100 bg-white p-5 sm:p-6">
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Detail Transaksi</p>
                                <h2 className="mt-1 text-lg font-semibold text-gray-900">{selectedItem.code}</h2>
                            </div>
                            <button type="button" onClick={() => setSelectedItem(null)} className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900" aria-label="Tutup detail">
                                <Icon name="x" size={19} />
                            </button>
                        </div>

                        <div className="space-y-5 p-5 sm:p-6">
                            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-gray-50 p-4">
                                <div>
                                    <p className="text-xs text-gray-400">Status Pengembalian</p>
                                    <div className="mt-2">
                                        <StatusBadge status={isOverdue(selectedItem) ? 'Bermasalah' : selectedItem.status} />
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-400">Kategori Aset</p>
                                    <p className="mt-1 text-sm font-medium text-gray-700">{selectedItem.category}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-sm font-semibold text-gray-800">Informasi Transaksi</h3>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <p className="text-xs text-gray-400">Peminjam</p>
                                        <p className="mt-1 text-sm font-semibold text-gray-900">{selectedItem.borrower}</p>
                                        <p className="mt-1 text-xs text-gray-500">{selectedItem.borrowerType} · {selectedItem.identity}</p>
                                        {selectedItem.organization && <p className="mt-1 text-xs text-gray-500">{selectedItem.organization}</p>}
                                    </div>
                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <p className="text-xs text-gray-400">Aset</p>
                                        <p className="mt-1 text-sm font-semibold text-gray-900">{selectedItem.asset}</p>
                                        <p className="mt-1 text-xs text-gray-500">{selectedItem.assetCode} · {selectedItem.quantity} unit</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-5">
                                <h3 className="mb-3 text-sm font-semibold text-gray-800">Jadwal Peminjaman dan Pengembalian</h3>
                                <div className="grid gap-3 sm:grid-cols-3">
                                    <div className="rounded-xl border border-gray-200 p-3">
                                        <p className="text-xs text-gray-400">Tanggal Pinjam</p>
                                        <p className="mt-1 text-sm font-medium text-gray-800">{formatDate(selectedItem.borrowDate)}</p>
                                    </div>
                                    <div className="rounded-xl border border-gray-200 p-3">
                                        <p className="text-xs text-gray-400">Batas Kembali</p>
                                        <p className="mt-1 text-sm font-medium text-gray-800">{formatDate(selectedItem.dueDate)}</p>
                                    </div>
                                    <div className="rounded-xl border border-gray-200 p-3">
                                        <p className="text-xs text-gray-400">Tanggal Diterima</p>
                                        <p className="mt-1 text-sm font-medium text-gray-800">{selectedItem.returnDate ? formatDate(selectedItem.returnDate) : 'Belum diterima'}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-2 text-sm font-semibold text-gray-900">Keperluan Peminjaman</h3>
                                <p className="rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-600">{selectedItem.purpose}</p>
                            </div>

                            {selectedItem.returnCondition && (
                                <div>
                                    <h3 className="mb-2 text-sm font-semibold text-gray-900">Kondisi Saat Dikembalikan</h3>
                                    <p className="rounded-xl bg-gray-50 p-4 text-sm text-gray-700">{selectedItem.returnCondition}</p>
                                </div>
                            )}

                            {selectedItem.notes && (
                                <div>
                                    <h3 className="mb-2 text-sm font-semibold text-gray-900">Catatan</h3>
                                    <p className="rounded-xl border border-gray-200 p-4 text-sm leading-6 text-gray-600">{selectedItem.notes}</p>
                                </div>
                            )}

                            {selectedItem.returnProofName && (
                                <div>
                                    <h3 className="mb-2 text-sm font-semibold text-gray-900">Bukti Pengembalian</h3>
                                    <div className="flex items-center gap-2 rounded-xl border border-gray-200 p-3 text-sm text-gray-700">
                                        <Icon name="image" size={17} />
                                        <span className="truncate">{selectedItem.returnProofName}</span>
                                    </div>
                                </div>
                            )}

                            <div>
                                <h3 className="mb-3 text-sm font-semibold text-gray-900">Kontak Peminjam</h3>
                                <div className="flex flex-wrap gap-3">
                                    <a href={`tel:${selectedItem.phone}`} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-xs font-medium text-gray-700 transition hover:bg-gray-50">
                                        <Icon name="phone" size={15} />{selectedItem.phone}
                                    </a>
                                    <a href={`mailto:${selectedItem.email}`} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-xs font-medium text-gray-700 transition hover:bg-gray-50">
                                        <Icon name="mail" size={15} />Email Peminjam
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 flex flex-col-reverse justify-between gap-3 border-t border-gray-100 bg-white p-5 sm:flex-row sm:items-center sm:px-6">
                            <button type="button" onClick={() => setSelectedItem(null)} className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                                Tutup
                            </button>
                            {(selectedItem.status === 'Menunggu Pemeriksaan' || selectedItem.status === 'Dalam Pemeriksaan') && (
                                <Link href={`/dashboard/pengembalian/pemeriksaan?id=${selectedItem.id}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700">
                                    <Icon name="clipboard-check" size={16} />Buka Pemeriksaan
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
