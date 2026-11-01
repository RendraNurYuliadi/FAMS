
import { useState } from 'react';
import type { ReactNode } from 'react';
import Sidebar from '../dashboard/Sidebar';
import Header from '../dashboard/Header';

type DashboardLayoutProps = {
    children: ReactNode;
};

export default function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-950">
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
                        {children}
                    </main>

                    <footer className="border-t border-neutral-200 px-4 py-5 text-center text-xs text-neutral-400 sm:px-6 lg:px-8">
                        © {new Date().getFullYear()} FAMS — Faculty Asset Management System.
                    </footer>
                </div>
            </div>
        </div>
    );
}
