
import { Link, usePage } from '@inertiajs/react';
import { dashboardMenu, settingsMenu } from '../config/dashboard-menu';
import type { DashboardMenuItem } from '../../types/dashboard';

type Crumb = {
    title: string;
    href: string;
};

function findBreadcrumb(
    items: DashboardMenuItem[],
    pathname: string,
    parents: Crumb[] = [],
): Crumb[] | null {
    for (const item of items) {
        const current = [...parents, {
            title: item.title,
            href: item.href,
        }];

        if (item.href === pathname) {
            return current;
        }

        if (item.children) {
            const result = findBreadcrumb(
                item.children,
                pathname,
                current,
            );

            if (result) return result;
        }
    }

    return null;
}

export default function Breadcrumb() {
    const { url } = usePage();
    const pathname = url.split('?')[0].replace(/\/$/, '') || '/dashboard';

    const items = [...dashboardMenu, ...settingsMenu];

    const breadcrumbs = findBreadcrumb(items, pathname) ?? [
        { title: 'Dashboard', href: '/dashboard' },
        {
            title: pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') ?? 'Halaman',
            href: pathname,
        },
    ];

    return (
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 overflow-hidden text-xs">
            {breadcrumbs.map((item, index) => {
                const active = index === breadcrumbs.length - 1;

                return (
                    <div key={`${item.href}-${index}`} className="flex min-w-0 items-center gap-2">
                        {index > 0 && (
                            <span className="shrink-0 text-neutral-300">/</span>
                        )}

                        {active ? (
                            <span className="truncate font-semibold capitalize text-neutral-900">
                                {item.title}
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="truncate capitalize text-neutral-400 transition hover:text-neutral-900"
                            >
                                {item.title}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
