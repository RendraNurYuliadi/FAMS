
import type { IconName } from '../components/Icon';

export type UserRole = 'admin' | 'pengelola' | 'peminjam';

export interface DashboardUser {
    id?: number;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string | null;
}

export type DashboardMenuItem = {
    title: string;
    href: string;
    icon: IconName;
    children?: DashboardMenuItem[];
};

export type DashboardNotification = {
    id: number;
    title: string;
    description: string;
    time: string;
    unread: boolean;
};

export interface DashboardStat {
    title: string;
    value: string;
    description: string;
    icon: IconName;
}
