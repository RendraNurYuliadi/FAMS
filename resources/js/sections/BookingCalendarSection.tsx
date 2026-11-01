
import { useMemo, useState } from 'react';

type Booking = {
    id: number;
    asset: string;
    borrower: string;
    start: string;
    end: string;
    color: string;
    colorLight: string;
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
        borrower: 'Rendra Nur Yuliadi',
        start: '2026-11-03',
        end: '2026-11-07',
        color: '#2563eb',
        colorLight: '#dbeafe',
    },
    {
        id: 2,
        asset: 'Proyektor Epson',
        borrower: 'Amelia Puji Lestari',
        start: '2026-11-05',
        end: '2026-11-09',
        color: '#9333ea',
        colorLight: '#f3e8ff',
    },
    {
        id: 3,
        asset: 'Kamera Canon',
        borrower: 'Herliana Tri Cahyanti',
        start: '2026-11-12',
        end: '2026-11-15',
        color: '#0f766e',
        colorLight: '#ccfbf1',
    },
    {
        id: 4,
        asset: 'Sound System',
        borrower: 'UKM TahuNgoding',
        start: '2026-11-18',
        end: '2026-11-21',
        color: '#c2410c',
        colorLight: '#ffedd5',
    },
    {
        id: 5,
        asset: 'Laptop Lenovo',
        borrower: 'Jajang Didin',
        start: '2026-11-24',
        end: '2026-11-27',
        color: '#be185d',
        colorLight: '#fce7f3',
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
            className="relative overflow-hidden bg-neutral-50 py-20 sm:py-24"
        >
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

                    {/* Year Navigation */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => changeYear(-1)}
                            className="flex size-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-600 transition hover:bg-neutral-100"
                            aria-label="Tahun sebelumnya"
                        >
                            «
                        </button>

                        <span className="min-w-20 text-center text-lg font-bold text-neutral-950 tabular-nums">
                            {year}
                        </span>

                        <button
                            type="button"
                            onClick={() => changeYear(1)}
                            className="flex size-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-600 transition hover:bg-neutral-100"
                            aria-label="Tahun berikutnya"
                        >
                            »
                        </button>
                    </div>
                </div>

                {/* Calendar and Detail */}
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">

                    {/* Calendar Card */}
                    <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-7">

                        {/* Calendar Header */}
                        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                                    Kalender
                                </p>

                                <h3 className="mt-1 text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
                                    {monthNames[month]} {year}
                                </h3>

                                <p className="mt-1 text-xs text-neutral-400">
                                    {monthlyBookings.length} jadwal peminjaman terdaftar
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={goToToday}
                                    className="rounded-xl border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-100"
                                >
                                    Hari ini
                                </button>

                                <button
                                    type="button"
                                    onClick={() => changeMonth(-1)}
                                    className="flex size-10 items-center justify-center rounded-xl border border-neutral-200 text-xl text-neutral-600 transition hover:bg-neutral-100"
                                    aria-label="Bulan sebelumnya"
                                >
                                    ‹
                                </button>

                                <button
                                    type="button"
                                    onClick={() => changeMonth(1)}
                                    className="flex size-10 items-center justify-center rounded-xl border border-neutral-200 text-xl text-neutral-600 transition hover:bg-neutral-100"
                                    aria-label="Bulan berikutnya"
                                >
                                    ›
                                </button>
                            </div>
                        </div>

                        {/* Weekdays */}
                        <div className="grid grid-cols-7 border-b border-neutral-100 pb-3">
                            {weekdays.map((day) => (
                                <div
                                    key={day}
                                    className="text-center text-xs font-bold text-neutral-400"
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
                                        className={`group relative min-h-20 border-b border-r border-neutral-100 p-1 text-left transition sm:min-h-28 sm:p-2 ${
                                            cell.outside
                                                ? 'cursor-default bg-neutral-50/40'
                                                : 'cursor-pointer hover:bg-neutral-50'
                                        } ${
                                            isSelected
                                                ? 'bg-neutral-100'
                                                : ''
                                        }`}
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
                                                <span className="hidden text-[9px] font-bold uppercase tracking-wider text-neutral-900 sm:inline">
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
                        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-neutral-100 pt-5">
                            <div className="flex items-center gap-2">
                                <span className="size-2.5 rounded-full bg-blue-600" />
                                <span className="text-xs text-neutral-500">
                                    Peminjaman
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="size-2.5 rounded-full bg-purple-600" />
                                <span className="text-xs text-neutral-500">
                                    Jadwal lainnya
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="size-2.5 rounded-full border-2 border-neutral-900 bg-white" />
                                <span className="text-xs text-neutral-500">
                                    Hari ini
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="size-2.5 rounded-full bg-neutral-900" />
                                <span className="text-xs text-neutral-500">
                                    Tanggal dipilih
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <aside className="flex flex-col rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">

                        {/* Detail Header */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                                    Detail Jadwal
                                </p>

                                {selectedDate === today && (
                                    <span className="rounded-full bg-neutral-950 px-3 py-1 text-[10px] font-semibold text-white">
                                        Hari Ini
                                    </span>
                                )}
                            </div>

                            <h3 className="mt-3 text-xl font-bold text-neutral-950">
                                {formatDate(selectedDate)}
                            </h3>

                            <p className="mt-1 text-sm text-neutral-500">
                                {selectedBookings.length} peminjaman pada tanggal ini
                            </p>
                        </div>

                        {/* Booking List */}
                        {selectedBookings.length > 0 ? (
                            <div className="space-y-4">
                                {selectedBookings.map((booking) => (
                                    <div
                                        key={booking.id}
                                        className="rounded-2xl border border-neutral-200 p-4 transition hover:border-neutral-300"
                                    >
                                        <div className="mb-3 flex items-center gap-2">
                                            <span
                                                className="size-2.5 rounded-full"
                                                style={{
                                                    backgroundColor: booking.color,
                                                }}
                                            />

                                            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                                                Sedang Dipinjam
                                            </span>
                                        </div>

                                        <h4 className="font-bold text-neutral-900">
                                            {booking.asset}
                                        </h4>

                                        <p className="mt-1 text-sm text-neutral-500">
                                            {booking.borrower}
                                        </p>

                                        <div className="mt-4 rounded-xl bg-neutral-50 p-3">
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                                                Periode Peminjaman
                                            </p>

                                            <div className="mt-2 flex items-center justify-between gap-2">
                                                <span className="text-xs font-semibold text-neutral-700">
                                                    {formatDate(booking.start)}
                                                </span>

                                                <span className="text-xs text-neutral-400">
                                                    →
                                                </span>
                                            </div>

                                            <p className="mt-1 text-xs font-semibold text-neutral-700">
                                                {formatDate(booking.end)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 px-5 py-10 text-center">
                                <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-neutral-100">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        className="size-7 text-neutral-500"
                                    >
                                        <rect x="3" y="5" width="18" height="16" rx="2" />
                                        <path d="M16 3v4M8 3v4M3 10h18" />
                                        <path d="m9 16 2 2 4-4" />
                                    </svg>
                                </div>

                                <h4 className="font-bold text-neutral-800">
                                    Tidak ada peminjaman
                                </h4>

                                <p className="mt-2 max-w-52 text-xs leading-6 text-neutral-400">
                                    Belum ada jadwal peminjaman aset pada tanggal ini.
                                </p>
                            </div>
                        )}

                        {/* Information */}
                        <div className="mt-6 border-t border-neutral-100 pt-4">
                            <p className="text-xs leading-6 text-neutral-400">
                                Jadwal yang ditampilkan merupakan data demonstrasi
                                dan belum terhubung dengan database peminjaman FAMS.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
