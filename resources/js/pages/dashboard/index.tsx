
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import Icon from '../../components/Icon';
import type { IconName } from '../../components/Icon';

// ======================================================
// DATA DEMONSTRASI
// ======================================================

const stats = [
    {
        title: 'Total Aset',
        value: '120',
        description: 'Seluruh aset terdaftar',
        icon: 'building',
        color: '#2563eb',
        light: '#dbeafe',
        trend: '+8 aset',
    },
    {
        title: 'Aset Tersedia',
        value: '82',
        description: 'Siap untuk dipinjam',
        icon: 'shield',
        color: '#0f766e',
        light: '#ccfbf1',
        trend: '68,3% dari total',
    },
    {
        title: 'Sedang Dipinjam',
        value: '25',
        description: 'Aset dalam peminjaman',
        icon: 'users',
        color: '#9333ea',
        light: '#f3e8ff',
        trend: '20,8% dari total',
    },
    {
        title: 'Perlu Pemeriksaan',
        value: '8',
        description: 'Membutuhkan pengecekan',
        icon: 'clock',
        color: '#c2410c',
        light: '#ffedd5',
        trend: 'Perlu tindak lanjut',
    },
] as const;

const activities = [
    {
        title: 'Pengajuan peminjaman baru',
        detail: 'Proyektor Epson · Rendra Nur Yuliadi',
        time: '09.45',
        status: 'Menunggu',
        color: '#9333ea',
        light: '#f3e8ff',
    },
    {
        title: 'Pengembalian aset',
        detail: 'Kamera Canon · Amelia Puji Lestari',
        time: '09.20',
        status: 'Pemeriksaan',
        color: '#0f766e',
        light: '#ccfbf1',
    },
    {
        title: 'Laporan kerusakan',
        detail: 'Kursi ruang kelas · Herliana Tri Cahyanti',
        time: '08.50',
        status: 'Dilaporkan',
        color: '#c2410c',
        light: '#ffedd5',
    },
    {
        title: 'Peminjaman disetujui',
        detail: 'Laptop Lenovo · Wulan Nurfitriani',
        time: '08.15',
        status: 'Disetujui',
        color: '#2563eb',
        light: '#dbeafe',
    },
];

const assetCategories = [
    { name: 'Elektronik', total: 45, percentage: 38, color: '#2563eb' },
    { name: 'Peralatan Kelas', total: 32, percentage: 27, color: '#9333ea' },
    { name: 'Furniture', total: 25, percentage: 21, color: '#0f766e' },
    { name: 'Lainnya', total: 18, percentage: 14, color: '#c2410c' },
];

type Booking = {
    id: number;
    asset: string;
    assetCode: string;
    category: string;
    borrower: string;
    borrowerType: 'Mahasiswa' | 'Dosen' | 'Organisasi' | 'Staf';
    identity: string;
    organization?: string;
    phone: string;
    email: string;
    purpose: string;
    start: string;
    end: string;
    color: string;
    colorLight: string;
    status: 'Disetujui' | 'Berlangsung' | 'Menunggu';
};

type CalendarDay = {
    day: number;
    date: string;
    outside: boolean;
};

const bookings: Booking[] = [
    {
        id: 1,
        asset: 'Laptop ASUS ROG',
        assetCode: 'AST-001',
        category: 'Elektronik',
        borrower: 'Rendra Nur Yuliadi',
        borrowerType: 'Mahasiswa',
        identity: '240160121104',
        phone: '081234567890',
        email: 'rendra@example.com',
        purpose: 'Kebutuhan kegiatan dan dokumentasi UKM.',
        start: '2026-11-03',
        end: '2026-11-07',
        color: '#2563eb',
        colorLight: '#dbeafe',
        status: 'Disetujui',
    },
    {
        id: 2,
        asset: 'Proyektor Epson',
        assetCode: 'AST-002',
        category: 'Elektronik',
        borrower: 'Amelia Puji Lestari',
        borrowerType: 'Mahasiswa',
        identity: '240160121007',
        phone: '081234567891',
        email: 'amelia@example.com',
        purpose: 'Presentasi kegiatan akademik.',
        start: '2026-11-05',
        end: '2026-11-09',
        color: '#9333ea',
        colorLight: '#f3e8ff',
        status: 'Disetujui',
    },
    {
        id: 3,
        asset: 'Kamera Canon',
        assetCode: 'AST-003',
        category: 'Elektronik',
        borrower: 'Herliana Tri Cahyanti',
        borrowerType: 'Mahasiswa',
        identity: '240160121044',
        phone: '081234567892',
        email: 'herliana@example.com',
        purpose: 'Dokumentasi kegiatan fakultas.',
        start: '2026-11-12',
        end: '2026-11-15',
        color: '#0f766e',
        colorLight: '#ccfbf1',
        status: 'Berlangsung',
    },
    {
        id: 4,
        asset: 'Sound System',
        assetCode: 'AST-004',
        category: 'Audio',
        borrower: 'UKM TahuNgoding',
        borrowerType: 'Organisasi',
        identity: '-',
        organization: 'UKM TahuNgoding',
        phone: '081234567893',
        email: 'tahungoding@example.com',
        purpose: 'Kebutuhan acara TahuConnect.',
        start: '2026-11-18',
        end: '2026-11-21',
        color: '#c2410c',
        colorLight: '#ffedd5',
        status: 'Disetujui',
    },
    {
        id: 5,
        asset: 'Laptop Lenovo',
        assetCode: 'AST-005',
        category: 'Elektronik',
        borrower: 'Jajang Didin',
        borrowerType: 'Mahasiswa',
        identity: '240160121120',
        phone: '081234567894',
        email: 'jajang@example.com',
        purpose: 'Praktikum dan penyusunan tugas.',
        start: '2026-11-24',
        end: '2026-11-27',
        color: '#be185d',
        colorLight: '#fce7f3',
        status: 'Disetujui',
    },
];

const borrowerStats = [
    { name: 'Mahasiswa', total: 68, percentage: 68, color: '#2563eb', light: '#dbeafe' },
    { name: 'Dosen', total: 18, percentage: 18, color: '#9333ea', light: '#f3e8ff' },
    { name: 'Staf', total: 9, percentage: 9, color: '#0f766e', light: '#ccfbf1' },
    { name: 'Organisasi', total: 5, percentage: 5, color: '#c2410c', light: '#ffedd5' },
];

const frequentBorrowers = [
    { name: 'Rendra Nur Yuliadi', type: 'Mahasiswa', identity: '240160121104', total: 12, color: '#2563eb' },
    { name: 'Amelia Puji Lestari', type: 'Mahasiswa', identity: '240160121007', total: 9, color: '#9333ea' },
    { name: 'Herliana Tri Cahyanti', type: 'Mahasiswa', identity: '240160121044', total: 8, color: '#0f766e' },
    { name: 'Jajang Didin', type: 'Mahasiswa', identity: '240160121120', total: 6, color: '#c2410c' },
];

const frequentAssets = [
    { name: 'Proyektor Epson', category: 'Elektronik', total: 28, percentage: 92 },
    { name: 'Laptop ASUS ROG', category: 'Elektronik', total: 24, percentage: 80 },
    { name: 'Kamera Canon', category: 'Elektronik', total: 19, percentage: 63 },
    { name: 'Sound System', category: 'Audio', total: 15, percentage: 50 },
];

const monthNames = [
    'Januari', 'Februari', 'Maret', 'April',
    'Mei', 'Juni', 'Juli', 'Agustus',
    'September', 'Oktober', 'November', 'Desember',
];

const weekdays = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

// ======================================================
// HELPER
// ======================================================

function getLocalDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function formatDate(date: string): string {
    return new Date(`${date}T00:00:00`).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

function getGreeting(): string {
    const hour = new Date().getHours();

    if (hour < 11) return 'Selamat pagi';
    if (hour < 15) return 'Selamat siang';
    if (hour < 18) return 'Selamat sore';
    return 'Selamat malam';
}

// ======================================================
// STAT CARD
// ======================================================

function StatCard({
    title,
    value,
    description,
    icon,
    color,
    light,
    trend,
}: {
    title: string;
    value: string;
    description: string;
    icon: IconName;
    color: string;
    light: string;
    trend: string;
}) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div
                className="absolute -right-7 -top-7 size-24 rounded-full opacity-40 transition group-hover:scale-125"
                style={{ backgroundColor: light }}
            />

            <div className="relative flex items-center justify-between">
                <div
                    className="flex size-11 items-center justify-center rounded-xl"
                    style={{ backgroundColor: light, color }}
                >
                    <Icon name={icon} size={20} />
                </div>

                <span className="rounded-full border border-neutral-100 px-2.5 py-1 text-[9px] font-semibold tracking-wide text-neutral-400">
                    FAMS
                </span>
            </div>

            <div className="relative mt-5">
                <p className="text-xs font-medium text-neutral-500">{title}</p>
                <p className="mt-1 text-3xl font-bold tracking-tight text-neutral-950">
                    {value}
                </p>
                <p className="mt-1.5 text-[10px] text-neutral-400">{description}</p>
            </div>

            <div className="relative mt-4 flex items-center gap-1.5 border-t border-neutral-100 pt-3">
                <span
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: color }}
                />
                <span className="text-[10px] font-medium text-neutral-500">
                    {trend}
                </span>
            </div>
        </div>
    );
}

// ======================================================
// KALENDER PEMINJAMAN
// ======================================================

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

    const selectedBookings = bookings.filter(
        (booking) =>
            selectedDate >= booking.start &&
            selectedDate <= booking.end,
    );

    const monthlyBookings = bookings.filter((booking) => {
        const monthStart = `${year}-${String(month + 1).padStart(2, '0')}-01`;
        const monthEnd = getLocalDateString(new Date(year, month + 1, 0));

        return booking.start <= monthEnd && booking.end >= monthStart;
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
        <section className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
            <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5">
                        <span className="size-2 rounded-full bg-neutral-900" />
                        <span className="text-[9px] font-semibold uppercase tracking-widest text-neutral-500">
                            Jadwal Peminjaman
                        </span>
                    </div>

                    <h2 className="text-xl font-semibold tracking-tight text-neutral-950">
                        Kalender Peminjaman Aset
                    </h2>
                    <p className="mt-1 max-w-xl text-[11px] leading-5 text-neutral-400">
                        Pilih tanggal untuk melihat aset yang sedang dipinjam,
                        identitas peminjam, kontak, dan periode pengembalian.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="rounded-xl border border-neutral-200 px-3 py-2">
                        <p className="text-[9px] text-neutral-400">Jadwal bulan ini</p>
                        <p className="mt-0.5 text-sm font-semibold text-neutral-900">
                            {monthlyBookings.length} peminjaman
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={goToToday}
                        className="rounded-xl bg-neutral-900 px-4 py-3 text-[10px] font-semibold text-white transition hover:bg-neutral-700"
                    >
                        Hari ini
                    </button>
                </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
                <div className="min-w-0 rounded-xl border border-neutral-200 p-3 sm:p-5">
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">
                                Kalender
                            </p>
                            <h3 className="mt-1 text-xl font-semibold tracking-tight text-neutral-950">
                                {monthNames[month]} {year}
                            </h3>
                            <p className="mt-1 text-[10px] text-neutral-400">
                                {monthlyBookings.length} jadwal peminjaman terdaftar
                            </p>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => changeYear(-1)}
                                className="flex size-9 items-center justify-center rounded-lg border border-neutral-200 text-sm text-neutral-600 transition hover:bg-neutral-100"
                                aria-label="Tahun sebelumnya"
                            >
                                «
                            </button>
                            <button
                                type="button"
                                onClick={() => changeMonth(-1)}
                                className="flex size-9 items-center justify-center rounded-lg border border-neutral-200 text-lg text-neutral-600 transition hover:bg-neutral-100"
                                aria-label="Bulan sebelumnya"
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                onClick={() => changeMonth(1)}
                                className="flex size-9 items-center justify-center rounded-lg border border-neutral-200 text-lg text-neutral-600 transition hover:bg-neutral-100"
                                aria-label="Bulan berikutnya"
                            >
                                ›
                            </button>
                            <button
                                type="button"
                                onClick={() => changeYear(1)}
                                className="flex size-9 items-center justify-center rounded-lg border border-neutral-200 text-sm text-neutral-600 transition hover:bg-neutral-100"
                                aria-label="Tahun berikutnya"
                            >
                                »
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 border-b border-neutral-100 pb-3">
                        {weekdays.map((day) => (
                            <div key={day} className="text-center text-[10px] font-bold text-neutral-400 sm:text-xs">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7">
                        {calendarDays.map((cell, index) => {
                            const dayBookings = cell.date
                                ? bookings.filter(
                                      (booking) =>
                                          cell.date >= booking.start &&
                                          cell.date <= booking.end,
                                  )
                                : [];

                            const isToday = cell.date === today;
                            const isSelected = cell.date === selectedDate;

                            return (
                                <button
                                    key={cell.date || `empty-${index}`}
                                    type="button"
                                    disabled={cell.outside}
                                    onClick={() => setSelectedDate(cell.date)}
                                    aria-label={
                                        cell.date
                                            ? `${cell.day} ${monthNames[month]} ${year}, ${dayBookings.length} peminjaman`
                                            : undefined
                                    }
                                    className={`group relative min-h-[76px] border-b border-r border-neutral-100 p-1 text-left transition sm:min-h-[105px] sm:p-2 ${
                                        cell.outside
                                            ? 'cursor-default bg-neutral-50/40'
                                            : 'cursor-pointer hover:bg-neutral-50'
                                    } ${isSelected ? 'bg-neutral-100' : ''}`}
                                >
                                    <div className="flex items-center justify-between gap-1">
                                        <span
                                            className={`flex size-7 items-center justify-center rounded-full text-[10px] font-semibold transition sm:size-8 sm:text-sm ${
                                                isSelected
                                                    ? 'bg-neutral-950 text-white'
                                                    : isToday
                                                      ? 'border-2 border-neutral-950 bg-white text-neutral-950'
                                                      : 'text-neutral-700 group-hover:bg-neutral-200'
                                            }`}
                                        >
                                            {cell.day || ''}
                                        </span>
                                        {isToday && (
                                            <span className="hidden text-[8px] font-bold uppercase tracking-wider text-neutral-900 sm:inline">
                                                Hari ini
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-2 space-y-1">
                                        {dayBookings.slice(0, 2).map((booking) => (
                                            <div
                                                key={booking.id}
                                                className="truncate rounded-md px-1 py-1 text-[8px] font-semibold sm:px-1.5 sm:text-[9px]"
                                                style={{
                                                    backgroundColor: booking.colorLight,
                                                    color: booking.color,
                                                }}
                                                title={booking.asset}
                                            >
                                                <span className="hidden sm:inline">{booking.asset}</span>
                                                <span className="sm:hidden">●</span>
                                            </div>
                                        ))}
                                        {dayBookings.length > 2 && (
                                            <p className="px-1 text-[8px] font-medium text-neutral-400">
                                                +{dayBookings.length - 2} lainnya
                                            </p>
                                        )}
                                    </div>

                                    {isToday && !isSelected && (
                                        <span className="absolute bottom-1 right-2 size-1.5 rounded-full bg-neutral-950" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-neutral-100 pt-5">
                        {[
                            { label: 'Peminjaman 1', color: '#2563eb' },
                            { label: 'Peminjaman 2', color: '#9333ea' },
                            { label: 'Peminjaman 3', color: '#0f766e' },
                            { label: 'Peminjaman 4', color: '#c2410c' },
                            { label: 'Peminjaman 5', color: '#be185d' },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center gap-2">
                                <span className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-[10px] text-neutral-500">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <aside className="flex min-w-0 flex-col rounded-xl border border-neutral-200 bg-neutral-50/70 p-4 sm:p-5">
                    <div>
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                                Detail Peminjaman
                            </p>
                            {selectedDate === today && (
                                <span className="rounded-full bg-neutral-950 px-2.5 py-1 text-[9px] font-semibold text-white">
                                    Hari Ini
                                </span>
                            )}
                        </div>
                        <h3 className="mt-3 text-lg font-semibold text-neutral-950">
                            {formatDate(selectedDate)}
                        </h3>
                        <p className="mt-1 text-[10px] text-neutral-500">
                            {selectedBookings.length} peminjaman pada tanggal ini
                        </p>
                    </div>

                    <div className="my-4 h-px bg-neutral-200" />

                    {selectedBookings.length > 0 ? (
                        <div className="space-y-4">
                            {selectedBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="overflow-hidden rounded-xl border border-neutral-200 bg-white transition hover:border-neutral-300 hover:shadow-sm"
                                >
                                    <div className="border-b border-neutral-100 p-3">
                                        <div className="mb-2 flex items-center justify-between gap-2">
                                            <span
                                                className="rounded-md px-2 py-1 text-[9px] font-semibold"
                                                style={{
                                                    backgroundColor: booking.colorLight,
                                                    color: booking.color,
                                                }}
                                            >
                                                {booking.status}
                                            </span>
                                            <span className="text-[9px] font-medium text-neutral-400">
                                                #{String(booking.id).padStart(3, '0')}
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-semibold text-neutral-900">
                                            {booking.asset}
                                        </h4>
                                        <p className="mt-1 text-[10px] text-neutral-400">
                                            {booking.assetCode} · {booking.category}
                                        </p>
                                    </div>

                                    <div className="space-y-3 p-3">
                                        <div>
                                            <p className="mb-1.5 text-[9px] font-bold uppercase tracking-wider text-neutral-400">
                                                Informasi Peminjam
                                            </p>
                                            <p className="text-xs font-semibold text-neutral-900">
                                                {booking.borrower}
                                            </p>
                                            <span className="mt-1 inline-flex rounded-md bg-neutral-100 px-2 py-1 text-[9px] font-medium text-neutral-600">
                                                {booking.borrowerType}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="rounded-lg bg-neutral-50 p-2">
                                                <p className="text-[9px] text-neutral-400">NIM / NIP</p>
                                                <p className="mt-1 break-all text-[10px] font-semibold text-neutral-700">
                                                    {booking.identity}
                                                </p>
                                            </div>
                                            {booking.organization && (
                                                <div className="rounded-lg bg-neutral-50 p-2">
                                                    <p className="text-[9px] text-neutral-400">Organisasi</p>
                                                    <p className="mt-1 text-[10px] font-semibold text-neutral-700">
                                                        {booking.organization}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2 border-t border-neutral-100 pt-3">
                                            <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
                                                Informasi Kontak
                                            </p>
                                            <a
                                                href={`tel:${booking.phone}`}
                                                className="flex items-center gap-2 text-[10px] text-neutral-600 transition hover:text-neutral-950"
                                            >
                                                <span className="flex size-7 items-center justify-center rounded-lg bg-neutral-100">
                                                    <Icon name="phone" size={13} />
                                                </span>
                                                {booking.phone}
                                            </a>
                                            <a
                                                href={`mailto:${booking.email}`}
                                                className="flex min-w-0 items-center gap-2 text-[10px] text-neutral-600 transition hover:text-neutral-950"
                                            >
                                                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-neutral-100">
                                                    <Icon name="mail" size={13} />
                                                </span>
                                                <span className="truncate">{booking.email}</span>
                                            </a>
                                        </div>

                                        <div className="rounded-lg bg-neutral-50 p-3">
                                            <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
                                                Periode Peminjaman
                                            </p>
                                            <div className="mt-2 flex items-center justify-between gap-2">
                                                <div>
                                                    <p className="text-[9px] text-neutral-400">Tanggal pinjam</p>
                                                    <p className="mt-1 text-[10px] font-semibold text-neutral-800">
                                                        {formatDate(booking.start)}
                                                    </p>
                                                </div>
                                                <span className="text-neutral-400">→</span>
                                                <div className="text-right">
                                                    <p className="text-[9px] text-neutral-400">Batas kembali</p>
                                                    <p className="mt-1 text-[10px] font-semibold text-neutral-800">
                                                        {formatDate(booking.end)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
                                                Keperluan Peminjaman
                                            </p>
                                            <p className="mt-1 text-[10px] leading-5 text-neutral-600">
                                                {booking.purpose}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 border-t border-neutral-100 pt-3">
                                            <a
                                                href={`tel:${booking.phone}`}
                                                className="flex items-center justify-center gap-2 rounded-lg border border-neutral-200 px-2 py-2.5 text-[10px] font-semibold text-neutral-700 transition hover:bg-neutral-100"
                                            >
                                                <Icon name="phone" size={13} />
                                                Telepon
                                            </a>
                                            <a
                                                href={`mailto:${booking.email}`}
                                                className="flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-2 py-2.5 text-[10px] font-semibold text-white transition hover:bg-neutral-700"
                                            >
                                                <Icon name="mail" size={13} />
                                                Email
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-white px-5 py-10 text-center">
                            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-500">
                                <Icon name="calendar" size={22} />
                            </div>
                            <h4 className="text-xs font-semibold text-neutral-800">
                                Tidak ada peminjaman
                            </h4>
                            <p className="mt-2 max-w-52 text-[10px] leading-5 text-neutral-400">
                                Belum ada jadwal peminjaman aset pada tanggal ini.
                                Pilih tanggal lain untuk melihat jadwal.
                            </p>
                        </div>
                    )}

                    <div className="mt-5 border-t border-neutral-200 pt-4">
                        <p className="text-[10px] leading-5 text-neutral-400">
                            Informasi peminjam ditampilkan untuk membantu
                            pengelola melakukan konfirmasi dan koordinasi
                            pengembalian aset.
                        </p>
                    </div>
                </aside>
            </div>
        </section>
    );
}

// ======================================================
// CHART TREN PEMINJAMAN
// ======================================================

function BorrowingChart() {
    const [period, setPeriod] = useState<'mingguan' | 'bulanan'>('bulanan');

    const weeklyData = [
        { label: 'Sen', value: 12 },
        { label: 'Sel', value: 18 },
        { label: 'Rab', value: 10 },
        { label: 'Kam', value: 25 },
        { label: 'Jum', value: 19 },
        { label: 'Sab', value: 14 },
        { label: 'Min', value: 8 },
    ];

    const monthlyData = [
        { label: 'Jun', value: 32 },
        { label: 'Jul', value: 45 },
        { label: 'Agu', value: 38 },
        { label: 'Sep', value: 57 },
        { label: 'Okt', value: 49 },
        { label: 'Nov', value: 68 },
    ];

    const data = period === 'mingguan' ? weeklyData : monthlyData;
    const maxValue = Math.max(...data.map((item) => item.value));

    return (
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-blue-600" />
                        <span className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">
                            Analitik Peminjaman
                        </span>
                    </div>
                    <h2 className="mt-2 text-sm font-semibold text-neutral-900">
                        Tren Peminjaman Aset
                    </h2>
                    <p className="mt-1 text-[10px] text-neutral-400">
                        Jumlah transaksi peminjaman berdasarkan periode.
                    </p>
                </div>

                <div className="flex rounded-lg bg-neutral-100 p-1">
                    {(['mingguan', 'bulanan'] as const).map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => setPeriod(item)}
                            className={`rounded-md px-3 py-1.5 text-[10px] font-semibold capitalize transition ${
                                period === item
                                    ? 'bg-white text-neutral-950 shadow-sm'
                                    : 'text-neutral-500 hover:text-neutral-900'
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-7 flex items-end justify-between gap-3">
                <div>
                    <p className="text-[10px] text-neutral-400">Total peminjaman</p>
                    <p className="mt-1 text-3xl font-bold tracking-tight text-neutral-950">
                        {data.reduce((sum, item) => sum + item.value, 0)}
                    </p>
                </div>
                <span className="rounded-full bg-teal-50 px-3 py-1.5 text-[10px] font-semibold text-teal-700">
                    +12,8% dari periode lalu
                </span>
            </div>

            <div className="mt-6 flex h-48 items-end gap-3 border-b border-neutral-100 pb-2">
                {data.map((item, index) => (
                    <div key={item.label} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
                        <span className="text-[9px] font-semibold text-neutral-500">
                            {item.value}
                        </span>
                        <div className="flex h-full w-full items-end">
                            <div
                                className="w-full rounded-t-lg transition-all duration-500 hover:opacity-75"
                                style={{
                                    height: `${(item.value / maxValue) * 100}%`,
                                    minHeight: '8px',
                                    backgroundColor: ['#2563eb', '#9333ea', '#0f766e', '#c2410c', '#be185d', '#2563eb', '#9333ea'][index],
                                }}
                                title={`${item.value} peminjaman`}
                            />
                        </div>
                        <span className="text-[9px] font-medium text-neutral-400">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-blue-600" />
                    <span className="text-[10px] text-neutral-500">Transaksi peminjaman</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-neutral-200" />
                    <span className="text-[10px] text-neutral-500">Data ilustrasi</span>
                </div>
            </div>
        </div>
    );
}

// ======================================================
// STATISTIK JENIS PEMINJAM
// ======================================================

function BorrowerDistribution() {
    const [selectedType, setSelectedType] = useState('Semua');

    const total = borrowerStats.reduce((sum, item) => sum + item.total, 0);

    const filteredBorrowers =
        selectedType === 'Semua'
            ? frequentBorrowers
            : frequentBorrowers.filter((item) => item.type === selectedType);

    return (
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
            <div>
                <span className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">
                    Statistik Pengguna
                </span>
                <h2 className="mt-2 text-sm font-semibold text-neutral-900">
                    Distribusi Peminjam
                </h2>
                <p className="mt-1 text-[10px] text-neutral-400">
                    Perbandingan peminjaman berdasarkan jenis pengguna.
                </p>
            </div>

            <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row">
                <div
                    className="relative flex size-40 shrink-0 items-center justify-center rounded-full"
                    style={{
                        background: `conic-gradient(
                            #2563eb 0% 68%,
                            #9333ea 68% 86%,
                            #0f766e 86% 95%,
                            #c2410c 95% 100%
                        )`,
                    }}
                >
                    <div className="flex size-28 flex-col items-center justify-center rounded-full bg-white">
                        <span className="text-3xl font-bold text-neutral-950">{total}</span>
                        <span className="text-[9px] text-neutral-400">Total peminjam</span>
                    </div>
                </div>

                <div className="w-full flex-1 space-y-4">
                    {borrowerStats.map((item) => (
                        <div key={item.name}>
                            <div className="mb-1.5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-[10px] font-medium text-neutral-600">{item.name}</span>
                                </div>
                                <span className="text-[10px] font-semibold text-neutral-900">
                                    {item.total} ({item.percentage}%)
                                </span>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100">
                                <div
                                    className="h-full rounded-full transition-all"
                                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-7 border-t border-neutral-100 pt-5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div>
                        <h3 className="text-xs font-semibold text-neutral-900">
                            Peminjam Teraktif
                        </h3>
                        <p className="mt-1 text-[10px] text-neutral-400">
                            Pengguna dengan frekuensi peminjaman tertinggi.
                        </p>
                    </div>
                    <select
                        value={selectedType}
                        onChange={(event) => setSelectedType(event.target.value)}
                        className="rounded-lg border border-neutral-200 bg-white px-2.5 py-2 text-[10px] text-neutral-600 outline-none focus:border-neutral-400"
                    >
                        <option value="Semua">Semua pengguna</option>
                        <option value="Mahasiswa">Mahasiswa</option>
                        <option value="Dosen">Dosen</option>
                        <option value="Staf">Staf</option>
                    </select>
                </div>

                <div className="space-y-3">
                    {filteredBorrowers.length > 0 ? (
                        filteredBorrowers.map((person, index) => (
                            <div key={person.name} className="flex items-center gap-3">
                                <div
                                    className="flex size-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold"
                                    style={{
                                        backgroundColor: `${person.color}15`,
                                        color: person.color,
                                    }}
                                >
                                    {person.name.split(' ').map((word) => word[0]).slice(0, 2).join('')}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-[11px] font-semibold text-neutral-800">
                                        {person.name}
                                    </p>
                                    <p className="mt-0.5 text-[9px] text-neutral-400">
                                        {person.type} · {person.identity}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-neutral-900">{person.total}x</p>
                                    <p className="text-[9px] text-neutral-400">Peminjaman</p>
                                </div>
                                {index === 0 && (
                                    <span className="rounded-md bg-amber-50 px-2 py-1 text-[8px] font-bold text-amber-700">
                                        TOP
                                    </span>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="rounded-lg bg-neutral-50 p-4 text-center text-[10px] text-neutral-400">
                            Belum ada data peminjam untuk kategori ini.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

// ======================================================
// ASET PALING SERING DIPINJAM
// ======================================================

function PopularAssets() {
    return (
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">
                        Statistik Aset
                    </span>
                    <h2 className="mt-2 text-sm font-semibold text-neutral-900">
                        Aset Paling Sering Dipinjam
                    </h2>
                    <p className="mt-1 text-[10px] text-neutral-400">
                        Daftar aset dengan aktivitas peminjaman tertinggi.
                    </p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Icon name="building" size={19} />
                </div>
            </div>

            <div className="mt-6 space-y-5">
                {frequentAssets.map((asset, index) => (
                    <div key={asset.name}>
                        <div className="mb-2 flex items-center justify-between gap-3">
                            <div className="min-w-0">
                                <p className="truncate text-xs font-semibold text-neutral-800">
                                    {index + 1}. {asset.name}
                                </p>
                                <p className="mt-0.5 text-[9px] text-neutral-400">
                                    {asset.category}
                                </p>
                            </div>
                            <span className="shrink-0 text-xs font-bold text-neutral-900">
                                {asset.total}x
                            </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                    width: `${asset.percentage}%`,
                                    backgroundColor: ['#2563eb', '#9333ea', '#0f766e', '#c2410c'][index],
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 rounded-xl bg-neutral-50 p-4">
                <p className="text-[10px] font-semibold text-neutral-700">
                    Informasi pengelolaan
                </p>
                <p className="mt-1 text-[10px] leading-5 text-neutral-500">
                    Aset dengan frekuensi peminjaman tinggi sebaiknya mendapat
                    pemeriksaan kondisi secara berkala.
                </p>
            </div>
        </div>
    );
}

// ======================================================
// DISTRIBUSI KATEGORI ASET
// ======================================================

function AssetCategoryCard() {
    return (
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2 className="text-sm font-semibold text-neutral-900">
                        Distribusi Kategori Aset
                    </h2>
                    <p className="mt-1 text-[10px] text-neutral-400">
                        Persebaran aset berdasarkan kategori.
                    </p>
                </div>
                <span className="rounded-lg border border-neutral-200 px-3 py-1.5 text-[9px] text-neutral-500">
                    120 aset
                </span>
            </div>

            <div className="mt-7 space-y-5">
                {assetCategories.map((category) => (
                    <div key={category.name}>
                        <div className="mb-2 flex items-center justify-between text-xs">
                            <span className="font-medium text-neutral-700">
                                {category.name}
                            </span>
                            <span className="text-neutral-400">
                                {category.total} aset · {category.percentage}%
                            </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                            <div
                                className="h-full rounded-full transition-all"
                                style={{
                                    width: `${category.percentage}%`,
                                    backgroundColor: category.color,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 border-t border-neutral-100 pt-5">
                <div>
                    <p className="text-[10px] text-neutral-400">Total kategori</p>
                    <p className="mt-1 text-xl font-semibold text-neutral-900">4</p>
                </div>
                <div>
                    <p className="text-[10px] text-neutral-400">Total keseluruhan</p>
                    <p className="mt-1 text-xl font-semibold text-neutral-900">120</p>
                </div>
            </div>
        </div>
    );
}

// ======================================================
// AKTIVITAS TERBARU
// ======================================================

function RecentActivities() {
    return (
        <section className="rounded-2xl border border-neutral-200 bg-white">
            <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-5 sm:px-6">
                <div>
                    <h2 className="text-sm font-semibold text-neutral-900">
                        Aktivitas Terbaru
                    </h2>
                    <p className="mt-1 text-[10px] text-neutral-400">
                        Aktivitas operasional yang tercatat di FAMS.
                    </p>
                </div>
                <span className="rounded-lg bg-neutral-100 px-3 py-2 text-[9px] font-semibold text-neutral-600">
                    Hari ini
                </span>
            </div>

            <div className="divide-y divide-neutral-100">
                {activities.map((activity) => (
                    <div
                        key={activity.title}
                        className="flex flex-col gap-3 px-5 py-4 transition hover:bg-neutral-50/70 sm:flex-row sm:items-center sm:px-6"
                    >
                        <div
                            className="flex size-9 shrink-0 items-center justify-center rounded-xl"
                            style={{
                                backgroundColor: activity.light,
                                color: activity.color,
                            }}
                        >
                            <Icon name="clock" size={16} />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-neutral-800">
                                {activity.title}
                            </p>
                            <p className="mt-1 truncate text-[10px] text-neutral-400">
                                {activity.detail}
                            </p>
                        </div>
                        <div className="flex items-center justify-between gap-4 sm:justify-end">
                            <span className="text-[10px] text-neutral-400">
                                {activity.time}
                            </span>
                            <span
                                className="rounded-full px-3 py-1 text-[9px] font-medium"
                                style={{
                                    backgroundColor: activity.light,
                                    color: activity.color,
                                }}
                            >
                                {activity.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

// ======================================================
// MAIN DASHBOARD
// ======================================================

export default function DashboardIndex() {
    const today = new Date();

    const formattedDate = today.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <DashboardLayout>
            <Head title="Dashboard — FAMS" />

            <div className="space-y-6">
                {/* WELCOME BANNER */}
                <section className="relative isolate min-h-[230px] overflow-hidden rounded-2xl bg-neutral-950 text-white">
                    <div
                        className="absolute inset-0 -z-20 bg-cover bg-center opacity-35"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=85')",
                        }}
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-neutral-950/30" />

                    <div className="absolute -right-12 -top-20 size-64 rounded-full border border-white/10" />
                    <div className="absolute -right-2 -top-10 size-44 rounded-full border border-white/10" />
                    <div className="absolute bottom-[-90px] right-[20%] size-52 rounded-full bg-white/5 blur-2xl" />

                    <div className="relative flex min-h-[230px] flex-col justify-between gap-8 p-6 sm:p-8 lg:flex-row lg:items-center">
                        <div className="max-w-xl">
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                                <span className="size-1.5 rounded-full bg-teal-300" />
                                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/80">
                                    Faculty Asset Management System
                                </span>
                            </div>

                            <p className="text-sm font-medium text-white/60">
                                {getGreeting()}, Admin!
                            </p>
                            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                                Selamat datang kembali.
                            </h1>
                            <p className="mt-3 max-w-lg text-xs leading-6 text-white/65 sm:text-sm">
                                Kelola aset, pantau aktivitas peminjaman, dan
                                pastikan seluruh fasilitas fakultas tetap
                                terorganisir dalam satu sistem.
                            </p>

                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-[10px] font-semibold text-neutral-950 shadow-lg">
                                    <Icon name="calendar" size={14} />
                                    {formattedDate}
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-[10px] font-medium text-white/90 backdrop-blur-sm">
                                    <span className="size-1.5 rounded-full bg-teal-300" />
                                    Sistem aktif
                                </span>
                            </div>
                        </div>

                        <div className="hidden shrink-0 flex-col items-end gap-3 lg:flex">
                            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-md">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-12 items-center justify-center rounded-xl bg-white text-neutral-950">
                                        <Icon name="building" size={25} />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold tracking-[0.12em]">FAMS</p>
                                        <p className="text-[9px] tracking-[0.18em] text-white/60">
                                            ASSET MANAGEMENT
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-5 flex items-center justify-between gap-8 border-t border-white/15 pt-4">
                                    <div>
                                        <p className="text-[9px] text-white/50">Total aset</p>
                                        <p className="mt-1 text-lg font-bold">120</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-white/50">Peminjaman aktif</p>
                                        <p className="mt-1 text-lg font-bold">25</p>
                                    </div>
                                </div>
                            </div>
                            <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[9px] font-medium tracking-wider text-white/50 backdrop-blur-sm">
                                MANAGE · MONITOR · MAINTAIN
                            </span>
                        </div>
                    </div>
                </section>

                {/* STATISTICS */}
                <section>
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-sm font-semibold text-neutral-900">
                                Ringkasan Aset
                            </h2>
                            <p className="mt-1 text-[10px] text-neutral-400">
                                Kondisi umum aset fakultas saat ini.
                            </p>
                        </div>
                        <span className="rounded-full border border-neutral-200 px-3 py-1.5 text-[9px] text-neutral-400">
                            Data ilustrasi
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => (
                            <StatCard
                                key={stat.title}
                                title={stat.title}
                                value={stat.value}
                                description={stat.description}
                                icon={stat.icon}
                                color={stat.color}
                                light={stat.light}
                                trend={stat.trend}
                            />
                        ))}
                    </div>
                </section>

                {/* CALENDAR */}
                <BookingCalendarSection />

                {/* CHART + BORROWER DISTRIBUTION */}
                <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                    <BorrowingChart />
                    <BorrowerDistribution />
                </section>

                {/* ASSET CATEGORY + POPULAR ASSET */}
                <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                    <AssetCategoryCard />
                    <PopularAssets />
                </section>

                {/* RECENT ACTIVITIES */}
                <RecentActivities />

                {/* BOTTOM INFORMATION */}
                <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="group flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-700 transition group-hover:scale-105">
                            <Icon name="clock" size={20} />
                        </div>
                        <div>
                            <h3 className="text-xs font-semibold text-neutral-900">
                                Persetujuan Peminjaman
                            </h3>
                            <p className="mt-1 text-[10px] leading-5 text-neutral-500">
                                6 pengajuan membutuhkan tindak lanjut.
                            </p>
                        </div>
                    </div>

                    <div className="group flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-700 transition group-hover:scale-105">
                            <Icon name="shield" size={20} />
                        </div>
                        <div>
                            <h3 className="text-xs font-semibold text-neutral-900">
                                Pemeriksaan Aset
                            </h3>
                            <p className="mt-1 text-[10px] leading-5 text-neutral-500">
                                8 aset membutuhkan pemeriksaan kondisi.
                            </p>
                        </div>
                    </div>

                    <div className="group flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition group-hover:scale-105">
                            <Icon name="building" size={20} />
                        </div>
                        <div>
                            <h3 className="text-xs font-semibold text-neutral-900">
                                Ketersediaan Aset
                            </h3>
                            <p className="mt-1 text-[10px] leading-5 text-neutral-500">
                                82 aset siap digunakan dan dipinjam.
                            </p>
                        </div>
                    </div>
                </section>

                {/* FOOTER NOTE */}
                <div className="flex flex-col justify-between gap-2 border-t border-neutral-200 pt-4 sm:flex-row sm:items-center">
                    <p className="text-[9px] text-neutral-400">
                        FAMS · Faculty Asset Management System
                    </p>
                    <p className="text-[9px] text-neutral-400">
                        Dashboard menggunakan data demonstrasi.
                    </p>
                </div>
            </div>
        </DashboardLayout>
    );
}
