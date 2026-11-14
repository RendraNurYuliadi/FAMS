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
        color: '#C2410C',
        colorLight: '#FFF0E5',
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
        color: '#404040',
        colorLight: '#F0F0F0',
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
        color: '#EA580C',
        colorLight: '#FFEDD5',
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
        color: '#171717',
        colorLight: '#E5E5E5',
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
        color: '#9A3412',
        colorLight: '#FDE8D7',
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
            selectedDate >= booking.start && selectedDate <= booking.end,
    );

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

    const goToToday = () => {
        const now = new Date();

        setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1));
        setSelectedDate(getLocalDateString(now));
    };

    return (
        <section
            id="kalender"
            className="landing-section relative isolate overflow-hidden bg-surface-warm py-space-section sm:py-space-section-lg"
        >
            {/* BACKGROUND TEXTURE */}
            <div
                className="pointer-events-none absolute inset-0 -z-10 opacity-[0.045]"
                style={{
                    backgroundImage:
                        'radial-gradient(#C2410C 0.8px, transparent 0.8px)',
                    backgroundSize: '22px 22px',
                    maskImage:
                        'linear-gradient(to bottom right, black, transparent 85%)',
                }}
            />

            {/* SOFT ORANGE ACCENTS */}
            <div className="pointer-events-none absolute -top-40 -right-40 -z-10 size-[480px] rounded-full bg-orange-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 -z-10 size-[420px] rounded-full bg-white/80 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-space-2xl">
                {/* SECTION HEADING */}
                <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="max-w-2xl">
                        <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-orange-200 bg-white px-4 py-2">
                            <span className="size-2 rounded-full bg-[#F97316]" />
                            <span className="text-caption font-semibold tracking-widest text-[#C2410C] uppercase">
                                Jadwal Peminjaman
                            </span>
                        </div>

                        <h2 className="text-display-sm font-bold tracking-tight text-[#171717] sm:text-display-md lg:text-display-lg">
                            Kalender Peminjaman{' '}
                            <span className="text-[#EA580C]">Aset.</span>
                        </h2>

                        <p className="mt-5 max-w-xl text-body leading-7 text-gray-600">
                            Pantau jadwal penggunaan dan ketersediaan aset
                            fakultas berdasarkan tanggal peminjaman secara lebih
                            mudah dan terorganisir.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border border-orange-200/80 bg-white px-5 py-4 shadow-sm">
                        <div className="flex size-11 items-center justify-center rounded-xl bg-[#FFF0E5] text-[#EA580C]">
                            <Icon name="calendar-days" size={22} />
                        </div>
                        <div>
                            <p className="text-micro font-medium text-gray-400">
                                Jadwal bulan ini
                            </p>
                            <p className="text-subheading font-bold text-[#171717]">
                                {monthlyBookings.length} Peminjaman
                            </p>
                        </div>
                    </div>
                </div>

                {/* CALENDAR AND DETAILS */}
                <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_350px]">
                    {/* CALENDAR CARD */}
                    <div className="min-w-0 overflow-hidden rounded-[1.75rem] border border-orange-200/80 bg-white shadow-[0_12px_45px_rgba(194,65,12,0.07)]">
                        {/* CALENDAR TOP HEADER */}
                        <div className="relative overflow-hidden bg-charcoal-900 px-5 py-6 text-white sm:px-7">
                            <div className="pointer-events-none absolute -top-24 -right-10 size-64 rounded-full bg-orange-500/20 blur-3xl" />
                            <div className="pointer-events-none absolute right-1/3 -bottom-20 size-40 rounded-full bg-orange-500/10 blur-2xl" />

                            <div className="relative flex flex-wrap items-center justify-between gap-5">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="size-2 rounded-full bg-[#F97316]" />
                                        <p className="text-micro font-semibold tracking-[0.2em] text-orange-300 uppercase">
                                            Calendar Overview
                                        </p>
                                    </div>

                                    <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                                        {monthNames[month]}{' '}
                                        <span className="text-orange-400">
                                            {year}
                                        </span>
                                    </h3>

                                    <p className="mt-1.5 text-caption text-gray-400">
                                        {monthlyBookings.length} jadwal tercatat
                                        pada bulan ini
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => changeYear(-1)}
                                        className="flex size-9 items-center justify-center rounded-xl border border-white/15 text-gray-300 transition hover:border-orange-400 hover:bg-orange-500 hover:text-white"
                                        aria-label="Tahun sebelumnya"
                                    >
                                        «
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => changeMonth(-1)}
                                        className="flex size-9 items-center justify-center rounded-xl border border-white/15 text-lg text-gray-300 transition hover:border-orange-400 hover:bg-orange-500 hover:text-white"
                                        aria-label="Bulan sebelumnya"
                                    >
                                        ‹
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => changeMonth(1)}
                                        className="flex size-9 items-center justify-center rounded-xl border border-white/15 text-lg text-gray-300 transition hover:border-orange-400 hover:bg-orange-500 hover:text-white"
                                        aria-label="Bulan berikutnya"
                                    >
                                        ›
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => changeYear(1)}
                                        className="flex size-9 items-center justify-center rounded-xl border border-white/15 text-gray-300 transition hover:border-orange-400 hover:bg-orange-500 hover:text-white"
                                        aria-label="Tahun berikutnya"
                                    >
                                        »
                                    </button>

                                    <button
                                        type="button"
                                        onClick={goToToday}
                                        className="ml-1 rounded-xl bg-[#F97316] px-4 py-2.5 text-micro font-bold text-white transition hover:bg-[#EA580C]"
                                    >
                                        Hari ini
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-3 sm:p-6">
                            {/* CALENDAR GUIDE */}
                            <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-xl bg-[#FFF7ED] px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <span className="size-3 rounded-full bg-[#F97316]" />
                                    <span className="text-micro font-medium text-gray-700">
                                        Tanggal dipilih
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="size-3 rounded-full border-2 border-[#EA580C] bg-white" />
                                    <span className="text-micro font-medium text-gray-700">
                                        Hari ini
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="size-3 rounded-sm bg-[#C2410C]" />
                                    <span className="text-micro font-medium text-gray-700">
                                        Ada peminjaman
                                    </span>
                                </div>
                            </div>

                            {/* WEEKDAYS */}
                            <div className="grid grid-cols-7 border-b border-orange-100 pb-3">
                                {weekdays.map((day, index) => (
                                    <div
                                        key={day}
                                        className={`text-center text-micro font-bold sm:text-caption ${
                                            index === 0 || index === 6
                                                ? 'text-[#EA580C]'
                                                : 'text-gray-500'
                                        }`}
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* CALENDAR GRID */}
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
                                    const isSelected =
                                        cell.date === selectedDate;

                                    const weekdayIndex = index % 7;

                                    return (
                                        <button
                                            key={cell.date || `empty-${index}`}
                                            type="button"
                                            disabled={cell.outside}
                                            onClick={() =>
                                                setSelectedDate(cell.date)
                                            }
                                            aria-pressed={isSelected}
                                            aria-label={
                                                cell.date
                                                    ? `${cell.day} ${monthNames[month]} ${year}${isToday ? ', hari ini' : ''}, ${dayBookings.length} peminjaman`
                                                    : undefined
                                            }
                                            className={`group relative min-h-[88px] border-r border-b border-orange-100/70 p-1.5 text-left transition duration-200 sm:min-h-[118px] sm:p-2 ${
                                                cell.outside
                                                    ? 'cursor-default bg-gray-50/40'
                                                    : isSelected
                                                      ? 'z-10 bg-orange-50 ring-2 ring-[#F97316] ring-inset'
                                                      : 'cursor-pointer bg-white hover:bg-orange-50/60'
                                            }`}
                                        >
                                            {/* DATE NUMBER */}
                                            <div className="flex items-center justify-between gap-1">
                                                <span
                                                    className={`flex size-7 items-center justify-center rounded-full text-caption font-bold transition sm:size-8 sm:text-body ${
                                                        isSelected
                                                            ? 'bg-[#F97316] text-white shadow-md shadow-orange-200'
                                                            : isToday
                                                              ? 'border-2 border-[#EA580C] bg-white text-[#C2410C]'
                                                              : weekdayIndex ===
                                                                      0 ||
                                                                  weekdayIndex ===
                                                                      6
                                                                ? 'text-[#C2410C] group-hover:bg-orange-100'
                                                                : 'text-gray-700 group-hover:bg-orange-100'
                                                    }`}
                                                >
                                                    {cell.day || ''}
                                                </span>

                                                {isToday && (
                                                    <span className="hidden rounded-full bg-orange-100 px-1.5 py-0.5 text-[9px] font-bold text-[#C2410C] sm:inline">
                                                        TODAY
                                                    </span>
                                                )}
                                            </div>

                                            {/* BOOKING TAGS */}
                                            <div className="mt-2 space-y-1">
                                                {dayBookings
                                                    .slice(0, 2)
                                                    .map((booking) => (
                                                        <div
                                                            key={booking.id}
                                                            className="flex items-center gap-1 overflow-hidden rounded-md border px-1 py-1 sm:px-1.5"
                                                            style={{
                                                                backgroundColor:
                                                                    booking.colorLight,
                                                                borderColor: `${booking.color}25`,
                                                                color: booking.color,
                                                            }}
                                                            title={
                                                                booking.asset
                                                            }
                                                        >
                                                            <span
                                                                className="size-1.5 shrink-0 rounded-full"
                                                                style={{
                                                                    backgroundColor:
                                                                        booking.color,
                                                                }}
                                                            />

                                                            <span className="hidden truncate text-[9px] leading-tight font-bold sm:block">
                                                                {booking.asset}
                                                            </span>
                                                            <span className="block text-[9px] font-bold sm:hidden">
                                                                {booking.id}
                                                            </span>
                                                        </div>
                                                    ))}

                                                {dayBookings.length > 2 && (
                                                    <p className="px-1 text-[9px] font-bold text-[#C2410C]">
                                                        +
                                                        {dayBookings.length - 2}{' '}
                                                        lainnya
                                                    </p>
                                                )}
                                            </div>

                                            {/* BOOKING INDICATOR ON MOBILE */}
                                            {dayBookings.length > 0 && (
                                                <div className="absolute right-1 bottom-1 flex gap-0.5 sm:hidden">
                                                    {dayBookings
                                                        .slice(0, 3)
                                                        .map((booking) => (
                                                            <span
                                                                key={booking.id}
                                                                className="size-1 rounded-full"
                                                                style={{
                                                                    backgroundColor:
                                                                        booking.color,
                                                                }}
                                                            />
                                                        ))}
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* ASSET LEGEND */}
                            <div className="mt-5 border-t border-orange-100 pt-5">
                                <div className="mb-3 flex items-center justify-between gap-3">
                                    <p className="text-micro font-bold tracking-wider text-gray-800 uppercase">
                                        Keterangan Aset
                                    </p>
                                    <span className="text-[10px] text-gray-400">
                                        Warna sesuai aset
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-x-5 gap-y-3">
                                    {bookings.map((booking) => (
                                        <div
                                            key={booking.id}
                                            className="flex items-center gap-2"
                                        >
                                            <span
                                                className="size-2.5 rounded-sm"
                                                style={{
                                                    backgroundColor:
                                                        booking.color,
                                                }}
                                            />
                                            <span className="text-micro text-gray-600">
                                                {booking.asset}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOOKING DETAILS */}
                    <aside className="flex min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-orange-200/80 bg-white shadow-[0_12px_45px_rgba(194,65,12,0.06)]">
                        {/* DETAIL HEADER */}
                        <div className="relative overflow-hidden bg-charcoal-900 px-5 py-6 text-white">
                            <div className="pointer-events-none absolute -top-20 -right-12 size-48 rounded-full bg-orange-500/20 blur-3xl" />

                            <div className="relative">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <Icon
                                            name="calendar-days"
                                            size={17}
                                            color="#FB923C"
                                        />
                                        <p className="text-micro font-bold tracking-widest text-orange-300 uppercase">
                                            Detail Peminjaman
                                        </p>
                                    </div>

                                    {selectedDate === today && (
                                        <span className="rounded-full bg-[#F97316] px-3 py-1 text-[10px] font-bold text-white">
                                            HARI INI
                                        </span>
                                    )}
                                </div>

                                <h3 className="mt-4 text-xl font-bold tracking-tight">
                                    {formatDate(selectedDate)}
                                </h3>

                                <p className="mt-1.5 text-caption text-gray-400">
                                    {selectedBookings.length} peminjaman pada
                                    tanggal ini
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col p-4 sm:p-5">
                            {selectedBookings.length > 0 ? (
                                <div className="space-y-4">
                                    {selectedBookings.map((booking) => (
                                        <div
                                            key={booking.id}
                                            className="overflow-hidden rounded-2xl border border-orange-100 bg-white transition duration-300 hover:border-orange-300 hover:shadow-[0_6px_20px_rgba(194,65,12,0.07)]"
                                        >
                                            {/* ASSET INFO */}
                                            <div className="border-b border-orange-100 bg-[#FFFAF5] p-4">
                                                <div className="mb-3 flex items-center justify-between gap-2">
                                                    <span
                                                        className="rounded-full px-3 py-1 text-[10px] font-bold"
                                                        style={{
                                                            backgroundColor:
                                                                booking.status ===
                                                                'Berlangsung'
                                                                    ? '#FFF0E5'
                                                                    : booking.status ===
                                                                        'Menunggu'
                                                                      ? '#FEF3C7'
                                                                      : '#F0FDF4',
                                                            color:
                                                                booking.status ===
                                                                'Berlangsung'
                                                                    ? '#C2410C'
                                                                    : booking.status ===
                                                                        'Menunggu'
                                                                      ? '#A16207'
                                                                      : '#15803D',
                                                        }}
                                                    >
                                                        {booking.status}
                                                    </span>

                                                    <span className="text-micro font-semibold text-gray-400">
                                                        #
                                                        {String(
                                                            booking.id,
                                                        ).padStart(3, '0')}
                                                    </span>
                                                </div>

                                                <h4 className="text-body font-bold text-[#171717]">
                                                    {booking.asset}
                                                </h4>

                                                <p className="mt-1 text-micro text-gray-500">
                                                    {booking.assetCode} ·{' '}
                                                    {booking.category}
                                                </p>
                                            </div>

                                            <div className="space-y-4 p-4">
                                                {/* BORROWER */}
                                                <div>
                                                    <p className="mb-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                                        Informasi Peminjam
                                                    </p>

                                                    <p className="text-caption font-bold text-gray-900">
                                                        {booking.borrower}
                                                    </p>

                                                    <span className="mt-2 inline-flex rounded-full bg-orange-50 px-3 py-1 text-[10px] font-semibold text-[#C2410C]">
                                                        {booking.borrowerType}
                                                    </span>
                                                </div>

                                                {/* IDENTITY */}
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="rounded-xl bg-gray-50 p-3">
                                                        <p className="text-[10px] text-gray-400">
                                                            NIM / NIP
                                                        </p>
                                                        <p className="mt-1 text-micro font-semibold break-all text-gray-700">
                                                            {booking.identity}
                                                        </p>
                                                    </div>

                                                    {booking.organization && (
                                                        <div className="rounded-xl bg-gray-50 p-3">
                                                            <p className="text-[10px] text-gray-400">
                                                                Organisasi
                                                            </p>
                                                            <p className="mt-1 text-micro font-semibold text-gray-700">
                                                                {
                                                                    booking.organization
                                                                }
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* CONTACT */}
                                                <div className="border-t border-gray-100 pt-4">
                                                    <p className="mb-3 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                                        Informasi Kontak
                                                    </p>

                                                    <a
                                                        href={`tel:${booking.phone}`}
                                                        className="flex items-center gap-3 text-micro text-gray-600 transition hover:text-[#EA580C]"
                                                    >
                                                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#EA580C]">
                                                            <Icon
                                                                name="phone"
                                                                size={14}
                                                            />
                                                        </span>
                                                        {booking.phone}
                                                    </a>

                                                    <a
                                                        href={`mailto:${booking.email}`}
                                                        className="mt-2 flex min-w-0 items-center gap-3 text-micro text-gray-600 transition hover:text-[#EA580C]"
                                                    >
                                                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#EA580C]">
                                                            <Icon
                                                                name="mail"
                                                                size={14}
                                                            />
                                                        </span>
                                                        <span className="truncate">
                                                            {booking.email}
                                                        </span>
                                                    </a>
                                                </div>

                                                {/* PERIOD */}
                                                <div className="rounded-xl border border-orange-100 bg-[#FFF7ED] p-3">
                                                    <p className="mb-3 text-[10px] font-bold tracking-widest text-[#C2410C] uppercase">
                                                        Periode Peminjaman
                                                    </p>

                                                    <div className="flex items-center justify-between gap-2">
                                                        <div>
                                                            <p className="text-[10px] text-gray-500">
                                                                Tanggal pinjam
                                                            </p>
                                                            <p className="mt-1 text-micro font-bold text-gray-800">
                                                                {formatDate(
                                                                    booking.start,
                                                                )}
                                                            </p>
                                                        </div>

                                                        <Icon
                                                            name="arrow-right"
                                                            size={16}
                                                            color="#EA580C"
                                                        />

                                                        <div className="text-right">
                                                            <p className="text-[10px] text-gray-500">
                                                                Batas kembali
                                                            </p>
                                                            <p className="mt-1 text-micro font-bold text-gray-800">
                                                                {formatDate(
                                                                    booking.end,
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* PURPOSE */}
                                                <div>
                                                    <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                                        Keperluan Peminjaman
                                                    </p>
                                                    <p className="mt-2 text-micro leading-5 text-gray-600">
                                                        {booking.purpose}
                                                    </p>
                                                </div>

                                                {/* ACTIONS */}
                                                <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-4">
                                                    <a
                                                        href={`tel:${booking.phone}`}
                                                        className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-3 text-micro font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-[#C2410C]"
                                                    >
                                                        <Icon
                                                            name="phone"
                                                            size={14}
                                                        />
                                                        Telepon
                                                    </a>

                                                    <a
                                                        href={`mailto:${booking.email}`}
                                                        className="flex items-center justify-center gap-2 rounded-xl bg-charcoal-900 px-3 py-3 text-micro font-bold text-white transition hover:bg-[#EA580C]"
                                                    >
                                                        <Icon
                                                            name="mail"
                                                            size={14}
                                                        />
                                                        Email
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-orange-200 bg-[#FFFAF5] px-5 py-12 text-center">
                                    <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-orange-100 text-[#EA580C]">
                                        <Icon name="calendar" size={25} />
                                    </div>

                                    <h4 className="text-body font-bold text-gray-800">
                                        Tidak ada peminjaman
                                    </h4>

                                    <p className="mt-2 max-w-52 text-micro leading-5 text-gray-500">
                                        Belum ada jadwal peminjaman aset pada
                                        tanggal ini. Pilih tanggal lain untuk
                                        melihat jadwal.
                                    </p>
                                </div>
                            )}

                            {/* FOOTER NOTE */}
                            <div className="mt-5 border-t border-orange-100 pt-4">
                                <div className="flex gap-2">
                                    <Icon
                                        name="info"
                                        size={14}
                                        color="#EA580C"
                                    />
                                    <p className="text-micro leading-5 text-gray-400">
                                        Informasi peminjam ditampilkan untuk
                                        membantu pengelola melakukan konfirmasi
                                        dan koordinasi pengembalian aset.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
