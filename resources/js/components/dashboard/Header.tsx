
import { useEffect, useRef, useState } from 'react';
import Icon from '../Icon';
import NotificationDropdown from './NotificationDropdown';
import UserDropdown from './UserDropdown';

type Props = {
    onOpenSidebar: () => void;
};

export default function Header({ onOpenSidebar }: Props) {
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const mobileSearchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (mobileSearchOpen) {
            mobileSearchRef.current?.focus();
        }
    }, [mobileSearchOpen]);

    return (
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-2 border-b border-neutral-200 bg-white/95 px-3 backdrop-blur-xl sm:h-[76px] sm:gap-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
                <button
                    type="button"
                    onClick={onOpenSidebar}
                    aria-label="Buka menu navigasi"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800 lg:hidden"
                >
                    <Icon name="menu" size={20} />
                </button>
            </div>

            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                {/* Search */}
                <label className="hidden h-10 w-48 items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 transition focus-within:border-neutral-400 focus-within:bg-white md:flex lg:w-60">
                    <Icon name="search" size={16} className="shrink-0 text-neutral-400" />
                    <input
                        type="search"
                        placeholder="Cari sesuatu..."
                        className="w-full border-0 bg-transparent text-xs text-neutral-800 outline-none placeholder:text-neutral-400 focus:ring-0"
                    />
                    <span className="rounded border border-neutral-200 bg-white px-1.5 py-0.5 text-[9px] text-neutral-400">
                        /
                    </span>
                </label>

                {/* Mobile Search */}
                <div className="flex min-w-0 items-center gap-1 md:hidden">
                    {mobileSearchOpen && (
                        <input
                            ref={mobileSearchRef}
                            type="search"
                            aria-label="Cari sesuatu"
                            placeholder="Cari..."
                            onKeyDown={(event) => {
                                if (event.key === 'Escape') {
                                    setMobileSearchOpen(false);
                                }
                            }}
                            className="h-12 w-[min(34vw,8rem)] rounded-xl border border-neutral-200 bg-neutral-50 px-3 text-xs text-neutral-800 outline-none placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:ring-0"
                        />
                    )}
                    <button
                        type="button"
                        aria-label={mobileSearchOpen ? 'Tutup pencarian' : 'Buka pencarian'}
                        aria-expanded={mobileSearchOpen}
                        onClick={() => setMobileSearchOpen((open) => !open)}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-700 transition hover:bg-neutral-50"
                    >
                        {mobileSearchOpen ? (
                            <Icon name="close" size={20} className="text-neutral-700" />
                        ) : (
                            <Icon name="search" size={20} className="text-neutral-700" />
                        )}
                    </button>
                </div>

                <div className="mx-1 hidden h-7 w-px bg-neutral-200 sm:block" />

                <NotificationDropdown />

                <div className="mx-1 hidden h-7 w-px bg-neutral-200 sm:block" />

                <UserDropdown />
            </div>
        </header>
    );
}
