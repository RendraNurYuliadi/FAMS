
import { useMemo, useState } from 'react';
import Icon from '../components/Icon';

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
        color: '#262626',
        colorLight: '#e5e5e5',
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
        color: '#737373',
        colorLight: '#f5f5f5',
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
        color: '#525252',
        colorLight: '#e5e5e5',
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
        color: '#404040',
        colorLight: '#d4d4d4',
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
        color: '#a3a3a3',
        colorLight: '#f5f5f5',
        status: 'Disetujui',
    },
];

const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
];

const weekdays = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

// Menghasilkan tanggal lokal, bukan UTC.
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

export default function BookingCalendarSection() {
    // Tanggal sekarang selalu diambil secara dinamis.
    const [today] = useState(() => getLocalDateString(new Date()));

    // Kalender otomatis dibuka pada bulan dan tahun sekarang.
    const [currentDate, setCurrentDate] = useState(() => new Date());

    // Tanggal hari ini langsung menjadi tanggal aktif.
    const [selectedDate, setSelectedDate] = useState(today);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Membuat seluruh tanggal kalender.
    const calendarDays = useMemo<CalendarDay[]>(() => {
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        const cells: CalendarDay[] = [];

        // Tanggal bulan sebelumnya.
        for (let i = 0; i < firstDay; i++) {
            cells.push({
                day: 0,
                date: '',
                outside: true,
            });
        }

        // Tanggal bulan berjalan.
        for (let day = 1; day <= totalDays; day++) {
            const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            cells.push({
                day,
                date,
                outside: false,
            });
        }

        // Melengkapi baris terakhir agar kalender tetap rapi.
        const remaining = (7 - (cells.length % 7)) % 7;

        for (let i = 0; i < remaining; i++) {
            cells.push({
                day: 0,
                date: '',
                outside: true,
            });
        }

        return cells;
    }, [year, month]);

    // Mengambil peminjaman berdasarkan tanggal yang dipilih.
    const selectedBookings = bookings.filter(
        (booking) =>
            selectedDate >= booking.start &&
            selectedDate <= booking.end,
    );

    // Menghitung jumlah peminjaman pada bulan yang ditampilkan.
    const monthlyBookings = bookings.filter((booking) => {
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

    // Kembali ke bulan dan tanggal hari ini.
    const goToToday = () => {
        const now = new Date();

        setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1));
        setSelectedDate(getLocalDateString(now));
    };

    return (
        <section
            id="kalender"
            className="relative isolate overflow-hidden bg-gradient-to-br from-neutral-100 via-white to-neutral-200 py-20 sm:py-24"
        >
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-35">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(23,23,23,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,0.05) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        maskImage:
                            'radial-gradient(ellipse at center, black 5%, transparent 76%)',
                    }}
                />
                <div className="absolute -left-40 top-16 size-96 rounded-full bg-white blur-3xl" />
                <div className="absolute -right-36 bottom-0 size-96 rounded-full bg-neutral-400/30 blur-3xl" />
            </div>
            <div className="mx-auto max-w-7xl px-5 sm:px-8">

                {/* Section Heading */}
                <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="max-w-2xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2">
                            <span className="size-2 rounded-full bg-neutral-900" />
                            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-600">
                                Jadwal Peminjaman
                            </span>
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
                            Kalender Peminjaman Aset
                        </h2>

                        <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
                            Pantau jadwal penggunaan dan ketersediaan aset
                            fakultas berdasarkan tanggal peminjaman secara
                            lebih mudah dan terorganisir.
                        </p>
                    </div>

                </div>

                {/* Calendar and Detail */}
                <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">

                    {/* Calendar Card */}
                    <div className="min-w-0 rounded-2xl border border-neutral-200 bg-white p-3 sm:p-5">

                        {/* Calendar Header */}
                        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                            <div className="relative">
                                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
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
                                <button
                                    type="button"
                                    onClick={goToToday}
                                    className="ml-1 rounded-xl bg-neutral-900 px-4 py-3 text-[10px] font-semibold text-white transition hover:bg-neutral-700"
                                >
                                    Hari ini
                                </button>
                            </div>
                        </div>

                        {/* Weekdays */}
                        <div className="grid grid-cols-7 border-b border-neutral-100 pb-3">
                            {weekdays.map((day) => (
                                <div
                                    key={day}
                                    className="text-center text-[10px] font-bold text-neutral-400 sm:text-xs"
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
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
                                                ? `${cell.day} ${monthNames[month]} ${year}${isToday ? ', hari ini' : ''}, ${dayBookings.length} peminjaman`
                                                : undefined
                                        }
                                        className={`group relative min-h-[76px] border-b border-r border-neutral-100 p-1 text-left transition sm:min-h-[105px] sm:p-2 ${
                                            cell.outside
                                                ? 'cursor-default bg-neutral-50/40'
                                                : 'cursor-pointer hover:bg-neutral-50'
                                        } ${isSelected ? 'bg-neutral-100' : ''}`}
                                    >
                                        {/* Date Number */}
                                        <div className="flex items-center justify-between gap-1">
                                            <span
                                                className={`flex size-7 items-center justify-center rounded-full text-xs font-semibold transition sm:size-8 sm:text-sm ${
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

                                        {/* Booking Tags */}
                                        <div className="mt-2 space-y-1">
                                            {dayBookings.slice(0, 2).map((booking) => (
                                                <div
                                                    key={booking.id}
                                                    className="truncate rounded-md px-1 py-1 text-[9px] font-semibold sm:px-1.5 sm:text-[10px]"
                                                    style={{
                                                        backgroundColor: booking.colorLight,
                                                        color: booking.color,
                                                    }}
                                                >
                                                    <span className="hidden sm:inline">
                                                        {booking.asset}
                                                    </span>

                                                    <span className="sm:hidden">
                                                        ●
                                                    </span>
                                                </div>
                                            ))}

                                            {dayBookings.length > 2 && (
                                                <p className="px-1 text-[9px] font-medium text-neutral-400">
                                                    +{dayBookings.length - 2} lainnya
                                                </p>
                                            )}
                                        </div>

                                        {/* Today Indicator */}
                                        {isToday && !isSelected && (
                                            <span className="absolute bottom-1 right-2 size-1.5 rounded-full bg-neutral-950" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Legend */}
                        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-neutral-100 pt-5">
                            {[
                                { label: 'Peminjaman 1', color: '#262626' },
                                { label: 'Peminjaman 2', color: '#737373' },
                                { label: 'Peminjaman 3', color: '#525252' },
                                { label: 'Peminjaman 4', color: '#404040' },
                                { label: 'Peminjaman 5', color: '#a3a3a3' },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-2">
                                    <span
                                        className="size-2.5 rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-[10px] text-neutral-500">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Booking Details */}
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
                                                    <p className="text-[9px] text-neutral-400">
                                                        NIM / NIP
                                                    </p>
                                                    <p className="mt-1 break-all text-[10px] font-semibold text-neutral-700">
                                                        {booking.identity}
                                                    </p>
                                                </div>
                                                {booking.organization && (
                                                    <div className="rounded-lg bg-neutral-50 p-2">
                                                        <p className="text-[9px] text-neutral-400">
                                                            Organisasi
                                                        </p>
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
                                                        <p className="text-[9px] text-neutral-400">
                                                            Tanggal pinjam
                                                        </p>
                                                        <p className="mt-1 text-[10px] font-semibold text-neutral-800">
                                                            {formatDate(booking.start)}
                                                        </p>
                                                    </div>
                                                    <span className="text-neutral-400">→</span>
                                                    <div className="text-right">
                                                        <p className="text-[9px] text-neutral-400">
                                                            Batas kembali
                                                        </p>
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
            </div>
        </section>
    );
}
