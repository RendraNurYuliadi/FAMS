
import { useState } from 'react';
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

    function logout() {
        router.post('/logout');
    }

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-xl bg-neutral-950 p-1.5 text-white transition hover:bg-neutral-800"
                aria-expanded={open}
                aria-label="Menu pengguna"
            >
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-neutral-900 text-xs font-semibold text-white">
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

            {open && (
                <>
                    <button
                        type="button"
                        aria-label="Tutup menu pengguna"
                        className="fixed inset-0 z-40 cursor-default"
                        onClick={() => setOpen(false)}
                    />

                    <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.12)]">
                        <div className="border-b border-neutral-100 p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
                                    {initial}
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-neutral-900">
                                        {name}
                                    </p>
                                    <p className="truncate text-xs text-neutral-400">
                                        {email}
                                    </p>
                                </div>
                            </div>
                            <span className="mt-3 inline-flex rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-medium text-neutral-600">
                                {roleLabel}
                            </span>
                        </div>

                        {role !== 'peminjam' && <div className="p-2">
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
                        </div>}

                        <div className="border-t border-neutral-100 p-2">
                            <button
                                type="button"
                                onClick={logout}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950"
                            >
                                <Icon name="arrow-right" size={16} />
                                Keluar dari akun
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
