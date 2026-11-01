
import { useState } from 'react';
import Icon from '../Icon';
import type { DashboardNotification } from '../../types/dashboard';

const initialNotifications: DashboardNotification[] = [
    {
        id: 1,
        title: 'Pengajuan peminjaman baru',
        description: 'Terdapat pengajuan peminjaman aset yang perlu diperiksa.',
        time: '5 menit lalu',
        unread: true,
    },
    {
        id: 2,
        title: 'Pengembalian aset',
        description: 'Pengembalian aset menunggu pemeriksaan pengelola.',
        time: '30 menit lalu',
        unread: true,
    },
    {
        id: 3,
        title: 'Laporan kerusakan',
        description: 'Terdapat laporan kerusakan aset baru.',
        time: '2 jam lalu',
        unread: false,
    },
];

export default function NotificationDropdown() {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState(initialNotifications);

    const unreadCount = notifications.filter((item) => item.unread).length;

    function markAllAsRead() {
        setNotifications((current) =>
            current.map((item) => ({ ...item, unread: false })),
        );
    }

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-label="Notifikasi"
                aria-expanded={open}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950"
            >
                <Icon name="bell" size={19} />

                {unreadCount > 0 && (
                    <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full border-2 border-white bg-neutral-950" />
                )}
            </button>

            {open && (
                <>
                    <button
                        type="button"
                        aria-label="Tutup notifikasi"
                        className="fixed inset-0 z-40 cursor-default"
                        onClick={() => setOpen(false)}
                    />

                    <div className="fixed top-[68px] left-3 right-3 z-50 mx-auto w-auto max-w-[350px] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.12)] sm:absolute sm:top-full sm:right-0 sm:left-auto sm:mt-3 sm:w-[350px]">
                        <div className="flex items-center justify-between gap-2 border-b border-neutral-100 px-3 py-3 sm:px-4 sm:py-4">
                            <div>
                                <h3 className="text-sm font-semibold text-neutral-900">
                                    Notifikasi
                                </h3>
                                <p className="mt-0.5 text-[10px] leading-4 text-neutral-400">
                                    {unreadCount} pemberitahuan belum dibaca
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={markAllAsRead}
                                aria-label="Tandai semua notifikasi sudah dibaca"
                                title="Tandai semua sudah dibaca"
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950"
                            >
                                <Icon name="check" size={16} />
                            </button>
                        </div>

                        <div className="max-h-[340px] overflow-y-auto">
                            {notifications.map((item) => (
                                <div
                                    key={item.id}
                                    className={`flex gap-3 border-b border-neutral-100 px-3 py-3 sm:px-4 sm:py-4 last:border-0 ${
                                        item.unread ? 'bg-neutral-50/80' : ''
                                    }`}
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-600">
                                        <Icon name="clock" size={16} />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <p className="break-words text-xs font-semibold text-neutral-800">
                                                {item.title}
                                            </p>
                                            {item.unread && (
                                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" />
                                            )}
                                        </div>

                                        <p className="mt-1 break-words text-[11px] leading-5 text-neutral-500">
                                            {item.description}
                                        </p>

                                        <p className="mt-2 text-[10px] text-neutral-400">
                                            {item.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-neutral-100 p-3 text-center">
                            <span className="text-[10px] text-neutral-400">
                                Notifikasi FAMS
                            </span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
