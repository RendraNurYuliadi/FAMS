
import Icon from '../Icon';
import NotificationDropdown from './NotificationDropdown';
import UserDropdown from './UserDropdown';

type Props = {
    onOpenSidebar: () => void;
};

export default function Header({ onOpenSidebar }: Props) {
    return (
        <header className="sticky top-0 z-30 flex h-[76px] shrink-0 items-center justify-between gap-4 border-b border-neutral-200 bg-white/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
                <button
                    type="button"
                    onClick={onOpenSidebar}
                    aria-label="Buka menu navigasi"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800 lg:hidden"
                >
                    <Icon name="menu" size={19} />
                </button>
            </div>

            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                {/* Search */}
                <label className="hidden h-10 w-48 items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 transition focus-within:border-neutral-400 focus-within:bg-white md:flex lg:w-60">
                    <Icon name="users" size={16} className="shrink-0 text-neutral-400" />
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
                <button
                    type="button"
                    aria-label="Pencarian"
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-neutral-100 md:hidden"
                >
                    <Icon name="users" size={18} />
                </button>

                <div className="mx-1 hidden h-7 w-px bg-neutral-200 sm:block" />

                <NotificationDropdown />

                <div className="mx-1 hidden h-7 w-px bg-neutral-200 sm:block" />

                <UserDropdown />
            </div>
        </header>
    );
}
