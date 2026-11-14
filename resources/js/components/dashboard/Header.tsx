import { useEffect, useRef, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Icon from '../Icon';
import { dashboardMenu, settingsMenu } from '../config/dashboard-menu';
import NotificationDropdown from './NotificationDropdown';
import UserDropdown from './UserDropdown';

type Props = {
    onOpenSidebar: () => void;
};

function getBreadcrumbs(currentPath: string) {
    const menuItems = [...dashboardMenu, ...settingsMenu].filter(
        (item) => item.href !== '/dashboard',
    );
    const matches = menuItems.flatMap((item) => [
        { href: item.href, items: [item] },
        ...(item.children ?? []).map((child) => ({
            href: child.href,
            items: [item, child],
        })),
    ]);
    const matchingPath = matches
        .filter(
            ({ href }) =>
                currentPath === href || currentPath.startsWith(`${href}/`),
        )
        .sort(
            (a, b) =>
                b.href.length - a.href.length ||
                b.items.length - a.items.length,
        )[0];

    return [
        { title: 'Dashboard', href: '/dashboard' },
        ...(matchingPath?.items.map(({ title, href }) => ({ title, href })) ??
            (currentPath === '/dashboard'
                ? []
                : [{ title: 'Dashboard', href: '/dashboard' }])),
    ].filter(
        (item, index, items) =>
            index === 0 || item.title !== items[index - 1].title,
    );
}

export default function Header({ onOpenSidebar }: Props) {
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const mobileSearchRef = useRef<HTMLInputElement>(null);
    const { url } = usePage();
    const currentPath = url.split('?')[0].replace(/\/+$/, '') || '/';
    const breadcrumbs = getBreadcrumbs(currentPath);

    useEffect(() => {
        if (mobileSearchOpen) {
            mobileSearchRef.current?.focus();
        }
    }, [mobileSearchOpen]);

    return (
        <header className="sticky top-0 z-30 px-4 pt-4 sm:px-6 lg:px-8">
            <div className="flex h-16 w-full shrink-0 items-center justify-between gap-2 rounded-card border border-white/10 bg-charcoal-900 px-3 text-white shadow-xl shadow-black/15 sm:h-[76px] sm:gap-4 sm:px-6 lg:px-8">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                    <button
                        type="button"
                        onClick={onOpenSidebar}
                        aria-label="Buka menu navigasi"
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-500 text-white transition hover:bg-primary-600 lg:hidden"
                    >
                        <Icon name="menu" size={20} />
                    </button>

                    <nav
                        aria-label="Breadcrumb"
                        className="flex min-w-0 items-center gap-2 text-xs sm:text-sm"
                    >
                        {breadcrumbs.map((item, index) => {
                            const isCurrent =
                                index === breadcrumbs.length - 1;
                            const separator = index > 0;

                            return (
                                <span
                                    key={`${item.href}-${item.title}`}
                                    className="flex min-w-0 items-center gap-2"
                                >
                                    {separator && (
                                        <Icon
                                            name="chevron-right"
                                            className="hidden h-3.5 w-3.5 shrink-0 text-white/35 sm:block"
                                        />
                                    )}
                                    {isCurrent ? (
                                        <span
                                            aria-current="page"
                                            className="flex min-w-0 items-center gap-2 truncate font-semibold text-white"
                                        >
                                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                                            <span className="truncate">
                                                {item.title}
                                            </span>
                                        </span>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="hidden max-w-40 truncate text-white/55 transition hover:text-white sm:block"
                                        >
                                            {item.title}
                                        </Link>
                                    )}
                                </span>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                    {/* Search */}
                    <label className="hidden h-10 w-48 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 transition focus-within:border-white/25 focus-within:bg-white/10 md:flex lg:w-60">
                        <Icon
                            name="search"
                            size={16}
                            className="shrink-0 text-white/55"
                        />
                        <input
                            type="search"
                            placeholder="Cari sesuatu..."
                            className="w-full border-0 bg-transparent text-xs text-white outline-none placeholder:text-white/50 focus:ring-0"
                        />
                        <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] text-white/55">
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
                                className="h-12 w-[min(34vw,8rem)] rounded-xl border border-white/10 bg-white/5 px-3 text-xs text-white outline-none placeholder:text-white/50 focus:border-white/25 focus:bg-white/10 focus:ring-0"
                            />
                        )}
                        <button
                            type="button"
                            aria-label={
                                mobileSearchOpen
                                    ? 'Tutup pencarian'
                                    : 'Buka pencarian'
                            }
                            aria-expanded={mobileSearchOpen}
                            onClick={() => setMobileSearchOpen((open) => !open)}
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
                        >
                            {mobileSearchOpen ? (
                                <Icon
                                    name="close"
                                    size={20}
                                    className="text-white/80"
                                />
                            ) : (
                                <Icon
                                    name="search"
                                    size={20}
                                    className="text-white/80"
                                />
                            )}
                        </button>
                    </div>

                    <div className="mx-1 hidden h-7 w-px bg-white/15 sm:block" />

                    <NotificationDropdown />

                    <div className="mx-1 hidden h-7 w-px bg-white/15 sm:block" />

                    <UserDropdown />
                </div>
            </div>
        </header>
    );
}
