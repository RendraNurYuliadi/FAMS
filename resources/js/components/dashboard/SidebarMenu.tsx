
import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Icon from '../Icon';
import type { DashboardMenuItem } from '../../types/dashboard';

type SidebarMenuProps = {
    item: DashboardMenuItem;
    collapsed?: boolean;
    onNavigate?: () => void;
};

export default function SidebarMenu({
    item,
    collapsed = false,
    onNavigate,
}: SidebarMenuProps) {
    const { url } = usePage();
    const currentPath = url.split('?')[0];

    const hasChildren = Boolean(item.children?.length);

    const isActive = (href: string) =>
        currentPath === href ||
        (href !== '/dashboard' && currentPath.startsWith(`${href}/`));

    const isChildActive = item.children?.some((child) =>
        isActive(child.href),
    );

    const [isOpen, setIsOpen] = useState(Boolean(isChildActive));

    useEffect(() => {
        if (isChildActive) {
            setIsOpen(true);
        }
    }, [isChildActive]);

    const active = isActive(item.href);

    if (!hasChildren) {
        return (
            <Link
                href={item.href}
                onClick={onNavigate}
                title={collapsed ? item.title : undefined}
                className={`group flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                        ? 'bg-white font-semibold text-neutral-950 shadow-sm'
                        : 'text-neutral-300 hover:bg-white/10 hover:text-white'
                } ${collapsed ? 'justify-center px-2' : ''}`}
            >
                <Icon
                    name={item.icon}
                    className="h-[18px] w-[18px] shrink-0"
                />

                {!collapsed && <span>{item.title}</span>}
            </Link>
        );
    }

    return (
        <div className="space-y-1">
            <button
                type="button"
                title={collapsed ? item.title : undefined}
                onClick={() => {
                    if (collapsed) {
                        setIsOpen(!isOpen);
                    } else {
                        setIsOpen(!isOpen);
                    }
                }}
                className={`flex min-h-10 w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                    isChildActive
                        ? 'bg-white/10 text-white'
                        : 'text-neutral-300 hover:bg-white/10 hover:text-white'
                } ${collapsed ? 'justify-center px-2' : ''}`}
            >
                <Icon
                    name={item.icon}
                    className="h-[18px] w-[18px] shrink-0"
                />

                {!collapsed && (
                    <>
                        <span className="min-w-0 flex-1 truncate">
                            {item.title}
                        </span>

                        <Icon
                            name="chevron-right"
                            className={`h-4 w-4 shrink-0 transition-transform ${
                                isOpen ? 'rotate-90' : ''
                            }`}
                        />
                    </>
                )}
            </button>

            {!collapsed && isOpen && (
                <div className="dashboard-submenu-enter ml-[21px] space-y-1 border-l border-white/15 pl-3">
                    {item.children?.map((child) => {
                        const childActive = currentPath === child.href;

                        return (
                            <Link
                                key={child.href}
                                href={child.href}
                                onClick={onNavigate}
                                className={`flex min-h-9 items-center rounded-lg px-3 py-2 text-[13px] transition-colors ${
                                    childActive
                                        ? 'bg-white font-semibold text-neutral-950 shadow-sm'
                                        : 'text-neutral-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <span className="truncate">{child.title}</span>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
