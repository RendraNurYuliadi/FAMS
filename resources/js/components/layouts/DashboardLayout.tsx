import { useState } from 'react';
import type { ReactNode } from 'react';
import { usePage } from '@inertiajs/react';
import Sidebar from '../dashboard/Sidebar';
import Header from '../dashboard/Header';

type DashboardLayoutProps = {
    children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { url } = usePage();

    return (
        <div className="dashboard-theme min-h-screen bg-surface-warm text-text-primary">
            <div className="flex min-h-screen items-start">
                <Sidebar
                    collapsed={collapsed}
                    onToggle={() => setCollapsed((current) => !current)}
                    mobileOpen={mobileOpen}
                    onCloseMobile={() => setMobileOpen(false)}
                />

                <div className="min-w-0 flex-1">
                    <Header onOpenSidebar={() => setMobileOpen(true)} />

                    <main className="min-h-[calc(100vh-72px)] px-4 py-5 sm:px-6 lg:px-8">
                        <div key={url} className="dashboard-page-enter">
                            {children}
                        </div>
                    </main>

                    <footer className="border-t border-primary-200/80 px-4 py-5 text-center text-xs text-gray-500 sm:px-6 lg:px-8">
                        © {new Date().getFullYear()} FAMS — Faculty Asset
                        Management System.
                    </footer>
                </div>
            </div>
        </div>
    );
}
