import { Link, usePage } from '@inertiajs/react';
import Icon from '../Icon';
import SidebarMenu from './SidebarMenu';
import { dashboardMenu, settingsMenu } from '../config/dashboard-menu';

type SidebarProps = {
    collapsed: boolean;
    onToggle: () => void;
    mobileOpen: boolean;
    onCloseMobile: () => void;
};

export default function Sidebar({
    collapsed,
    onToggle,
    mobileOpen,
    onCloseMobile,
}: SidebarProps) {
    const { auth } = usePage<{
        auth: { user: { role: string } | null };
    }>().props;
    const role = auth.user?.role;
    const visibleDashboardMenu =
        role === 'admin'
            ? dashboardMenu
            : role === 'pengelola'
              ? dashboardMenu.filter(
                    (item) => item.href !== '/dashboard/pengguna',
                )
              : dashboardMenu
                    .map((item) => {
                        if (item.href === '/dashboard') return item;
                        const children = item.children?.filter(({ href }) =>
                            [
                                '/dashboard/aset/katalog',
                                '/dashboard/peminjaman',
                                '/dashboard/pengembalian',
                                '/dashboard/pengaduan',
                            ].some(
                                (section) =>
                                    href === section ||
                                    href.startsWith(`${section}/`),
                            ),
                        );

                        return children?.length ? { ...item, children } : null;
                    })
                    .filter((item) => item !== null);
    const visibleSettingsMenu = role === 'peminjam' ? [] : settingsMenu;

    return (
        <>
            {/* Mobile overlay */}
            {mobileOpen && (
                <button
                    type="button"
                    aria-label="Tutup sidebar"
                    onClick={onCloseMobile}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
                />
            )}

            <aside
                className={`fixed inset-y-3 left-3 z-50 flex h-[calc(100dvh-1.5rem)] w-[270px] flex-col rounded-card border border-charcoal-700 bg-charcoal-900 text-white shadow-[0_20px_60px_rgba(36,36,36,0.22)] transition-[width,transform] duration-300 ease-in-out lg:sticky lg:inset-y-auto lg:top-4 lg:left-auto lg:z-30 lg:my-4 lg:mr-0 lg:ml-4 lg:h-[calc(100dvh-2rem)] lg:translate-x-0 ${collapsed ? 'lg:w-[82px]' : 'lg:w-[270px]'} ${mobileOpen ? 'translate-x-0' : '-translate-x-[calc(100%_+_0.75rem)] lg:translate-x-0'} `}
            >
                {/* Logo: fixed at top */}
                <div
                    className={`flex h-[76px] shrink-0 items-center rounded-t-card border-b border-white/10 ${
                        collapsed
                            ? 'justify-center px-3'
                            : 'justify-between px-5'
                    }`}
                >
                    <Link
                        href="/dashboard"
                        onClick={onCloseMobile}
                        className="flex min-w-0 items-center gap-3"
                    >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-primary-500 text-xl font-bold text-white">
                            F
                        </div>

                        {!collapsed && (
                            <div className="min-w-0">
                                <p className="text-lg leading-tight font-bold tracking-tight text-white">
                                    FAMS
                                    <span className="text-primary-400">.</span>
                                </p>
                                <p className="mt-1 truncate text-[9px] font-semibold tracking-[0.13em] text-white/55">
                                    FACULTY ASSET MANAGEMENT
                                </p>
                            </div>
                        )}
                    </Link>

                    {!collapsed && (
                        <button
                            type="button"
                            onClick={onToggle}
                            title="Ciutkan sidebar"
                            className="hidden h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-white/10 hover:text-white lg:flex"
                        >
                            <Icon name="close" className="h-4 w-4" />
                        </button>
                    )}

                    {collapsed && (
                        <button
                            type="button"
                            onClick={onToggle}
                            title="Perluas sidebar"
                            className="absolute top-6 right-[-13px] hidden h-7 w-7 items-center justify-center rounded-full border border-charcoal-700 bg-charcoal-800 text-white/70 shadow-sm transition hover:text-white lg:flex"
                        >
                            <Icon name="menu" className="h-4 w-4" />
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={onCloseMobile}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-white/10 hover:text-white lg:hidden"
                        aria-label="Tutup sidebar"
                    >
                        <Icon name="close" className="h-5 w-5" />
                    </button>
                </div>

                {/* Scrollable menu area only */}
                <div
                    className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-5"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#e6cbb2 transparent',
                    }}
                >
                    <p
                        className={`mb-3 px-3 text-[10px] font-bold tracking-[0.16em] text-neutral-500 ${
                            collapsed ? 'text-center' : ''
                        }`}
                    >
                        {collapsed ? 'MENU' : 'MENU UTAMA'}
                    </p>

                    <nav className="sidebar-menu-enter space-y-1">
                        {visibleDashboardMenu.map((item) => (
                            <SidebarMenu
                                key={item.href}
                                item={item}
                                collapsed={collapsed}
                                onNavigate={onCloseMobile}
                            />
                        ))}
                    </nav>
                </div>

                {/* Preferences: fixed at bottom */}
                <div className="shrink-0 rounded-b-card border-t border-white/10 bg-charcoal-900 px-3 pt-4 pb-3">
                    {visibleSettingsMenu.length > 0 && (
                        <p
                            className={`mb-3 px-3 text-[10px] font-bold tracking-[0.16em] text-neutral-500 ${
                                collapsed ? 'text-center' : ''
                            }`}
                        >
                            {collapsed ? 'LAIN' : 'PREFERENSI'}
                        </p>
                    )}

                    {visibleSettingsMenu.length > 0 && (
                        <nav className="sidebar-menu-enter space-y-1">
                            {visibleSettingsMenu.map((item) => (
                                <SidebarMenu
                                    key={item.href}
                                    item={item}
                                    collapsed={collapsed}
                                    onNavigate={onCloseMobile}
                                />
                            ))}
                        </nav>
                    )}

                    {!collapsed && role !== 'peminjam' && (
                        <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-500 text-xs font-bold text-white">
                                AD
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-xs font-semibold text-white">
                                    Admin FAMS
                                </p>
                                <p className="mt-0.5 truncate text-[10px] text-neutral-400">
                                    Administrator
                                </p>
                            </div>

                            <Icon
                                name="shield"
                                className="h-4 w-4 shrink-0 text-primary-400"
                            />
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}
