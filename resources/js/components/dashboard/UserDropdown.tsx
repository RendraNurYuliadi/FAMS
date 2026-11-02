
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { router, usePage } from '@inertiajs/react';
import Icon from '../Icon';

export default function UserDropdown() {
    const [open, setOpen] = useState(false);
    const { auth } = usePage<{
        auth: {
            user: {
                name: string;
                email: string;
                role: string;
                avatar?: string;
            } | null;
        };
    }>().props;
    const user = auth.user;

    const name = user?.name ?? 'Admin FAMS';
    const email = user?.email ?? 'admin@fams.ac.id';
    const role = user?.role ?? 'admin';
    const roleLabel =
        role === 'peminjam'
            ? 'Peminjam'
            : role === 'pengelola'
              ? 'Pengelola'
              : 'Administrator';
    const initial = name.charAt(0).toUpperCase();

    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false);
        };

        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open]);

    function logout() {
        router.post('/logout');
    }

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-950 p-1 text-white transition hover:bg-neutral-800 sm:h-auto sm:w-auto sm:justify-start sm:gap-2 sm:p-1.5"
                aria-expanded={open}
                aria-haspopup="dialog"
                aria-label="Menu pengguna"
            >
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-neutral-900 text-xs font-semibold text-white sm:h-9 sm:w-9">
                    {user?.avatar ? (
                        <img
                            src={user.avatar}
                            alt={name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        initial
                    )}
                </div>

                <div className="hidden text-left sm:block">
                    <p className="max-w-[120px] truncate text-xs font-semibold text-white">
                        {name}
                    </p>
                    <p className="text-[10px] text-neutral-400">{roleLabel}</p>
                </div>

                <Icon name="arrow-right" size={13} className="hidden rotate-90 text-neutral-300 sm:block" />
            </button>

            {open &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[100] flex items-start justify-end bg-neutral-950/45 p-3 pt-[72px] backdrop-blur-sm sm:p-6 sm:pt-[88px]"
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget) {
                                setOpen(false);
                            }
                        }}
                    >
                        <section
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="account-modal-title"
                            className="w-full max-w-md overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl"
                        >
                            <div className="flex items-start justify-between gap-3 border-b border-neutral-100 p-5">
                                <div className="min-w-0">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
                                            {initial}
                                        </div>
                                        <div className="min-w-0">
                                            <h2
                                                id="account-modal-title"
                                                className="truncate text-sm font-semibold text-neutral-900"
                                            >
                                                {name}
                                            </h2>
                                            <p className="truncate text-xs text-neutral-400">
                                                {email}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="mt-3 inline-flex rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-medium text-neutral-600">
                                        {roleLabel}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    aria-label="Tutup profil akun"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950"
                                >
                                    <Icon name="close" size={18} />
                                </button>
                            </div>

                            {role !== 'peminjam' && (
                                <div className="border-b border-neutral-100 p-2">
                                    <a
                                        href="/dashboard/pengaturan/profil"
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-950"
                                    >
                                        <Icon name="users" size={16} />
                                        Profil Saya
                                    </a>

                                    <a
                                        href="/dashboard/pengaturan"
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-950"
                                    >
                                        <Icon name="shield" size={16} />
                                        Pengaturan
                                    </a>
                                </div>
                            )}

                            <div className="p-2">
                                <button
                                    type="button"
                                    onClick={logout}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950"
                                >
                                    <Icon name="arrow-right" size={16} />
                                    Keluar dari akun
                                </button>
                            </div>
                        </section>
                    </div>,
                    document.body,
                )}
        </div>
    );
}
